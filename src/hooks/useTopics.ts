import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import useProgress from "./useProgress";
import type { Resource, ProgressItem } from "../types";

interface CustomResourceGroup {
    subtopicId: string;
    resources: Resource[];
}

/**
 * Hook for managing topic/subtopic tracking with resources
 * Uses the base useProgress hook for spaced repetition logic
 */
const useTopics = (topicId: string) => {
    const {
        progress,
        setProgress,
        toggleComplete: baseToggleComplete,
        toggleReview,
        getItemProgress: getSubtopicProgress,
        getItemNextReviews: getNextReviews,
        isItemDue: isSubtopicDueBase,
        today,
    } = useProgress(`topic-progress-${topicId}`, {
        completedFieldName: "completed",
        numReviews: 5,
    });

    const [customResources, setCustomResources] = useLocalStorage<CustomResourceGroup[]>(
        `topic-resources-${topicId}`,
        []
    );

    // Alias for consistency with component naming
    const toggleTopicComplete = baseToggleComplete;

    /**
     * Toggle resource completion status
     */
    const toggleResourceComplete = useCallback((subtopicId: string, resourceId: string) => {
        setProgress((prev) => {
            const current = prev[subtopicId] || { resources: {} } as ProgressItem;
            const resources = (current.resources as Record<string, boolean>) || {};
            const newResources = {
                ...resources,
                [resourceId]: !resources[resourceId],
            };
            return {
                ...prev,
                [subtopicId]: { ...current, resources: newResources },
            };
        });
    }, [setProgress]);

    /**
     * Add a custom resource to a subtopic
     */
    const addResource = useCallback((subtopicId: string, resource: Omit<Resource, 'id'> & { id?: string }) => {
        const newResource: Resource = {
            ...resource,
            id: resource.id || `r-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            addedDate: today,
        } as Resource;
        setCustomResources((prev) => {
            const existingIndex = prev.findIndex((r) => r.subtopicId === subtopicId);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    resources: [...updated[existingIndex].resources, newResource],
                };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        subtopicId,
                        resources: [newResource],
                    },
                ];
            }
        });
    }, [setCustomResources, today]);

    /**
     * Check if a subtopic is due for review
     */
    const isSubtopicDue = useCallback((subtopicId: string) => {
        return isSubtopicDueBase(subtopicId);
    }, [isSubtopicDueBase]);

    return {
        progress,
        setProgress,
        customResources,
        setCustomResources,
        toggleTopicComplete,
        toggleReview,
        toggleResourceComplete,
        addResource,
        getSubtopicProgress,
        getNextReviews,
        isSubtopicDue,
    };
};

export default useTopics;

