/**
 * Language-aware post filtering for Jekyll Chirpy theme
 * Author: sk4rz
 * Description: Filters posts by language using Jekyll metadata
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('Post filter script loaded');
  // Small delay to ensure DOM is fully loaded
  setTimeout(() => {
    if (window.location.pathname === '/' || window.location.pathname === '/es/') {
      console.log('Running post filter for path:', window.location.pathname);
      filterPostsByLanguage();
    }
  }, 100);
});

function filterPostsByLanguage() {
  // Get metadata from Jekyll
  const metadataElement = document.getElementById('posts-metadata');
  if (!metadataElement) {
    console.log('Posts metadata not found');
    return;
  }

  let metadata;
  try {
    metadata = JSON.parse(metadataElement.textContent);
  } catch (e) {
    console.error('Failed to parse posts metadata:', e);
    return;
  }

  const currentPath = window.location.pathname;
  const isSpanish = currentPath.startsWith('/es/') || metadata.isSpanishPage;
  const postList = document.getElementById('post-list');

  console.log('Current path:', currentPath, 'Is Spanish:', isSpanish);
  console.log('Posts metadata:', metadata);

  if (!postList) {
    console.log('Post list not found');
    return;
  }

  const articles = postList.querySelectorAll('article');
  console.log('Found articles:', articles.length);
  
  let visibleCount = 0;

  articles.forEach((article, index) => {
    const linkElement = article.querySelector('a[href*="/posts/"]');
    if (!linkElement) {
      console.log('No post link found for article', index);
      return;
    }

    const postUrl = linkElement.getAttribute('href');
    const postData = metadata.posts.find(post => post.url === postUrl);
    
    if (!postData) {
      console.log('Post data not found for:', postUrl);
      return;
    }

    const postLang = postData.lang || 'en';
    console.log('Processing post:', postData.title, 'Language:', postLang);

    let shouldShow = false;

    if (isSpanish) {
      // On Spanish page, show only Spanish posts
      shouldShow = postLang === 'es';
    } else {
      // On English page, show only English posts
      shouldShow = postLang === 'en';
    }

    console.log('Post:', postData.title, 'Lang:', postLang, 'Should show:', shouldShow);

    if (shouldShow) {
      article.style.display = 'block';
      visibleCount++;
    } else {
      article.style.display = 'none';
    }
  });

  console.log('Visible posts:', visibleCount);

  // Add message if no posts are visible
  if (visibleCount === 0) {
    const currentLang = isSpanish ? 'es' : 'en';
    const noPostsMsg =
      currentLang === 'es'
        ? 'No hay publicaciones en español disponibles aún.'
        : 'No English posts available yet.';

    const emptyState = document.createElement('div');
    emptyState.className = 'text-center text-muted py-5';
    emptyState.innerHTML = `
      <i class="fas fa-file-alt fa-3x mb-3"></i>
      <p>${noPostsMsg}</p>
    `;
    postList.appendChild(emptyState);
  }
}
