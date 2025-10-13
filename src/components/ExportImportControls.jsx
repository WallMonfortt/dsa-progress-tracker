import { Download, Upload, Trash2 } from "lucide-react";
const ExportImportControls = ({
  progress,
  setProgress,
  customProblems,
  setCustomProblems
}) => {
  const exportData = () => {
    const data = {
      progress,
      customProblems,
      interviewProgress: JSON.parse(localStorage.getItem('interview-progress') || '{}'),
      version: '1.0',
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `neetcode-data-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const { progress: importedProgress, customProblems: importedCustomProblems, interviewProgress } = JSON.parse(e.target.result);

        if (importedProgress) {
          setProgress(importedProgress);
          localStorage.setItem('neetcode-progress', JSON.stringify(importedProgress));
        }

        if (importedCustomProblems) {
          setCustomProblems(importedCustomProblems);
          localStorage.setItem('custom-problems', JSON.stringify(importedCustomProblems));
        }

        if (interviewProgress) {
          localStorage.setItem('interview-progress', JSON.stringify(interviewProgress));
        }

        alert("Data imported successfully!");
      } catch (error) {
        console.error('Error importing data:', error);
        alert("Error importing data. Please verify the format.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to clear all progress and custom problems?")) {
      setProgress({});
      setCustomProblems([]);
      localStorage.removeItem('neetcode-progress');
      localStorage.removeItem('custom-problems');
      localStorage.removeItem('interview-progress');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={exportData}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
      >
        <Download size={16} /> Export
      </button>

      <label className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors cursor-pointer">
        <Upload size={16} /> Import
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
        />
      </label>

      <button
        onClick={clearAllData}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
      >
        <Trash2 size={16} /> Clear All
      </button>
    </div>
  );
};

export default ExportImportControls;
