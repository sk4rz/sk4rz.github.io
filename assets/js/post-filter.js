/**
 * Language-aware post filtering for Jekyll Chirpy theme
 * Author: sk4rz
 * Description: Filters posts by language on the homepage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on homepage
  if (window.location.pathname === '/' || window.location.pathname === '/es/') {
    filterPostsByLanguage();
  }
});

function filterPostsByLanguage() {
  const currentPath = window.location.pathname;
  const isSpanish = currentPath.startsWith('/es/');
  const postList = document.getElementById('post-list');
  
  if (!postList) return;
  
  const articles = postList.querySelectorAll('article');
  let visibleCount = 0;
  
  articles.forEach(article => {
    const titleElement = article.querySelector('h1, .card-title');
    if (!titleElement) return;
    
    const title = titleElement.textContent.trim();
    const categories = article.querySelector('.categories')?.textContent || '';
    
    // Detect Spanish posts by title and categories
    const spanishKeywords = ['Bienvenidos', 'Blog de sk4rz', 'Ciberseguridad', 'Desarrollo', 'Introducción'];
    const englishKeywords = ['Welcome', 'sk4rz Blog', 'Cybersecurity', 'Development', 'Introduction'];
    
    const isSpanishPost = spanishKeywords.some(keyword => 
      title.includes(keyword) || categories.includes(keyword)
    );
    
    const isEnglishPost = englishKeywords.some(keyword => 
      title.includes(keyword) || categories.includes(keyword)
    );
    
    // Show/hide based on current language context
    let shouldShow = false;
    
    if (isSpanish) {
      shouldShow = isSpanishPost || (!isSpanishPost && !isEnglishPost && title.includes('sk4rz') && title.match(/[áéíóúñ]/));
    } else {
      shouldShow = isEnglishPost || (!isSpanishPost && !isEnglishPost && !title.match(/[áéíóúñ]/));
    }
    
    if (shouldShow) {
      article.style.display = 'block';
      visibleCount++;
    } else {
      article.style.display = 'none';
    }
  });
  
  // Add message if no posts are visible
  if (visibleCount === 0) {
    const currentLang = isSpanish ? 'es' : 'en';
    const noPostsMsg = currentLang === 'es' ? 
      'No hay publicaciones en español disponibles aún.' : 
      'No English posts available yet.';
    
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center text-muted py-5';
    emptyState.innerHTML = `
      <i class="fas fa-file-alt fa-3x mb-3"></i>
      <p>${noPostsMsg}</p>
    `;
    postList.appendChild(emptyState);
  }
}