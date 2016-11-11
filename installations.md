---
layout: page
title: Installations
---

Welcome to our interactive installation page.

## Works

See our installation in action.


{% for page in site.pages%}
{% if page.category contains 'installation' %}
{% if page.category contains 'issue' %}


{%  else %}

<div>
<a href="{{page.url}}">
{% if page.shortcut %}
<img src="/assets/images/shortcuts/{{page.shortcut}}" alt="{{page.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-E.png" alt="{{page.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{page.url}}">{{ page.title }}</a></h3>
{{ page.excerpt}}

<hr class="clear" />
</div>

{% endif %}
{% endif %}
{% endfor %}




{% for post in site.posts%}
{% if post.category contains 'installation' %}
{% if post.category contains 'issue' or post.category contains 'soundface' %}


{%  else %}

<div>
<a href="{{post.url}}">
{% if post.shortcut %}
<img src="/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-E.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />
</div>

{% endif %}
{% endif %}
{% endfor %}

## Issues

Shit happens (also to good people):

{% for post in site.posts%}
{% if post.category contains 'installation' %}
{% if post.category contains 'issue' %}

<div>
<a href="{{post.url}}">
{% if post.shortcut %}
<img src="/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-E.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />
</div>

{% endif %}
{% endif %}
{% endfor %}
