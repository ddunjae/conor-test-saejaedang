import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import About from './components/About';
import Order from './components/Order';
import Contact from './components/Contact';
import './App.css';

/**
 * Main App Component
 * SaeJaeDang Cafe Website
 * A modern, responsive website showcasing traditional Korean bakery items
 */
function App() {
  const [cafeInfo, setCafeInfo] = useState({
    name: '새재당',
    nameEn: 'SaeJaeDang',
    tagline: '전통과 현대가 만나는 곳'
  });

  useEffect(() => {
    // Fetch cafe info from backend
    const fetchCafeInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/info');
        const data = await response.json();
        setCafeInfo({
          name: data.name,
          nameEn: data.nameEn,
          tagline: data.tagline
        });
      } catch (error) {
        console.error('Error fetching cafe info:', error);
        // Use default values if backend is not available
      }
    };

    fetchCafeInfo();
  }, []);

  return (
    <div className="App">
      <Header cafeName={cafeInfo.name} tagline={cafeInfo.tagline} />
      <main>
        <Gallery />
        <About />
        <Order />
        <Contact />
      </main>
    </div>
  );
}

export default App;
