import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import useProgress from "./useProgress";
import type { Resource } from "../types";
import type { ProgressItem } from "./useSpacedRepetition";

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

    /**
     * Check if all resources in a subtopic are completed
     */
    const areAllResourcesCompleted = useCallback((subtopicId: string, allResources: Resource[]): boolean => {
        if (allResources.length === 0) {
            return false;
        }

        const subtopicProgress = progress[subtopicId];
        const resources = (subtopicProgress?.resources as unknown as Record<string, boolean>) || {};
        
        return allResources.every(resource => resources[resource.id] === true);
    }, [progress]);

    // Alias for consistency with component naming
    const toggleTopicComplete = baseToggleComplete;

    /**
     * Toggle resource completion status and auto-complete subtopic if needed
     */
    const toggleResourceComplete = useCallback((subtopicId: string, resourceId: string, allResources: Resource[]) => {
        setProgress((prev) => {
            const current = prev[subtopicId] || { resources: {} } as ProgressItem;
            const resources = (current.resources as unknown as Record<string, boolean>) || {};
            const newResources = {
                ...resources,
                [resourceId]: !resources[resourceId],
            };
            
            const newResourceState = !resources[resourceId];
            const allCompleted = allResources.every(resource => {
                if (resource.id === resourceId) {
                    return newResourceState;
                }
                return resources[resource.id] === true;
            });

            const isCurrentlyCompleted = current.completed === true;

            // Auto-complete or uncomplete subtopic based on resources
            let newCompleted = current.completed;
            if (allResources.length > 0) {
                if (allCompleted && !isCurrentlyCompleted) {
                    newCompleted = true;
                } else if (!allCompleted && isCurrentlyCompleted) {
                    newCompleted = false;
                }
            }

            const updatedItem: ProgressItem = {
                ...current,
                resources: newResources as unknown as Record<string, string>,
                completed: newCompleted,
                completedDate: (newCompleted && !isCurrentlyCompleted ? today : current.completedDate) as unknown as Record<string, string>,
                reviews: newCompleted && !isCurrentlyCompleted ? Array(5).fill(false) : (current.reviews || []),
                dates: newCompleted && !isCurrentlyCompleted ? { initial: today } : (current.dates || {}),
            };

            return {
                ...prev,
                [subtopicId]: updatedItem,
            };
        });
    }, [setProgress, today]);

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
                const existingGroup = updated[existingIndex];
                if (existingGroup) {
                    updated[existingIndex] = {
                        ...existingGroup,
                        resources: [...existingGroup.resources, newResource],
                    };
                }
                return updated;
            } else {
                const newGroup: CustomResourceGroup = {
                    subtopicId: subtopicId,
                    resources: [newResource],
                };
                return [
                    ...prev,
                    newGroup,
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
        areAllResourcesCompleted,
    };
};

export default useTopics;
