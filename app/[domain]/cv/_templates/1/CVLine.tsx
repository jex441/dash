import React from 'react';

export default function CVSection({
  experience,
}: {
  experience: {
    categoryId: string | null;
    title: string | null;
    organization: string | null;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    bulletPoint1: string | null;
    bulletPoint2: string | null;
    bulletPoint3: string | null;
  };
}) {
  return (
    <section className="my-1 grid w-full gap-2">
      <div className="grid-cols grid w-full grid-cols-12 justify-between lg:gap-x-3">
        {/* Need refining for mobile: */}
        <span className="col-span-4 text-xs italic text-mediumGray lg:col-span-4 lg:text-sm">
          {experience.title}
        </span>
        <span className="col-span-6 text-xs text-lightGray lg:col-span-4 lg:text-sm">
          {experience.organization}
        </span>
        <span className="col-span-0 hidden text-xs text-mediumGray lg:col-span-2 lg:block lg:text-sm">
          {experience.location}
        </span>
        <span className="col-span-2 text-right text-xs text-lightGray lg:text-sm">
          <span className="block lg:inline">{experience.startDate}</span>
          <span>
            <span className="hidden lg:inline">
              {experience.endDate && ` - `}
            </span>
            <span className="block lg:inline">
              {experience.endDate && `${experience.endDate}`}
            </span>
          </span>
        </span>
      </div>
      <div className="ml-5 hidden w-full flex-col gap-1 text-sm font-light text-lightGray lg:flex">
        {experience.bulletPoint1 && (
          <span className="text-xs text-mediumGray lg:text-sm">
            · {experience.bulletPoint1}
          </span>
        )}
        {experience.bulletPoint2 && (
          <span className="text-xs text-mediumGray lg:text-sm">
            · {experience.bulletPoint2}
          </span>
        )}
        {experience.bulletPoint3 && (
          <span className="text-xs text-mediumGray lg:text-sm">
            · {experience.bulletPoint3}
          </span>
        )}
      </div>
    </section>
  );
}
