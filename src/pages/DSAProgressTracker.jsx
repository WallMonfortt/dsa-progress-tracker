import { useState } from "react";
import { ExternalLink, Map, Info, ChevronDown } from "lucide-react";
import {
  Filters,
  StatsCard,
  ProblemTable,
  ExportImportControls,
} from "../components";
import { Explanation } from "../components/sections/Explanation";
import { problems } from "../data";
import { calculateNextReviews, getToday } from "../utils/dateUtils";
import useLocalStorage from "../hooks/useLocalStorage";

const DSAProgressTracker = () => {
  const [progress, setProgress] = useLocalStorage("neetcode-progress", {});
  const [customProblems, setCustomProblems] = useLocalStorage("custom-problems", []);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const today = getToday();

  const toggleComplete = (problemId, reviewIndex = null) => {
    setProgress((prev) => {
      const current = prev[problemId] || {
        solved: false,
        reviews: Array(5).fill(false),
        dates: {},
      };

      if (reviewIndex === null) {
        const newSolved = !current.solved;
        if (newSolved) {
          return {
            ...prev,
            [problemId]: {
              ...current,
              solved: true,
              solvedDate: today,
              reviews: Array(5).fill(false),
              dates: { ...current.dates, initial: today },
            },
          };
        } else {
          const newProgress = { ...prev };
          delete newProgress[problemId];
          return newProgress;
        }
      } else {
        const newReviews = [...current.reviews];
        newReviews[reviewIndex] = !newReviews[reviewIndex];
        const newDates = { ...current.dates };
        if (newReviews[reviewIndex]) {
          newDates[`review${reviewIndex + 1}`] = today;
        } else {
          delete newDates[`review${reviewIndex + 1}`];
        }
        return {
          ...prev,
          [problemId]: { ...current, reviews: newReviews, dates: newDates },
        };
      }
    });
  };

  const allProblems = [...problems, ...customProblems];
  const categories = [
    "All",
    ...Array.from(new Set([
      ...problems.map((p) => p.category),
      ...customProblems.map((p) => p.category)
    ])).filter(Boolean),
  ];
  
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  
  const isProblemSolved = (problemId) => {
    const progressItem = progress[problemId];
    return progressItem && progressItem.solved === true;
  };

  const stats = {
    total: allProblems.length,
    solved: allProblems.filter(p => isProblemSolved(p.id)).length,
    easy: allProblems.filter(
      (p) => p.difficulty === "Easy" && isProblemSolved(p.id)
    ).length,
    medium: allProblems.filter(
      (p) => p.difficulty === "Medium" && isProblemSolved(p.id)
    ).length,
    hard: allProblems.filter(
      (p) => p.difficulty === "Hard" && isProblemSolved(p.id)
    ).length,
  };

  const getDueProblems = () => {
    return allProblems.filter((problem) => {
      const prob = progress[problem.id];
      if (!prob || !prob.solved) return false;
      const nextReviews = calculateNextReviews(prob.solvedDate);
      return nextReviews.some(
        (date, idx) => {
          return !prob.reviews?.[idx] && date <= today
        }
      );
    }).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 transition-colors dark:bg-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
                DSA progress tracker - NeetCode 150
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress with spaced repetition
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="https://neetcode.io/roadmap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg  hover:bg-orange-700 transition-colors"
                title="View the official NeetCode roadmap"
              >
                <Map size={16} />
                Official Roadmap
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
                {showExplanation ? "Hide" : "Show"} Spaced Repetition Info
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
              label="Total Solved"
            />
            <StatsCard color="green" value={stats.easy} label="Easy" />
            <StatsCard color="yellow" value={stats.medium} label="Medium" />
            <StatsCard color="red" value={stats.hard} label="Hard" />
            <StatsCard
              color="purple"
              value={getDueProblems()}
              label="Due Today"
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
          problems={problems}
          customProblems={customProblems}
          progress={progress}
          toggleComplete={toggleComplete}
          calculateNextReviews={calculateNextReviews}
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
