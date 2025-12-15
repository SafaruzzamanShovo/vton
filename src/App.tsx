import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import TryOnPage from './pages/TryOnPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductDetail />} />
            <Route path="/virtual-try-on" element={<TryOnPage />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">© 2025 Demo Shop. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-2">Virtual Try-On Demo Integration</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
