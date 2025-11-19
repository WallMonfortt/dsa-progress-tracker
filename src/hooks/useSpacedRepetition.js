import { getToday, calculateNextReviews } from "../utils/dateUtils";

/**
 * Hook for managing spaced repetition logic
 * Handles review scheduling and due date calculations
 */
const useSpacedRepetition = () => {
  const today = getToday();

  /**
   * Get next review dates based on completion date
   * @param {string} completedDate - Date when item was completed
   * @param {number[]} intervals - Array of days for reviews (default: [3, 5, 9, 17, 33, 65])
   * @returns {string[]} Array of review dates
   */
  const getNextReviewDates = (completedDate, intervals = [3, 5, 9, 17, 33, 65]) => {
    if (!completedDate) return [];
    return calculateNextReviews(completedDate, intervals);
  };

  /**
   * Check if an item is due for review
   * @param {Object} progressItem - Progress item with completed date and reviews
   * @param {string[]} nextReviews - Array of next review dates
   * @returns {boolean} True if item is due for review
   */
  const isDueForReview = (progressItem, nextReviews) => {
    if (!progressItem || !progressItem.completed) return false;
    return nextReviews.some(
      (date, idx) => !progressItem.reviews?.[idx] && date <= today
    );
  };

  /**
   * Get the default progress structure for a new item
   * @param {string} completedFieldName - Name of the completed field ('solved' or 'completed')
   * @returns {Object} Default progress structure
   */
  const getDefaultProgress = (completedFieldName = 'completed') => {
    return {
      [completedFieldName]: false,
      reviews: Array(5).fill(false),
      dates: {},
    };
  };

  return {
    today,
    getNextReviewDates,
    isDueForReview,
    getDefaultProgress,
  };
};

export default useSpacedRepetition;

