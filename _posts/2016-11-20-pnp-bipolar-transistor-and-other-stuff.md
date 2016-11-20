---
layout: post
title: Bipolar Transistor and other stuff
date: 2016-11-20 12:40:00
excerpt: on hoe to drive a motor with Arduino using transistors
category: [coding]
---
## Background

According to what we read in chapter 4 from the book **Practical Elctronics for inventors** by Paul Sherz about transistor, we have to consider some important formulae when we are using a _npn_ transistor:

![fig 4.22](dal libro di Paul Sherz)

* Ic = Hfe * Ib = B * Ib

Where Hfe = B (**current gain**)

* Ie = Ib + Ic = (B + 1)Ib ~= Ic
* Vbe = Vb - Ve = +0,6V
* transresistance Rtr ~= 0,026V / Ie

We must create these conditions in order the transistor to work:

* Vbe need to be at least 0,6V
* Vce need to be >0V

## Circuit configuration, base resistance

According to this circuit that we want to create, we need to find the resistance value to use with the transistor base.
This value is obtained knowing th _Ib_ value. _Ib_ is obtained in turn by a second value: _Ic_.

We know from the tech specs, that the motor is capable of drawing up to **100mA**. So our _Ic_ current correspond exactly to this value. Now, looking at the **2N2222** transistor [datasheet](https://www.fairchildsemi.com/datasheets/PN/PN2222.pdf), we find a **B** value of approximately 100.

So Ib must be 1mA (Ic / B).

How to obtain R now?

R = Vr / Ir = (VdigitalHigh - Vb) / Ib = (5V - 0,6V) / 1mA = 4,4KOhm

## Inductive load

At page 153, the section **Important Things to Know about Bipolar Transistors** tells us that in order to prevent a transistor damage when working with motors (that are infact inductive loads) we have to connect a **diode** in parrallel with the motor.
This way we avoid a positive Vce voltage spark to break the transistor.

Everytime the transistor is turned off infact, the motor will create this voltage spark because of its inductive nature and the impossibility for it to have an instanctaneus change in current flow.

This spark is dangerous and can damege the transistor, so we need a diode to protect it.

## PWM: what transistor should we use? What diode?

According to the [Arduino reference](https://www.arduino.cc/en/Reference/AnalogWrite) PWM frequency on most pins is approximately 490Hz. On Arduino UNO and similar boards, pin 5 and 6 have a frequency of approximately 980 Hz.

Is the transistor **2N2222** capable of foolowing this switchin rate?
What kind of diode we need if we want to use such a PWM frequency?

The fact we have to consider now it _what kind of diode we need_? Yes, because we are plannign to turn on and of the transistor very rapidly with a PWM. So what type of diode will be able to follow this trend?



---
