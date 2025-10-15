import useLocalStorage from "./useLocalStorage";
import { getToday, calculateNextReviews } from "../utils/dateUtils";
import problems from "../data/problems.json";

const useProblems = () => {
    const [progress, setProgress] = useLocalStorage("neetcode-progress", {});
    const [customProblems, setCustomProblems] = useLocalStorage("custom-problems", []);

    const allProblems = [...problems, ...customProblems];
    const categories = [
        "All",
        ...Array.from(new Set([
            ...problems.map((p) => p.category),
            ...customProblems.map((p) => p.category)
        ])).filter(Boolean),
    ];

    const difficulties = ["All", "Easy", "Medium", "Hard"];

    const today = getToday();

    const toggleComplete = (problemId, reviewIndex = null) => {
        setProgress((prev) => {
            const current = prev[problemId] || {
                solved: false,
                reviews: Array(5).fill(false),
                dates: {},
            };

            if (reviewIndex === null) {
                const newSolved = !current.solved;
                if (newSolved) {
                    return {
                        ...prev,
                        [problemId]: {
                            ...current,
                            solved: true,
                            solvedDate: today,
                            reviews: Array(5).fill(false),
                            dates: { ...current.dates, initial: today },
                        },
                    };
                } else {
                    const newProgress = { ...prev };
                    delete newProgress[problemId];
                    return newProgress;
                }
            } else {
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
                    [problemId]: { ...current, reviews: newReviews, dates: newDates },
                };
            }
        });
    };

    const isProblemSolved = (problemId) => {
        const progressItem = progress[problemId];
        return progressItem && progressItem.solved === true;
    };

    const stats = {
        total: allProblems.length,
        solved: allProblems.filter(p => isProblemSolved(p.id)).length,
        easy: allProblems.filter(
            (p) => p.difficulty === "Easy" && isProblemSolved(p.id)
        ).length,
        medium: allProblems.filter(
            (p) => p.difficulty === "Medium" && isProblemSolved(p.id)
        ).length,
        hard: allProblems.filter(
            (p) => p.difficulty === "Hard" && isProblemSolved(p.id)
        ).length,
    };

    const isProblemDue = (problem) => {
        const prob = progress[problem.id];
        if (!prob || !prob.solved) return false;
        const nextReviews = calculateNextReviews(prob.solvedDate);
        return nextReviews.some(
            (date, idx) => !prob.reviews?.[idx] && date <= today
        );
    };

    const getDueProblems = () => {
        return allProblems.filter(isProblemDue).length;
    };

    return {
        allProblems,
        progress,
        setProgress,
        customProblems,
        setCustomProblems,
        toggleComplete,
        categories,
        difficulties,
        isProblemSolved,
        isProblemDue,
        stats,
        getDueProblems,
    };
}

export default useProblems;