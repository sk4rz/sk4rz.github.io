Jekyll::Hooks.register :site, :post_read do |site|
  # Filter tabs by language for the sidebar
  return unless site.collections['tabs']
  
  site.collections['tabs'].docs.each do |tab|
    # Set default language if not specified
    tab.data['lang'] ||= 'en'
  end
end

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  # Skip if tabs collection doesn't exist
  return unless site.collections['tabs']
  
  # Filter tabs based on current page language
  current_page = payload['page']
  
  # Safely get current language with multiple fallbacks
  current_lang = case
                 when current_page && current_page['lang']
                   current_page['lang']
                 when payload['site'] && payload['site']['lang']
                   payload['site']['lang']
                 when site.config['lang']
                   site.config['lang']
                 else
                   'en'
                 end
  
  # Filter tabs collection to show only tabs matching current language
  filtered_tabs = site.collections['tabs'].docs.select do |tab|
    (tab.data['lang'] || 'en') == current_lang
  end
  
  # Sort by order if order is specified
  filtered_tabs.sort_by! { |tab| tab.data['order'] || 999 }
  
  # Replace the tabs collection with filtered tabs
  payload['site']['tabs'] = filtered_tabs
end