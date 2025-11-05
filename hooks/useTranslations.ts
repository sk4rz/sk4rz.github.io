
import { useLocalization } from '../context/LocalizationContext';
import { translations } from '../data/translations';

export const useTranslations = () => {
  const { language } = useLocalization();

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return t;
};