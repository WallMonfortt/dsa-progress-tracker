import { useState, useEffect } from "react";
import { Info, ExternalLink, Map } from "lucide-react";
import {
  Filters,
  StatsCard,
  ProblemTable,
  ExportImportControls,
} from "../components";
import { problems } from "../data";



// --- Spaced repetition intervals ---
const intervals = [1, 3, 7, 14, 30, 60];

const NeetCodeTracker = () => {
  // --- Local state with localStorage ---
  const [progress, setProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem("neetcode-progress");
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
      console.error("Error loading progress from localStorage:", error);
      return {};
    }
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customProblems, setCustomProblems] = useState(() => {
    try {
      const saved = localStorage.getItem('customProblems');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading custom problems:", error);
      return [];
    }
  });

  console.log('NeetCodeTracker render - customProblems:', customProblems.length);
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Loading from localStorage - customProblems:', savedCustomProblems ? JSON.parse(savedCustomProblems).length : 0)
      const savedProgress = localStorage.getItem('neetcode-progress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }

      const savedCustomProblems = localStorage.getItem('customProblems');
      if (savedCustomProblems) {
        setCustomProblems(JSON.parse(savedCustomProblems));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('neetcode-progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem('customProblems', JSON.stringify(customProblems));
    } catch (error) {
      console.error('Error saving custom problems:', error);
    }
  }, [customProblems]);

  // --- Helpers ---
  const today = new Date().toISOString().split("T")[0];

  const calculateNextReviews = (solvedDate) => {
    if (!solvedDate) return [];
    const date = new Date(solvedDate);
    return intervals.map(
      (days) =>
        new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    );
  };

  const toggleComplete = (problemId, reviewIndex = null) => {
    const todayStr = new Date().toISOString().split("T")[0];
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
              solvedDate: todayStr,
              reviews: Array(5).fill(false),
              dates: { ...current.dates, initial: todayStr },
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
          newDates[`review${reviewIndex + 1}`] = todayStr;
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

  const categories = [
    "All",
    ...Array.from(new Set(problems.map((p) => p.category))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const stats = {
    total: problems.length,
    solved: Object.values(progress).filter((p) => p.solved).length,
    easy: problems.filter(
      (p) => p.difficulty === "Easy" && progress[p.id]?.solved
    ).length,
    medium: problems.filter(
      (p) => p.difficulty === "Medium" && progress[p.id]?.solved
    ).length,
    hard: problems.filter(
      (p) => p.difficulty === "Hard" && progress[p.id]?.solved
    ).length,
  };

  const getDueProblems = () => {
    return problems.filter((problem) => {
      const prob = progress[problem.id];
      if (!prob || !prob.solved) return false;
      const nextReviews = calculateNextReviews(prob.solvedDate);
      return nextReviews.some(
        (date, idx) => !prob.reviews?.[idx] && date <= today
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
                CodeTrack Pro - NeetCode 150 Progress Tracker
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
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Info size={16} />
              {showExplanation ? "Hide" : "Show"} Spaced Repetition Info
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 dark:bg-gray-800 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-400">
              How Spaced Repetition Works
            </h3>
            <div className="text-blue-700 space-y-2 dark:text-blue-400">
              <p>
                This tracker uses spaced repetition to help you retain coding
                problems long-term.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Review Schedule:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>R1:</strong> Review after 1 day
                    </li>
                    <li>
                      <strong>R2:</strong> Review after 3 days
                    </li>
                    <li>
                      <strong>R3:</strong> Review after 7 days (1 week)
                    </li>
                    <li>
                      <strong>R4:</strong> Review after 14 days (2 weeks)
                    </li>
                    <li>
                      <strong>R5:</strong> Review after 30 days (1 month)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How to Use:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>1. Mark a problem as solved when you complete it</li>
                    <li>2. Review buttons (R1-R5) will show required dates</li>
                    <li>
                      3. Click review buttons when you successfully review
                    </li>
                    <li>4. Use "Due Today" filter to see what needs review</li>
                    <li>5. Check the Official Roadmap for study guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

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

export default NeetCodeTracker;
