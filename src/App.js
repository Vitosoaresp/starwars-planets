import React from 'react';
import './App.css';
import StarWarProvider from './context/StarWarProvider';
import Home from './pages/Home';

function App() {
  return (
    <StarWarProvider>
      <Home />
    </StarWarProvider>
  );
}

export default App;
