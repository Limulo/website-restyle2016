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

{% endif %}
{% endfor %}

{% endcomment %}

## Our Experiments

Here some of our experiments in _game design_.


{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'experiment' %}

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

{% endif %}
{% endfor %}


{% comment %}
## Curiosity

Curious fact about our preferred games:

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'curiosity' %}

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

{% endif %}
{% endfor %}


## Do you remember?

There are games that will remain in our heart forever: these are a few of our preferred games we used to play with when we were children.

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'abandonia' %}

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

{% endif %}
{% endfor %}



## SCUMM and Adventure Games

Scumm, ScummVM e le avventure grafiche della LucasArts
Pagina dedicata alle avventure grafiche della LucasArts, all'engine SCUMM e al progetto ScummVM.

Questa sezione è dedicato al progetto **ScummVM**, a **SCUMM** e alle avventure grafiche in generale (specie quelle targate **LucasArts**)!

Chi ha già qualche capello bianco ricorderà certo con affetto i momenti trascorsi davanti un vecchio computer a vivere avventure magnifiche la cui trama si snodava, un click dopo l'altro, regalando momenti veri ed emozioni intense.

Ebbene oggi tutti quei momenti sarebbero solo ricordi, perduti - _come lacrime nella pioggia_ - se non fosse per il contributo del team di ScummVM.

ScummVM ci rende possibile rivivere quelle avventure, rivisitare un po' la nostra infanzia per immergerci ancora nelle stesse senzazioni, riaccendendo emozioni sopite ormai da alcuni decenni.

Qui esamineremo un po' per volta il lavoro svolto dal team ScummVM nel tradurre e analizzare il funzionamento dell'engine SCUMM; condivideremo le nostre osservazioni e tutto quello che riusciremo a raccimolare sulla rete in relazione al mondo di SCUMM e al funzionamento delle avventure grafiche SCUMM-based.

{% for post in site.posts%}
{% if post.category contains 'game' and post.category contains 'scumm' %}

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

{% endif %}
{% endfor %}


{% endcomment %}
