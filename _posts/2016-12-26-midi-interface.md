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

MIDI is a serial communication. On the physical layer it uses the classic [5 pin DIN connector](https://en.wikipedia.org/wiki/DIN_connector) and cable

### MIDI messages

blah blah blah

We know we have different kind of MIDI messages and we are able to differenciate them thanks to their first byte: the **Status Byte**. Inside the Status Byte is enclosed another importat information: the **MIDI Channel**.

blah blah blah

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
* a bunch of **220 Ohm** resistors;
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) optocoupler. We may also use a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler as **Joshua Noble** says in his "_Programming Interactivity_" book;
* an [**1N4148**](https://en.wikipedia.org/wiki/1N4148) high speed diode;
* and - obviously - two **5 pin DIN**.

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


![Studio MIDI Out Setup](/assets/images/midi-interface/MIDI-studio-out.png)


### Hardware

### Software

### Studio Setup

---

## Arduino MIDI IN & OUT interface

![Studio MIDI In Out Setup](/assets/images/midi-interface/MIDI-studio-in-out.png)

### Hardware

### Software

### Studio Setup

Here's another sketch. Thanks to this one we are able to see all the different kind of _Status byte_ types directly inside the _Serial Monitor_:

{% highlight c %}
#include <SoftwareSerial.h>

const byte rxPin = 11;
const byte txPin = 10;

unsigned char midiCh, statusByte;

// VOICE CHANNEL MESSAGES
const unsigned char noteOn = 144;
const unsigned char noteOff= 128;
const unsigned char chPressure = 208; // channel after Touch
const unsigned char polyKeyPressure = 160; // polyphonic after Touch
const unsigned char controlChange = 176;
const unsigned char prgChange = 192;
const unsigned char pitchBenderChange = 224;

SoftwareSerial mySerial(rxPin, txPin);

// SETUP ///////////////////////////////////////////
void setup()
{
  Serial.begin( 9600 );

  pinMode( rxPin, INPUT );
  pinMode( txPin, OUTPUT);
  mySerial.begin( 31250 );
}


// LOOP ////////////////////////////////////////////
void loop()
{

  if(mySerial.available() > 0) {
    unsigned char incomingByte = mySerial.read();

    if( incomingByte > 127 ) // status byte
    {
      midiCh = incomingByte & 0x0F;
      statusByte = incomingByte & 0xF0;

      if(statusByte == noteOn) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - Note ON (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else if(statusByte == chPressure) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - ch pressure (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else if(statusByte == polyKeyPressure) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - polyKeyPressure (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else if(statusByte == pitchBenderChange) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - pitchBenderChange (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else if(statusByte == controlChange) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - controlChange (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else if(statusByte == prgChange) {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - prgChange (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      } else {
        Serial.println();
        Serial.print( statusByte, DEC);
        Serial.print(" - another kind of status byte (ch ");
        Serial.print( midiCh, DEC);
        Serial.println(");");
      }
    } else { // data byte
      Serial.println( incomingByte, DEC);
    }
  }
}
{% endhighlight %}

Pay attention: the **SoftwareSerial Library** cannot send and receive data simultaneously as we can read [here](http://www.pjrc.com/teensy/td_libs_AltSoftSerial.html#speed):

>  SoftwareSerial can not simultaenously transmit and receive, so it should be used with a device that never sends in both directions at once.
