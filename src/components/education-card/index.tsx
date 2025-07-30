import React from 'react';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const EducationItem = ({
  time,
  degree,
  institution,
  isMostRecent,
}: {
  time: React.ReactNode;
  degree?: React.ReactNode;
  institution?: React.ReactNode;
  isMostRecent: boolean;
}) => (
  <li className="relative pl-6 mb-6">
    {/* Timeline dot */}
    <span
      className={`absolute left-1 top-1.5 w-3 h-3 rounded-full border-2 ${
        isMostRecent
          ? 'bg-purple-500 animate-pulse border-white dark:border-base-300'
          : 'bg-base-300 border-white dark:border-base-300'
      }`}
    ></span>

    <p className="text-xs text-base-content opacity-60 mb-0.5">{time}</p>
    <p className="text-sm font-semibold text-base-content tracking-wide">
      {degree}
    </p>
    <p className="text-sm text-base-content text-opacity-80 font-light">
      {institution}
    </p>
  </li>
);

const EducationCard = ({
  loading,
  educations,
}: {
  loading: boolean;
  educations: SanitizedEducation[];
}) => {
  const renderSkeleton = () =>
    Array.from({ length: 2 }, (_, index) => (
      <EducationItem
        key={index}
        isMostRecent={index === 0}
        time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
        degree={skeleton({
          widthCls: 'w-6/12',
          heightCls: 'h-4',
          className: 'my-1.5',
        })}
        institution={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
      />
    ));

  return (
    <div className="card shadow-md bg-base-100 border border-base-300 rounded-box transition-all duration-300">
      <div className="card-body px-6 py-5">
        <h3 className="text-lg font-semibold text-base-content mb-3 border-b border-base-300 pb-2">
          {loading
            ? skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
            : 'Education'}
        </h3>

        <ol className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-2 before:w-px before:bg-base-300">
          {loading
            ? renderSkeleton()
            : educations.map((item, index) => (
                <EducationItem
                  key={index}
                  isMostRecent={index === 0}
                  time={`${item.from} – ${item.to}`}
                  degree={item.degree}
                  institution={item.institution}
                />
              ))}
        </ol>
      </div>
    </div>
  );
};

export default EducationCard;
