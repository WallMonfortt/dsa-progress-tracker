import { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import useTopics from '../../hooks/useTopics';
import TopicCard from './TopicCard';
import { Explanation } from '../sections';

const TopicTracker = ({ topicId, topicData }) => {
  const {
    customResources,
    toggleTopicComplete,
    toggleReview,
    toggleResourceComplete,
    addResource,
    getSubtopicProgress,
    isSubtopicDue,
  } = useTopics(topicId);

  const [showExplanation, setShowExplanation] = useState(false);

  const allSubtopics = topicData.subtopics || [];
  const dueSubtopics = allSubtopics.filter((subtopic) => isSubtopicDue(subtopic.id));

  return (
    <div className="min-h-screen bg-gray-50 p-4 transition-colors dark:bg-gray-600">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
                {topicData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {topicData.description}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm dark:text-blue-400 dark:hover:text-blue-300 group"
            >
              <span className="flex items-center gap-1">
                <Info size={16} />
                {showExplanation ? "Ocultar" : "Mostrar"} Información de Repetición Espaciada
              </span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Explanation Section */}
        {showExplanation && <Explanation />}

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 dark:bg-gray-700 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 text-blue-600 dark:bg-blue-200 dark:text-blue-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {allSubtopics.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-800">Total Temas</div>
            </div>
            <div className="bg-green-50 text-green-600 dark:bg-green-200 dark:text-green-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {allSubtopics.filter(s => {
                  const id = s.id || s.title;
                  return getSubtopicProgress(id).completed;
                }).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-800">Completados</div>
            </div>
            <div className="bg-yellow-50 text-yellow-600 dark:bg-yellow-200 dark:text-yellow-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {allSubtopics.filter(s => {
                  const id = s.id || s.title;
                  return getSubtopicProgress(id).completed && !isSubtopicDue(id);
                }).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-800">Al Día</div>
            </div>
            <div className="bg-purple-50 text-purple-600 dark:bg-purple-200 dark:text-purple-600 p-4 rounded-lg">
              <div className="text-2xl font-bold">
                {dueSubtopics.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-800">Pendientes</div>
            </div>
          </div>
        </div>

        {/* Subtopics */}
        <div>
          {allSubtopics.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-300">
                No hay subtemas disponibles aún
              </p>
            </div>
          ) : (
            allSubtopics.map((subtopic) => {
              const subtopicId = subtopic.id || subtopic.title;
              return (
                <TopicCard
                  key={subtopicId}
                  subtopic={subtopic}
                  progress={getSubtopicProgress(subtopicId)}
                  customResources={customResources}
                  onToggleComplete={toggleTopicComplete}
                  onToggleReview={toggleReview}
                  onToggleResourceComplete={toggleResourceComplete}
                  onAddResource={addResource}
                  isDue={isSubtopicDue(subtopicId)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicTracker;

// TODO: Implement local storage for topic progress

