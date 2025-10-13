import { useState } from "react";
import AddProblemModal from "./AddProblemModal";
import { ProblemRow } from "./table";
import { isDueToday, isOverdue, calculateNextReviews } from "../utils/dateUtils";

const ProblemTable = ({
  problems,
  customProblems,
  progress,
  toggleComplete,
  filterCategory,
  filterDifficulty,
  showOnlyDueToday,
  searchQuery = "",
  onProblemsUpdate,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleAddProblem = (newProblem) => {
    try {
      const newName = newProblem.name.toLowerCase().trim();
      const newId = newProblem.id || `c-${btoa(Date.now()).slice(0, -2)}`;

      const allProblems = [...problems, ...customProblems];
      const problemExists = allProblems.some(problem =>
        String(problem.id) === newId ||
        problem.name.toLowerCase().trim() === newName
      );

      if (problemExists) {
        return {
          success: false,
          message: '❌ A problem with this ID or name already exists'
        };
      }

      const problemToAdd = {
        ...newProblem,
        id: newId,
        category: newProblem.category || "Custom",
        difficulty: newProblem.difficulty || "Medium",
        url: newProblem.url || "#"
      };

      const updatedCustomProblems = [...customProblems, problemToAdd];
      localStorage.setItem('customProblems', JSON.stringify(updatedCustomProblems));

      if (onProblemsUpdate) {
        onProblemsUpdate(updatedCustomProblems);
      }

      return { success: true };
    } catch (error) {
      console.error('Error adding problem:', error);
      return {
        success: false,
        message: '❌ An error occurred while adding the problem'
      };
    }
  };

  const filteredProblems = [...problems, ...customProblems].filter((problem) => {
    const categoryMatch =
      filterCategory === "All" || problem.category === filterCategory;
    const difficultyMatch =
      filterDifficulty === "All" || problem.difficulty === filterDifficulty;

    // Search in both name and ID (partial match)
    const searchMatch = !searchQuery ||
      (problem.name && problem.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (problem.id && problem.id.toString().toLowerCase().includes(searchQuery.toLowerCase()));

    if (!showOnlyDueToday) return categoryMatch && difficultyMatch && searchMatch;

    const prob = progress[problem.id];
    if (!prob || !prob.solved) return false;
    
    const nextReviews = calculateNextReviews(prob.solvedDate);
    const filterIsDueToday = nextReviews.some(
      (date, idx) => (isDueToday(date) || isOverdue(date)) && !prob.reviews?.[idx] 
    );
    return categoryMatch && difficultyMatch && filterIsDueToday;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Problems</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
        >
          <span className="text-lg">+</span> Add Problem
        </button>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Reviews & Due Dates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-400 divide-y divide-gray-200 dark:divide-gray-600">
            {filteredProblems.map((problem) => {
              return (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  progress={progress}
                  toggleComplete={toggleComplete}
                  calculateNextReviews={calculateNextReviews}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalError('');
          setIsModalOpen(false);
        }}
        onAdd={handleAddProblem}
        error={modalError}
        onError={setModalError}
      />
    </div>
  );
};

export default ProblemTable;
