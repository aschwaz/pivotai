import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing Page'; // Make sure the import path is correct
import Recommendation from './Recommendation';
import Results from './Results';
import Assessment from './Assessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/recommendation" element={<Recommendation />} /> {/* Plan page route */}
        <Route path= "/results" element={<Results />} />
        <Route path="/assessment/:questionIndex" element={<Assessment />} /> {/* Assessment page route with parameter */}
        {/* If you also need to catch the route without parameters: */}
        <Route path="/assessment" element={<Assessment />} /> {/* Results page route */}
      </Routes>
    </Router>
  );
}

export default App;
