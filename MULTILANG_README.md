# Sistema Multiidioma para Blog Jekyll

Este proyecto implementa un sistema completo de multiidioma (inglés/español) para el blog de sk4rz usando Jekyll y el tema Chirpy.

## Características Implementadas

### 🌐 Cambio de Idioma
- Selector de idioma flotante en la esquina superior derecha
- Persistencia de preferencia de idioma usando localStorage y cookies
- Redirección automática basada en preferencias del usuario
- Transiciones suaves entre idiomas

### 📁 Estructura de Archivos
```
├── _config.yml                    # Configuración principal (inglés)
├── _config_es.yml                 # Configuración para español
├── _data/
│   └── locales/
│       ├── en.yml                 # Traducciones en inglés
│       └── es.yml                 # Traducciones en español
├── _includes/
│   └── language-selector.html     # Componente selector de idioma
├── _plugins/
│   ├── language-helper.rb         # Filtros de Liquid para idiomas
│   └── language-hooks.rb          # Hooks de Jekyll para idiomas
├── assets/js/
│   └── language-switcher.js       # JavaScript del selector
├── _posts/                        # Posts en inglés
├── _tabs/                         # Páginas en inglés
└── es/                            # Contenido en español
    ├── index.html
    ├── about.md
    ├── archives.md
    ├── categories.md
    ├── tags.md
    └── _posts/                    # Posts en español
```

### 🎨 Componentes del Sistema

#### 1. Configuración (_config.yml)
- Información del autor personalizada
- Configuración de idiomas disponibles
- Metadatos específicos por idioma

#### 2. Archivos de Localización (_data/locales/)
- Traducciones completas de la interfaz
- Contenido del autor en ambos idiomas
- Textos de navegación y elementos comunes

#### 3. Selector de Idiomas
- Diseño responsive y accesible
- Soporte para modo oscuro/claro
- Animaciones y efectos hover
- Detección automática de idioma del navegador

#### 4. JavaScript Avanzado
- Gestión de preferencias de usuario
- Detección automática de idioma
- Transiciones suaves
- Almacenamiento persistente

### 🚀 Cómo Usar

#### Crear Contenido Bilingüe

**Posts en Inglés** (_posts/):
```markdown
---
layout: post
title: "Your English Title"
lang: en
categories: [Category1, Category2]
tags: [tag1, tag2]
---

Your English content here...
```

**Posts en Español** (es/_posts/):
```markdown
---
layout: post
title: "Tu Título en Español"
lang: es
categories: [Categoría1, Categoría2]
tags: [etiqueta1, etiqueta2]
---

Tu contenido en español aquí...
```

#### Usar Traducciones en Plantillas

```liquid
{{ site.data.locales[site.lang].commons.home }}
{{ site.data.locales[site.lang].author.about_title }}
```

#### Agregar Nuevas Traducciones

En `_data/locales/en.yml` y `_data/locales/es.yml`:
```yml
new_section:
  title: "New Title"
  description: "New description"
```

### 🔧 Funcionalidades Avanzadas

#### Detección Automática de Idioma
- Lee preferencias del localStorage
- Revisa cookies del navegador
- Usa idioma del navegador como fallback
- Redirección automática en la página principal

#### Persistencia de Preferencias
- Almacena preferencia en localStorage
- Crea cookie con expiración de 1 año
- Mantiene configuración entre sesiones

#### SEO Optimizado
- Metadatos específicos por idioma
- URLs amigables (/es/ para español)
- Etiquetas hreflang automáticas

### 🎨 Personalización del Diseño

El selector de idiomas incluye:
- Posicionamiento fijo responsive
- Efectos hover y transiciones
- Soporte completo para modo oscuro
- Iconos de banderas para identificación visual
- Menú dropdown con Bootstrap

### 🔍 Debugging y Desarrollo

Para probar el sistema:

1. **Servidor local**:
```bash
bundle exec jekyll serve
```

2. **Español**:
```bash
bundle exec jekyll serve --config _config.yml,_config_es.yml
```

3. **Verificar traducciones**:
- Navegue a `/es/` para contenido en español
- Use herramientas de desarrollador para verificar localStorage
- Pruebe el cambio de idioma en diferentes páginas

### 📱 Responsive Design

El selector funciona en:
- Desktop (posición fija esquina superior derecha)
- Tablet (adaptado al espacio disponible)
- Mobile (tamaño y posición optimizados)

### 🔐 Seguridad

- Validación de idiomas disponibles
- Sanitización de parámetros de URL
- Fallbacks seguros para traducciones faltantes

## Próximas Mejoras

- [ ] Sitemap multiidioma
- [ ] RSS feeds por idioma
- [ ] Búsqueda específica por idioma
- [ ] Alternador automático basado en geolocalización
- [ ] Soporte para más idiomas (francés, alemán)

## Mantenimiento

Para mantener el sistema:

1. **Agregar traducciones** en `_data/locales/`
2. **Crear contenido duplicado** en ambos idiomas
3. **Probar funcionalidad** en ambos idiomas regularmente
4. **Verificar enlaces** entre versiones de idiomas

---

**Autor**: Oscar (sk4rz)  
**Blog**: [sk4rz.github.io](https://sk4rz.github.io)  
**Versión**: 1.0  
**Última actualización**: Enero 2024