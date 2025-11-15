import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSAProgressTracker, Patterns, InterviewRoadmap, Home, NotFound, MainRoadmap, BuildingPage, Fundamentos } from "./pages";
import { Navbar, Footer } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mainRoadmap" element={<MainRoadmap />} />
        <Route path="/DSAtracker" element={<DSAProgressTracker />} />
        <Route path="/patterns" element={<Patterns />} />
      
        {/* course routes */}
        <Route path="/fundamentos" element={<Fundamentos />} />

        {/* pending routes */}
        <Route path="/building" element={<BuildingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/roadmap" element={<InterviewRoadmap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
