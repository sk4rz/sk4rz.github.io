module Jekyll
  module LanguageHelper
    def t(key, lang = nil)
      lang ||= @context.registers[:site].config['lang'] || 'en'
      locales = @context.registers[:site].data['locales'] || {}
      
      keys = key.split('.')
      result = locales[lang]
      
      keys.each do |k|
        result = result[k] if result.is_a?(Hash)
      end
      
      result || key
    end
    
    def current_lang
      @context.registers[:site].config['lang'] || 'en'
    end
    
    def available_languages
      @context.registers[:site].config['available_languages'] || ['en']
    end
    
    def language_url(lang)
      page = @context.registers[:page]
      site = @context.registers[:site]
      
      current_url = page['url']
      base_url = site.config['baseurl'] || ''
      
      if lang == site.config['default_lang'] || lang == 'en'
        "#{base_url}#{current_url}"
      else
        "#{base_url}/#{lang}#{current_url}"
      end
    end
    
    def lang_flag(lang)
      flags = {
        'en' => '🇺🇸',
        'es' => '🇪🇸'
      }
      flags[lang] || '🌐'
    end
    
    def lang_name(lang)
      names = {
        'en' => 'English',
        'es' => 'Español'
      }
      names[lang] || lang
    end
  end
end

Liquid::Template.register_filter(Jekyll::LanguageHelper)