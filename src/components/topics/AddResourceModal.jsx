import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const AddResourceModal = ({ isOpen, onClose, onAdd, subtopicTitle }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'video',
    url: '',
    duration: '',
    estimatedReadTime: '',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      return;
    }

    try {
      onAdd({
        ...formData,
        completed: false,
      });
      setFormData({
        title: '',
        type: 'video',
        url: '',
        duration: '',
        estimatedReadTime: '',
      });
      onClose();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl dark:text-white font-semibold">
            Agregar Recurso a {subtopicTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block dark:text-gray-200 text-sm font-medium mb-1">
              Título del Recurso *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Tipo de Recurso *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="video">Video</option>
              <option value="article">Artículo</option>
              <option value="course">Curso</option>
              <option value="book">Libro</option>
              <option value="documentation">Documentación</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              placeholder="https://..."
              required
            />
          </div>
          {formData.type === 'video' && (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Duración (opcional)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                placeholder="Ej: 10:45"
              />
            </div>
          )}
          {formData.type === 'article' && (
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Tiempo de Lectura (minutos, opcional)
              </label>
              <input
                type="number"
                value={formData.estimatedReadTime}
                onChange={(e) => setFormData({...formData, estimatedReadTime: e.target.value})}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                placeholder="Ej: 8"
              />
            </div>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Agregar Recurso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;

