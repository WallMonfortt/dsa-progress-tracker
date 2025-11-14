import { Link } from "react-router-dom";
import { Code, BookOpen, Cpu, Database, Cloud, Server, Lock as LockIcon, GitBranch, Terminal, BarChart2, CpuIcon, Globe, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { topics } from "../data";
import { useState, useEffect } from "react";

const icons = {
  "Fundamentos de Programación": <Code className="w-8 h-8" />,
  "Estructuras de Datos y Algoritmos": <Cpu className="w-8 h-8" />,
  "Clean Code principiantes": <Code className="w-8 h-8" />,
  "Principios SOLID": <Code className="w-8 h-8" />,
  "Paradigmas de Programación": <Code className="w-8 h-8" />,
  "Git": <Code className="w-8 h-8" />,
  "Testing": <Code className="w-8 h-8" />,
  "Entrevistas Técnicas": <Code className="w-8 h-8" />,
  "Desarrollo Web Frontend": <Globe className="w-8 h-8" />,
  "Backend y APIs": <Server className="w-8 h-8" />,
  "Bases de Datos": <Database className="w-8 h-8" />,
  "DevOps y Cloud": <Cloud className="w-8 h-8" />
};

const MainRoadmap = () => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem('topicsProgress')) || {};
    const initialProgress = {};
    
    topics.forEach((topic, index) => {
      initialProgress[topic.title] = storedProgress[topic.title] !== undefined 
        ? storedProgress[topic.title] 
        : index === 0 ? 0 : -1;
    });
    
    setProgress(initialProgress);
  }, []);

  useEffect(() => {
    localStorage.setItem('topicsProgress', JSON.stringify(progress));
  }, [progress]);

  const isUnlocked = (index) => {
    if (index === 0) return true;
    const prevTopic = topics[index - 1];
    return progress[prevTopic?.title] === 100;
  };

  const renderTopicCard = (topic, index) => {
    const unlocked = isUnlocked(index);
    const currentProgress = progress[topic.title] || 0;

    if (!unlocked) {
      return (
        <div key={index} className="relative h-full flex flex-col opacity-60">
          <div className={`${topic.color.replace('bg-', 'bg-opacity-30 bg-')} ${topic.textColor} rounded-lg p-6 shadow-md flex flex-col h-full`}>
            <div className="flex items-center mb-4 min-h-[72px]">
              <div className={`p-2 rounded-lg ${topic.color} ${topic.textColor} mr-4`}>
                {icons[topic.title]}
              </div>
              <h3 className="text-xl font-semibold leading-tight">{topic.title}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
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
      <div key={index} className="relative h-full flex flex-col">
        <Link
          to={topic.url}
          className={`${topic.color} ${topic.textColor} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 flex flex-col h-full`}
        >
          <div className="flex items-center mb-4 min-h-[72px]">
            <div className={`p-2 rounded-lg ${topic.color} ${topic.textColor} mr-4`}>
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
                className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              {currentProgress}% completado
            </div>
          </div>
        </Link>

        {index < topics.length - 1 && (
          <div className="hidden sm:flex items-center justify-center absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600">
            <ChevronRight className="w-8 h-8" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ruta de Aprendizaje
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Guía completa para convertirte en un ingeniero de software
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="mr-2" />
            Temas
          </h2>
          <div className="relative">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {topics.map((topic, index) => renderTopicCard(topic, index))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRoadmap;