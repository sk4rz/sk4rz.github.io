Jekyll::Hooks.register :site, :post_read do |site|
  # Set language for pages based on path
  site.pages.each do |page|
    if page.path.start_with?('es/')
      page.data['lang'] = 'es'
    elsif page.data['lang'].nil?
      page.data['lang'] = 'en'
    end
  end
  
  # Set language for posts based on path
  site.posts.docs.each do |post|
    if post.path.include?('/es/_posts/')
      post.data['lang'] = 'es'
    elsif post.data['lang'].nil?
      post.data['lang'] = 'en'
    end
  end
end

Jekyll::Hooks.register :pages, :pre_render do |page, payload|
  # Set site language based on current page
  if page.data['lang']
    payload['site']['lang'] = page.data['lang']
  end
end

Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  # Set site language based on current post
  if post.data['lang']
    payload['site']['lang'] = post.data['lang']
  end
end