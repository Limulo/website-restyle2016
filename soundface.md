---
layout: page
title: Soundface
shortcut: shortcut-soundface.png
excerpt: An interactive musical surface!
category: [installation]
---


**Long story short**: it's an interactive tangible surface. Like a table. It's possible to interact with the surface by placing little objects with different shapes upon it.

[![soundface](/assets/images/soundface/introduzione/orizzontale.jpg)]({{site.url}}/assets/images/soundface/introduzione/orizzontale.jpg)

Every object is associated with a sound and and image. The surface reacts creating graphics and sounds in real time.

![soundface players](/assets/images/soundface/introduzione/players_1.jpg){: width="100%"}

{% comment %}
[![soundface players](/assets/images/soundface/introduzione/giocatori-1.jpg"){: width="100%"}]({{site.url}}/assets/images/soundface/introduzione/giocatori-1.jpg") | [![soundface players](/assets/images/soundface/introduzione/giocatori-3.jpg"){: width="100%"}]({{site.url}}/assets/images/soundface/introduzione/giocatori-3.jpg")
{% endcomment %}

The software has been developed using **openFrameworks** libraries with some external addons, such as _ofxTUIO_ and _ofxOSC_. The audio is procedurally produced by a **Pure Data** patch we specifically developed.

<iframe width="100%" height="360" src="http://www.youtube.com/embed/0xcAOFFxWuc" allowfullscreen></iframe>

---

{% for post in site.posts%}
{% if post.category contains 'installation' %}
{% if post.category contains 'soundface' %}

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
