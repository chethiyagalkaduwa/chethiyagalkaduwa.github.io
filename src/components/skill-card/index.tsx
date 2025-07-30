import {
  FaPython,
  FaReact,
  FaGitAlt,
  FaNodeJs,
} from 'react-icons/fa';

import {
  SiDjango,
  SiJavascript,
  SiCss3,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiVisualstudiocode,
  SiJupyter,
  SiGooglecolab,
} from 'react-icons/si';

interface Props {
  loading: boolean;
  skills: string[];
}

const iconMap: Record<string, JSX.Element> = {
  Python: <FaPython />,
  Django: <SiDjango />,
  JavaScript: <SiJavascript />,
  'React.js': <FaReact />,
  'Node.js': <FaNodeJs />,
  Git: <FaGitAlt />,
  CSS: <SiCss3 />,
  Tensorflow: <SiTensorflow />,
  Pytorch: <SiPytorch />,
  OpenCV: <SiOpencv />,
  Jupyter: <SiJupyter />,
  'VS Code': <SiVisualstudiocode />,
  'Google Collab': <SiGooglecolab />,
};

const SkillCard = ({ loading, skills }: Props) => {
  const renderSkeleton = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <div
        key={index}
        className="h-6 bg-base-200 animate-pulse rounded w-full"
      ></div>
    ));
  };

  return (
    <div className="card shadow-md bg-base-100 border border-base-300 rounded-box transition-all duration-300">
      <div className="card-body px-6 py-5">
        <h3 className="text-lg font-semibold text-base-content mb-3 border-b border-base-300 pb-2">
          Technical Proficiencies
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {loading
            ? renderSkeleton()
            : skills.map((skillName, index) => {
                const icon = iconMap[skillName] || null;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-base-200 px-3 py-2 rounded-lg text-sm font-medium text-base-content shadow-sm hover:bg-base-300 transition-all"
                  >
                    {icon && <span className="text-xl">{icon}</span>}
                    <span>{skillName}</span>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
