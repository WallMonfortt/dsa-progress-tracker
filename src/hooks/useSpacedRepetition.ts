import { getToday, calculateNextReviews, isDueToday, isOverdue } from "../utils/dateUtils";

export interface ProgressItem {
  [key: string]: boolean | boolean[] | Record<string, string> | undefined;
  reviews?: boolean[];
  dates?: Record<string, string>;
}

/**
 * Hook for managing spaced repetition logic
 * Handles review scheduling and due date calculations
 */
const useSpacedRepetition = () => {
  const today = getToday();

  /**
   * Get next review dates based on completion date
   * @param completedDate - Date when item was completed
   * @param intervals - Array of days for reviews (default: [3, 5, 9, 17, 33, 65])
   * @returns Array of review dates
   */
  const getNextReviewDates = (
    completedDate: string | null | undefined,
    intervals: number[] = [3, 5, 9, 17, 33, 65]
  ): string[] => {
    if (!completedDate) return [];
    return calculateNextReviews(completedDate, intervals);
  };

  /**
   * Check if an item is due for review
   * @param progressItem - Progress item with completed date and reviews
   * @param nextReviews - Array of next review dates
   * @param completedFieldName - Name of the completed field ('solved' or 'completed')
   * @returns True if item is due for review (today or overdue)
   */
  const isDueForReview = (
    progressItem: ProgressItem | null | undefined,
    nextReviews: string[],
    completedFieldName: string = 'completed'
  ): boolean => {
    if (!progressItem || !progressItem[completedFieldName]) return false;
    return nextReviews.some(
      (date, idx) => !progressItem.reviews?.[idx] && (isDueToday(date) || isOverdue(date))
    );
  };

  /**
   * Get the default progress structure for a new item
   * @param completedFieldName - Name of the completed field ('solved' or 'completed')
   * @returns Default progress structure
   */
  const getDefaultProgress = (completedFieldName: string = 'completed'): ProgressItem => {
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

