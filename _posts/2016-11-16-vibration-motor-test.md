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

**Note**: this tutorial uses a resistance value that is too little a can cause **damage** to your Arduino board. Better to use a mush higher value so to reduce corrent from the Arduino digital pin.
Take a look at an [another]({% post_url 2016-11-20-bipolar-transistor %}) experiment we have made that is more respectful of the Arduino board.
{: .note}

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

In this configuration, using a 220 Ohms resistor, we measure a current of ~65mA;

**Note**: this current is higher than the maximum amount of current we can obtain from an Arduino digital pin. This circuit configuration can **damage** your Arduino. Please substitute this resistor with another one with a much higher resistance value.
Take a look at an [another]({% post_url 2016-11-20-bipolar-transistor %}) experiment we have made that is more respectful of the Arduino board.
{: .note}

### Motor Technical details
* Dimension: 10mm diameter, 2.7mm thick
* Voltage: 2V - 5V
* 5V current draw: 100mA,
  + 4V current draw: 80mA,
  + 3V current draw: 60mA,
  + 2V current draw: 40mA
* 11000 RPM at 5V
* Weight: 0.9 gram

## Future experiments
Take a look at [this]({% post_url 2016-11-20-bipolar-transistor %}) improvement we have made. We are usign a **PN2222** transistor to manage the current that will flow through the motor.
