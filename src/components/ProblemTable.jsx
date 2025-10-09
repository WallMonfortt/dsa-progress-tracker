import { CheckCircle2, Circle, Calendar, ExternalLink } from "lucide-react";
import AddProblemModal from "./AddProblemModal";
import { useState } from "react";

const difficultyColor = {
  Easy: "text-green-600 dark:text-green-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  Hard: "text-red-600",
};

const ProblemTable = ({
  problems,
  customProblems,
  progress,
  toggleComplete,
  calculateNextReviews,
  filterCategory,
  filterDifficulty,
  showOnlyDueToday,
  searchQuery = "",
  onProblemsUpdate,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProblem = (newProblem) => {
    const problemExists = problems.some(
      problem =>
        problem.id === newProblem.id ||
        problem.name.toLowerCase() === newProblem.name.toLowerCase()
    );

    if (problemExists) {
      alert('A problem with this ID or name already exists!');
      return;
    }

    const updatedCustomProblems = [...customProblems, newProblem];
    localStorage.setItem('customProblems', JSON.stringify(updatedCustomProblems));
    if (onProblemsUpdate) {
      onProblemsUpdate(updatedCustomProblems);
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
    const isDueToday = nextReviews.some(
      (date, idx) => !prob.reviews?.[idx] && date <= today
    );
    return categoryMatch && difficultyMatch && isDueToday;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (date) => {
    return date < today;
  };

  const isDueToday = (date) => {
    return date === today;
  };

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
              const prob = progress[problem.id] || {};
              const nextReviews = calculateNextReviews(prob.solvedDate);
              return (
                <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-500">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-800">
                    {problem.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-700 dark:hover:text-blue-400 hover:text-blue-800 hover:underline flex items-center gap-1"
                        title={`Open ${problem.name} on NeetCode`}
                      >
                        {problem.name}
                        <ExternalLink size={14} className="flex-shrink-0" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-800">
                    {problem.category}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${difficultyColor[problem.difficulty]
                      }`}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleComplete(problem.id)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-800 hover:text-gray-800"
                    >
                      {prob.solved ? (
                        <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                      <span className="text-xs dark:text-gray-800">
                        {prob.solved ? "Solved" : "Not Solved"}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {prob.solved ? (
                      <div className="flex flex-wrap gap-2">
                        {nextReviews.map((date, idx) => {
                          const isCompleted = prob.reviews?.[idx];
                          const overdue = !isCompleted && isOverdue(date);
                          const dueToday = !isCompleted && isDueToday(date);

                          return (
                            <div
                              key={idx}
                              className="flex flex-col items-center"
                            >
                              <button
                                onClick={() => toggleComplete(problem.id, idx)}
                                className={`px-2 py-1 rounded text-xs dark:text-gray-200 border min-w-[60px] ${isCompleted
                                  ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-600 dark:text-green-400"
                                  : overdue
                                    ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-600 dark:text-red-400"
                                    : dueToday
                                      ? "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-600 dark:text-yellow-400"
                                      : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-600 dark:text-gray-400"
                                  }`}
                                title={`Review ${idx + 1} - Due: ${formatDate(
                                  date
                                )}`}
                              >
                                {`R${idx + 1}`}
                              </button>
                              <div
                                className={`text-xs mt-1 flex items-center gap-1 ${isCompleted
                                  ? "text-green-600 dark:text-green-400"
                                  : overdue
                                    ? "text-red-600 dark:text-red-400"
                                    : dueToday
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : "text-gray-500 dark:text-gray-800"
                                  }`}
                              >
                                <Calendar size={10} />
                                {formatDate(date)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-800">
                        Complete problem to see review schedule
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProblem}
      />
    </div>
  );
};

export default ProblemTable;
