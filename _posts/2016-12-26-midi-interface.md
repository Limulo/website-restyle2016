---
layout: post
title: MIDI interface
date: 2016-12-26 09:30:00
excerpt: Arduino sending and receiving MIDI messages!
category: [coding, physical-computing]
---

Let's try a new experiment: how about an Arduino MIDI interface?

We want out _Arduino UNO_ board to receive, intepret and than send back MIDI messages.

We know we have different kind of MIDI messages and we are able to differenciate them thanks to their first byte: the **Status Byte**. Inside the Status Byte is enclosed another importat information: the **MIDI Channel**.

## Hardware

First of all we have to build the circuit. We take advantage of the beautiful [pighixxx](http://www.pighixxx.com/) illustrations. Here's the one we will use a reference:

[![pighixxx MIDI interface](http://www.pighixxx.com/test/wp-content/uploads/2014/10/206.png)](http://www.pighixxx.com/test/abc/page/2/#prettyPhoto[gallery]/6/)

[Here](https://upload.wikimedia.org/wikipedia/commons/a/a5/MIDI_IN_OUT_schematic.svg) another schematics from Wikipedia.

### MIDI In section
First we will examine the **MIDI in** section. What we need:
* a bunch of **220 Ohm** resistors;
* an [**6N138**](http://www.vishay.com/docs/83605/6n138.pdf) optocoupler. An alternative solution by **Joshua Noble** is to use a [4n28](http://www.vishay.com/docs/83725/4n25.pdf) optocoupler as he says in his "_Programming Interactivity_" book;
* an high speed diode [**1N4148**](https://en.wikipedia.org/wiki/1N4148);
* and - obviously - two **5 pin DIN**.

Here the _Fritzing scheme_ of our circuit.

![Fritzing MIDI in](/assets/images/midi-interface/MIDI-IN_bb.png)


### Software

We decided to use the [**Software Serial**](https://www.arduino.cc/en/Reference/SoftwareSerial) library, so to be able to continue sharing information with the computer via the main serial port.

{% highlight c %}
#include <SoftwareSerial.h>

const byte rxPin = 11;
const byte txPin = 10;

SoftwareSerial mySerial(rxPin, txPin);

// SETUP ///////////////////////////////////////////
void setup() {
  pinMode( rxPin, INPUT );
  pinMode( txPin, OUTPUT);
  mySerial.begin( 31250 );

  Serial.begin( 9600 );
}


// LOOP ////////////////////////////////////////////
void loop() {

  while(mySerial.available() > 0) {
    unsigned char c = mySerial.read();
    Serial.println( c, DEC);
  }
}
{% endhighlight %}

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
