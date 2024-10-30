import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ICollection } from '@/app/interfaces/ICollection';
import Piece from './piece';
import { IWork } from '@/app/interfaces/IWork';

export default function page({ data, user }: { data: ICollection; user: any }) {
  const {
    imgSrc,
    imgCaption,
    title,
    subheading,
    description,
    linkText1,
    linkSrc1,
    linkText2,
    linkSrc2,
    works,
  } = data || {};

  if (!works) {
    return 'loading';
  }

  return (
    <main className="flex min-h-[80vh] flex-wrap justify-center">
      {/* <section className="fade-in-up-simple flex flex-col justify-center lg:w-4/5 lg:flex-row lg:gap-10">
        {imgSrc && (
          <>
            <div className="mx-1 flex flex-col lg:m-5 lg:mx-0 lg:h-[400px] lg:w-1/2 lg:w-[500px]">
              <div className="relative w-full">
                <Image
                  height={0}
                  width={0}
                  src={imgSrc}
                  sizes="100vw"
                  className="w-full object-contain"
                  alt="cover"
                />
              </div>
              <div className="mt-2">
                <span className="text-sm italic text-mediumGray">
                  {imgCaption}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="fade-in-right-simple mx-1 my-5 flex-1 lg:m-5 lg:w-1/2">
          <h1 className="text-xl leading-9 text-mediumGray">
            {imgSrc || subheading || linkSrc1 || linkSrc2 || description
              ? title
              : null}
          </h1>
          <h3 className="text-sm leading-9 text-mediumGray">{subheading}</h3>
          <div className="text-xs leading-7 text-mediumGray">
            {description &&
              description
                .split('\r\n')
                .map((paragraph: string) => (
                  <p className="my-2 text-xs leading-7 text-mediumGray">
                    {paragraph}
                  </p>
                ))}
          </div>
          <p className="my-4 text-sm text-mediumGray">
            {linkSrc1 && (
              <a
                href={linkSrc1}
                className="underline hover:text-black"
                target="_blank"
              >
                {linkText1}
              </a>
            )}
          </p>
          <p className="text-sm leading-7 text-gray-600">
            {linkSrc2 && (
              <a
                href={linkSrc2}
                className="underline hover:text-black"
                target="_blank"
              >
                {linkText2}
              </a>
            )}
          </p>
        </div>
      </section> */}
      <div
        className="w-screen overflow-x-auto md:mt-10"
        style={{ 'scrollbar-width': 'none', '-ms-overflow-style': 'none' }}
      >
        <div className="flex space-x-6 px-6">
          {works &&
            data.works.map((work: IWork, index: number) => (
              <Piece
                index={index}
                works={works}
                artist={user ? user.displayName : ''}
                key={work.id}
                data={work}
              />
            ))}
        </div>
      </div>
    </main>
  );
}