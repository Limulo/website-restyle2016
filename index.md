---
layout: default
title: Home
---

**limulo.net** is a [Valentina Lore'](about.html) and [Nicola Ariutti](about.html) project.
We are sound engineers with a passion for computer science, programming and videogames (among many other things!!!).

**limulo.net** main goal is to explore different areas of IT, ranging from sound synthesis to AI, from physics simulations to 3D graphics, from web applications to videogames.

Everything we discover, experiment and play with can be found on this site, for free (as in speech, and also in beer!).
Seriuosly, we're huge fans of free software, open source and free sharing of ideas. So feel free to download everything you want, and share with us your thoughts, ideas and suggestions!

**Enjoy**

<hr />

<div> <!-- SHORTCUTs images -->
{% for post in site.posts %}
{% if post.shortcut %}
<a href="{{ post.url }}">
  <img src="{{site.url}}/assets/images/shortcuts/{{ post.shortcut }}"
     class="shortcut-image"
     alt="{{ post.title }}"
     title="{{ post.title }}" />
</a>
{% endif %}
{% endfor %}
</div>

<!-- La parte sottostante è da eliminare

<div class="pagination">
  {% if paginator.next_page %}
    <a class="pagination-item older" href="{{ site.baseurl }}page{{paginator.next_page}}">Older</a>
  {% else %}
    <span class="pagination-item older">Older</span>
  {% endif %}
  {% if paginator.previous_page %}
    {% if paginator.page == 2 %}
      <a class="pagination-item newer" href="{{ site.baseurl }}">Newer</a>
    {% else %}
      <a class="pagination-item newer" href="{{ site.baseurl }}page{{paginator.previous_page}}">Newer</a>
    {% endif %}
  {% else %}
    <span class="pagination-item newer">Newer</span>
  {% endif %}
</div>
-->
