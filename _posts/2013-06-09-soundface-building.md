---
layout: post
title: Soundface building process
excerpt: building the soundface step by step
category: [installation, soundface]
date: 2013-06-09 09:31:00
---

{% comment %}date: 2013-06-09 09:31:00{% endcomment %}


## First protoypes

On June 9th 2013 we introduced our intercative table prototype at _Ohibò_ during the _(Lab)Oratorio Digitale_ weekly meeting.

![Ohibo 1](/assets/images/soundface/Ohibo_1-1024x860.jpg)

We based our prototype on the computer vision studies carried out at Pompeu Fabra University in Barcellona.
It boils down to a graphical pattern recognizing system that links every images to a specific sound created in real time.
The player can create rythm and tempo by placing vary symbols upon the surface.

### Details

[fiducials](/assets/images/soundface/fiducials-1024x768.jpg){: width="20%;"}

The active surface is a simple stool with one broom grip attached to one leg. 
At the top of the grip a IR camera / lamp faces downward to enlight and capture the objects on the surface.
The markers are pieces of cardboard with a marker image stuck on one side.
The capture images is sent from the IR camera to a computer software, Reactivision, that can recognize the markers and obtain information to be sent to a client software.
The client software re-elaborate the type and position of every marker to create musical patterns.
In order for this to work properly, a very careful Reactivision calibration must be apllied.

![calibration](/assets/images/soundface/calibration.png)

![debug](/assets/images/soundface/debug.png)

![circular crown](/assets/images/soundface/corona_circolare-1024x768.jpg)

![rotation test](/assets/images/soundface/rotation_test.png)

![Ohibo 2](/assets/images/soundface/Ohibo_2-1024x683.jpg)


---

## Building the structure

Pencils, rubber, ruler, graph paper, goniometer ... all is ready to start building our table structure!

![tav.1](/assets/images/soundface/P1010718-1024x768.jpg)

On a summer sunday afternoon, equipped with glasses and masks, we began sawing pieces of wood, trying to make the pieces all match together, marking points to nail or glue.
The goal was: the structure must stand.

During all this turmoil, the cat pacefully roamed peeping around.

![babi](/assets/images/soundface/d1-1024x768.jpg)

We ended at night, exhausted and covered in dust. But oue goal is reached: the table structure stood magnificently in the middle of the room. 

![tav.2](/assets/images/soundface/a-768x1024.jpg)


### technical notes

The table is made with spruce wood. It's a cubic structure (each side length is 1 meter).

## Setting up the surface and the camera

The next steps involved:

* the surface: we needed a 1mx1m plexiglass sheet
* the camera: after having purchased a ps3eye we tweaked it adding a new lens, a new lens mount a new IR filter 

![IR2](/assets/images/soundface/IR_21-1024x768.jpg)

To provide some diffuse IR illumination within the structure we came down with 4 IR lamps, one for each edge.

Once all components have been set up, we could start assembling and testing the whole structure.

### technical notes

The camera is a Sony PS3Eye. We removed its original lens and lens mount.
La telecamera è una Sony PS3 Eye cui è stata asportata la lente originale e il relativo supporto.

![IR3](/assets/images/soundface/IR_3-768x1024.jpg)

First of all, we rmoved the 4 little rubber caps on the rear. The we unscrewed the 4 screws underneath.

![IR4](/assets/images/soundface/IR_4-768x1024.jpg)

Opening the camera case has been quite simple. All we had to do was to slightly force the joint.

![IR5](/assets/images/soundface/IR_5-768x1024.jpg)

Once opened the camera, we extracted the PCB.


![IR6](/assets/images/soundface/IR_6_mod-1024x768.jpg)

We then substituted the lens and inserted the filter.

We got the new lens mount by hacking a cheap USB camera.

The new [lens](http://dx.com/p/2-1mm-160-degree-wide-angle-lens-for-security-cameras-and-webcams-15237) and the cheap [camera](http://dx.com/p/300kp-cmos-pc-usb-webcam-w-6-led-white-light-microphone-black-91983) have been purchased from [DealExtreme online shop](http://dx.com/). 
The IR filter (NIR Optical Filter, 850DF20, 11.5mm painted edge) has bben purchased on ebay ([omegabob](http://myworld.ebay.it/omegabob2). 
The filter let only IR light with a wavelength of 850nm to pass through the lens 

![IR1](/assets/images/soundface/IR_1-1024x768.jpg)

We had to apply some pression to insert the filter; once done it, we simply screwed the support on the board, upon the CCD.

![IR8](/assets/images/soundface/IR_8-1024x768.jpg)

Here's a detail of the CCD:

![IR7](/assets/images/soundface/IR_7-1024x768.jpg)

Eventually, we screwed the lens on the support. And we're done!

## positioning the elements within the structure

Before the test could begin we had to:

* position the IR lamp within the structure
* set up the plexiglass fiducial markers
* set up the projector and the mirror

![tav](/assets/images/soundface/P10109521-1024x768.jpg)


We placed the 4 IR lamps at the four edges on the floor of the structure. As these lamps face upward, they reflect on the plexiglass surface. 
This is a problem we decided to deal with later.

![tav](/assets/images/soundface/P1010954-1024x768.jpg)

The camera is secured at a side of the structure, facing toward the plexiglass surface.

![tav](/assets/images/soundface/P10109711-1024x768.jpg)

As expected, the first images captured showed some nasty reflections of the IR lamps

## testing

The first test were a mess. Nothing worked properly and we had yo figure out where to start to fix the whole thing.

![tav](/assets/images/soundface/20130911_2319141-1024x768.jpg)

The first step we made has been changing the fiducial dimension according the the PS3Eye distance from the surface.

![tav](/assets/images/soundface/P1010948-1024x768.jpg)

We balanced the fiduacial reshaping with the repositioning of the camera in order to find the right camera, surface, projector setup.

![tav](/assets/images/soundface/20130912_0029271-1024x768.jpg)

## the projector

The choise of the projector has been an important issue we had to deal with.

![tav](/assets/images/soundface/P1010977-1024x768.jpg)

We opted for a Acer s1210, a projector that can render quite large images at relatively small distances. Our plexiglass surface is amost entirely covered by the projection.

![tav](/assets/images/soundface/test2_06-768x1024.jpg)

We placed the projector vertically against one side of the table, pointing towards the plexiglass sheet.


![test4](/assets/images/soundface/test2_04-1024x768.jpg)

![test3](/assets/images/soundface/test2_03-1024x768.jpg)

We introduced a new element: 4 dimming fabric sheets to prevent external light to interfere with the sensing system within the table.

![test7](/assets/images/soundface/test2_08-768x1024.jpg)

![test7](/assets/images/soundface/test2_07-1024x768.jpg)

The plexiglass surface is almost entirely covered with the projection. But there are spots not reached by the projected image. The distance between the projectore end the plexiglass is nearly 50 cm.

![test5](/assets/images/soundface/test2_05-1024x768.jpg)

This effetc is prtly due to the vrtical orientation of the projector. We had to angle and re-position the projector in order to center the projected image.

![test2](/assets/images/soundface/test2_02-1024x768.jpg)

When a satisfying position has been reached, we fixed it with custom wooden tools.
One side effect of this workaround is that the image is distorted, so we had counter-distort it via software.

Even if it's a bit tricky, it wrks!

![test1](/assets/images/soundface/test2_01-1024x768.jpg)

![test9](/assets/images/soundface/test2_09-1024x768.jpg)
