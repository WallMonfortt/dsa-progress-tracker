import { Filter, Search, X } from "lucide-react";

const Filters = ({
  categories,
  difficulties,
  filterCategory,
  setFilterCategory,
  filterDifficulty,
  setFilterDifficulty,
  showOnlyDueToday,
  setShowOnlyDueToday,
  searchQuery,
  setSearchQuery,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <Filter size={20} className="text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Filters</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center">
      <div className="md:col-span-2">
        <label htmlFor="search-problems" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Search Problems
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            id="search-problems"
            type="text"
            placeholder="Search by problem name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />{searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Category
        </label>
        <select
          id="category"
          title="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-white">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Difficulty
        </label>
        <select
          id="difficulty"
          title="Difficulty"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff} className="bg-white">
              {diff}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 md:mt-6">
        <input
          id="due-today-checkbox"
          type="checkbox"
          title="Show Only Due Today"
          checked={showOnlyDueToday}
          onChange={() => setShowOnlyDueToday((prev) => !prev)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white dark:bg-gray-600 dark:text-white"
        />
        <label htmlFor="due-today-checkbox" className="text-sm font-medium text-gray-700 dark:text-white">
          Show pending problems
        </label>
      </div>
    </div>
  </div>
);

export default Filters;
