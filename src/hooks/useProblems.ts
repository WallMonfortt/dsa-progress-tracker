import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import useProgress from "./useProgress";
import problemsData from "../data/problems.json";
import type { Problem } from "../types";

/**
 * Hook for managing DSA problems tracking
 * Uses the base useProgress hook for spaced repetition logic
 */
const useProblems = () => {
    const problems = problemsData as Problem[];
    
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

    const [customProblems, setCustomProblems] = useLocalStorage<Problem[]>("custom-problems", []);

    const allProblems = useMemo(() => [...problems, ...customProblems], [customProblems]);

    const categories = useMemo(() => [
        "Todos",
        ...Array.from(new Set([
            ...problems.map((p) => p.category),
            ...customProblems.map((p) => p.category)
        ])).filter(Boolean),
    ], [customProblems]);

    const difficulties = ["Todos", "Fácil", "Medio", "Difícil"] as const;

    // Wrapper to handle both completion and review toggles
    const toggleComplete = (problemId: string | number, reviewIndex: number | null = null) => {
        const id = String(problemId);
        if (reviewIndex === null) {
            baseToggleComplete(id);
        } else {
            toggleReview(id, reviewIndex);
        }
    };

    const stats = useMemo(() => ({
        total: allProblems.length,
        solved: allProblems.filter(p => isProblemSolved(String(p.id))).length,
        easy: allProblems.filter(
            (p) => p.difficulty === "Easy" && isProblemSolved(String(p.id))
        ).length,
        medium: allProblems.filter(
            (p) => p.difficulty === "Medium" && isProblemSolved(String(p.id))
        ).length,
        hard: allProblems.filter(
            (p) => p.difficulty === "Hard" && isProblemSolved(String(p.id))
        ).length,
    }), [allProblems, isProblemSolved]);

    const isProblemDue = (problem: Problem) => {
        return isProblemDueBase(String(problem.id));
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
        isProblemSolved: (id: string | number) => isProblemSolved(String(id)),
        isProblemDue,
        stats,
        getDueProblems,
        getItemNextReviews,
    };
};

export default useProblems;

