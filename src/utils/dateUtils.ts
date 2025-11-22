export const formatDate = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getToday = (): string => formatDate(new Date());

export const isOverdue = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const isDueToday = (dateStr: string | null | undefined): boolean => {
  if (!dateStr) return false;
  
  const date = new Date(dateStr);
  const today = new Date();
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const calculateNextReviews = (
  solvedDate: string | null | undefined,
  intervals: number[] = [3, 5, 9, 17, 33, 65]
): string[] => {
  if (!solvedDate) return [];
  
  const baseDate = new Date(solvedDate);
  
  return intervals.map((days) => {
    const nextDate = new Date(baseDate);
    nextDate.setDate(baseDate.getDate() + days);
    
    return formatDate(nextDate);
  });
};

