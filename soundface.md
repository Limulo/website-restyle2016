---
layout: page
title: Soundface
shortcut: shortcut-soundface.png
excerpt: An interactive musical surface!
category: [installation]
---


**Long story short**: it's an interactive tangible surface. Like a table. It's possible to interact with the surface by placing little objects with different shapes upon it.

[![soundface]({{site.baseurl}}/assets/images/soundface/teaser/orizzontale.jpg)]({{site.baseurl}}/assets/images/soundface/teaser/orizzontale.jpg)

Every object is associated with a sound and and image.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/tiX9etAAEcI" frameborder="0" allowfullscreen></iframe>

The surface reacts creating graphics and sounds in real time.

![red haired girl]({{site.baseurl}}/assets/images/soundface/teaser/P1020359.jpg){: width="100%"} | ![CMYK elk]({{site.baseurl}}/assets/images/soundface/teaser/P1020363.jpg){: width="100%"}

![hands on]({{site.baseurl}}/assets/images/soundface/teaser/P1020308.jpg){: width="100%"}

The software has been developed using **openFrameworks** libraries with some external addons, such as _ofxTUIO_ and _ofxOSC_.

![ohibo]({{site.baseurl}}/assets/images/soundface/teaser/IMG_1802_marked.jpg)

The audio is procedurally produced by a **Pure Data** patch we specifically developed.

<iframe width="100%" height="360" src="http://www.youtube.com/embed/0xcAOFFxWuc" allowfullscreen></iframe>

---

{% for post in site.posts%}
{% if post.category contains 'installation' %}
{% if post.category contains 'soundface' %}

<div>
<a href="{{site.baseurl}}{{post.url}}">
{% if post.shortcut %}
<img src="{{site.baseurl}}/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="{{site.baseurl}}/assets/images/shortcuts/shortcut-default-installations.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{site.baseurl}}{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />
</div>

{% endif %}
{% endif %}
{% endfor %}
