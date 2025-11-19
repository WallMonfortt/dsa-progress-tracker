import { Link } from "react-router-dom";
import { Lock as LockIcon, Code, BookOpen, Cpu, Database, Cloud, Server, GitBranch, Terminal, Globe, Zap, CheckCircle } from "lucide-react";

const icons = {
  "Fundamentos de Programación": <Code className="w-8 h-8" />,
  "Estructuras de Datos y Algoritmos": <Cpu className="w-8 h-8" />,
  "Clean Code principiantes": <Zap className="w-8 h-8" />,
  "Principios SOLID": <CheckCircle className="w-8 h-8" />,
  "Paradigmas de Programación": <Code className="w-8 h-8" />,
  "Git": <GitBranch className="w-8 h-8" />,
  "Testing": <Terminal className="w-8 h-8" />,
  "Entrevistas Técnicas": <BookOpen className="w-8 h-8" />,
  "Desarrollo Web Frontend": <Globe className="w-8 h-8" />,
  "Backend y APIs": <Server className="w-8 h-8" />,
  "Bases de Datos": <Database className="w-8 h-8" />,
  "DevOps y Cloud": <Cloud className="w-8 h-8" />
};

const TopicCard = ({ topic, isUnlocked, progress = 0, index }) => {
  const currentProgress = progress || 0;

  if (!isUnlocked) {
    return (
      <div className="relative h-full flex flex-col opacity-60">
        <div className={'bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-gray-800 rounded-lg p-6 shadow-md flex flex-col h-full'}>
          <div className="flex items-center mb-4 min-h-[72px]">
            <div className={`p-2 rounded-lg ${topic.color} ${topic.textColor} mr-4`}>
              {icons[topic.title]}
            </div>
            <h3 className="text-xl font-semibold leading-tight">{topic.title}</h3>
          </div>
          <p className="text-gray-900 dark:text-gray-300 mb-6 flex-grow">
            {topic.description}
          </p>
          <div className="text-center py-4">
            <LockIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Completa el tema anterior para desbloquear</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      <Link
        to={topic.url}
        className={'bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 flex flex-col h-full'}
      >
        <div className="flex items-center mb-4 min-h-[72px]">
          <div className={`p-2 rounded-lg mr-4`}>
            {icons[topic.title]}
          </div>
          <h3 className="text-xl font-semibold leading-tight">{topic.title}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
          {topic.description}
        </p>
        <div className="mt-auto">
          <div className="w-full bg-gray-600 dark:bg-gray-400 rounded-full h-2.5 mb-2">
            <div
              className="bg-green-200 dark:bg-green-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-600 dark:text-gray-200">
            {currentProgress}% completado
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TopicCard;
