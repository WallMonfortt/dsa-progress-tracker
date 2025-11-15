import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => (
  <nav className="bg-blue-100 dark:bg-gray-800 shadow pb-4 pt-4 transition-colors duration-200">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
        <Link to="/" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <Home className="w-6 h-6" />
        </Link>
          <Link to="/mainRoadmap" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Roadmap
          </Link>
          <Link to="/building" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Cheetsheets
          </Link>
          <Link to="/building" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            About
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/tools" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Tools
          </Link>
          <div className="flex items-center">
          <ThemeToggleButton />
        </div>
        </div>
        
      </div>
    </div>
  </nav>
);

export default Navbar;
