export const languages = {
    en: 'EN',
    es: 'ES',
};

export const defaultLang = 'en';

import { translations } from '../data/translations';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in languages) return lang as keyof typeof languages;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
    return function t(key: keyof typeof translations) {
        return translations[key]?.[lang] || key;
    }
}
