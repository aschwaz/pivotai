import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing Page'; // Update import path for LandingPage
import Plan from './Plan'; // Update import path for Plan

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<LandingPage/>} /> {/* Landing page route */}
        <Route path="/plan" element={<Plan />} /> Plan page route
      </Routes>
    </Router>
  );
}

export default App;