import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  totalPages,
  onPageChange,
  onFirstPage,
  onLastPage,
  onNextPage,
  onPrevPage,
  className = ""
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems <= itemsPerPage) return null;
  if (totalPages === 0) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">{indexOfFirstItem + 1}</span> -{' '}
        <span className="font-medium">{indexOfLastItem}</span> de <span className="font-medium">{totalItems}</span> 
      </div>  
      <div className="flex items-center space-x-1">
        <button
          onClick={onFirstPage}
          disabled={currentPage === 1}
          className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Primera página"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Página anterior"
        >
          <ChevronLeft size={18} />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-md text-sm mx-0.5 ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={`Ir a la página ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Página siguiente"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={onLastPage}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Última página"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;