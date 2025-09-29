/**
 * Language switcher functionality
 * Author: sk4rz
 * Description: Handles language switching with smooth transitions and persistence
 */

class LanguageSwitcher {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.detectLanguagePreference();
    this.updateLanguageSelector();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      const languageLinks = document.querySelectorAll(
        '.language-selector .dropdown-item'
      );

      languageLinks.forEach((link) => {
        link.addEventListener('click', (e) => this.handleLanguageSwitch(e));
      });
    });
  }

  handleLanguageSwitch(e) {
    e.preventDefault();

    const link = e.currentTarget;
    const href = link.getAttribute('href');
    const newLang = this.extractLanguageFromURL(href);

    // Store preference
    this.setLanguagePreference(newLang);

    // Add loading state
    this.showLoadingState();

    // Navigate with smooth transition
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  }

  extractLanguageFromURL(url) {
    const match = url.match(/\/([a-z]{2})\//);
    return match ? match[1] : 'en';
  }

  setLanguagePreference(lang) {
    localStorage.setItem('sk4rz-blog-language', lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
  }

  getLanguagePreference() {
    // Try localStorage first, then cookie, then browser language
    const stored = localStorage.getItem('sk4rz-blog-language');
    if (stored) return stored;

    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('language='));
    if (cookie) return cookie.split('=')[1];

    const browserLang = navigator.language.split('-')[0];
    return ['en', 'es'].includes(browserLang) ? browserLang : 'en';
  }

  detectLanguagePreference() {
    const preferred = this.getLanguagePreference();
    const currentLang = this.getCurrentLanguage();
    const currentPath = window.location.pathname;

    // Only redirect on root path to avoid infinite loops
    if (
      currentPath === '/' &&
      preferred !== currentLang &&
      preferred === 'es'
    ) {
      window.location.href = `${window.location.origin}/es/`;
    }
  }

  getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/es/')) return 'es';
    return 'en';
  }

  updateLanguageSelector() {
    const currentLang = this.getCurrentLanguage();
    const selector = document.querySelector('#languageDropdown');

    if (selector) {
      const flagEmoji = currentLang === 'es' ? '🇪🇸' : '🇺🇸';
      const langName = currentLang === 'es' ? 'Español' : 'English';

      selector.innerHTML = `<i class="fas fa-globe"></i> ${flagEmoji} ${langName}`;
    }
  }

  showLoadingState() {
    const selector = document.querySelector('.language-selector');
    if (selector) {
      selector.style.opacity = '0.7';
      selector.style.pointerEvents = 'none';
    }
  }

  // Utility method to get localized text
  static getLocalizedText(key, lang = null) {
    lang = lang || document.documentElement.lang || 'en';

    const translations = {
      en: {
        change_language: 'Change Language',
        language: 'Language',
        english: 'English',
        spanish: 'Español',
      },
      es: {
        change_language: 'Cambiar Idioma',
        language: 'Idioma',
        english: 'English',
        spanish: 'Español',
      },
    };

    return translations[lang]?.[key] || key;
  }
}

// Initialize language switcher
new LanguageSwitcher();

// Export for global access
window.LanguageSwitcher = LanguageSwitcher;
