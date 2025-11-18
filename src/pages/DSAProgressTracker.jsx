import { useState } from "react";
import { ExternalLink, Map, Info, ChevronDown } from "lucide-react";
import {
  Filters,
  StatsCard,
  ProblemTable,
  ExportImportControls,
} from "../components";
import { Explanation } from "../components/sections/Explanation";
import useProblems from "../hooks/useProblems";

const DSAProgressTracker = () => {
  const { 
    allProblems, 
    progress, 
    setProgress, 
    customProblems, 
    setCustomProblems, 
    toggleComplete, 
    categories, 
    difficulties, 
    stats, 
    getDueProblems, 
    isProblemDue 
  } = useProblems();

  const [filterCategory, setFilterCategory] = useState("Todos");
  const [filterDifficulty, setFilterDifficulty] = useState("Todos");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-4 transition-colors dark:bg-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
                Seguimiento de progreso DSA - NeetCode 150
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Rastrea tu progreso con repetición espaciada
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://neetcode.io/roadmap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg  hover:bg-orange-700 transition-colors"
                title="Ver el roadmap oficial de NeetCode"
              >
                <Map size={16} />
                Roadmap Oficial
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm dark:text-blue-400 dark:hover:text-blue-300 group"
            >
              <span className="flex items-center gap-1">
                <Info size={16} />
                {showExplanation ? "Ocultar" : "Mostrar"} Información de Repetición Espaciada
              </span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        {showExplanation && <Explanation /> }

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-700 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatsCard
              color="blue"
              value={`${stats.solved}/${stats.total}`}
              label="Total Resueltos"
            />
            <StatsCard color="green" value={stats.easy} label="Fácil" />
            <StatsCard color="yellow" value={stats.medium} label="Medio" />
            <StatsCard color="red" value={stats.hard} label="Difícil" />
            <StatsCard
              color="purple"
              value={getDueProblems()}
              label="Pendientes Hoy"
            />
          </div>
        </div>

        {/* Export / Import / Clear */}
        <ExportImportControls
          progress={progress}
          setProgress={setProgress}
          customProblems={customProblems}
          setCustomProblems={setCustomProblems}
        />

        {/* Filters */}
        <Filters
          categories={categories}
          difficulties={difficulties}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
          setShowOnlyDueToday={setShowOnlyDueToday}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Problems Table */}
        <ProblemTable
          problems={allProblems}
          customProblems={customProblems}
          progress={progress}
          toggleComplete={toggleComplete}
          isProblemDue={isProblemDue}
          filterCategory={filterCategory}
          filterDifficulty={filterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
          searchQuery={searchQuery}
          onProblemsUpdate={setCustomProblems}
        />
      </div>
    </div>
  );
};

export default DSAProgressTracker;
