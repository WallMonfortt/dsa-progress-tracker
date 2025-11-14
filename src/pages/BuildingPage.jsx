// src/pages/BuildingPage.jsx
import { Wrench, Code, Rocket, Zap, Clock, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BuildingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño retraso para activar las animaciones después del montaje
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'En construcción',
      description: 'Estamos trabajando duro para traerte una experiencia increíble',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Próximamente',
      description: 'Características emocionantes en camino',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Mantente atento',
      description: 'Sorpresas geniales están por venir',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <div 
        className={`max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full mb-8 mx-auto animate-pulse">
          <Code className="w-12 h-12 text-blue-600 dark:text-blue-300" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeIn">
          ¡Estamos en Construcción!
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fadeIn">
          Estamos trabajando arduamente para ofrecerte una experiencia increíble. Mientras tanto, puedes explorar lo que ya tenemos disponible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`
              }}
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Clock className="w-5 h-5" />
            Volver al inicio
          </Link>
          <a
            href="mailto:contacto@ejemplo.com"
            className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contáctanos
          </a>
        </div>
      </div>

      <p 
        className="mt-12 text-gray-500 dark:text-gray-400 text-center animate-fadeIn" 
        style={{ animationDelay: '0.8s' }}
      >
        © {new Date().getFullYear()} NeetCode Tracker. Todos los derechos reservados.
      </p>
    </div>
  );
};

export default BuildingPage;