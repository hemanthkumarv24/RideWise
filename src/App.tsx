// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage'; // Adjust the path as per your project structure

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
