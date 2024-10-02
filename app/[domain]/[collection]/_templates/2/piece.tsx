'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IWork } from '@/app/interfaces/IWork';
import Modal from './Modal';

export default function Piece({
  data,
  artist,
  works,
  index,
}: {
  data: IWork;
  works: IWork[];
  index: number;
  artist: string;
}) {
  const [modal, setModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);
  const [src, setSrc] = useState<string>(
    data.media.find((m) => m.main === 'true')?.url || '',
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setVisible(true);
            setHasAnimated(true);
            domRef.current?.classList.add('fade-in-from-bottom', 'is-visible');
          } else if (!entry.isIntersecting && !hasAnimated) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.1 },
    ); // Adjust threshold as needed

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [hasAnimated]);

  return (
    <>
      {modal && (
        <Modal
          index={index}
          works={works}
          artist={artist}
          modal={modal}
          setModal={setModal}
          data={data}
        />
      )}
      <section
        ref={domRef}
        key={data.id}
        onClick={() => setModal(true)}
        className={`${data.id !== null && data.id % 4 === 0 && 'animDelay'} fade-in-from-bottom relative flex cursor-pointer flex-col justify-between gap-3 lg:mx-0 lg:h-[500px] lg:flex-row`}
      >
        <Image
          width={0}
          height={0}
          alt="work"
          sizes="100vw"
          className="max-h-[620px] w-full self-center object-contain lg:h-[500px] lg:max-w-[700px]"
          src={src}
        />
        <div className="flex w-full flex-row self-start self-end text-xs tracking-wide lg:mt-0 lg:w-auto lg:flex-col">
          <span className="text-xs italic text-mediumGray lg:text-sm">
            {data.title}
          </span>
          <span className="mx-2 block text-xs text-lightGray lg:mx-0 lg:text-sm">
            {data.year && `${data.year}`}
          </span>
          <span className="hidden text-xs text-lightGray lg:block lg:text-sm">
            {data.medium && `${data.medium}`}
          </span>
          <span className="hidden text-xs text-lightGray lg:block lg:text-sm">
            {data.height && `${data.height}`}
            {data.width && ` x ${data.width}`}{' '}
            {data.depth && ` x ${data.depth}`}
            {data.unit && ` ${data.unit}`}
          </span>
        </div>
      </section>
    </>
  );
}