import { skeleton } from '../../utils';

const ResearchCard = ({
  loading,
  research,
}: {
  loading: boolean;
  research: string[];
}) => {
  const renderSkeleton = () => {
    return Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="mb-2">
        {skeleton({ widthCls: 'w-32', heightCls: 'h-5' })}
      </div>
    ));
  };

  return (
    <div className="card shadow-md bg-base-100 border border-base-300 rounded-box transition-all duration-300">
      <div className="card-body px-6 py-5">
        <h3 className="text-lg font-semibold text-base-content mb-3 border-b border-base-300 pb-2">
          {loading ? (
            skeleton({ widthCls: 'w-48', heightCls: 'h-6' })
          ) : (
            'Research Focus Areas'
          )}
        </h3>

        <div className="space-y-2">
          {loading
            ? renderSkeleton()
            : research.map((item, index) => (
                <p
                  key={index}
                  className="text-base text-base-content font-light tracking-wide"
                >
                  • {item}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
