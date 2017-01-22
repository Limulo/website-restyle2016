---
layout: post
title: Monichromitor
date: 2016-11-20 12:40:00
excerpt: Monochrome Monitor Simulator (made with Processing, Pure Data and Natron)
category: [coding, graphics]
shortcut: shortcut-monichromitor.png
---

**Monichromitor**and **Monichromitor Sound Module** are respectively a **Processing** sketch and a **PureData** patch created to simulate a computer automatically writing on a monochrome monitor.

<iframe src="https://www.youtube.com/embed/Pm0qunstOkg" height="375" width="100%" allowfullscreen="" ></iframe>

_Monichromitor_ gives you the possibility to have this virtual computer printing any text on the screen according to what you put inside a _script_ file.

You can also use special script commands inside this file to make the computer do special operations like cleaning the screen or waiting in idle mode for some time.

While the Processing sketch provides the visual representation of the virtual monochrome monitor, PureData, receiving OSC messages from Processing, handles the corresponding sound synthesis.

![monichromitor working principle pt1](/assets/images/monichromitor/pt1.jpg)

You can find more information on the <em>User Manual</em> included with the software. You can download it from the link below.

---

![Natron logo](http://www.limulo.net/images/logos/natron-logo.jpg){: width="10%"}

We have included a Natron session file to be used with **Natron**, a powerful multiplatform free and open-source compositing software. This session is the project we have used to render the video file you've seen at the beginning of this article.

---

<a href="{{site.url}}/assets/images/monichromitor/input.png">
<img alt="natron input" src="{{site.url}}/assets/images/monichromitor/input_low.png"/>
</a>

**Input**: the output image from the Processing sketch is used as Natron input.

<a href="{{site.url}}/assets/images/monichromitor/output.png">
<img alt="natron output" src="{{site.url}}/assets/images/monichromitor/output_low.jpg"/>
</a>

**Output**: this is the final output image from Natron.

<!--
<div class="img">
<img alt="monichromitor working principle pt1" src="http://www.limulo.net/images/monichromitor/pt2.jpg"/>
</div>
-->

## Downloads

<div>
<img src="http://www.limulo.net/images/logos/github-octocat.jpg" alt="GitHub Octocat" style="float: left; width: 20%;"/>
<p>You can download the entire <em>Monichromitor</em> project from our GitHub repo <a class="ext" href="https://github.com/Limulo/monichromitor" >here</a></p>
<hr class="clear">
</div>

## References

**Links**

* da Wikipedia: [Monochrome monitor](https://en.wikipedia.org/wiki/Monochrome_monitor), [Phosphor](https://en.wikipedia.org/wiki/Phosphor), [IBM 5151](https://en.wikipedia.org/wiki/IBM_5151), [VT100](https://it.wikipedia.org/wiki/VT100);
* [Natron](http://natron.fr/), free and open-source compositing software;
* Pure Data and [OSC](http://en.flossmanuals.net/pure-data/ch065_osc/) communication protocol on **FLOSS Manuals**;
