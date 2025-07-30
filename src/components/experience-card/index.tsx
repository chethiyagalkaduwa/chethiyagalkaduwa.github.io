import { useState } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type Props = {
  experiences: SanitizedExperience[];
  loading: boolean;
};

// Heuristic to classify academic roles
const isAcademic = (company: string): boolean =>
  /sliit|university|college|kihara lab/i.test(company);

const getExperienceKey = (exp: SanitizedExperience) =>
  `${exp.company}-${exp.position}-${exp.from}`;

const ExperienceItem = ({
  from,
  to,
  position,
  company,
  companyLink,
  isMostRecent,
}: SanitizedExperience & { isMostRecent: boolean }) => (
  <li className="relative pl-6 mb-6">
    {/* Timeline dot */}
    <span
      className={`absolute left-1 top-1.5 w-3 h-3 rounded-full border-2 ${
        isMostRecent
          ? 'bg-blue-500 animate-pulse border-white dark:border-base-300'
          : 'bg-base-300 border-white dark:border-base-300'
      }`}
    ></span>

    <p className="text-xs text-base-content opacity-60 mb-0.5">
      {from} – {to}
    </p>
    <p className="text-sm font-semibold text-base-content">{position}</p>
    <p className="text-sm text-base-content text-opacity-80">
      {companyLink ? (
        <a
          href={companyLink}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          {company}
        </a>
      ) : (
        company
      )}
    </p>
  </li>
);

const ExperienceSection = ({
  items,
  mostRecentKey,
}: {
  items: SanitizedExperience[];
  mostRecentKey: string;
}) => (
  <ul className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-2 before:w-px before:bg-base-300">
    {items.map((exp, idx) => (
      <ExperienceItem
        key={idx}
        {...exp}
        isMostRecent={getExperienceKey(exp) === mostRecentKey}
      />
    ))}
  </ul>
);

const ExperienceCard = ({ experiences, loading }: Props) => {
  const [tab, setTab] = useState<'academic' | 'industry'>('academic');

  const renderSkeletons = () =>
    Array.from({ length: 3 }, (_, index) => (
      <li key={index} className="relative pl-6 mb-6">
        <span className="absolute left-1 top-1.5 w-3 h-3 bg-base-300 rounded-full"></span>
        <div className="text-xs mb-0.5">
          {skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
        </div>
        <div className="text-sm font-semibold mb-0.5">
          {skeleton({ widthCls: 'w-6/12', heightCls: 'h-4' })}
        </div>
        <div className="text-sm">
          {skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        </div>
      </li>
    ));

  const sorted = [...experiences].sort(
    (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
  );
  const mostRecentKey = getExperienceKey(sorted[0]);

  const academic = experiences.filter((exp) => isAcademic(exp.company || ''));
  const industry = experiences.filter((exp) => !isAcademic(exp.company || ''));

  return (
    <div className="card shadow-lg compact bg-base-100 border border-base-300">
      <div className="card-body px-6 py-5">
        <h3 className="text-lg font-semibold text-base-content mb-4 border-b border-base-300 pb-2">
          Experience
        </h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium border ${
              tab === 'academic'
                ? 'bg-blue-100 text-blue-800 border-blue-400'
                : 'border-base-300 text-base-content'
            }`}
            onClick={() => setTab('academic')}
          >
            Academic
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium border ${
              tab === 'industry'
                ? 'bg-blue-100 text-blue-800 border-blue-400'
                : 'border-base-300 text-base-content'
            }`}
            onClick={() => setTab('industry')}
          >
            Industry
          </button>
        </div>

        {/* Experience Section */}
        {loading ? (
          <ul className="relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-2 before:w-px before:bg-base-300">
            {renderSkeletons()}
          </ul>
        ) : (
          <ExperienceSection
            items={tab === 'academic' ? academic : industry}
            mostRecentKey={mostRecentKey}
          />
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
