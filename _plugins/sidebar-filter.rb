Jekyll::Hooks.register :site, :post_read do |site|
  # Filter tabs by language for the sidebar
  site.collections['tabs'].docs.each do |tab|
    # Set default language if not specified
    tab.data['lang'] ||= 'en'
  end
end

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  # Filter tabs based on current page language
  current_page = payload['page']
  current_lang = current_page['lang'] || 'en'
  
  # Filter tabs collection to show only tabs matching current language
  filtered_tabs = site.collections['tabs'].docs.select do |tab|
    tab.data['lang'] == current_lang
  end
  
  # Sort by order
  filtered_tabs.sort_by! { |tab| tab.data['order'] || 999 }
  
  # Replace the tabs collection with filtered tabs
  payload['site']['tabs'] = filtered_tabs
end