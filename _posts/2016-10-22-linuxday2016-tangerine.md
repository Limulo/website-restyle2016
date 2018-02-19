---
layout: post
title: Enlight the world with a tangerine!
date: 2016-10-22 09:31:00
excerpt: An interactive station where you use touch to make things happen.
category: [linuxday2016, installation]
shortcut: shortcut-linuxday2016-tangerine.png
---

During the [**Linux Day Milan 2016**](http://linuxdaymilano.org/2016/), an inportant event dedicated to free and open source software in Italy, we shown an interactive station that used capacitive sensors to detect user touches.

[![elettrodes]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0860.jpg)]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0860.jpg)


Some electrodes created with a special [electric paint](https://www.bareconductive.com/shop/electric-paint-50ml/) by [BareConductive](https://www.bareconductive.com/) are painted on a normal sheet of paper.

These electrodes allows an **Arduino** and some others circuits connected to it to send messages to a computer.
Messages are interpreted and used to created real time graphics and sounds.

[![station 2]({{ site.baseurl }}/assets/images/linuxday2016/station_2quater.png)]({{ site.baseurl }}/assets/images/linuxday2016/station_2quater.png)

To create a different feeling we have added a special electrode: a **tangerine**!

[![bimbi 3]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0921.jpg)]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0921.jpg)

If you touch it you will see the world lamp to light up while a new interesting sound is generated.

[![bimbi 1]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0915.jpg)]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0915.jpg)

 [![bimbi 2]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0927.jpg){: width="100%;"}]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0927.jpg) | [![bimbi 4]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0917.jpg){: width="100%;"}]({{ site.baseurl }}/assets/images/linuxday2016/IMG_0917.jpg)

---

## How it works?

The heart of this station is an **Arduino Mega**. Inside it a program to make it able to talk with an **Adafruit capacitive breaout board** which uses the **MPR121** to detect electric signal from capacitive sensors (the _MPR121_ is the same chip mounted on the **BareConductive Capboard**).

The Arduino Board is placed inside a _control unit box_ with the **relay** module. This _relay module_ gives Arduino the capability to command electric devices that needs to be powered by the 220V power supply.

Inside the main control box there is place also for a **BlueSmirf** bluetooth modem thanks to which Arduino is able to communicate with other devices from distance.

The Adafruit capboard is placed inside a little satellite box that we connect to the main control unit box using a **RJ45** cable.

7 capacitive electrode sensors are created using the **BareConductive** electric paint on a normal sheet of paper then they are connected using clips soldered with a little cable to the capboard.

The eighth electrode is a _tangerine_ we have skewered with another clip, it connect to the capboard too.

The program is studied in a way that the Arduino closes the relay when the capboard detects a touch on the tangerine so to light up the world lamp connected to the relay module.

[![station 4]({{ site.baseurl }}/assets/images/linuxday2016/station_4.png)]({{ site.baseurl }}/assets/images/linuxday2016/station_4.png)

At the same time Arduino sends a message via the bluetooth serial communication to a [**Processing**](https://processing.org/) sketch running on a near laptop.

This sketch has the task of translating this message into an **OSC message** and send it through as ethernet cable to a another laptop. The latter runs [**SuperCollider**](https://supercollider.github.io/) scripts and produces sound in real time accordingly to the incoming OSC messages.

The tangerine is not the only electrode that produces sounds but there are also other 3 circular shaped eletrodes that are able to trigger OSC messages addressed to _SuperCollider_.

In addition there are 4 more electrodes: they have a square shape and they are able to communicate _Processing_ to draw new coloured shapes on screen.

---

## Issues

### More relay
Originally this interactive station was though to have 3 relays instead of one. One of these was driven by a little electret microphone while the third had to be commanded by _Processing_ through the BlueTooth connection.

[![station 2 original]({{ site.baseurl }}/assets/images/linuxday2016/station_2origin.png)]({{ site.baseurl }}/assets/images/linuxday2016/station_2origin.png)

We have had some trouble using 3 relays with the Adafruit capboard and, ultimately with the mic also so we decided to simplify the station.

---

## More

* Check out our [LinuxDay 2016]({{ site.baseurl }}{% post_url 2016-10-22-linuxday2016 %}) page if you need more information about the event and the other interactive installations.
