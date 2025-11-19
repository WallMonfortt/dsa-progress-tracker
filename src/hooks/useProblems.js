import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import useProgress from "./useProgress";
import problems from "../data/problems.json";

/**
 * Hook for managing DSA problems tracking
 * Uses the base useProgress hook for spaced repetition logic
 */
const useProblems = () => {
    const {
        progress,
        setProgress,
        toggleComplete: baseToggleComplete,
        toggleReview,
        isItemCompleted: isProblemSolved,
        isItemDue: isProblemDueBase,
        getItemNextReviews,
    } = useProgress("neetcode-progress", {
        completedFieldName: "solved",
        numReviews: 5,
    });

    const [customProblems, setCustomProblems] = useLocalStorage("custom-problems", []);

    const allProblems = useMemo(() => [...problems, ...customProblems], [customProblems]);

    const categories = useMemo(() => [
        "Todos",
        ...Array.from(new Set([
            ...problems.map((p) => p.category),
            ...customProblems.map((p) => p.category)
        ])).filter(Boolean),
    ], [customProblems]);

    const difficulties = ["Todos", "Fácil", "Medio", "Difícil"];

    // Wrapper to handle both completion and review toggles
    const toggleComplete = (problemId, reviewIndex = null) => {
        if (reviewIndex === null) {
            baseToggleComplete(problemId);
        } else {
            toggleReview(problemId, reviewIndex);
        }
    };

    const stats = useMemo(() => ({
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
    }), [allProblems, isProblemSolved]);

    const isProblemDue = (problem) => {
        return isProblemDueBase(problem.id);
    };

    const getDueProblems = () => {
        return allProblems.filter(p => isProblemDue(p)).length;
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
        getItemNextReviews,
    };
};

export default useProblems;