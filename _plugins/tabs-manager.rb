Jekyll::Hooks.register :site, :post_read do |site|
  # Create language-specific tab collections
  spanish_tabs = []
  
  site.pages.each do |page|
    if page.path.start_with?('es/') && page.data['order']
      # Add Spanish tabs to the tabs collection
      spanish_tabs << page
    end
  end
  
  # Sort Spanish tabs by order
  spanish_tabs.sort_by! { |tab| tab.data['order'] }
  
  # Store Spanish tabs in site data for use in templates
  site.data['spanish_tabs'] = spanish_tabs
end