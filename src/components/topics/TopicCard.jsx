import { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  ExternalLink, 
  Plus,
  Clock,
  BookOpen,
  Video,
  FileText,
  GraduationCap,
  Book,
  FileCode,
  Image
} from 'lucide-react';
import { isOverdue, isDueToday, calculateNextReviews } from '../../utils/dateUtils';
import AddResourceModal from './AddResourceModal';
import { ExcalidrawViewer } from '../ui';

const resourceIcons = {
  video: Video,
  article: FileText,
  course: GraduationCap,
  book: Book,
  documentation: FileCode,
  other: FileText,
};

const TopicCard = ({ 
  subtopic, 
  progress, 
  customResources = [],
  onToggleComplete,
  onToggleReview,
  onToggleResourceComplete,
  onAddResource,
  isDue
}) => {
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [excalidrawModal, setExcalidrawModal] = useState({ isOpen: false, path: null, title: '' });
  const subtopicProgress = progress || {
    completed: false,
    reviews: Array(5).fill(false),
    dates: {},
    resources: {},
  };

  const nextReviews = subtopicProgress.completed && subtopicProgress.completedDate
    ? calculateNextReviews(subtopicProgress.completedDate)
    : [];

  const subtopicId = subtopic.id || subtopic.title;
  const allResources = [
    ...(subtopic.resources || []),
    ...(customResources.find(r => r.subtopicId === subtopicId)?.resources || []),
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  const getResourceIcon = (type) => {
    const Icon = resourceIcons[type] || FileText;
    return <Icon size={16} className="flex-shrink-0" />;
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        {/* Subtopic Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => onToggleComplete(subtopicId)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                {subtopicProgress.completed ? (
                  <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {subtopic.title}
              </h3>
              {isDue && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">
                  Pendiente
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Review Schedule */}
        {subtopicProgress.completed && nextReviews.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Revisiones:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {nextReviews.map((date, idx) => {
                const isCompleted = subtopicProgress.reviews?.[idx];
                const overdue = !isCompleted && isOverdue(date);
                const dueToday = !isCompleted && isDueToday(date);

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <button
                      onClick={() => onToggleReview(subtopicId, idx)}
                      className={`px-2 py-1 rounded text-xs border min-w-[50px] ${
                        isCompleted
                          ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-600 dark:text-green-400"
                          : overdue
                          ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-600 dark:text-red-300"
                          : dueToday
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-600 dark:text-yellow-400"
                          : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-600 dark:text-gray-400"
                      }`}
                      title={`Revisión ${idx + 1} - Vence: ${formatDate(date)}`}
                    >
                      R{idx + 1}
                    </button>
                    <div
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : overdue
                          ? "text-red-600 dark:text-red-800"
                          : dueToday
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Calendar size={10} />
                      {formatDate(date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Recursos ({allResources.length})
            </h4>
            <button
              onClick={() => setIsResourceModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              <Plus size={14} />
              Agregar
            </button>
          </div>

          {allResources.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              No hay recursos agregados aún
            </p>
          ) : (
            <div className="space-y-2">
              {allResources.map((resource) => {
                const isCompleted = subtopicProgress.resources?.[resource.id];
                const ResourceIcon = getResourceIcon(resource.type);

                return (
                  <div
                    key={resource.id}
                    className={`flex items-center gap-3 p-2 rounded border ${
                      isCompleted
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
                    }`}
                  >
                    <button
                      onClick={() => onToggleResourceComplete(subtopicId, resource.id)}
                      className="flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="text-green-600 dark:text-green-400" size={18} />
                      ) : (
                        <Circle className="text-gray-400" size={18} />
                      )}
                    </button>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {ResourceIcon}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-sm truncate hover:underline ${
                          isCompleted
                            ? "text-green-700 dark:text-green-400 line-through"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {resource.title}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      {resource.duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {resource.duration}
                        </span>
                      )}
                      {resource.estimatedReadTime && (
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {resource.estimatedReadTime} min
                        </span>
                      )}
                      {resource.excalidrawPath && (
                        <button
                          onClick={() => setExcalidrawModal({
                            isOpen: true,
                            path: resource.excalidrawPath,
                            title: resource.title
                          })}
                          className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                          title="Ver diagrama Excalidraw"
                          aria-label="Ver diagrama Excalidraw"
                        >
                          <Image size={14} className="text-blue-600 dark:text-blue-400" />
                        </button>
                      )}
                      <ExternalLink size={12} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AddResourceModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        onAdd={(resource) => {
          onAddResource(subtopicId, resource);
          setIsResourceModalOpen(false);
        }}
        subtopicTitle={subtopic.title}
      />

      <ExcalidrawViewer
        isOpen={excalidrawModal.isOpen}
        onClose={() => setExcalidrawModal({ isOpen: false, path: null, title: '' })}
        excalidrawData={excalidrawModal.path}
        title={excalidrawModal.title || 'Visualizador de Excalidraw'}
      />
    </>
  );
};

export default TopicCard;

