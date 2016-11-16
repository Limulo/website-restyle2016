---
layout: post
title: Vibration Motor test
date: 2016-11-16 18:48:00
excerpt: testing a little vibration motor with Arduino!
category: coding
---

Let's try our new [vibration motor](https://www.adafruit.com/products/1201). It is a little device that vibrates according to the tension applied.

![photo 1](/assets/images/vibration-motor-test/DSCF0747.JPG)

## Buiding Process
According to the [Adafruit reference](https://www.adafruit.com/products/1201) the vibration motor can be powered with a tension between 2V and 5V. The greater the tension, the greater the vibrations produced and the current consumed.

To avoid excessive current consumption (so we can use the motor with an Arduino pin) and to reduce the strenght of the vibration, we can try putting a 100-1000 ohm resistor in series.

So here's the circuit we have prepared:

![circuit](/assets/images/vibration-motor-test/circuit_01_bb.png)

![photo 1](/assets/images/vibration-motor-test/P1020543.JPG)

And here's our sample code:

```
#define LED 13
#define VIBRA 3

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(VIBRA, OUTPUT);
  digitalWrite(LED,LOW);
  digitalWrite(VIBRA,LOW);
}

void loop() {
  digitalWrite(LED, HIGH);
  digitalWrite(VIBRA, HIGH);
  delay(1000);
  digitalWrite(LED, LOW);
  digitalWrite(VIBRA, LOW);
  delay(1000);
}
```
While powering the motor we light a LED as a visual feedback of what's happening.

Everything seems to work very well:

<iframe width="100%" height="360" src="https://youtu.be/h2FnEDQ2CWc" allowfullscreen></iframe>

In this configuration, using a 220 Ohms resistor, we measure a current of ~65mA 

### Motor Technical details
* Dimension: 10mm diameter, 2.7mm thick
* Voltage: 2V - 5V
* 5V current draw: 100mA, 4V current draw: 80mA, 3V current draw: 60mA, 2V current draw: 40mA
* 11000 RPM at 5V
* Weight: 0.9 gram

## Future experiments
A different experiment we can try is to use a **PN2222 transistor configuration** as shown in [this](https://learn.adafruit.com/adafruit-arduino-lesson-13-dc-motors) tutorial.
