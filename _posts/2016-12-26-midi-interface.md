---
layout: post
title: Arduino MIDI interface (updated)
date: 2016-12-26 09:30:00
excerpt: Arduino sending and receiving MIDI messages!
category: [coding, physical-computing]
usemath: true
---

## MIDI: an introduction

**MIDI** (**Musical Instruments Digital Interface**) is the name of a communication protocol amongst musical instruments and devices developed by some musical instruments manufacturers in the early '80s.

Other communication protocols already existed but MIDI soon became more valuable as it was recognised as a market standard and it made use of digital signals (streams of _bytes_) instead of analog.

![MIDI communcation]({{ site.baseurl }}/assets/images/midi-interface/MIDI-intro.png)

From a more technical point of view, MIDI is an asynchronous serial communication protocol with a transmission speed of **31250 baud**. On the physical layer it uses the classic [5 pin DIN connector](https://en.wikipedia.org/wiki/DIN_connector) and cable.

### MIDI messages

Here's a picture of a standard MIDI message:

![standard MIDI msg]({{ site.baseurl }}/assets/images/midi-interface/status-and-data.png){: width="60%;"}

As you can see, inside a MIDI message there are two main bytes categories:
* **Status Byte**;
* **Data Byte**;

Suppose we are a MIDI device and we are receiving MIDI messages from a MIDI controller: how can we differenciate between _status bytes_ and _data bytes_? The main difference between them lies in their values: **Status Bytes** are bytes which value is greater than 127 while **Data Bytes** always have values comprised between 0 and 127.

From a binary point of view it means that the leftmost _bit_ of a _status byte_ is always **1** while it is **0** for the _data byte_.

![immagine binary point of view]({{ site.baseurl }}/assets/images/midi-interface/status-and-data-bits.png){: width="60%;"}

#### MIDI channels

What is a MIDI channel? Suppose we have only one MIDI keyboard/controller connected to many stacked synths.

![MIDI channels]({{ site.baseurl }}/assets/images/midi-interface/MIDI-channels.png)

How can we use all the synths sounds each one mapped on a certain portion of the keyboard, so we could play different sounds with different notes?

Here comes the **MIDI channel**! Using MIDI channels we can say to each synth to listen only at messages coming from a specific MIDI channel, discarding all the others. We can do the same with our MIDI keyboard, setting it to send messages to different MIDI channels according to the notes being plated or the control used.

The MIDI protocol provides up to 16 different MIDI channels.
Each MIDI message contains information regarding the MIDI channel used to send it; we can retrieve the information reading the lower nibble of the _status byte_

![status byte and its nibbles]({{ site.baseurl }}/assets/images/midi-interface/nibbles.png){: width="60%;"}

### Reference

If you need more information about MIDI and how it works I'd warmly recommend reading the book "_MIDI computer e musica_" by **Giovanni Perotti**, I've found it a precious resource in many sitations. It's written in italian but I think you'll find good alternatives in English (if so, please let me know!)

---

## Arduino simple MIDI IN interface

Let's try a new experiment: why don't we build a MIDI interface using Arduino board?

First, we want our _Arduino UNO_ board to receive and debug the MIDI messages it receives from the outside world.

We could use the default hardware serial port (the **RX** pin on the board) to receive bytes. Anyway, since we want to debug our code using the _Serial Monitor_, we need to use this serial port for the communication with the PC, thus we can't use RX as a MIDI port.

We need and additional hardware serial port for our MIDI interface: we can use the Arduino [**Software Serial**](https://www.arduino.cc/en/Reference/SoftwareSerial) library!

### Hardware

First of all we have to build the circuit. We can take advantage of this beautiful illustration by [pighixxx](http://www.pighixxx.com/) as a reference for the schematics:

[![pighixxx MIDI interface](http://www.pighixxx.com/test/wp-content/uploads/2014/10/206.png)](http://www.pighixxx.com/test/abc/page/2/#prettyPhoto[gallery]/6/)

Or maybe we can use the one from the Wikipedia [MIDI page](https://en.wikipedia.org/wiki/MIDI):

![Wikipedia MIDI schematics]({{ site.baseurl }}/assets/images/midi-interface/wikipedia_MIDI_IN_OUT_schematic.jpg)

Or maybe use this other one from the Giovanni Perotti book:

![Perotti MIDI schematics]({{ site.baseurl }}/assets/images/midi-interface/perotti_schematics.jpg)

Schematics illustrated in these images are a bit different from each other but the working principle stays the same.

---
Let's focus on the **MIDI In** section. We need:
* two **220 Ohm** resistors;
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) optocoupler. We may also use a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler as **Joshua Noble** explains in his "_Programming Interactivity_" book;
* an [**1N4148**](https://en.wikipedia.org/wiki/1N4148) high speed diode;
* and - obviously - one **5 pin DIN**.

Here's the _Fritzing scheme_ of our circuit.

![Fritzing MIDI in]({{ site.baseurl }}/assets/images/midi-interface/MIDI_IN_bb_new.png)

### Software

Let's move to the code:

{% highlight c %}
#include <SoftwareSerial.h>

const byte rxPin = 11;
const byte txPin = 10; // not used for the moment

SoftwareSerial mySerial(rxPin, txPin);

// SETUP ///////////////////////////////////////////
void setup()
{
  pinMode( rxPin, INPUT );
  pinMode( txPin, OUTPUT);
  mySerial.begin( 31250 );

  Serial.begin( 9600 );
}


// LOOP ////////////////////////////////////////////
void loop()
{
  while( mySerial.available() > 0 )
  {
    unsigned char c = mySerial.read();
    Serial.println( c, DEC );
  }
}
{% endhighlight %}

### Studio setup

In order to examine the MIDI messages flow we have to connect a MIDI device (such a MIDI keyboard or controller) to our Arduino MIDI interface.

![Studio MIDI In Setup]({{ site.baseurl }}/assets/images/midi-interface/MIDI-studio-in.png)

### Tests

Now that everything is set up, let's upload the sketch. We play some notes on the keyboard and see what happens.
Here's a screenshot of the Serial monitor output:

![Serial monitor output 1]({{ site.baseurl }}/assets/images/midi-interface/serial-monitor-1.png)

Wow! It works!

This is very exciting. All the numbers we see here are the bytes sent from the MIDI keyboard to our Arduino MIDI interface and, again, from Arduino to the PC.

We can see clearly the **144** byte and, because its value is greater than _127_, we know it's a _Status Byte_ and a **Note ON** status byte in particular.

We also know that the MIDI channel we are receiving messages from is the channel **1**, _0_ in binary; actually, the _Status Byte_ contains both the status information and the MIDI channel number. In our case:

$$ 144 + 0 = 144 $$

or in binary

$$ 1001 0000 | 0000 0000 = 1001 0000 $$

We can also see bytes values which are lower than 127: these are _Data bytes_.

For example, the bytes pairs following the **Note ON** status byte are the _Data bytes_ representing a **note number** and a **velocity** value.

So, for example, the sequence ```144 76 50``` means the I've played an _E5_ (note number 76) with a velocity of 50.
After that sequence there's a new bytes sequence testifying that I've also released the note: ```144 76 0``` (same note, velocity 0).

**Observation 1**: We don't see the "**Note OFF**" status byte, why? Clearly it's because my MIDI keyboard is not programmed to send it. MIDI devices are commonly programmed to send "_Note ON_" MIDI messages with a 0 velocity value in place of "_Note OFF_" messages.
{: class="note"}

If we examine more in depth our software serial output, we see a long list of consecutive data byte. One single status byte at the beginning (```144```) and then lots of _note_ and _velocity_ pairs. Why the _Status byte_ is not repeated?

**Observation 2**: this is called **Running Status**. MIDI standard states that the _status byte_ is sent only when it changes from the previous one. So, if we are playing a long series of notes, without modifying any other control, the status byte sent at the beginning of the sequence is always the same so we don't need to send it againg for every new note. This way we can save a third of time in sending MIDI data! This is the same reason why _Note ON_ messages (with a 0 velocity value) are preferred to _Note OFF_ ones.
{: class="note"}

## Arduino simple MIDI OUT interface

Now, let's try with the opposite approach: we want to create an Arduino MIDI instrument.

### Studio Setup

This would be our studio configuration:

![Studio MIDI Out Setup]({{ site.baseurl }}/assets/images/midi-interface/MIDI-studio-out.png)

What we need is a synth to be connected to our Arduino MIDI interface output.

### Hardware

We have to create a **MIDI out** interface so we need only:
* two **220 Ohm** resistors;
* and one **5 pin DIN**.

Here the _Fritzing scheme_ of our circuit.

![Fritzing MIDI in]({{ site.baseurl }}/assets/images/midi-interface/MIDI_OUT_bb_new.png)

### Software

Here we have a simple code to make our Arduino instruments plays random notes:

{% highlight c %}
#include <SoftwareSerial.h>

const byte rxPin = 11; // not used for the moment
const byte txPin = 10;

SoftwareSerial mySerial(rxPin, txPin);

int dly = 100;
int note, velocity;

// SETUP ///////////////////////////////////////////
void setup()
{
 pinMode( rxPin, INPUT );
 pinMode( txPin, OUTPUT);
 mySerial.begin( 31250 );
}

// LOOP ////////////////////////////////////////////
void loop()
{
 note = random(24)+60;
 velocity = 127;

 // note On
 mySerial.write(144);
 mySerial.write(note);
 mySerial.write( velocity );

 delay(dly);

 velocity = 0;

 // note Off
 mySerial.write(144);
 mySerial.write(note);
 mySerial.write( velocity );

 delay(dly);
}

{% endhighlight %}

---

## Arduino simple MIDI IN & OUT interface

Great! Now it's time to make it more complicated: we will create a new circuit and write new code to make our Arduino _get_ MIDI messages in and _send_ them out.

### Hardware

What we need to build our circuit:
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) or a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler.
* an [**1N4148**](https://en.wikipedia.org/wiki/1N4148) high speed diode;
* four **220 Ohm** resistors;
* and two **5 pin DIN**.

Here's the _Fritzing_ scheme:

![Fritzing MIDI in & out]({{ site.baseurl }}/assets/images/midi-interface/MIDI_IN_OUT_bb_new.png)

### Studio Setup

We are going to connect our MIDI keyboard/controller to the Arduino MIDI interface. Then we connect the interface to the synth. We can possibly use the USB serial communication to debug our code using the PC.

![Studio MIDI In Out Setup]({{ site.baseurl }}/assets/images/midi-interface/MIDI-studio-in-out.png)

### Software

The first thing to pay attention to is that the **SoftwareSerial Library** cannot send and receive data simultaneously as stated [here](http://www.pjrc.com/teensy/td_libs_AltSoftSerial.html#speed):

>  SoftwareSerial can not simultaenously transmit and receive, so it should be used with a device that never sends in both directions at once.

We have made some tests and we can confirm that. So we have to use a different library. The [AltSoftSerial](https://www.pjrc.com/teensy/td_libs_AltSoftSerial.html) worked well for us: we have to remember that on the Arduino UNO the library uses:
* pin 8 for receiving;
* pin 9 for transmitting.

{% highlight c %}
#include <AltSoftSerial.h>
AltSoftSerial midiSerial;

// #define RXPIN 8
// #define TXPIN 9

// SETUP ///////////////////////////////////////////
void setup()
{
  Serial.begin( 9600 );
  midiSerial.begin(31250);
}

// LOOP ////////////////////////////////////////////
void loop()
{  
  while( midiSerial.available() > 0 )
  {
    int incomingByte = midiSerial.read();
    midiSerial.write( incomingByte );
    Serial.println( incomingByte, DEC );
  }
}
{% endhighlight %}

## Conclusion

We have built our simple MIDI interface with Arduino; good job! Now the only limit is our imagination: what about adding a piece of code that modifies MIDI data in and send them back to create particular harmonizations or other kind of musical effects?

Now we are happy with it but stay tuned for future developements...

## Update

Take also a look at our [slides](http://www.limulo.net/res/terni2018/) and [repository](https://github.com/Limulo/slides_HackLab_Terni_festival_2018) we have prepared for our "Arduino in MIDI" talk @ [Terni Maker Festival 2018]({{ site.baseurl }}{% post_url 2018-03-24-ternimakerfestival2018 %})!
