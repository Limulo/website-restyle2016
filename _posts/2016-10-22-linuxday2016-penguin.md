---
layout: post
title: A robotic Penguin
date: 2016-10-22 09:30:00
excerpt: An interactive Penguin created with an Arduino controlled servo motor .
category: [linuxday2016, installation]
shortcut: shortcut-linuxday2016-penguin.png
---

When we talk about **free software** the first thing that comes to mind is **GNU/Linux**, surely the most known free software operative system.
This OS is often associated with the image of a penguin called _tux_.

![tux](https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg){: width="20%;"}

That's why **limulo.net** used a penguin stuffed animal in one of its interactive installation for the [**Linux Day Milan 2016**](http://linuxdaymilano.org), an important annual event in Italy dedicated to Free and Open Source software.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/lpZxsX3hyhc" frameborder="0" allowfullscreen></iframe>

This interactive station is entirely based on the [**TouchBoard**](https://www.bareconductive.com/shop/touch-board/), a prototyping board by [Bareconductive](https://www.bareconductive.com/) based on the **Arduino Leonardo**. This board is specifically designed to be used with capacitive sensors and it is suited for situations where you need to be completely independent from the main power supply.

![penguin 2]({{site.baseurl}}/assets/images/linuxday2016/IMG_0864.jpg)

The board can be powered using a LiPo battery, so it can be placed everywhere. The board also mounts an MP3 shield and a female minijack TRS that we used to reproduce a sound.

We connected the _TouchBoard_ to a particular electrode made of a square shaped copper foil attached inside a little card box.

![front desk]({{site.baseurl}}/assets/images/linuxday2016/station_7.png)

This sensor detects user proximity while the _TouchBoard_ sends trigger to two different servo motors:

* one motor is attached to the penguin armpit and is responsible for moving the penguin arm;
* the other servo is connected with some wind chimes;

When the user approaches the little card box to donate, the sensor inside it sends an electric stimulus to the _TouchBoard_. This stimulus is elaborated by the software on the board and eventually triggers an electric signal addressed to the servos.

While the penguin is waiving you hear the warble by the wind chimes.

![penguin 1]({{site.baseurl}}/assets/images/linuxday2016/IMG_0868.jpg)

## How does it work?

We have created a little _control unit_ where we placed the _TouchBoard_ and the LiPo battery. Inside the same box we placed a 4 AA battery pack to provide a separate power supply for the servos.

The _control unit_ contained also a tiny breadboard used to create all the necessary connections between components.

Both the penguin and chimes servos are connected to the control unit via a 3,5mm TRS jack while the copper foil capacitive sensor is connected directly on the breadboard.

Another 3,5mm TRS jack is used to connect and external speaker to play a sound when proximity is detected.

Here is an image that gives you the idea:

[![fritzing]({{site.baseurl}}/assets/images/linuxday2016/station_7_def_circuit_bb_bis.png)]({{site.baseurl}}/assets/images/linuxday2016/station_7_def_circuit_bb_bis.png)

## Source Code

You can download the code for this interactive installation from [this](https://github.com/Limulo/linuxday2016/tree/master/stazione_7/Arduino_sketches/station_7_v01) repository.

---

## Issues

* [LiPo Battery polarity]({{ site.baseurl }}{% post_url 2016-10-20-LiPo-polarity %}) issue;
* [Servo and MP3 player]({{ site.baseurl }}{% post_url 2016-10-21-servo-mp3 %}) issue;

---

## More

* Check out our [LinuxDay 2016]({{ site.baseurl }}{% post_url 2016-10-22-linuxday2016 %}) page if you need more information about the event and the other interactive installations.



{% comment %}
**GNU/Linux** has a symbol:

Abbiamo parlato di software libero e di sicuro quello più conosciuto è **GNU/Linux**, un sistema operativo che nulla ha da invidiare ai più diffusi Windows e MacOs.

Il simbolo di GNU/Linux è un pinguino per questo ecco un' altra installazione realizzata per l'evento [**Linux Day**](http://linuxdaymilano.org/), riferimento per utilizzatori e simpatizzanti del software libero in Italia.

![penguin 2](assets/linuxday2016/IMG_0864.jpg)

Si tratta di una stazione interattiva che fa uso di una scheda di prototipazione elettronica basata su **Arduino**, di un sensore capacitivo applicato sotto al coperchio di una piccola scatola e di due **servomotori**.

![front desk](assets/linuxday2016/station_7.png)

Avvicinandosi alla scatola si genera uno stimolo elettrico che viene poi elaborato dal software caricato sulla scheda **Arduino**. La scheda quindi si preoccupa a sua volta di inviare un segnale elettrico ai servomotori, responsabili del movimento dell'ala del pinguino e delle campanelle.

![penguin 1](assets/linuxday2016/IMG_0868.jpg)
{% endcomment %}
