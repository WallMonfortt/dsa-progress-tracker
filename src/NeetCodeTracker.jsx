import React, { useState } from "react";
import problemsData from "./problems.json";
import StatsCard from "./StatsCard";
import Filters from "./Filters";
import ProblemTable from "./ProblemTable";
import ExportImportControls from "./ExportImportControls";
import { Info } from "lucide-react";

// --- Spaced repetition intervals ---
const intervals = [1, 3, 7, 14, 30];

const NeetCodeTracker = () => {
  // --- Local state ---
  const [progress, setProgress] = useState({});
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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
        return {
          ...prev,
          [problemId]: {
            ...current,
            solved: newSolved,
            solvedDate: newSolved ? todayStr : null,
            reviews: newSolved ? current.reviews : Array(5).fill(false),
            dates: newSolved ? { ...current.dates, initial: todayStr } : {},
          },
        };
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
    ...Array.from(new Set(problemsData.map((p) => p.category))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const stats = {
    total: problemsData.length,
    solved: Object.values(progress).filter((p) => p.solved).length,
    easy: problemsData.filter(
      (p) => p.difficulty === "Easy" && progress[p.id]?.solved
    ).length,
    medium: problemsData.filter(
      (p) => p.difficulty === "Medium" && progress[p.id]?.solved
    ).length,
    hard: problemsData.filter(
      (p) => p.difficulty === "Hard" && progress[p.id]?.solved
    ).length,
  };

  const getDueProblems = () => {
    return problemsData.filter((problem) => {
      const prob = progress[problem.id];
      if (!prob || !prob.solved) return false;
      const nextReviews = calculateNextReviews(prob.solvedDate);
      return nextReviews.some(
        (date, idx) => !prob.reviews?.[idx] && date <= today
      );
    }).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            NeetCode 150 Tracker
          </h1>
          <p className="text-gray-600 mb-4">
            Track your progress with spaced repetition
          </p>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <Info size={16} />
            {showExplanation ? "Hide" : "Show"} Spaced Repetition Info
          </button>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              How Spaced Repetition Works
            </h3>
            <div className="text-blue-700 space-y-2">
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
        <ExportImportControls progress={progress} setProgress={setProgress} />

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
        />

        {/* Problems Table */}
        <ProblemTable
          problems={problemsData}
          progress={progress}
          toggleComplete={toggleComplete}
          calculateNextReviews={calculateNextReviews}
          filterCategory={filterCategory}
          filterDifficulty={filterDifficulty}
          showOnlyDueToday={showOnlyDueToday}
        />
      </div>
    </div>
  );
};

export default NeetCodeTracker;
