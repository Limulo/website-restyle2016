---
layout: post
title: USBtinyISP programmer setup
date: 2017-03-01 09:30:00
excerpt: First experiments usign the Adafruit USBtinyISP programmer!
category: [coding, physical-computing]
---

Once we succeeded in creating our first [_standalone_ Arduino board]({{ site.baseurl }}{% post_url 2017-02-22-breadboard-arduino %}), we wanted to program the microcontroller directly in place without removing it from the circuit neither using an USB cable or an USB/serial breakout board (like [this one](https://www.sparkfun.com/products/9716) from SparkFun).

After asking ourselves for so long what these pins are, we now know that they can do the job!

![foto ICSP pins Arduino]()

Those pins are infact the hardware interface of a particular way of programming microcontrollers an many other embedded systems called **In-System Programming** (ISP) or **In-Circuit Serial Programming** (ICSP).

In order to program the **ATmega328p** via the ICSP interface we needed an hardware programmer, in other words a device thanks to whom the computer would have been able to speak to the microcontroller using the ICSP interface.

## The hardware programmer

![Adafruit programmer]()

We chose the [Adafruit USBtinyISP](https://www.adafruit.com/product/46) as our hardware programmer especially because of its [documentation](https://learn.adafruit.com/usbtinyisp). We would have used it not only to built the programmer itself (it came as DIY kit) but also to start out with ISP programming.

## The circuit

First of all we created a 3 pairs male header to place it on our breadboard circuit.

![ISP breadboard header]()

Than we connected it to the Atmega328p paying attention to the pins labels

![atmel datasheet pinout image]()

## connecting the programmer

The Adafruit programmer came with a 6-wire cable. The one marked in red is the MISO wire so this is the way we connected it

![programmer->ISP header on breadboard]()



{% comment %}
The next step after [creating a _standalone_ Arduino board]({{ site.baseurl }}{% post_url 2017-02-22-breadboard-arduino %}) is to program it using something different from the usual USB cable.

Infact there's another way we can program the Arduino microcontroller and it's called **In-System Programming** (ISP) or **In-Circuit Serial Programming** (ICSP).

We read about this since we began working with the Arduino platform and many times we asked ourselves: "what are those strange pins?"

![foto ICSP pins Arduino]()

We finally understood that this way of programming can be very useful, especially if you want to create your own project and you want to program your microcontroller directly while sitting in place on your pcb.
{% endcomment %}











## Compiling + Linking

avr-gcc -g -Os -mmcu=atmega328p -c filenmane.c [ottengo filename.o]
avr-gcc -g -mmcu=atmega328p -o filename.elf filenmane.o [ottengo filename.elf]
avr-gcc -g -mmcu=atmega328p -Wl,-Map,filename.map -o filename.elf filenmane.o [ottengo filename.elf e filename.map]
avr-objdump -h -S filename.elf > filename.lst [ottengo filename.lst - dump tabelle]
avr-objcopy -j .text -j .data -O ihex filename.elf filename.hex [ottengo filename.hex esadecimale intel]

## Uploading

avrdude -pm328p -cusbtiny -C/etc/avrdude.conf -U flash:w:filename.hex:a     
avrdude -pm328p -C/etc/avrdude.conf -U flash:w:filename.hex:a     (inserendo usbtiny come programmer default nel file ~/.avrdude.rc)
avrdude -pm328p -U flash:w:filename.hex:a     (/etc/avrdude.conf è il file di configurazione default)     
avrdude -pm328p -U filename.hex     (shortcut di avrdude per l'opzione -U)     

## Reference

* http://www.nongnu.org/avr-libc/user-manual/group__demo__project.html
* http://codeandlife.com/2012/01/29/avr-attiny-usb-tutorial-part-3/
* https://en.wikipedia.org/wiki/Executable_and_Linkable_Format
* [WikiPedia](https://en.wikipedia.org/wiki/In-circuit_serial_programming)




1. http://vusb.wikidot.com/start  + http://www.usb.org/home
2. http://www.atmel.com/webdoc/
3. http://cryptomys.de/horo/V-USB-MIDI/index.html
