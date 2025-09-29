---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
lang: en
title: "About"
---

## {{ site.data.locales[site.lang].author.about_title | default: "About Me" }}

{{ site.data.locales[site.lang].author.bio_description | default: site.author.bio | markdownify }}

## {{ site.data.locales[site.lang].author.skills_title | default: "Technical Skills" }}

{% for skill in site.author.skills %}
- {{ skill }}
{% endfor %}

## {{ site.data.locales[site.lang].author.interests_title | default: "Areas of Interest" }}

{% for interest in site.author.interests %}
- {{ interest }}
{% endfor %}

## {{ site.data.locales[site.lang].author.learning_title | default: "Learning Journey" }}

{{ site.data.locales[site.lang].author.learning_description | markdownify }}

## {{ site.data.locales[site.lang].author.blog_title | default: "About This Blog" }}

{{ site.data.locales[site.lang].author.blog_description | markdownify }}

## {{ site.data.locales[site.lang].author.contact_title | default: "Get In Touch" }}

{{ site.data.locales[site.lang].author.contact_description | markdownify }}

{% for link in site.social.links %}
- [{{ link | split: '//' | last | split: '/' | first | capitalize }}]({{ link }})
{% endfor %}
