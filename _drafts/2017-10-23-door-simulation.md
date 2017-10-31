---
layout: post
title: Door simulation
date: 2017-10-23 14:00:00
excerpt: A door simulation
category: [coding, physics]
usemath: true;
usep5js: true;
---

{% comment %}
Here we add something to the header: the files of the particular simulation we are talking of.
{% endcomment %}
<head>
<script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/door.js"></script>
<script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/doorway.js"></script>
<script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/spring.js"></script>
<script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/test_p5JS.js"></script>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/javascript/door-simulation/styles.css">
</head>

Press the mouse button to apply a force to the door! If you want you can change the simulation parameter like the _stiffness/elasticity_ of the spring, the amount of _losses_ of the system or the door _mass_: simply use the sliders below.

<div id="container"></div>
