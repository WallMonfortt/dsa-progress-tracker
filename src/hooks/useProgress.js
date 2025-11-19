import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import useSpacedRepetition from './useSpacedRepetition';

/**
 * Base hook for tracking progress with spaced repetition
 * Can be used for any type of trackable item (problems, topics, etc.)
 * 
 * @param {string} storageKey - Key for localStorage
 * @param {Object} options - Configuration options
 * @param {string} options.completedFieldName - Name of completed field ('solved' or 'completed')
 * @param {number} options.numReviews - Number of review cycles (default: 5)
 * @returns {Object} Progress tracking functions and state
 */
const useProgress = (storageKey, options = {}) => {
  const {
    completedFieldName = 'completed',
    numReviews = 5,
  } = options;

  const [progress, setProgress] = useLocalStorage(storageKey, {});
  const { today, getNextReviewDates, isDueForReview, getDefaultProgress } = useSpacedRepetition();

  // Helper to get default progress structure
  const getDefaultItemProgress = useCallback(() => {
    return getDefaultProgress(completedFieldName);
  }, [getDefaultProgress, completedFieldName]);

  /**
   * Toggle completion status of an item
   * @param {string} itemId - ID of the item
   */
  const toggleComplete = useCallback((itemId) => {
    setProgress((prev) => {
      const current = prev[itemId] || getDefaultItemProgress();
      const isCompleted = current[completedFieldName];

      if (!isCompleted) {
        // Mark as completed
        return {
          ...prev,
          [itemId]: {
            ...current,
            [completedFieldName]: true,
            [`${completedFieldName}Date`]: today,
            reviews: Array(numReviews).fill(false),
            dates: { ...current.dates, initial: today },
          },
        };
      } else {
        // Unmark - remove from progress
        const newProgress = { ...prev };
        delete newProgress[itemId];
        return newProgress;
      }
    });
  }, [setProgress, today, completedFieldName, numReviews, getDefaultItemProgress]);

  /**
   * Toggle review status for a specific review cycle
   * @param {string} itemId - ID of the item
   * @param {number} reviewIndex - Index of the review (0-based)
   */
  const toggleReview = useCallback((itemId, reviewIndex) => {
    setProgress((prev) => {
      const current = prev[itemId] || getDefaultItemProgress();
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
        [itemId]: { ...current, reviews: newReviews, dates: newDates },
      };
    });
  }, [setProgress, today, getDefaultItemProgress]);

  /**
   * Get progress for a specific item
   * @param {string} itemId - ID of the item
   * @returns {Object} Progress data for the item
   */
  const getItemProgress = useCallback((itemId) => {
    return progress[itemId] || getDefaultItemProgress();
  }, [progress, getDefaultItemProgress]);

  /**
   * Check if an item is completed
   * @param {string} itemId - ID of the item
   * @returns {boolean} True if item is completed
   */
  const isItemCompleted = useCallback((itemId) => {
    const itemProgress = getItemProgress(itemId);
    return itemProgress[completedFieldName] === true;
  }, [getItemProgress, completedFieldName]);

  /**
   * Get next review dates for an item
   * @param {string} itemId - ID of the item
   * @returns {string[]} Array of review dates
   */
  const getItemNextReviews = useCallback((itemId) => {
    const itemProgress = getItemProgress(itemId);
    const completedDate = itemProgress[`${completedFieldName}Date`];
    return getNextReviewDates(completedDate);
  }, [getItemProgress, completedFieldName, getNextReviewDates]);

  /**
   * Check if an item is due for review
   * @param {string} itemId - ID of the item
   * @returns {boolean} True if item is due
   */
  const isItemDue = useCallback((itemId) => {
    const itemProgress = getItemProgress(itemId);
    const nextReviews = getItemNextReviews(itemId);
    return isDueForReview(itemProgress, nextReviews);
  }, [getItemProgress, getItemNextReviews, isDueForReview]);

  return {
    progress,
    setProgress,
    toggleComplete,
    toggleReview,
    getItemProgress,
    isItemCompleted,
    getItemNextReviews,
    isItemDue,
    today,
  };
};

export default useProgress;

