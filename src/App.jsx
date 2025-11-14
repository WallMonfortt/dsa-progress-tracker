import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSAProgressTracker, Patterns, InterviewRoadmap, Home, NotFound, MainRoadmap, BuildingPage } from "./pages";
import { Navbar, Footer } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DSAtracker" element={<DSAProgressTracker />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/roadmap" element={<InterviewRoadmap />} />
        <Route path="/mainRoadmap" element={<MainRoadmap />} />
        <Route path="/building" element={<BuildingPage />} />

        //TODO: add building in progress page
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
