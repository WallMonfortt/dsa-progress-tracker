import React from "react";
import { Filter } from "lucide-react";

const Filters = ({
  categories,
  difficulties,
  filterCategory,
  setFilterCategory,
  filterDifficulty,
  setFilterDifficulty,
  showOnlyDueToday,
  setShowOnlyDueToday,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <Filter size={20} className="text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-800">
        Filters
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-white">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty
        </label>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="w-full p-2 border border-gray-300rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          {difficulties.map((diff) => (
            <option
              key={diff}
              value={diff}
              className="bg-white"
            >
              {diff}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showOnlyDueToday}
          onChange={() => setShowOnlyDueToday((prev) => !prev)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
        />
        <label className="text-sm font-medium text-gray-700">
          Show Only Due Today
        </label>
      </div>
    </div>
  </div>
);

export default Filters;
