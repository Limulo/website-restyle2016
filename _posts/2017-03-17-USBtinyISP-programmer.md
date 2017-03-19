---
layout: post
title: ISP programming
date: 2017-03-17 09:30:00
excerpt: First experiments usign the Adafruit USBtinyISP programmer!
category: [coding, physical-computing]
---

Now that we succeeded in creating our first [_standalone_ Arduino board]({{ site.baseurl }}{% post_url 2017-02-22-breadboard-arduino %}), we are ready to program the microcontroller in a new way!

Infact we can avoid from placing it on the mcu socket of the Arduino UNO board, and we can also avoid the use of an USB cable and an USB/serial breakout board (like [this one](https://www.sparkfun.com/products/9716) from SparkFun).

Instead we can use the **In-System Programming** (ISP), also known as **In-Circuit Serial Programming** (ICSP) (here's the [Wikipedia page](https://en.wikipedia.org/wiki/In-system_programming) on the topic)!

What we need is:
* an hardware programmer;
* and some male headers conveniently connected to the mcu on the breadboard.

## The hardware programmer

We choose the [Adafruit USBtinyISP (v2.0)](https://www.adafruit.com/product/46) as our hardware programmer especially because it is well [documented](https://learn.adafruit.com/usbtinyisp). We will use these informations not only to built the programmer itself (it came as DIY kit), but also to start out with ISP programming.

[![Adafruit programmer](https://cdn-learn.adafruit.com/assets/assets/000/006/757/original/tools_531946274_dcd8763cda_o.jpg)](https://www.adafruit.com/products/46)

If you are following this article and you need to build the programmer yourself too, we strongly reccommend you to first follow the [instruction](https://learn.adafruit.com/usbtinyisp/make-it) from the Adafruit website.
{: class="dashed"}

As said, the website documentation contains lots of fundamental informations; for example there are some components you may want not to solder on the PCB depending how you want to use the programmer. There are also some considerations about the [power jumper](https://learn.adafruit.com/usbtinyisp/use-it#jumper-jp3-usb-power-to-target) and when you need to use it! So be sure to have the Adafruit documentation read before continuing.

{% comment %}
If you are following this article and along to build your own Adafruit USBtinyISP, we strongly reccommend you to follow the [instruction](https://learn.adafruit.com/usbtinyisp/make-it) from the Adafruit website. There are very useful informations: for example there are some components you may want not to solder on the PCB depending how you want to use the programmer itself; there are also some consideration about the [power jumper](https://learn.adafruit.com/usbtinyisp/use-it#jumper-jp3-usb-power-to-target) and when you need to use it!
{% endcomment %}

## The circuit

First of all we create a 3 pairs male header to be placed on our breadboard circuit.
As you see from the image below we need some soldering to extend the headers' legs. We also need pliers to gently bend them in order to make them perfectly match the rails of the breadboard.

![ISP header solo]({{site.baseurl}}/assets/images/USBtiny-programmer/P1020714.JPG){: width="50%"}

Once we place the ISP headers on breadboard we need to connect them to the **Atmega328p**, but what's the correct way?
If we take a look at the [_top view_](https://upload.wikimedia.org/wikipedia/commons/9/9f/Isp_headers.svg) of standard ISP headers, we can immediately label all the 6 headers!

![ISP top view]({{site.baseurl}}/assets/images/USBtiny-programmer/isp-headers.png){: width="30%"}

We also need to pay attention to the **Atmega328p** pin-out (The image below is taken directly from the Atmega328p [datasheet](http://www.atmel.com/Images/Atmel-42735-8-bit-AVR-Microcontroller-ATmega328-328P_datasheet.pdf) but you can use also refer to [this beautiful illustration](http://www.pighixxx.com/test/portfolio-items/atmega328/?portfolioID=337) from _phigixx_ if you prefer):

{% comment %}
Then we use some wire to connect the headers to the mcu, paying attention to the **Atmega328p** pin-out (The image below is taken directly from the Atmega328p [datasheet](http://www.atmel.com/Images/Atmel-42735-8-bit-AVR-Microcontroller-ATmega328-328P_datasheet.pdf) but you can use also [this beautiful illustration](http://www.pighixxx.com/test/portfolio-items/atmega328/?portfolioID=337) from _phigixx_ if you prefer):
{% endcomment %}

[![atmel pinout]({{site.baseurl}}/assets/images/USBtiny-programmer/pinout.png)](http://www.atmel.com/Images/Atmel-42735-8-bit-AVR-Microcontroller-ATmega328-328P_datasheet.pdf)

You can see the complete circuit here:
![ISP header bend on breadboard]({{site.baseurl}}/assets/images/USBtiny-programmer/P1020723.JPG)

## Connecting the programmer

Now it's time to connect the programmer to the ISP headers on the breadboard.

The Adafruit programmer come with a 6-wire cable; the one marked in red is the **MISO** wire, so this is the connection:

![programmer->ISP header on breadboard]({{site.baseurl}}/assets/images/USBtiny-programmer/P1020726.JPG)

![programmer->ISP header on breadboard 2]({{site.baseurl}}/assets/images/USBtiny-programmer/P1020732.JPG)

We also want to provide power to the mcu via the programmer itself so we need to use the jumper (see [here](https://learn.adafruit.com/usbtinyisp/use-it#jumper-jp3-usb-power-to-target) for more information on how to use the jumper).

## Using the programmer

Now it's time to upload a program usign the programmer and there are at least two ways we can achieve this:
* by using the Arduino IDE;
* by using some terminal commands;

Pay attention, all we are going to say now on has been tested on a Linux Debian machine. Maybe you need to do something different if you are using another OS or configuration. Please refer to [Adafruit tutorial](https://learn.adafruit.com/usbtinyisp) for more informations.
{: class="note"}

### Usign the Arduino IDE

If we want to use the Arduino IDE we can follow [these Arduino instructions](https://www.arduino.cc/en/Hacking/Programmer).

Because our ATmega328p came with the bootloader preinstalled we weren't able to test it but if yours is a fresh factory micro-controller, according to the Arduino instructions "_Upload Using Programmer_" method, you must first burn a bootloader to it. We think this is needed in order to properly set the mcu fuses so to upload programs.
{: class="note"}

If doing this you are facing an error, maybe it is because you don't have all the necessary permissions to use the USBtinyISP device. We also faced the same problem and we were able to solve it by creating an appropriate **udev rule** in a new rule file placed in ```/etc/udev/rules.d/``` (make shure of reading [this](https://learn.adafruit.com/usbtinyisp/avrdude#for-linux) section of the Adafruit tutorial, it can be very helpful).

This is the content of the rule file (on a single line):

```
SUBSYSTEM=="usb", ATTR{product}=="USBtiny", ATTR{idProduct}=="0c9f", ATTRS{idVendor}=="1781", MODE="0660", GROUP="dialout"
```

After adding this rule, you need to reboot the computer in order for this modification to take effect, but after doing this, you will be able to use the particular usb device without the need of _root_ permissions.

### Usign the terminal commands

Instead of using the Arduino IDE to upload programs to the mcu via the hardware programmer, we can use the terminal but first we need to install some software tools if we don't have them already.

The toolchain is composed of:
* ```avr-gcc```: it is the compiler. It's job is to convert our _C_ program to an _object code file_ in the [Executable and Linkable Format](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (```.elf```). We can also use it to obtain the memory map file (```.map```);
* ```avr-objdump``` which takes informations from the object file and displays it in many useful ways;
* ```avr-objcopy``` is a tool that can copy data from the ```.elf``` object file in order to obtain a binary ```.hex``` file, suitable for execution on the mcu (see [this](https://en.wikipedia.org/wiki/Intel_HEX) Wikipedia article to know more);
* ```avrdude```, whose name stands for "<b>AVR</b> <b>D</b>ownloader/<b>U</b>ploa<b>DE</b>r", is the tool we use to upload the binary file to the mcu via the hardware programmer!

This is the workflow we are going to use:
![workflow]({{site.baseurl}}/assets/images/USBtiny-programmer/00.png)

All these operations are executed automatically by the Arduino IDE each time we press the _Play_ or the _Upload_ button. Now we need to perform them ourself!

It is worth saying that [**this resource**](http://www.nongnu.org/avr-libc/user-manual/group__demo__project.html) was critical to understand how to proceed, so many thanks to the [AVR-libc](http://www.nongnu.org/avr-libc/user-manual/index.html) development team.
{: class="note"}

Even if you are not usign the Arduino IDE, don't forget to create the **udev rule** file in order to have the right permissions to use the USBtiny device! See the section above for more details.
{: class="dashed"}

#### Programming, Compiling & Linking

After having all these softwares installed, it's time to compile and upload our program.

First let's write a simple _C_ program to replicate the legendary Arduino "_blink_" sketch:

```
{% highlight c%}
#include <avr/io.h>
#define F_CPU 16000000UL
#include <util/delay.h>

int main(void)
{
    unsigned long interval = 1000; /* ms */

    DDRB|=(1<<5);

    while(1)
    {
        PORTB |= (1<<5);
        _delay_ms( interval );
        PORTB &= ~(1<<5);
        _delay_ms( interval );
    }
    return 0;
}
{% endhighlight %}
```


{% comment %}
#include <avr/io.h>
#define F_CPU 16000000UL
#include <util/delay.h>

int main(void)
{
    unsigned long ticks = 0;
    unsigned long interval = 1000000;

    DDRB|=(1<<5);

    while(1){

        if(ticks < interval)
        {
            PORTB |= (1<<5);
        }
        else if(ticks < 2*interval)
        {   
            PORTB &= ~(1<<5);
        }
        else
        {
            ticks = 0;
        }
        ticks++;
    }
    return 0;
}
{% endcomment %}
---

First we include some header and define a macro:
* ```avr/io.h```: this header file includes the appropriate IO definitions for the device that will be specified by the ```-mmcu=``` compiler command-line switch (see below) (here's link to the [documentation](http://www.nongnu.org/avr-libc/user-manual/group__avr__io.html));
* ```F_CPU``` macro need to be set to the CPU frequency in Hz. We set it to 16MHz because it is the oscillation frequency of our crystal. This macro will overwrite the default one defined in the following header file ([documentation](http://www.nongnu.org/avr-libc/user-manual/group__util__delay.html#ga43bafb28b29491ec7f871319b5a3b2f8));
* ```util/delay.h``` is needed to make use of the ```_delay_ms()``` function ([documentation](http://www.nongnu.org/avr-libc/user-manual/group__util__delay.html#gad22e7a36b80e2f917324dc43a425e9d3)).

Going on we enter the ```main```: here we set the local variable ```interval``` to 1000, because we want 1 second to be the time during which our LED will stay on or off alternately.

Now we are about to enter inside the ```while``` loop but first just another statement:
```
DDRB|=(1<<5);
```
The ```DDRB``` macro identifies the <b>D</b>ata <b>D</b>irection <b>R</b>egister of port <b>B</b> of our mcu. Take a look at [this tutorial](https://www.arduino.cc/en/Reference/PortManipulation) for an introduction to the mcu ports prior to continue.
{: class="dashed"}

... now, speaking in terms of the Arduino IDE, setting the 5th bit of the port B register on the ATmega328p means to set the 13rd digital pin! So when we say ```DDRB|=(1<<5);``` is like we are saying ```pinMode(13, OUTPUT);```.

The same is for the instructions ```PORTB |= (1<<5);``` and ```PORTB &= ~(1<<5);``` inside the loop: they respectively correspond to ```digitalWrite(13, HIGH);``` and ```digitalWrite(13, LOW);```.

---

Now we need to compile the program so we use this command on a terminal window:
```
avr-gcc -g -Os -mmcu=atmega328p -c filenmane.c
```
This instruction tells ```avr-gcc``` to create an _object code file_ - ```filename.o``` - named after the program source file ```filename.c```. It also tells the compiler the type of mcu we need to build the program for (**mmcu** option).

![image]({{site.baseurl}}/assets/images/USBtiny-programmer/01.png)

---

Then we need to create the ```.elf``` file from the ```.o```, so we use the command:
```
avr-gcc -g -mmcu=atmega328p -o filename.elf filenmane.o
```
![image]({{site.baseurl}}/assets/images/USBtiny-programmer/02.png)

---

We can go on playing aroung with ```avr-gcc``` telling him to create also the ```.map``` while creating the ```.elf```:
```
avr-gcc -g -mmcu=atmega328p -Wl,-Map,filename.map -o filename.elf filenmane.o
```

We can even examine the object file using the ```avr-objdump``` to create a readable ```.lst``` file:
```
avr-objdump -h -S filename.elf > filename.lst
```
---

These last two commands are not mandatory in contrast to the following one, needed to create the definitive binary ```.hex``` file:
```
avr-objcopy -j .text -j .data -O ihex filename.elf filename.hex
```
![image]({{site.baseurl}}/assets/images/USBtiny-programmer/03.png)

#### Uploading

Now that we have a binary file in the Intel hexadecimal format we have almost finished here. The last thing to do is to upload the file on the mcu memory and here's where ```avrdude``` comes in handy!

Here's the command:
```
avrdude -pm328p -cusbtiny -C/etc/avrdude.conf -U flash:w:filename.hex:a
```
![image]({{site.baseurl}}/assets/images/USBtiny-programmer/04.png)

To fully understand how ```avrdure``` works and what all these arguments stand for, we recommend you to read the command manual (```man avrdude```), but here it's worth making a little recap:
* The **p** option stands for _partno_ and we are using it to specify the type of our mcu (_m328p_ stands for ATmega328p). You can use the command with the ```-p?``` option to see the full list of supported mcu;
* The **c** option stands for _programmer-id_; with this we are able to specify the USBtinyISP as our programmer. Also in this case we can run the command with the ```-c?``` synthax to see the full list of supported programmers;
* The **C** option is used here to specify the location of the avrdude configuration file;
* The **U** option is used to specify the way memory operation is performed. Here we are saying we are going to write the ```.hex``` file on the mcu flash memory usign the auto detect feature.

If we like it, the command can be simplified in three ways:

1. We can get rid of the ```-C``` option because the ```/etc/avrdude.conf``` is the default configuration file, so we don't need to explicitly specify it;

{% comment %}
avrdude -pm328p -U flash:w:filename.hex:a     (/etc/avrdude.conf è il file di configurazione default)
{% endcomment %}

2. We can create a new file on our home directory an place a line inside it telling that the USBtinyISP is our default programmer. This way we can omit the ```-c``` option. The file we create is named ```.avrduderc``` and it contains this single line:
```
default_programmer = "usbtiny";
```

{% comment %}
avrdude -pm328p -C/etc/avrdude.conf -U flash:w:filename.hex:a     (inserendo usbtiny come programmer default nel file ~/.avrdude.rc)
{% endcomment %}

3. We can simplify the **-U** option synthax beacuse of its deafult behaviour;

{% comment %}
avrdude -pm328p -U filename.hex     (shortcut di avrdude per l'opzione -U)
{% endcomment %}

So the command eventually becomes:
```
avrdude -pm328p -U filename.hex
```

---

After running this last command we see the console plenty of log messages:

![console log]({{site.baseurl}}/assets/images/USBtiny-programmer/Screenshot.png)

In particular we see three progression bars, they are showing us respectively:
1. the reading process;
2. the writing process;
3. the verification process durign which avrdude compares the original ```.hex``` file with what has been just written on the mcu memory;

If everything goes fine, now we are able to see our sketch working: the LED is blinking!

## Future Experiments

An improvement we can make is to gather our entire workflow inside a single ```makefile``` to do everything quicker; this will be extremely useful in cases where we have tens or maybe hundreds of micro-controllers to program.

Another interesting thing about this project is that if we are planning to print out our circuit on a custom PCB, we can simply include a 3 pair male headers in it in order to program the mcu without any other components being needed. In this way we can certainly reduce costs (and size) of our project!;

Note that the Arduino UNO board can be programmed this same way, so why don't try it.

If you find this article useful and you liked it, please leave a comment below: let us know what do you think about it, we really appreciate it.
Thank you very much and, as always, stay tuned for more to come!







{% comment %}
The next step after [creating a _standalone_ Arduino board]({{ site.baseurl }}{% post_url 2017-02-22-breadboard-arduino %}) is to program it using something different from the usual USB cable.

Infact there's another way we can program the Arduino microcontroller and it's called **In-System Programming** (ISP) or **In-Circuit Serial Programming** (ICSP).

We read about this since we began working with the Arduino platform and many times we asked ourselves: "what are those strange pins?"

![foto ICSP pins Arduino]()

We finally understood that this way of programming can be very useful, especially if you want to create your own project and you want to program your microcontroller directly while sitting in place on your pcb.

---

Now that we've been albe to realize our first [Arduino Board on a breadboard](), we are ready to start experimenting with a new way of programming our microcontroller.

Infact we can avoid our microcontroller being programmed by placing it on the Arduino UNO mcu socket. We can use the so called ISP/ICP instead.

ICSP stands for ... and it is a standard way of programming mcu and embedded systems directly in place.

Infact. as you can see, The Arduino board itself can be programmed this way.

---
to directly in place without removing it from the circuit neither using an USB cable or an USB/serial breakout board (like [this one](https://www.sparkfun.com/products/9716) from SparkFun).

After asking ourselves for so long what these pins are, we now know that they can do the job!

![foto ICSP pins Arduino]()

Those pins are infact the hardware interface of a particular way of programming microcontrollers an many other embedded systems called **In-System Programming** (ISP) or **In-Circuit Serial Programming** (ICSP).

In order to program the **ATmega328p** via the ICSP interface we needed an hardware programmer, in other words a device thanks to whom the computer would have been able to speak to the microcontroller using the ICSP interface.
{% endcomment %}
