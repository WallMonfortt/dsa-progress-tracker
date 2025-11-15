import { Link } from 'react-router-dom';
import { Code, LayoutDashboard, BookOpen, BarChart2 } from 'lucide-react';

const tools = [
  {
    id: 'dsa-progress',
    title: 'DSA Progress Tracker',
    description: 'Sigue tu progreso en la resolución de problemas de estructuras de datos y algoritmos',
    icon: <Code className="w-6 h-6 text-blue-500" />,
    path: '/tools/dsa-progress',
    comingSoon: false
  },
  {
    id: 'study-planner',
    title: 'Study Planner',
    description: 'Planifica tus sesiones de estudio y haz un seguimiento de tu progreso',
    icon: <BookOpen className="w-6 h-6 text-green-500" />,
    path: '#',
    comingSoon: true
  },
  {
    id: 'code-challenges',
    title: 'Code Challenges',
    description: 'Desafíos de programación para practicar y mejorar tus habilidades',
    icon: <LayoutDashboard className="w-6 h-6 text-purple-500" />,
    path: '#',
    comingSoon: true
  },
  {
    id: 'progress-analytics',
    title: 'Progress Analytics',
    description: 'Visualiza tus estadísticas y métricas de aprendizaje',
    icon: <BarChart2 className="w-6 h-6 text-yellow-500" />,
    path: '#',
    comingSoon: true
  }
];

const ToolCard = ({ tool }) => {
  const CardContent = () => (
    <div className={`p-6 rounded-lg border dark:border-gray-700 transition-all transform hover:scale-[1.02] ${
      tool.comingSoon 
        ? 'opacity-70 cursor-not-allowed' 
        : 'hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700'
    }`}>
      <div className="flex items-start">
        <div className="p-3 bg-blue-50 dark:bg-gray-800 rounded-lg mr-4">
          {tool.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {tool.title}
            {tool.comingSoon && (
              <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full">
                Próximamente
              </span>
            )}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {tool.description}
          </p>
        </div>
        {!tool.comingSoon && (
          <div className="ml-4 text-blue-500 dark:text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return tool.comingSoon ? (
    <div>
      <CardContent />
    </div>
  ) : (
    <Link to={tool.path} className="block">
      <CardContent />
    </Link>
  );
};

const ToolsList = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
            Herramientas de Estudio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Recursos para potenciar tu aprendizaje y seguimiento de progreso
          </p>
        </div>

        <div className="space-y-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            ¿Tienes ideas para nuevas herramientas?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Estamos constantemente desarrollando nuevas funcionalidades. ¡Déjanos saber qué te gustaría ver!
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Sugerir herramienta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsList;