
export interface Post {
  slug: string;
  title: {
    en: string;
    es: string;
  };
  date: string;
  tags: string[];
  excerpt: {
    en: string;
    es: string;
  };
}

export interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}
