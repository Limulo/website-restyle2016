---
layout: page
title: Coding
---

Welcome to our **coding** page!

This page is a collector of thoughts, ideas and projects. Every day a new interest leads us to explore a new field of study.

Everything that can not be otherwise classified will be piled on this page waiting, perhaps, to grow up becoming a brand new project!

Enjoy

### Physical Computing
A bunch of posts related to Arduino, RaspberryPi and electronics:

{% for post in site.posts %}
{% if post.category contains 'coding' and post.category contains 'physical-computing' %}

<div>

<a href="{{post.url}}">
{% if post.shortcut %}
<img src="/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-default-coding.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />

</div>

{% endif %}
{% endfor %}

### Graphics
A bunch of posts related to graphics:

{% for post in site.posts %}
{% if post.category contains 'coding' and post.category contains 'graphics' %}

<div>

<a href="{{post.url}}">
{% if post.shortcut %}
<img src="/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-default-coding.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />

</div>

{% endif %}
{% endfor %}

### Grammars
A bunch of posts related to grammars:

{% for post in site.posts %}
{% if post.category contains 'coding' and post.category contains 'grammar' %}

<div>

<a href="{{post.url}}">
{% if post.shortcut %}
<img src="/assets/images/shortcuts/{{post.shortcut}}" alt="{{post.title}}" class="shortcut-image"/>
{% else %}
<img src="/assets/images/shortcuts/shortcut-default-coding.png" alt="{{post.title}}" class="shortcut-image"/>
{% endif %}
</a>

<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
{{ post.excerpt}}

<hr class="clear" />

</div>

{% endif %}
{% endfor %}

{% comment %}
### Arduino e Processing
A collection of _Interaction Design_ project realized using _Arduino_ and _Processing_ programming languages.

<ul>
<li><a href="#patterns-frattali">Graphical Patterns and Fractals</a> </li>
<li><a href="#color-tracking">Color Tracking</a> </li>
<li><a href="#interfaccia">Interface Example</a></li>
<li><a href="#videoclip-maker">Automatic Videoclip Maker</a></li>
<li><a href="#devantech-arduino">Devantech + Arduino</a></li>
<li><a href="#processing-arduino">Processing and Arduino</a></li>
<li><a href="#arduino-ultrasonic-theremin">Arduino Ultrasonic theremim</a></li>
</ul>    

### Mathematics, Physics, Algorithms, Simulations

<ul>
<li><a href="#galton-box">Galton Box Simulator</a> (with Processing and Box2D library)</li>
<li><a href="#convex-hull">Convex Hull - Graham Algorithm </a> (with Processing)</li>
<li><a href="#pendulum">Pendulum Wave </a> (with Quartz Composer)</li>
<li><a href="#libreria-box2d">Box2D for videogames</a></li>
</ul>   
{% endcomment %}
