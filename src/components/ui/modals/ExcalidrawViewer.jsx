import { useEffect, useState, lazy, Suspense, Component } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import '@excalidraw/excalidraw/index.css';

const excalidrawCustomStyles = `
  .excalidraw-custom .excalidraw {
    --color-primary: #2563eb;
    --color-primary-darker: #1d4ed8;
    --color-primary-darkest: #1e40af;
    --color-primary-light: #3b82f6;
    --color-primary-contrast-offset: #1e3a8a;
    
    --color-icon-fill: #374151;
    --color-icon-hover: #1f2937;
    --color-selection: rgba(37, 99, 235, 0.1);
    --color-selection-element: rgba(37, 99, 235, 0.2);
    
    --color-background: #ffffff;
    --color-background-overlay: rgba(0, 0, 0, 0.05);
  }

  .excalidraw-custom .excalidraw.theme--dark {
    --color-primary: #3b82f6;
    --color-primary-darker: #2563eb;
    --color-primary-darkest: #1d4ed8;
    --color-primary-light: #60a5fa;
    --color-primary-contrast-offset: #1e40af;
    
    --color-icon-fill: #d1d5db;
    --color-icon-hover: #f3f4f6;
    --color-selection: rgba(59, 130, 246, 0.15);
    --color-selection-element: rgba(59, 130, 246, 0.25);
    
    --color-background: #1f2937;
    --color-background-overlay: rgba(0, 0, 0, 0.3);
  }

  .excalidraw-custom {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .excalidraw-custom .excalidraw-wrapper {
    height: 100%;
    width: 100%;
    flex: 1;
  }
`;


const Excalidraw = lazy(() => 
  import('@excalidraw/excalidraw').then(module => ({ default: module.Excalidraw }))
);

class ExcalidrawErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Excalidraw Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Error Stack:', error.stack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Error al cargar Excalidraw. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Modal component for viewing Excalidraw files
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback when modal is closed
 * @param {Object|string} excalidrawData - Excalidraw file data (JSON object or URL to fetch)
 * @param {string} title - Optional title for the modal
 * @param {boolean} viewModeOnly - If true, enables view-only mode (default: true)
 */
const ExcalidrawViewer = ({ 
  isOpen, 
  onClose, 
  excalidrawData = null, 
  title = 'Visualizador de Excalidraw',
  viewModeOnly = false
}) => {
  const { theme, toggleTheme } = useTheme();
  const [excalidrawAppState, setExcalidrawAppState] = useState(null);
  const [excalidrawElements, setExcalidrawElements] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !excalidrawData) {
      setExcalidrawElements(null);
      setExcalidrawAppState(null);
      setError(null);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let data;

        if (typeof excalidrawData === 'string') {
          const response = await fetch(excalidrawData);
          if (!response.ok) {
            throw new Error('Error al cargar el archivo de Excalidraw');
          }
          data = await response.json();
        } else {
          data = excalidrawData;
        }

        if (data.elements && Array.isArray(data.elements)) {
          setExcalidrawElements(data.elements);
        } else if (Array.isArray(data)) {
          setExcalidrawElements(data);
        } else {
          throw new Error('Formato de archivo Excalidraw no válido: no se encontraron elementos');
        }
        
        if (data.appState) {
          setExcalidrawAppState(data.appState);
        }

      } catch (err) {
        console.error('Error loading Excalidraw data:', err);
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          data: typeof excalidrawData === 'string' ? 'URL' : 'Object'
        });
        setError(err.message || 'Error al cargar el archivo');
        setExcalidrawElements(null);
        setExcalidrawAppState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isOpen, excalidrawData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const excalidrawTheme = theme === 'dark' ? 'dark' : 'light';
  
  useEffect(() => {
    if (excalidrawAppState && excalidrawAppState.theme !== excalidrawTheme) {
      setExcalidrawAppState(prev => ({
        ...prev,
        theme: excalidrawTheme,
      }));
    }
  }, [theme, excalidrawTheme, excalidrawAppState]);

  if (!isOpen) return null;

  return (
    <>
      <style>{excalidrawCustomStyles}</style>
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]"
        onClick={handleBackdropClick}
      >
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg w-[95vw] h-[95vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold dark:text-white">
              {title}
            </h2>
            <button
              onClick={handleCloseClick}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Cerrar"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Cargando archivo...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
                <div className="text-center p-6">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <button
                    onClick={handleCloseClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            {!isLoading && !error && excalidrawElements && (
              <div className="h-full w-full excalidraw-custom">
                <ExcalidrawErrorBoundary>
                  <Suspense fallback={
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Cargando Excalidraw...</p>
                      </div>
                    </div>
                  }>
                    <Excalidraw
                      key={`excalidraw-${excalidrawTheme}`}
                      initialData={{
                        elements: excalidrawElements,
                        appState: {
                          ...(excalidrawAppState || {}),
                          theme: excalidrawTheme,
                        },
                      }}
                      theme={excalidrawTheme}
                      viewModeEnabled={viewModeOnly}
                      zenModeEnabled={false}
                      gridModeEnabled={false}
                      UIOptions={{
                        canvasActions: {
                          loadScene: !viewModeOnly,
                          saveToActiveFile: !viewModeOnly,
                          export: {
                            saveFileToDisk: true,
                          },
                          toggleTheme: true,
                        },
                      }}
                      onChange={(elements, appState) => {
                        setExcalidrawAppState(appState);
                        

                        if (appState.theme && appState.theme !== excalidrawTheme) {
                          if (appState.theme === 'dark' && theme === 'light') {
                            toggleTheme();
                          } else if (appState.theme === 'light' && theme === 'dark') {
                            toggleTheme();
                          }
                        }
                      }}
                    />
                  </Suspense>
                </ExcalidrawErrorBoundary>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcalidrawViewer;

