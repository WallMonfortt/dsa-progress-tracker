import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import useSpacedRepetition, { ProgressItem } from './useSpacedRepetition';

interface UseProgressOptions {
  completedFieldName?: string;
  numReviews?: number;
}

interface UseProgressReturn {
  progress: Record<string, ProgressItem>;
  setProgress: (value: Record<string, ProgressItem> | ((prev: Record<string, ProgressItem>) => Record<string, ProgressItem>)) => void;
  toggleComplete: (itemId: string) => void;
  toggleReview: (itemId: string, reviewIndex: number) => void;
  getItemProgress: (itemId: string) => ProgressItem;
  isItemCompleted: (itemId: string) => boolean;
  getItemNextReviews: (itemId: string) => string[];
  isItemDue: (itemId: string) => boolean;
  today: string;
}

/**
 * Base hook for tracking progress with spaced repetition
 * Can be used for any type of trackable item (problems, topics, etc.)
 */
const useProgress = (
  storageKey: string,
  options: UseProgressOptions = {}
): UseProgressReturn => {
  const {
    completedFieldName = 'completed',
    numReviews = 5,
  } = options;

  const [progress, setProgress] = useLocalStorage<Record<string, ProgressItem>>(storageKey, {});
  const { today, getNextReviewDates, isDueForReview, getDefaultProgress } = useSpacedRepetition();

  // Helper to get default progress structure
  const getDefaultItemProgress = useCallback(() => {
    return getDefaultProgress(completedFieldName);
  }, [getDefaultProgress, completedFieldName]);

  /**
   * Toggle completion status of an item
   */
  const toggleComplete = useCallback((itemId: string) => {
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
   */
  const toggleReview = useCallback((itemId: string, reviewIndex: number) => {
    setProgress((prev) => {
      const current = prev[itemId] || getDefaultItemProgress();
      const newReviews = [...(current.reviews || [])];
      newReviews[reviewIndex] = !newReviews[reviewIndex];
      
      const newDates = { ...current.dates || {} };
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
   */
  const getItemProgress = useCallback((itemId: string): ProgressItem => {
    return progress[itemId] || getDefaultItemProgress();
  }, [progress, getDefaultItemProgress]);

  /**
   * Check if an item is completed
   */
  const isItemCompleted = useCallback((itemId: string): boolean => {
    const itemProgress = getItemProgress(itemId);
    return itemProgress[completedFieldName] === true;
  }, [getItemProgress, completedFieldName]);

  /**
   * Get next review dates for an item
   */
  const getItemNextReviews = useCallback((itemId: string): string[] => {
    const itemProgress = getItemProgress(itemId);
    const completedDate = itemProgress[`${completedFieldName}Date`] as string | undefined;
    return getNextReviewDates(completedDate);
  }, [getItemProgress, completedFieldName, getNextReviewDates]);

  /**
   * Check if an item is due for review
   */
  const isItemDue = useCallback((itemId: string): boolean => {
    const itemProgress = getItemProgress(itemId);
    const nextReviews = getItemNextReviews(itemId);
    return isDueForReview(itemProgress, nextReviews, completedFieldName);
  }, [getItemProgress, getItemNextReviews, isDueForReview, completedFieldName]);

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

