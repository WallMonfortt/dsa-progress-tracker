import { useEffect, useState } from 'react';

const AddProblemModal = ({ isOpen, onClose, onAdd, error, onError }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Array',
    difficulty: 'Medium',
    url: '',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      onError('Problem name is required');
      return;
    }

    try {
      const result = await onAdd({
        ...formData,
        id: formData.id,
      });

      if (result && !result.success) {
        onError(result.message);
        return;
      }

      setFormData({
        id: '',
        name: '',
        category: 'Array',
        difficulty: 'Medium',
        url: '',
      });
      onError('');
      onClose();
    } catch (err) {
      onError('❌ An error occurred while adding the problem');
      console.error('Error:', err);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl dark:text-white font-semibold mb-4">Add New Problem</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block dark:text-gray-200 text-sm font-medium mb-1">Problem Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Problem ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Leave empty to auto-generate"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Array">Array</option>
                <option value="String">String</option>
                <option value="Hash Table">Hash Table</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Math">Math</option>
                <option value="Sorting">Sorting</option>
                <option value="Greedy">Greedy</option>
                <option value="Searching">Searching</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">URL (optional)</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              placeholder="https://leetcode.com/problems/..."
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Problem
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProblemModal;