import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DSAProgressTracker, Patterns, InterviewRoadmap } from "./pages";
import { Navbar, Footer } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DSAProgressTracker />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/roadmap" element={<InterviewRoadmap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
