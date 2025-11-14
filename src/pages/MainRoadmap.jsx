import { Link } from "react-router-dom";
import { Code, BookOpen, Cpu, Database, Cloud, Server, Lock, GitBranch, Terminal, BarChart2, CpuIcon, Globe, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { topics } from "../data";

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
}

const MainRoadmap = () => {

  const coreTopics = [
    { name: "Git y Control de Versiones", icon: <GitBranch className="w-5 h-5" /> },
    { name: "Línea de Comandos", icon: <Terminal className="w-5 h-5" /> },
    { name: "Estructuras de Datos", icon: <CpuIcon className="w-5 h-5" /> },
    { name: "Algoritmos", icon: <BarChart2 className="w-5 h-5" /> },
    { name: "Patrones de Diseño", icon: <Zap className="w-5 h-5" /> },
    { name: "Seguridad Informática", icon: <Lock className="w-5 h-5" /> },
    { name: "Arquitectura de Software", icon: <Code className="w-5 h-5" /> },
    { name: "Testing", icon: <CheckCircle className="w-5 h-5" /> }
  ];

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

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BookOpen className="mr-2" />
            El camino de aprendizaje
          </h2>
          <div className="relative">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {topics.map((topic, index) => (
                <div className="relative h-full flex flex-col">
                  <Link
                    to={topic.url}
                    className={`${topic.color} ${topic.textColor} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1 flex flex-col h-full`}
                  >
                    {/* Icon and Title */}
                    <div className="flex items-center mb-4 min-h-[72px]">
                      <div className={`p-2 rounded-lg ${topic.color} ${topic.textColor} mr-4`}>
                        {icons[topic.title]}
                      </div>
                      <h3 className="text-xl font-semibold leading-tight">{topic.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                      {topic.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="w-full bg-gray-600 dark:bg-gray-400 rounded-full h-2.5 mb-2">
                        <div
                          className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="text-right text-sm mt-1 text-gray-600 dark:text-gray-400">
                        0% completado
                      </div>
                    </div>
                  </Link>
                  
                  {/* Flecha  */}
                  {index < topics.length - 1 && (
                    <div className="hidden sm:flex items-center justify-center absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Topics */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Temas Esenciales
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {coreTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="text-blue-500 mr-3">{topic.icon}</span>
                  <span className="text-gray-800 dark:text-gray-200">{topic.name}</span>
                </div>
              ))}
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
    </div>
  );
};

export default MainRoadmap;