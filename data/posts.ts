import { Post } from '../types';

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: { en: "Hello, World", es: "Hola, Mundo" },
    date: "2024-07-21",
    tags: ["intro", "meta", "blogging"],
    excerpt: {
      en: "Welcome to my new blog! This is the first post, a classic 'Hello, World' to get things started. Here I'll be documenting my journey into malware, hacking, and low-level systems.",
      es: "¡Bienvenido a mi nuevo blog! Esta es la primera publicación, un clásico 'Hola, Mundo' para empezar. Aquí documentaré mi viaje en el mundo del malware, el hacking y los sistemas de bajo nivel.",
    },
  },
  {
    slug: "setting-up-the-environment",
    title: { en: "Setting Up the Dev Environment", es: "Configurando el Entorno de Desarrollo" },
    date: "2024-07-20",
    tags: ["dev", "tools", "setup"],
    excerpt: {
      en: "A quick guide on setting up the perfect development environment for low-level programming and reverse engineering.",
      es: "Una guía rápida para configurar el entorno de desarrollo perfecto para programación de bajo nivel e ingeniería inversa.",
    },
  },
  {
    slug: "understanding-x86-assembly",
    title: { en: "Understanding x86 Assembly", es: "Entendiendo Ensamblador x86" },
    date: "2024-07-19",
    tags: ["assembly", "x86", "low-level"],
    excerpt: {
      en: "A beginner's dive into the world of x86 assembly language, covering basic instructions and registers.",
      es: "Una inmersión para principiantes en el mundo del lenguaje ensamblador x86, cubriendo instrucciones y registros básicos.",
    },
  },
  {
    slug: "malware-analysis-basics",
    title: { en: "Malware Analysis Basics", es: "Conceptos Básicos de Análisis de Malware" },
    date: "2024-07-18",
    tags: ["malware", "security", "intro"],
    excerpt: {
      en: "An introduction to the fundamental concepts of malware analysis, including static and dynamic analysis techniques.",
      es: "Una introducción a los conceptos fundamentales del análisis de malware, incluyendo técnicas de análisis estático y dinámico.",
    },
  },
    {
    slug: "reverse-engineering-a-simple-crackme",
    title: { en: "Reverse Engineering a Simple CrackMe", es: "Ingeniería Inversa de un CrackMe Sencillo" },
    date: "2024-07-15",
    tags: ["reverse-engineering", "ctf", "assembly"],
    excerpt: {
      en: "A step-by-step walkthrough of solving a beginner-level 'CrackMe' challenge using reverse engineering techniques.",
      es: "Un tutorial paso a paso para resolver un desafío 'CrackMe' de nivel principiante utilizando técnicas de ingeniería inversa.",
    },
  },
  {
    slug: "the-stack-and-buffer-overflows",
    title: { en: "The Stack and Buffer Overflows", es: "La Pila y los Desbordamientos de Búfer" },
    date: "2024-07-12",
    tags: ["exploitation", "security", "low-level"],
    excerpt: {
      en: "Exploring how the stack works in memory and how buffer overflow vulnerabilities can be exploited.",
      es: "Explorando cómo funciona la pila en la memoria y cómo se pueden explotar las vulnerabilidades de desbordamiento de búfer.",
    },
  },
  {
    slug: "linux-privilege-escalation",
    title: { en: "Linux Privilege Escalation", es: "Escalada de Privilegios en Linux" },
    date: "2024-07-10",
    tags: ["linux", "security", "pentesting"],
    excerpt: {
      en: "Common techniques for escalating privileges on a Linux system, from misconfigured cron jobs to kernel exploits.",
      es: "Técnicas comunes para la escalada de privilegios en un sistema Linux, desde trabajos cron mal configurados hasta exploits del kernel.",
    },
  },
    {
    slug: "introduction-to-ghidra",
    title: { en: "Introduction to Ghidra", es: "Introducción a Ghidra" },
    date: "2024-07-08",
    tags: ["tools", "reverse-engineering", "ghidra"],
    excerpt: {
      en: "A first look at the powerful open-source reverse engineering tool Ghidra, developed by the NSA.",
      es: "Un primer vistazo a la potente herramienta de ingeniería inversa de código abierto Ghidra, desarrollada por la NSA.",
    },
  },
  {
    slug: "what-is-shellcode",
    title: { en: "What is Shellcode?", es: "¿Qué es el Shellcode?" },
    date: "2024-07-05",
    tags: ["exploitation", "assembly", "security"],
    excerpt: {
      en: "Breaking down the concept of shellcode: what it is, how it works, and how to write a simple one.",
      es: "Desglosando el concepto de shellcode: qué es, cómo funciona y cómo escribir uno simple.",
    },
  },
  {
    slug: "rop-chains-explained",
    title: { en: "ROP Chains Explained", es: "Explicación de las Cadenas ROP" },
    date: "2024-07-02",
    tags: ["exploitation", "security", "rop"],
    excerpt: {
      en: "An overview of Return-Oriented Programming (ROP), a powerful technique to bypass modern exploit mitigations like DEP.",
      es: "Una visión general de la Programación Orientada al Retorno (ROP), una técnica poderosa para eludir las mitigaciones de exploits modernos como DEP.",
    },
  },
    {
    slug: "building-a-keylogger",
    title: { en: "Building a Simple Keylogger", es: "Construyendo un Keylogger Simple" },
    date: "2024-06-28",
    tags: ["malware", "python", "dev"],
    excerpt: {
      en: "A tutorial on how to build a basic keylogger in Python for educational purposes. We'll explore how malware can capture keystrokes.",
      es: "Un tutorial sobre cómo construir un keylogger básico en Python con fines educativos. Exploraremos cómo el malware puede capturar las pulsaciones de teclas.",
    },
  }
];
