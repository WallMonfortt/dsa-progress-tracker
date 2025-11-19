import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Página no encontrada</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;