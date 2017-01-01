---
layout: post
title: Arduino MIDI interface
date: 2016-12-26 09:30:00
excerpt: Arduino sending and receiving MIDI messages!
category: [coding, physical-computing]
---

## MIDI: an introduction

[MIDI](Musical Instrument Digital Interface) stands for **Musical Instruments Digital Interface**, it is the name that musical instruments manufacturers early in the '80  gave to a new communication protocol between musical instruments and devices.

Communication protocols already existed but the MIDI value was that it became a standard and that it used digital instead of analog signals.

Modern musical instruments use MIDI to talk to each other and, when they exchange messages, they are exchanging _bytes_ indeed.

![MIDI communcation](/assets/images/midi-interface/MIDI-intro.png)

From a more technical point of view, MIDI is an asynchronous serial communication which transmission speed is of **31250 baud**. On the physical layer it uses the classic [5 pin DIN connector](https://en.wikipedia.org/wiki/DIN_connector) and cable.

### MIDI messages

Here you have a picture of a standard MIDI message:

![standard MIDI msg](/assets/images/midi-interface/status-and-data.png){: width="60%;"}

As you see, there are two main categories for bytes inside a MIDI message:
* **Status Byte**;
* **Data Byte**;

Suppose we are a MIDI device and that we are receiving MIDI messages from a MIDI controller: how can we differenciate between _status bytes_ and _data bytes_? The main difference between them stands in their values: **Status Bytes** are byte which value is greater than 127 while **Data Bytes** always have values comprised between 0 and 127.

From a binary point of view it meas that the leftmost _bit_ of a _status byte_ is always 1 while it is 0 for the _data byte_.

![immagine binary point of view](/assets/images/midi-interface/status-and-data-bits.png){: width="60%;"}

#### MIDI channels

What is a MIDI channel? Suppose we have only one MIDI keyboard/controller connected to many rack synths.

![MIDI channels](/assets/images/midi-interface/MIDI-channels.png)

How can we use all the synths sounds, maybe one for each portion of the keyboard, so to play different sounds with different notes?

Here comes the **MIDI channel**! Using MIDI channels we can say to each one of our rack instruments to listen only at messages coming from a specific MIDI channel, discarding all the others. Similarly we can do with our MIDI keyboard, setting it to send messages to different MIDI channels if we play different notes or use different controls.

The MIDI protocol provides up to 16 different MIDI channels. Each MIDI message contains information on the MIDI channel used to send it and we can find that in the lower nibble of the _status byte_

![status byte and its nibbles](/assets/images/midi-interface/nibbles.png){: width="60%;"}

### Reference

If you need more information about MIDI and how it works I would warmly recommend reading the book "_MIDI computer e musica_" by **Giovanni Perotti**, I've found it a precious resource in many sitations. It's iItalian but I think we can also find good alternatives in English.

---

## Arduino simple MIDI IN interface

So let's try this new experiment: how about an Arduino MIDI interface?

For the moment we want our _Arduino UNO_ board to receive and debug the MIDI messages it receives from the outside world.

We could use the default hardware serial port (the **RX** pin on the board) to receive bytes but, from the moment that we want also to debug our code usign the _Serial Monitor_, we need to use this serial port for the communication with the PC.

We need and additional hardware serial port for our MIDI interface: we can use the Arduino [**Software Serial**](https://www.arduino.cc/en/Reference/SoftwareSerial) library!

### Hardware

First of all we have to build the circuit. We take advantage of the beautiful [pighixxx](http://www.pighixxx.com/) illustrations. Here's the one we will use a reference:

[![pighixxx MIDI interface](http://www.pighixxx.com/test/wp-content/uploads/2014/10/206.png)](http://www.pighixxx.com/test/abc/page/2/#prettyPhoto[gallery]/6/)

[Here](https://upload.wikimedia.org/wikipedia/commons/a/a5/MIDI_IN_OUT_schematic.svg)'s another schematics from Wikipedia.

---
Let's focusing on the **MIDI In** section. What we need:
* two **220 Ohm** resistors;
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) optocoupler. We may also use a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler as **Joshua Noble** says in his "_Programming Interactivity_" book;
* an [**1N4148**](https://en.wikipedia.org/wiki/1N4148) high speed diode;
* and - obviously - one **5 pin DIN**.

Here the _Fritzing scheme_ of our circuit.

![Fritzing MIDI in](/assets/images/midi-interface/MIDI-IN_bb.png)

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

In order to examine the MIDI messages flow we have to connect a MIDI device (such a MIDI keyboard or controller) to our little Arduino MIDI interface.

![Studio MIDI In Setup](/assets/images/midi-interface/MIDI-studio-in.png)

### Tests

Now that everything is prepared, let's upload the sketch. We play some notes on the keyboard and see what happens.
Here's a screenshot of the Serial monitor output:

![Serial monitor output 1](/assets/images/midi-interface/serial-monitor-1.png)

Wow! It works!

All this is very exciting. All the numbers we see here are the bytes sent from the MIDI keyboard to our Arduino MIDI interface and, again, from Arduino to the PC.

We can see clearly the **144** byte and, because its value is greater than _127_, we know it's a _Status Byte_ and a **Note ON** status byte in particular.

We also know that the MIDI channel we are receiving messages from is the channel **1**, _0_ in binary infact the _Status Byte_ contains both the status information and the MIDI channel number and in our case:

$$ 144 + 0 = 144 $$

or in binary if we prefer

$$ 1001 0000 | 0000 0000 = 1001 0000 $$

We see also byte values which are lower than 127: these are _Data bytes_.

Because they follows the **Note ON** status byte they are always in pairs, as we see, and represent a **note number** and a **velocity** value.

So, for example, the sequence ```144 76 50``` means the I've played an _E5_ (note number 76) with a velocity of 50.
After that a new bytes sequence testify that I've also released the note: ```144 76 0``` (same note, velocity 0).

**Obervation 1**: We don't see the **Note OFF** status byte, why? Clearly it's because my MIDI keyboard is not programmed to send it. Infact MIDI devices are commonly programmed to send _Note ON_ MIDI messages with a 0 velocity value in place of _Note OFF_ messages.
{: class="note"}

If we examine more deeply our software serial output, we see also long list of consecutive data byte. One single status byte at the beginning (```144```) and then lots of _note_ and _velocity_ pair. Why the _Status byte_ is not repeated?

**Observation 2**: this is called **Running Status**. MIDI standard provides that the _status byte_ is sent only when it changes from the previous one. So, if we are playing a long series of notes, without modifying any other controls, the status byte, sent at the beginning of the sequence, is always the same so we don't need to send it againg every new note. This way we can save a third of time in sending MIDI data! This is the same reason _Note ON_ messages (with a 0 velocity value) are preferred to _Note OFF_ ones.
{: class="note"}

## Arduino simple MIDI OUT interface

So now let's try with the opposite approach: we want to create an Arduino MIDI instrument.

### Studio Setup
This would be our studio configuration:

![Studio MIDI Out Setup](/assets/images/midi-interface/MIDI-studio-out.png)

What we need is a synth rack to be connected to our Arduino MIDI interface output.

### Hardware

We have to create a **MIDI out** interface so we need only:
* two **220 Ohm** resistors;
* and one **5 pin DIN**.

Here the _Fritzing scheme_ of our circuit.

![Fritzing MIDI in](/assets/images/midi-interface/MIDI-OUT_bb.png)

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

Great! Now it's time to make it more complex: now we will create a new circuit and write new code to make our Arduino get MIDI messages in and send them out.

### Hardware

What we need to build our circuit:
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) or a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler.
* an [**1N4148**](https://en.wikipedia.org/wiki/1N4148) high speed diode;
* four **220 Ohm** resistors;
* and two **5 pin DIN**.

Here's the _Fritzing_ scheme:

![Fritzing MIDI in & out](/assets/images/midi-interface/MIDI-IN-OUT_bb.png)

### Studio Setup

We are going to connect our MIDI keyboard/controller to the Arduino MIDI interface. The we connect the interface to the synth rack. We can eventually use the USB serial communication to debug our code using the PC.

![Studio MIDI In Out Setup](/assets/images/midi-interface/MIDI-studio-in-out.png)

To be thorough here we added the speaker icons!

### Software

The first thing to pay attention to is that the **SoftwareSerial Library** cannot send and receive data simultaneously as we can read [here](http://www.pjrc.com/teensy/td_libs_AltSoftSerial.html#speed):

>  SoftwareSerial can not simultaenously transmit and receive, so it should be used with a device that never sends in both directions at once.

We have made some test and we can confirm that. So we have to use a different library. The [AltSoftSerial](https://www.pjrc.com/teensy/td_libs_AltSoftSerial.html) worked well for us: we have to remember that, on the Arduino UNO, the library is using:
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

We have built our simple MIDI interface with Arduino, good job! Now the only limit is our imagination: what about adding a piece of code that modifies MIDI data in and send them back so to create particulare armonizations or other kind of musical effects?

Now we are happy with this but stay tuned for more about it...
