Jekyll::Hooks.register :site, :post_read do |site|
  # Set default language for all tabs and remove language-specific duplicates
  return unless site.collections['tabs']
  
  # Set default language
  site.collections['tabs'].docs.each do |tab|
    tab.data['lang'] ||= 'en'
  end
  
  # Get the current language from site config
  current_lang = site.config['lang'] || 'en'
  
  # Filter out tabs that don't match the current language
  filtered_docs = site.collections['tabs'].docs.select do |tab|
    (tab.data['lang'] || 'en') == current_lang
  end
  
  # Replace the docs array
  site.collections['tabs'].docs.replace(filtered_docs)
end

# Add JavaScript to filter sidebar after page load
Jekyll::Hooks.register :site, :post_write do |site|
  # Create a JavaScript file to handle sidebar filtering
  js_content = <<~JS
    document.addEventListener('DOMContentLoaded', function() {
      // Get current page language
      var currentLang = document.documentElement.lang || 'en';
      if (document.body.classList.contains('es') || window.location.pathname.includes('/es/')) {
        currentLang = 'es';
      }
      
      // Define tab mappings
      var tabMappings = {
        'en': ['Home', 'Categories', 'Tags', 'Archives', 'About'],
        'es': ['Inicio', 'Categorías', 'Etiquetas', 'Archivo', 'Acerca de']
      };
      
      // Hide duplicate tabs
      var sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
      var seenTabs = new Set();
      
      sidebarLinks.forEach(function(link) {
        var linkText = link.querySelector('span');
        if (linkText) {
          var text = linkText.textContent.trim();
          
          // Check if this tab should be shown in current language
          var shouldShow = tabMappings[currentLang].includes(text);
          
          if (!shouldShow || seenTabs.has(text)) {
            link.style.display = 'none';
          } else {
            seenTabs.add(text);
            link.style.display = '';
          }
        }
      });
    });
  JS
  
  # Write the JavaScript file
  js_file_path = File.join(site.dest, 'assets', 'js', 'sidebar-filter.js')
  FileUtils.mkdir_p(File.dirname(js_file_path))
  File.write(js_file_path, js_content)
end