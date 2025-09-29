Jekyll::Hooks.register :site, :post_read do |site|
  # Set language based on path
  site.pages.each do |page|
    if page.path.start_with?('es/')
      page.data['lang'] = 'es'
    else
      page.data['lang'] ||= 'en'
    end
  end
  
  # Set language for posts
  site.posts.docs.each do |post|
    if post.path.include?('/es/')
      post.data['lang'] = 'es'
    else
      post.data['lang'] ||= 'en'
    end
  end
end

Jekyll::Hooks.register :site, :pre_render do |site|
  # Update site config based on current page language
  current_lang = site.config['lang'] || 'en'
  
  if site.config['languages'] && site.config['languages'][current_lang]
    lang_config = site.config['languages'][current_lang]
    site.config['title'] = lang_config['title'] if lang_config['title']
    site.config['tagline'] = lang_config['tagline'] if lang_config['tagline']
    site.config['description'] = lang_config['description'] if lang_config['description']
  end
end