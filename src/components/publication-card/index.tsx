import { Fragment } from 'react';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    return Array.from({ length: publications.length || 4 }, (_, index) => (
      <div className="border-l-2 border-base-300 pl-4 ml-2" key={index}>
        <h2 className="mb-1 font-serif font-semibold text-base-content">
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-5' })}
        </h2>
        <p className="text-sm italic text-base-content opacity-60">
          {skeleton({ widthCls: 'w-1/2', heightCls: 'h-4' })}
        </p>
        <p className="text-sm text-base-content opacity-50">
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        </p>
      </div>
    ));
  };

  const renderPublications = () => {
    return publications.map((item, index) => (
      <a
        key={index}
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="block border-l-2 border-base-300 pl-4 ml-2 mb-4 hover:bg-base-200 transition-all duration-200 rounded-md"
      >
        <h2 className="font-semibold font-serif text-base-content text-sm mb-1">
          {item.title}
        </h2>

        {(item.conferenceName || item.journalName) && (
          <p className="italic text-sm text-base-content opacity-80 mb-1">
            {item.conferenceName || item.journalName}
          </p>
        )}

        {item.authors && (
          <p className="text-sm text-base-content opacity-60">
            Author: {item.authors}
          </p>
        )}

        {item.description && (
          <p className="text-sm text-base-content opacity-50 mt-1">
            {item.description}
          </p>
        )}
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card compact bg-base-100 shadow-md border border-base-300">
          <div className="card-body px-6 py-5">
            <h3 className="text-lg font-semibold text-base-content mb-3 border-b border-base-300 pb-2">
              {loading ? (
                skeleton({ widthCls: 'w-40', heightCls: 'h-6' })
              ) : (
                'Publications'
              )}
            </h3>
            <div className="flex flex-col gap-3">
              {loading ? renderSkeleton() : renderPublications()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublicationCard;
