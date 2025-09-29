Jekyll::Hooks.register :site, :post_read do |site|
  # Set default language for posts and pages if not specified
  site.pages.each do |page|
    if page.path.start_with?('es/')
      page.data['lang'] ||= 'es'
    else
      page.data['lang'] ||= 'en'
    end
  end
  
  site.posts.docs.each do |post|
    post.data['lang'] ||= 'en' # Default to English if not specified
  end
end