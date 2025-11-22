import { ChevronsLeftRightEllipsis, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-100 dark:bg-gray-900 text-white dark:text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white border-b border-gray-800 dark:border-gray-400 pb-2">SDE Full Guide</h3>
            <p className="text-gray-800 dark:text-gray-400">
              Guia definitiva para convertirse en un Ingeniero de Software con un enfoque práctico y estructurado.
            </p>
            <div className="flex items-center space-x-2 text-gray-800 dark:text-gray-400">
                <ChevronsLeftRightEllipsis className="h-6 w-6" />
              <span>Hecho con ❤️ por desarrolladores para desarrolladores</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg text-gray-800 dark:text-white font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-400">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors flex items-center">Inicio</Link></li>
              <li><Link to="/patrones" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors flex items-center">Patrones de Algoritmos</Link></li>
              <li><Link to="/ruta-entrevistas" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors flex items-center">Ruta de Entrevistas</Link></li>
              <li><a href="https://github.com/WallMonfortt/dsa-progress-tracker" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors flex items-center">Código Fuente</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg text-gray-800 dark:text-white font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-400">¿Necesitas ayuda?</h4>
              <a href="mailto:j.gual.m.f@gmail.com" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contáctame</span>
              </a>
            </div>
            
            <div>
              <h4 className="text-lg text-gray-800 dark:text-white font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-400">Sígueme</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/WallMonfortt" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={24} />
                </a>
                <a href="https://x.com/MonforttWal" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="https://www.linkedin.com/in/jose-gualberto-monfortte-flores/" target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8 dark:border-gray-400"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400 space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            © {currentYear} SDE Full Guide. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

