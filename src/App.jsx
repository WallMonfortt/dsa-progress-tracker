import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  DSAProgressTracker, 
  Patterns, 
  InterviewRoadmap, 
  Home, 
  NotFound, 
  MainRoadmap, 
  BuildingPage, 
  Fundamentos, 
  ToolsList 
} from "./pages";
import { Navbar, Footer } from "./components/layout";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/ruta-aprendizaje" element={<MainRoadmap />} />
        <Route path="/patrones" element={<Patterns />} />
        <Route path="/herramientas" element={<ToolsList />} />
      
        {/* courses routes */}
        <Route path="/fundamentos" element={<Fundamentos />} />

        {/* tools routes */}
        <Route path="/herramientas/seguimiento-dsa" element={<DSAProgressTracker />} />

        {/* pending routes */}
        <Route path="/en-construccion" element={<BuildingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ruta-entrevistas" element={<InterviewRoadmap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;


//TODO: Refactor project structure
// Mejorar organización de carpetas
// Agregar TypeScript (opcional pero recomendado)
//TODO: Add unit tests for all components
//TODO: Define and extract common and reusable components into a shared library
//TODO: Extract color palette and theme into a shared library
//TODO: Create fundamentos topic and translate all the page to spanish