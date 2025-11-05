import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useLocalization } from '../context/LocalizationContext';
import { useTranslations } from '../hooks/useTranslations';

const Header: React.FC = () => {
  const { language, toggleLanguage } = useLocalization();
  const t = useTranslations();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  // Close menu on route change (pathname only)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('q', query);
    } else {
      newSearchParams.delete('q');
    }
    
    if (location.pathname !== '/') {
        navigate(`/?${newSearchParams.toString()}`);
    } else {
        setSearchParams(newSearchParams, { replace: true });
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm transition-colors duration-200 ${
      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
    }`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center font-display text-3xl py-2 transition-colors duration-200 ${
      isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
    }`;


  return (
    <>
      <header className="bg-black/80 backdrop-blur-[2px] sticky top-0 z-40 border-b border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="text-xl font-display text-white flex items-baseline gap-2 whitespace-nowrap">
                <span>sk4rz@blog:~</span>
                <span className="text-sm text-violet-400 hidden sm:inline">[//]</span>
              </NavLink>
              <nav className="hidden sm:flex items-baseline space-x-2">
                <NavLink to="/" className={navLinkClasses}>
                  {t('home')}
                </NavLink>
                <NavLink to="/about" className={navLinkClasses}>
                  {t('about')}
                </NavLink>
                <NavLink to="/archives" className={navLinkClasses}>
                  {t('archives')}
                </NavLink>
                <NavLink to="/tags" className={navLinkClasses}>
                  {t('tags')}
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder={t('search')}
                  className="bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 py-1 px-3 focus:outline-none focus:border-violet-500 rounded-md text-sm w-48 transition-colors"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                onClick={toggleLanguage}
                className="px-4 py-1 text-sm bg-transparent border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-md transition-colors"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>
               <div className="sm:hidden">
                  <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      aria-controls="mobile-menu"
                      aria-expanded={isMenuOpen}
                  >
                      <span className="sr-only">Open main menu</span>
                      {isMenuOpen ? (
                          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      ) : (
                          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                      )}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-[#111] border-l-2 border-violet-500/50 p-4 flex flex-col shadow-2xl">
          <div className="bg-neutral-800 flex items-center justify-between pl-3 pr-1 py-1 mb-8">
              <span className="font-display text-white select-none">NAV_MENU</span>
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="w-6 h-6 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-neutral-700 flex items-center justify-center font-bold text-black text-xs leading-none pb-0.5">X</button>
          </div>
          
          <div className="relative mb-6 flex items-center bg-black p-2 border border-neutral-700">
            <span className="text-violet-400 font-code mr-2 select-none">$</span>
            <input
              type="text"
              placeholder={t('search')}
              className="bg-transparent text-white placeholder-neutral-500 w-full focus:outline-none font-code text-base"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <nav className="flex flex-col space-y-2 px-2">
            {[
              { to: "/", label: t('home') },
              { to: "/about", label: t('about') },
              { to: "/archives", label: t('archives') },
              { to: "/tags", label: t('tags') },
            ].map(item => (
                <NavLink key={item.to} to={item.to} className={mobileNavLinkClasses}>
                  {({isActive}) => (
                      <>
                          <span className={`mr-4 select-none transition-colors ${isActive ? 'text-violet-400' : 'text-neutral-700 group-hover:text-violet-400'}`}>{'>'}</span>
                          <span>{item.label}</span>
                      </>
                  )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;