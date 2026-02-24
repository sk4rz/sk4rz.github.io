
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LocalizationProvider } from './context/LocalizationContext';
import Home from './pages/Home';
import About from './pages/About';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ArchivesPage from './pages/ArchivesPage';
import TagsPage from './pages/TagsPage';
import TagPostsPage from './pages/TagPostsPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LocalizationProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-code text-base">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/tags/:tagName" element={<TagPostsPage />} />
              <Route path="/post/:slug" element={<PostPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LocalizationProvider>
  );
}

export default App;