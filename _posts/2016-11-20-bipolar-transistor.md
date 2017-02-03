---
layout: post
title: Bipolar Transistor and other stuff
date: 2016-11-20 12:40:00
excerpt: on how to drive a motor with Arduino using transistors
category: [coding, physical-computing]
---
Coming from [this]({{ site.baseurl }}{% post_url 2016-11-16-vibration-motor-test %}) experiment, now we want to improve it adding some more electric components.

Infact we know that we cannot draw too much current from the Arduino pins as you can conclude from this wonderful [scheme](http://www.pighixxx.com/test/portfolio-items/uno/?portfolioID=314) by **Pighixxx**, or read [here](http://arduino-info.wikispaces.com/ArduinoPinCurrent?responseToken=595ebf2e544e90f92f087b693242b0a4). The motor we want to drive is a load that is better not to connect directly to the Arduino board in order to prevent this.

How can we solve this particular problem? We can use a **transistor**!

Before starting, take a look a [this](https://learn.adafruit.com/adafruit-arduino-lesson-13-dc-motors) tutorial by **Simon Monk** taken from the **Adafruit** website.

## Background

According to what we read in _chapter 4_ from the book "**Practical Elctronics for inventors**" by **Paul Sherz** about transistors, we have to consider some important formulae when we are using a _npn_ one:

![transistor graph 1]({{ site.baseurl }}/assets/images/vibration-motor-test/transistor-graph-1.png)

$$ I_{c} = H_{fe} I_{b} = \beta I_{b} $$

Where $$ H_{fe} = \beta $$ (**current gain**)


$$ I_{e} = I_{b} + I_{c} = (\beta + 1) I_{b} \sim I_{c} $$


$$ V_{be} = V_{b} - V_{e} = +0.6V $$

{% comment %}
$$ transresistance Rtr ~= 0,026V / Ie $$
{% endcomment %}

We must create these conditions in order the transistor to work:


$$ V_{be} \geq  0.6V $$


$$ V_{ce} > 0V $$


## Circuit configuration, base resistance

According to this circuit that we want to create, we need to find the resistance value to use with the transistor base.
This value is obtained knowing the $$ I_{b} $$ value.

$$ I_{b} $$ is obtained in turn by a second value: $$ I_{c} $$.

We know from the tech specs, that the motor is capable of drawing up to **100mA**. So our $$ I_{c} $$ current corresponds exactly to this value. Now, looking at the **2N2222** transistor [datasheet](https://www.fairchildsemi.com/datasheets/PN/PN2222.pdf), we find a $$ \beta $$ value of approximately 100.

So $$ I_{b} $$ must be 1mA ( $$ \frac{I_{c}}{\beta} $$ ).

How to obtain R now?


$$ R = \frac{V_{r} }{I_{r}} = \frac{(V_{digitalHigh} - V_{be})}{I_{b}} = \frac{(5V - 0,6V)}{1 mA} = 4,4 K\Omega $$


## Inductive load

At page 153, in section **Important Things to Know about Bipolar Transistors** Paul Sherz tells us that in order to prevent a transistor damage when working with motors (that are infact inductive loads) we have to connect a **diode** in parrallel with the motor.

> To prevent exceeding $$ BV_{ceo} $$ , which may be an issue if the collector holds an inductive load, a diode placed in parallel with the load will go into conduction before a collector-voltage spike, created by the inductive load, reaches the breakdown voltage.

[Here](http://electronics.stackexchange.com/questions/95140/purpose-of-the-diode-and-capacitor-in-this-motor-circuit#95141)'s also a detailed technical explanation of the diode function by **Olin Lathrop**:

> The diode is to provide a safe path for the inductive kickback of the motor. If you try to switch off the current in a inductor suddenly, it will make whatever voltage is necessary to keep the current flowing in the short term. Put another way, the current thru a inductor can never change instantaneously. There will always be some finite slope.

> The motor is partially a inductor. If the transistor shuts off quickly, then the current that must still flow thru the inductor for a little while will flow thru the diode and cause no harm. Without the diode, the voltage accross the motor would get as large as necessary to keep the current flowing, which would probably require frying the transistor.

The motor is partially an inductor. If the transistor shuts off quickly, then the current that must still flow through the inductor for a little while will flow thru the diode and cause no harm. Without the diode, the voltage accross the motor would get as large as necessary to keep the current flowing, which would probably require frying the transistor.

![transistor graph 2]({{ site.baseurl }}/assets/images/vibration-motor-test/transistor-graph-2.png){: width="30%;" }

This way we avoid a positive $$ V_{ce} $$ voltage spark to break the transistor.

Everytime the transistor is turned off infact, the motor will create this voltage spark because of its inductive nature and the impossibility for it to have an instantaneus change in current flow.

This spark is dangerous and can damege the transistor, so we need a diode to protect it.

## PWM: what transistor should we use? What diode?

According to the [Arduino reference](https://www.arduino.cc/en/Reference/AnalogWrite), PWM frequency on most pins is approximately 490Hz. On Arduino UNO and similar boards, pin 5 and 6 have a frequency of approximately 980 Hz.

### Transistor
Is the transistor **2N2222** capable of following this switching rate?
Considering different datasheet and also some [online discussion](http://forum.allaboutcircuits.com/threads/maximum-transistor-frequency.85179/), it seems that the **2N2222** can make it! Maybe it will be the case to carefully calibrate min and max PWM value so the duty cycle will fit with the particular rise/storage/fall/delay time of the transistor (if it is the case...)

### Diode
What kind of diode we need if we want to use such a PWM frequency? I'm usign [this](http://www.robot-italy.net/downloads/1N4148_1N4448_4.pdf) particular diode: **1N4148**. From the datasheet we read that it is capable of a maximum switching speed of 4ns, so I think that it will make it!

## Using a capacitor in parallel with the motor
As **Olin Lathrop** says, we can use a little capacitor in parallel with the motor to reduce radiation and the speed of voltage transitions:

> A small capacitor accross the motor will reduce the speed of the possibly fast voltage transitions, which causes less radiation and limits the $$ \frac {dV}{dt} $$ the transistor is subjected to. 100 nF is excessive for this, and will prevent efficient operation at all but low PWM frequences. I'd use 100 pF or so, perhaps to up 1 nF.

## Testing
Keeping attention to the transistor pinout

![transistor pinout]({{ site.baseurl }}/assets/images/vibration-motor-test/2N2222.png){: width="30%;" }

and to the diode direction, we create the circuit shown in this _Fritzing_ diagram and schematics

![fritzing circuit]({{ site.baseurl }}/assets/images/vibration-motor-test/with_2N2222_bb.png)

![fritzing circuit]({{ site.baseurl }}/assets/images/vibration-motor-test/with_2N2222_schem.png)

Here the final result. Time to make some test!

![circuit]({{ site.baseurl }}/assets/images/vibration-motor-test/P1020551.JPG)

![circuit]({{ site.baseurl }}/assets/images/vibration-motor-test/P1020554.JPG)

Below some data we've collected using our very elementary analog multimeter. We measured the base current and the collector current for a fixed value of the Base resistance, slightly varying the PWM duty cycle.
Maybe these measurements are not teoretically correct 'casue the current signal is not a direct one but a time varying one so it will be very appreciated if anybody will let us now how can we improve our workflow in doing this.

Given $$ R_{base} = 4700 \Omega $$, we measure

duty cycle | base current (mA)| collector current (mA) | calculated $$ \beta $$
| :-: | :-: | :-: | :-: |
25% (64) | 0.17 | 20 | 117
50% (128) | 0.3 | 20 | 66.6
75% (192) | 0.6 | 65 | 108
100% (255) | 0.8 | 80 | 100

{% comment %}
12.5 % (32) | 0.09 | 5 | 55
37.5% (96) |
62.5% (160) |
87.5% (224) |
{% endcomment %}

As we can see, using a transistor in this particular configuration, we are able to pilot a motor without drawing too much current from the Arduino digital pin.

Here's the code I have used, substituting the duty value for each measurement:

{% highlight c %}
#define VIBRA 3
#define duty 32

void setup() {
  pinMode(VIBRA, OUTPUT);
  digitalWrite(VIBRA,LOW);
}

void loop() {
  analogWrite( VIBRA, duty );
  delay(2000);
  digitalWrite( VIBRA, LOW );
  delay( 2000 );
}
{% endhighlight %}
