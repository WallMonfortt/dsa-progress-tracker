import { Link } from 'react-router-dom';
import { StartNowBtn } from '../components';
import { Code, BookOpen, BarChart2, Target, Clock, CheckCircle } from 'lucide-react';

const Home = () => {
  const stats = [
  { 
    value: '30 min/día', 
    label: 'De práctica constante' 
  },
  { 
    value: '100%', 
    label: 'Enfoque práctico' 
  },
  { 
    value: '3 meses', 
    label: 'Para dominar cada concepto' 
  },
  { 
    value: '100%', 
    label: 'Gratuito' 
  }
];

  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: 'Compendio de problemas',
      description: 'Un compendio de problemas para que puedas practicar y dominar los conceptos de programación.'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: 'Recursos para aprender',
      description: 'Hemos seleccionado los mejores recursos para que puedas aprender a programar de manera efectiva.'
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: 'Seguimiento y monitorización de progreso',
      description: 'Mantén un registro de tu estudio asi como las fechas de repeticion para que puedas mantener un ritmo constante.'
    }
  ];

  const roadmapPaths = [
    {
      title: 'Fundamentos',
      href: '/fundamentos',
      description: 'Domina los fundamentos de programación.',
      color: 'from-green-400 to-blue-500',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Paradigmas',
      href: '/paradigmas',
      description: 'Aprende los paradigmas de programación.',
      color: 'from-yellow-400 to-orange-500',
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Entrevistas',
      href: '/entrevistas',
      description: 'Prepara tus entrevistas con empresas de tecnología.',
      color: 'from-red-400 to-pink-500',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Guia definitiva para convertirse en un <br /> <span className="text-blue-600 dark:text-blue-400">Ingeniero de Software</span></h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Un plan de estudio estructurado para ayudarte a alcanzar tus metas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StartNowBtn />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">¿Que ofrecemos?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Paths */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Elige tu camino de aprendizaje</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {roadmapPaths.map((path, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${path.color} p-0.5 rounded-xl`}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl h-full">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4">
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{path.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>
                  <Link 
                    to={path.href}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                  >
                    Ver tema
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de desarrolladores que están mejorando sus habilidades de programación.
          </p>
          <StartNowBtn />
        </div>
      </section>
    </div>
  );
};

export default Home;
