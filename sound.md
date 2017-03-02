---
layout: page
title: Sound
---

Welcome to our sound design page. Here's a collection of all our sound design works, including sound samples, videos, sound tools and articles about sound and sound design techniques.

This is not the only place where we talk about sound: check-out [Valentina](https://freesound.org/people/valentina_lore/) and [Nicola](https://freesound.org/people/nicola_ariutti/) **FreeSound** profiles to listen and download our _Creative Common_ sound recordings.

---

<!-- sezioni TAGS -->

## Tools & techniques
This list is dedicated to sound and sound designing tools and techniques. We will talk about Pure Data, Praat, FMOD, Wwise, Ableton, and more...

{% for post in site.posts%}
{% if post.category contains 'sound-design' and post.category contains 'tool' %}

<div>

<a href="{{site.baseurl}}{{post.url}}">
{% if post.shortcut %}
<img src="{{site.baseurl}}/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="{{site.baseurl}}/assets/images/shortcuts/shortcut-E.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{site.baseurl}}{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />

</div>

{%endif%}
{% endfor %}

<!--
<ul>
{% for post in site.posts%}
{% if post.category contains 'sound-design' and post.category contains 'tool' %}
<li>
  <a href="{{site.baseurl}}{{ post.url }}">{{ post.title }}</a>
  <img src="{{site.baseurl}}/assets/images/shortcuts/shortcut-E.png" alt="gianni" />
</li>
{%endif%}
{% endfor %}
</ul>
-->


## Works
This list contains articles about our sound design works:

{% for post in site.posts%}
{% if post.category contains 'sound-design' and post.category contains 'work' %}

<div>

<a href="{{site.baseurl}}{{post.url}}">
{% if post.shortcut %}
<img src="{{site.baseurl}}/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="{{site.baseurl}}/assets/images/shortcuts/shortcut-default-sound.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{site.baseurl}}{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />

</div>

{%endif%}
{% endfor %}
