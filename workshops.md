---
layout: page
title: Workshops & Teachings
---

Welcome to our **workshops** and **teaching** page!

## Workshop

{% for post in site.posts%}
{% if post.category contains 'workshop' %}

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
{% endfor %}


## Teaching

{% for post in site.posts%}
{% if post.category contains 'teaching' %}

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
{% endfor %}
