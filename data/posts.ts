import { Post } from '../types';

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: { en: "Hello, World", es: "Hola, Mundo" },
    date: "2025-11-11",
    tags: ["intro", "meta", "blogging"],
    excerpt: {
      en: "Welcome to my new blog! This is the first post, a classic 'Hello, World' to get things started. Here I'll be documenting my journey into malware, hacking, and low-level systems.",
      es: "¡Bienvenido a mi nuevo blog! Esta es la primera publicación, un clásico 'Hola Mundo' para empezar. Aquí documentaré todo mi aprendizaje sobre malware, hacking y bajo nivel.",
    }
  },
  {
    slug: "malware-development-part1",
    title: { en: "Malware Development Part 1", es: "Desarrollo de Malware Parte 1" },
    date: "2025-11-11",
    tags: ["malware", "development", "security", "part1", "series"],
    excerpt: {
      en: "We'll start with the basics: An introduction to Windows internals for malware, covering PE format, structures like PEB, and advanced methods to enumerate modules and resolve functions dynamically without standard APIs.",
      es: "Comenzaremos por lo fundamental: Introducción a la ingeniería interna de Windows para malware, abordando formato PE, estructuras como PEB, y métodos avanzados para enumerar módulos y resolver funciones dinámicamente sin APIs estándar."
    }
  }
];
