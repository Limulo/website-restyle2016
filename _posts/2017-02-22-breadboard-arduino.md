---
layout: post
title: Breadboard Arduino!
date: 2017-02-22 09:30:00
excerpt: Using the Atmel ATmega328P outside the Arduino UNO board.
category: [coding, physical-computing]
---

## Why?

Think about this situation: you need to create your own interactive object and you need to keep costs at minimum. We ourselves faced this very question and, after a few considerations, we came out with this resolution: we need to free ourselves from using the Arduino board.

If you think at this for a moment you will understand that it is far from nonsense. Take the [Arduino UNO](https://www.arduino.cc/en/Main/ArduinoBoardUno) board for example. We know it uses an **Atmega328p** MCU (micro controller unit) and it also mounts a slew of components that make it easy to use the board for genaral purpose projects: it has sockets for connecting up to 6 analog inputs, 14 digital signals, a USB cable and a dc power supply adapter.

The point is that in many cases this whole setup is just extra stuff in comparison to your project needs. In addiction, there could be circumstances where you plan to exploit the Arduino UNO MCU capabilities, but you would like to create your own [pcb](https://en.wikipedia.org/wiki/Printed_circuit_board) layout.

In these situations it's convenient pondering the purchase of only the parts actually needed instead of the entire prefabricated Arduino board and then the realisation of what we call the _standalone_ Arduino board.

We finally managed to realise one self-made board and here we are sharing the walkthrough of our experiment.

## Materials

We bought a [kit](https://www.amazon.it/gp/product/B00OZGWCWE/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1) with all the necessary parts from [Just-Honest](https://www.just-honest.com/default.aspx?lg=EN), this nice vendor we found on Amazon (we have seen that he has a lot of other interesting stuff on his website so we think we will turn to it again in the future).

The kit arrived in a little plastic container, inside of which we found the components to build the circuit and a paper showing the circuit schematic.

![kit contents]({{ site.baseurl }}/assets/images/arduino-breadboard/kit-components.jpg)

Let's review the components of the kit (_click_ on the component description if you want to see its image, directly from the _Just-Honest_ website):

qt. | component description
| :-: | :- |
1x | [ATMEGA328P-PU microcontroller](https://www.just-honest.com/MINI_POZE/ATMEGA328P-PU.jpg). This microcontroller already had the Arduino UNO bootloader loaded in its memory so it would have been easy to upload sketches on it using another Arduino UNO board (see below).
1x | [DIP 28 pin Socket](https://www.just-honest.com/MINI_POZE/SOCLUY_DIP28.jpg)
2x | [22 pF Ceramic Capacitor](https://www.just-honest.com/MINI_POZE/CERAMIC_22pF_50V.jpg)
1x | [16 MHz Crystal Low Profile](https://www.just-honest.com/MINI_POZE/QUARTZ_16MHz.jpg)
1x | [TACT Switch 2 pins 6*6* 5 mm](https://www.just-honest.com/MINI_POZE/TACT_5mm_2pin.jpg)
1x | 10 KOhm Resistor 0.25W
1x | [7805 1.5A 5V Regulator](https://www.just-honest.com/MINI_POZE/l7805CV.jpg)
2x | [0.1uF / 100nF Ceramic Capacitor](https://www.just-honest.com/MINI_POZE/CERAMIC_100nF.jpg)
1x | [10uF  Electrolytic Capacitor](https://www.just-honest.com/MINI_POZE/CONDENSATOR_ELECTROLITIC_10uF_50V.jpg)
1x | [100uF Electrolytic Capacitor](https://www.just-honest.com/MINI_POZE/CONDENSATOR_ELECTROLITIC_100uF_NEGRU.jpg)
1x | [Green LED  3mm](https://www.just-honest.com/MINI_POZE/LED_3mm_CREEN.jpg)
1x | [Red LED  3 mm](https://www.just-honest.com/MINI_POZE/LED_2mm_Rotund_Rosu_Mat.jpg)
2x | 330 Ohm 0.25W Resistor
1x | 1N4148 diode

In addition we used our [full size breadboard](https://cdn.sparkfun.com//assets/parts/9/2/8/7/12615-01.jpg), a [dc barrel](https://cdn.sparkfun.com//assets/parts/1/0/1/9/0/13126-01.jpg) to connect the power supply to the breadboard and some wire to make the necessary connections.

## Build

To create the circuit we followed the instructions included within the kit; we obtained the schematic below (if you think it can be useful you can download it from [here]({{ site.baseurl }}/assets/downloads/arduino-breadboard/Arduino-on-breadboard.sch)):

[![schematic]({{ site.baseurl }}/assets/images/arduino-breadboard/schematic.png)]({{ site.baseurl }}/assets/images/arduino-breadboard/schematic.png)

While we were building the circuit we double-checked it using other sources of informations like [this](https://itp.nyu.edu/archive/physcomp-spring2014/Tutorials/ArduinoBreadboard) interesting tutorial from the **ITP** which has a lot of useful photos.

We found other resources on this topic online, like this illustration by **Pighixxx**:

[![pighixxx schematic](http://www.pighixxx.com/test/wp-content/uploads/2014/10/211.png){: border="1px solid"}](http://www.pighixxx.com/test/portfolio-items/diy-board/?portfolioID=610)

Here's our final circuit (as you can see we marked the microcontroller with a tiny red dot):

![01]({{ site.baseurl }}/assets/images/arduino-breadboard/01.jpg)

![01-closeup]({{ site.baseurl }}/assets/images/arduino-breadboard/01-closeup.jpg)

Time to make some test!

## Test

We decided to run a test using the original ATmega328P chip from our Arduino UNO board; in this way we would have been able to catch errors and detect issues due to mistakes made in building the breadbord circuit.

First, we connected the Arduino UNO board to the computer and uploaded the _blink_ sketch to it usign the Arduino IDE.
1. We removed the "_just-honest_"  chip from the breadbord to create space for the other one;
2. Then we extracted the Arduino UNO chip from its socket and
3. we inserted it on the breadboard.

![02]({{ site.baseurl }}/assets/images/arduino-breadboard/02-inkscaped.jpg)

We connected the power supply and... Great! Everything worked fine:

* the red LED from the voltage-regulator section lighted-up;
* the green LED started to blink as expected;
* the reset button worked as well;

---

In the moment we knew the circuit worked, it was time to test the new ATmega328P but first we had to figure out how to load a program inside it.

We could do it easily putting the _new_ ATmega chip on the Arduino UNO board and loading a program on it using the Arduino IDE as usual. In fact the "_just-honest_" chip came with the bootloader already installed!

![03]({{ site.baseurl }}/assets/images/arduino-breadboard/03-inkscaped.jpg)

The most important thing to pay attention to is the chip orientation: you have to insert the chip in the socket keeping their groove aligned.

![06]({{ site.baseurl }}/assets/images/arduino-breadboard/06.jpg)

![04]({{ site.baseurl }}/assets/images/arduino-breadboard/04-inkscaped.jpg)

Once we had the chip inserted we tried to upload the _blink_ sketch onto it and it worked!

## Observations

Maybe the diode placed between **Vcc** and **GND** isn't necessary, in fact there are schematics that seems not to consider it.

## Future Experiments

We're going to make another experiment usign this Arduino-breadboard circuit very soon.
We will use an external programmer and try to upload software directly into the microcontroller without any help from the USB connection or the bootloader.

Stay tuned for more to come.
