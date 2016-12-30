---
layout: page
title: Games
---

Welcome to our **Games** page!

This is still a **WIP** page but in the meantime you can have a look at...

{% comment %}
## Tools and Techiques

What we have understood about videogames working principles:

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'tecnique' %}

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

{% endcomment %}

## Our Experiments

Here some of our experiments in _game design_.


{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'experiment' %}

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


{% comment %}
## Curiosity

Curious fact about our preferred games:

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'curiosity' %}

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


## Do you remember?

There are games that will remain in our heart forever: these are a few of our preferred games we used to play with when we were children.

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'abandonia' %}

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

{% endcomment %}
