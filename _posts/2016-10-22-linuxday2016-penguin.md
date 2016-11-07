---
layout: post
title: A robotic Penguin @ Linux Day Milan 2016
date: 2016-10-22 09:30:00
excerpt: An interactive Penguin created with an Arduino controlled servo motor .
category: [linuxday2016, installation]
shortcut: shortcut-linuxday2016-penguin.png
---

Whew we talk about **free software** the first thing that comes to mind is **GNU/Linux**, surely the most known free software operative system.

It is often referred to this using an image of a special penguin called _tux_.

![tux](https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg){: width="20%;"}

Is because of this that **limulo.net** used a pinguin plush in creating one of its interactive installation for the [**Linux Day Milan 2016**](http://www.linuxdaymilano.org), an important event in Italy dedicated to Free and Open Source software.

![penguin 2]({{site.url}}/assets/images/linuxday2016/IMG_0864.jpg)

This interactive station is completely based on a [**TouchBoard**](https://www.bareconductive.com/shop/touch-board/), an interesting prototyping board by [Bareconductive](https://www.bareconductive.com/) based on the **Arduino Leonardo**. This board is especially designed to be used with capacitive sensors and it is suited for situation where you need to be completely indipendent from the main power supply.

Infact the board can use a LiPo battery to be powered and so you can place it everywhere you want. The board mounts also an MP3 shield and a female minijack trs we have used to reproduce a sound.

We have connected the _TouchBoard_ to a particular electrode made of copper foil we have given a square shape and attached on the inside of a little card box.

![front desk]({{site.url}}/assets/images/linuxday2016/station_7.png)

This sensor detects user proximity while the TouchBoard sends trigger to two different servo motors:

* one of these motors is attached to the penguin armpit, so to move the penguin arm accordingly;
* the other servo is connected with some wind chimes;

So, when the user approach the little card box to donate, the sensor inside it send an electric stimulus to the TouchBoard. This simulus is elaborated by the software uploaded to the board and eventually triggers an electric signal addressed to the servos.

While you see the penguin waiving you also hear the warble by the wind chimes.

![penguin 1]({{site.url}}/assets/images/linuxday2016/IMG_0868.jpg)

## How it works?

We have created a little _control unit_ where we placed the TouchBoard and the LiPo battery. Inside the same box we placed a 4 AA battery pack to provide a separate power supply for the servos.

Iside the _control unit_ we have placed also a tiny breadboard to create all the necessary connections between components.

Both the penguin and chimes servos are connected to the control unit via a 3,5mm TRS jack while the copper foil capacitive sensor is connected directly on the breadboard.

Another 3,5mm TRS jack is used to connect and external speaker to play a sound when a proximity is detected.

Here is an image that gives you the idea:

[![fritzing]({{site.url}}/assets/images/linuxday2016/station_7_def_circuit_bb_bis.png)]({{site.url}}/assets/images/linuxday2016/station_7_def_circuit_bb_bis.png)

You can find the code for this interactive installation from [this](https://github.com/Limulo/linuxday2016) repository.

---

## Issues

### LiPo Battery polarity Issue
[Here]({% post_url 2016-10-20-LiPo-polarity %}) you can find another article about this issue

### Servo and MP3 player issue
[Arduino Leonardo](https://www.arduino.cc/en/Main/arduinoBoardLeonardo), on which the BareConductive TouchBoard is based , has 7 PWM channels: **3, 5, 6, 9, 10, 11**, and **13**.

After some experiments where we wanted to make the board emit a sound and drive a servo at the same time when detecting a proximity via the MPR121, we have discovered that PWM pins **3, 5, 6** and **9** are not working as expected. In other words, attaching a servo to those pins ends up in unpredictable results: sometimes the servo seems to work but no sound is emitted while in other tries neither the MP3 player and the servo work and the board is freezed (no _loop_ cycling).

Fortunately we were able to make everything work since PWM digital pins **10, 11** and **13** behaves normally.

#### Link and references
* [Sparkfun MP3 shield](https://learn.sparkfun.com/tutorials/mp3-player-shield-hookup-guide-v15);
* an (old?) TouchBoard [schematic](https://cdn.sparkfun.com/datasheets/Dev/Arduino/Boards/touch-board-schematic.pdf) and [datasheet](https://cdn.sparkfun.com/datasheets/Dev/Arduino/Boards/TouchBoard_TechDataSheet.pdf);

---

## More

* [Here](https://limulo.github.io/linuxday2016/) you can find more information about other interactive station we have created for the **Linux Day Milan 2016**. From thi same link you can reach our **GitHub** repository where you can find all interactive station source code.










{% comment %}
**GNU/Linux** has a symbol:

Abbiamo parlato di software libero e di sicuro quello più conosciuto è **GNU/Linux**, un sistema operativo che nulla ha da invidiare ai più diffusi Windows e MacOs.

Il simbolo di GNU/Linux è un pinguino per questo ecco un' altra installazione realizzata per l'evento [**Linux Day**](http://www.linuxdaymilano.org), riferimento per utilizzatori e simpatizzanti del software libero in Italia.

![penguin 2](assets/linuxday2016/IMG_0864.jpg)

Si tratta di una stazione interattiva che fa uso di una scheda di prototipazione elettronica basata su **Arduino**, di un sensore capacitivo applicato sotto al coperchio di una piccola scatola e di due **servomotori**.

![front desk](assets/linuxday2016/station_7.png)

Avvicinandosi alla scatola si genera uno stimolo elettrico che viene poi elaborato dal software caricato sulla scheda **Arduino**. La scheda quindi si preoccupa a sua volta di inviare un segnale elettrico ai servomotori, responsabili del movimento dell'ala del pinguino e delle campanelle.

![penguin 1](assets/linuxday2016/IMG_0868.jpg)
{% endcomment %}
