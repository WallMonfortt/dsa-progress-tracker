import { Code, BookOpen, Cpu, Database, Cloud, Server, GitBranch, Terminal, Globe, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { topics } from "../data";
import { useState, useEffect } from "react";
import TopicCard from "../components/TopicCard";

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
    const currentProgress = progress[topic.title] || 100;

    return (
      <TopicCard
        key={index}
        topic={topic}
        isUnlocked={unlocked}
        progress={currentProgress}
        index={index}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Ruta de Aprendizaje</span>
            <span className="block text-blue-600 dark:text-blue-400">Ingeniería de Software</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
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
      {/* Coming Soon */}
      <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Próximamente
            </h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              <p>Estamos trabajando en agregar más rutas de aprendizaje y contenido detallado para cada tema.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRoadmap;