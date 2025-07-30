import { Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import { MdInsertLink } from 'react-icons/md';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  username,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  username: string;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) return;

  const renderSkeleton = () => {
    return Array.from({ length: limit }, (_, index) => (
      <div key={index} className="border-l-2 border-base-300 pl-4 ml-2 mb-4">
        <h5 className="text-base-content font-serif font-semibold">
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-5' })}
        </h5>
        <p className="text-sm opacity-60 mt-1">
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        </p>
        <div className="flex items-center text-sm gap-4 mt-2">
          {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
          {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
          {skeleton({ widthCls: 'w-12', heightCls: 'h-4' })}
        </div>
      </div>
    ));
  };

  const renderProjects = () => {
    return githubProjects.map((item, index) => (
      <a
        key={index}
        href={item.html_url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          e.preventDefault();
          if (googleAnalyticsId) {
            try {
              ga.event('Click project', { project: item.name });
            } catch (error) {
              console.error(error);
            }
          }
          window?.open(item.html_url, '_blank');
        }}
        className="block border-l-2 border-base-300 pl-4 ml-2 mb-4 hover:bg-base-200 rounded-md transition duration-200"
      >
        <h5 className="text-base-content font-serif font-semibold text-sm flex items-center gap-2 mb-1">
          <MdInsertLink className="opacity-60" />
          <span>{item.name}</span>
        </h5>
        {item.description && (
          <p className="text-sm text-base-content opacity-70 font-light mb-2">
            {item.description}
          </p>
        )}
        <div className="flex text-sm text-base-content opacity-60 gap-4">
          <span className="flex items-center gap-1">
            <AiOutlineStar /> {item.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <AiOutlineFork /> {item.forks_count}
          </span>
          <span className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(item.language) }}
            />
            {item.language}
          </span>
        </div>
      </a>
    ));
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="card compact bg-base-100 shadow-md border border-base-300">
          <div className="card-body px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-base-content">
                {loading
                  ? skeleton({ widthCls: 'w-40', heightCls: 'h-6' })
                  : header}
              </h3>
              {!loading && (
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-base-content opacity-50 hover:underline"
                >
                  See All
                </a>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
