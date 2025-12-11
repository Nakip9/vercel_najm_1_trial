import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import Analytics from './components/common/Analytics';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ErrorBoundary>
      <Router>
        <Analytics />
        <div className="app" data-theme={theme}>
          <Navbar />

          {/* Theme Toggle Button */}
          {/* <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button> */}

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
