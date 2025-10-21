import { useState, useMemo } from "react";
import AddProblemModal from "./AddProblemModal";
import { ProblemRow } from "./table";
import { isDueToday, isOverdue, calculateNextReviews } from "../utils/dateUtils";
import PaginationControls from "./table/PaginationControls";

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
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 30;

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

      if (onProblemsUpdate) {
        onProblemsUpdate(updatedCustomProblems);
      } else {
        console.warn('onProblemsUpdate is not defined');
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

  const allProblems = useMemo(() => {
    const problemsMap = new Map();

    problems.forEach(problem => {
      if (!problemsMap.has(problem.id)) {
        problemsMap.set(problem.id, { ...problem, isCustom: false });
      }
    });

    customProblems.forEach(problem => {
      problemsMap.set(problem.id, { ...problem, isCustom: true });
    });

    return Array.from(problemsMap.values());
  }, [problems, customProblems]);

  const filteredProblems = allProblems.filter((problem) => {
    const categoryMatch = filterCategory === "All" || problem.category === filterCategory;
    const difficultyMatch = filterDifficulty === "All" || problem.difficulty === filterDifficulty;
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

  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  
  const currentProblems = useMemo(() => {
    const start = (currentPage - 1) * problemsPerPage;
    const end = start + problemsPerPage;
    return filteredProblems.slice(start, end);
  }, [currentPage, filteredProblems, problemsPerPage, totalPages]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

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

      {filteredProblems.length > problemsPerPage && (
        <div className="mb-4">
          <PaginationControls
            currentPage={currentPage}
            totalItems={filteredProblems.length}
            itemsPerPage={problemsPerPage}
            totalPages={totalPages}
            onPageChange={paginate}
            onFirstPage={firstPage}
            onLastPage={lastPage}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 table-fixed w-full">
          <thead className="bg-gray-50 dark:bg-gray-600">
            <tr>
              <th className="w-12 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                #
              </th>
              <th className="w-1/4 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Name
              </th>
              <th className="w-1/6 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Category
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Difficulty
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Status
              </th>
              <th className="w-1/3 px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Reviews & Due Dates
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-400 divide-y divide-gray-200 dark:divide-gray-600">
            {currentProblems.map((problem) => {
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

      {filteredProblems.length > problemsPerPage && (
        <div className="mt-4">
          <PaginationControls
            currentPage={currentPage}
            totalItems={filteredProblems.length}
            itemsPerPage={problemsPerPage}
            totalPages={totalPages}
            onPageChange={paginate}
            onFirstPage={firstPage}
            onLastPage={lastPage}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
      )}
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
