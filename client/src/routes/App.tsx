import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing Page'; 
import Results from './Results';
import Assessment from './Assessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/results" element={<Results />} /> {/* Results page route */}
        <Route path="/assessment/:questionIndex" element={<Assessment />} /> {/* Assessment page route with parameter */}
      </Routes>
    </Router>
  );
}

export default App;

