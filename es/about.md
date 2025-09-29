---
layout: page
icon: fas fa-info-circle
order: 4
lang: es
title: "Acerca de"
---

## {{ site.data.locales.es.author.about_title }}

{{ site.data.locales.es.author.bio_description | markdownify }}

## {{ site.data.locales.es.author.skills_title }}

{% for skill in site.author.skills %}
- {{ skill }}
{% endfor %}

## {{ site.data.locales.es.author.interests_title }}

{% for interest in site.author.interests %}
- {{ interest }}
{% endfor %}

## {{ site.data.locales.es.author.learning_title }}

{{ site.data.locales.es.author.learning_description | markdownify }}

## {{ site.data.locales.es.author.blog_title }}

{{ site.data.locales.es.author.blog_description | markdownify }}

## {{ site.data.locales.es.author.contact_title }}

{{ site.data.locales.es.author.contact_description | markdownify }}

{% for link in site.social.links %}
- [{{ link | split: '//' | last | split: '/' | first | capitalize }}]({{ link }})
{% endfor %}