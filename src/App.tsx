import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import BlogList from './components/blog/BlogList';
import BlogArticle from './components/blog/BlogArticle';
import { LanguageProvider } from './hooks/useLanguage';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Router>
      <LanguageProvider>
        <div className="app">
          <Header />
          <Navigation 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />
          <Routes>
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/article/*" element={<BlogArticle />} />
            <Route 
              path="/*" 
              element={
                <MainContent 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection}
                />
              } 
            />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
};

export default App;
