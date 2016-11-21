---
layout: post
title: Bipolar Transistor and other stuff
date: 2016-11-20 12:40:00
excerpt: on hoe to drive a motor with Arduino using transistors
category: [coding]
---
## Background

According to what we read in chapter 4 from the book **Practical Elctronics for inventors** by Paul Sherz about transistors, we have to consider some important formulae when we are using a _npn_ one:

![fig 4.22](dal libro di Paul Sherz)

$$ I_{c} = H_{fe} I_{b} = \beta I_{b} $$

Where $$ H_{fe} = \beta $$ (**current gain**)


$$ I_{e} = I_{b} + I_{c} = (\beta + 1) I_{b} \sim I_{c} $$


$$ V_{be} = V_{b} - V_{e} = +0,6V $$

{% comment %}
$$ transresistance Rtr ~= 0,026V / Ie $$
{% endcomment %}

We must create these conditions in order the transistor to work:


$$ V_{be} \geq  0.6V $$


$$ V_{ce} > 0V $$


## Circuit configuration, base resistance

According to this circuit that we want to create, we need to find the resistance value to use with the transistor base.
This value is obtained knowing the $$ I_{b} $$ value. $$ I_{b} $$ is obtained in turn by a second value: $$ I_{c} $$.

We know from the tech specs, that the motor is capable of drawing up to **100mA**. So our $$ I_{c} $$ current correspond exactly to this value. Now, looking at the **2N2222** transistor [datasheet](https://www.fairchildsemi.com/datasheets/PN/PN2222.pdf), we find a $$ \beta $$ value of approximately 100.

So $$ I_{b} $$ must be 1mA ( $$ \frac{I_{c}}{\beta} $$ ).

How to obtain R now?


$$ R = \frac{V_{r} }{I_{r}} = \frac{(V_{digitalHigh} - V_{be})}{I_{b}} = \frac{(5V - 0,6V)}{1 mA} = 4,4 K\Omega $$


## Inductive load

At page 153, in section **Important Things to Know about Bipolar Transistors** Paul Sherz tells us that in order to prevent a transistor damage when working with motors (that are infact inductive loads) we have to connect a **diode** in parrallel with the motor.

> To prevent exceeding $$ BV_{ceo} $$ , which may be an issue if the collector holds an inductive load, a diode placed in parallel with the load will go into conduction before a collector-voltage spike, created by the inductive load, reaches the breakdown voltage.

[Here](http://electronics.stackexchange.com/questions/95140/purpose-of-the-diode-and-capacitor-in-this-motor-circuit#95141)'s also a detailed technical explanation of the diode function:

> The diode is to provide a safe path for the inductive kickback of the motor. If you try to switch off the current in a inductor suddenly, it will make whatever voltage is necessary to keep the current flowing in the short term. Put another way, the current thru a inductor can never change instantaneously. There will always be some finite slope.

> The motor is partially a inductor. If the transistor shuts off quickly, then the current that must still flow thru the inductor for a little while will flow thru the diode and cause no harm. Without the diode, the voltage accross the motor would get as large as necessary to keep the current flowing, which would probably require frying the transistor.
[by Olin Lathrop]

The motor is partially a inductor. If the transistor shuts off quickly, then the current that must still flow thru the inductor for a little while will flow thru the diode and cause no harm. Without the diode, the voltage accross the motor would get as large as necessary to keep the current flowing, which would probably require frying the transistor.

![see Fig. 4.38c]()

This way we avoid a positive $$ V_{ce} $$ voltage spark to break the transistor.

Everytime the transistor is turned off infact, the motor will create this voltage spark because of its inductive nature and the impossibility for it to have an instantaneus change in current flow.

This spark is dangerous and can damege the transistor, so we need a diode to protect it.

## PWM: what transistor should we use? What diode?

According to the [Arduino reference](https://www.arduino.cc/en/Reference/AnalogWrite) PWM frequency on most pins is approximately 490Hz. On Arduino UNO and similar boards, pin 5 and 6 have a frequency of approximately 980 Hz.

### Transistor
Is the transistor **2N2222** capable of following this switching rate?
Considering different datasheet and also some [online discussion](http://forum.allaboutcircuits.com/threads/maximum-transistor-frequency.85179/), it seems that the **2N2222** can make it! Maybe it will be the case to carefully calibrate min and max PWM value so the duty cycle will fit with the particular rise/storage/fall/delay time of the transistor (if it is the case...)

### Diode
What kind of diode we need if we want to use such a PWM frequency? I'm usign [this](http://www.robot-italy.net/downloads/1N4148_1N4448_4.pdf) particular diode: **1N4148**. From the datasheet we read that it is capable of a maximum switching speed of 4ns, so I think that it will make it!

## Using a capcitor in parallel with the motor
As **Olin** says, we can use a little capacitor in parralle lwith the motor to reduce readiation and the speed of voltage transitions:

> A small capacitor accross the motor will reduce the speed of the possibly fast voltage transitions, which causes less radiation and limits the $$ \frac {dV}{dt} $$ the transistor is subjected to. 100 nF is excessive for this, and will prevent efficient operation at all but low PWM frequences. I'd use 100 pF or so, perhaps to up 1 nF.
