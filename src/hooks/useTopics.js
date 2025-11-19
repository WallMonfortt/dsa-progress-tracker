import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import useProgress from "./useProgress";

/**
 * Hook for managing topic/subtopic tracking with resources
 * Uses the base useProgress hook for spaced repetition logic
 * 
 * @param {string} topicId - Unique identifier for the topic
 */
const useTopics = (topicId) => {
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

    const [customResources, setCustomResources] = useLocalStorage(`topic-resources-${topicId}`, []);

    // Alias for consistency with component naming
    const toggleTopicComplete = baseToggleComplete;

    /**
     * Toggle resource completion status
     * @param {string} subtopicId - ID of the subtopic
     * @param {string} resourceId - ID of the resource
     */
    const toggleResourceComplete = useCallback((subtopicId, resourceId) => {
        setProgress((prev) => {
            const current = prev[subtopicId] || { resources: {} };
            const resources = current.resources || {};
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
     * @param {string} subtopicId - ID of the subtopic
     * @param {Object} resource - Resource object to add
     */
    const addResource = useCallback((subtopicId, resource) => {
        const newResource = {
            ...resource,
            id: resource.id || `r-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            addedDate: today,
        };
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
     * @param {string} subtopicId - ID of the subtopic
     * @returns {boolean} True if subtopic is due
     */
    const isSubtopicDue = useCallback((subtopicId) => {
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

