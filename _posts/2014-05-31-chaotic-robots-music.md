---
layout: post
title: Chaotic Robots Music
date: 2014-05-31 09:30:00
excerpt: Music and Robots, a procedural algorithm to compose music using robots
category: [sound-design, work]
shortcut: shortcut-chaotic-robots-music.png
---

**Chaotic Robot Music** is part of a project developed by the [hacklab Terni](http://hacklabterni.org/) '[Chaotic Robots](http://dev.hacklabterni.org/projects/cr21) guys. We strongly invite you to visit their site: it's extremely well done, full of useful explanations, step-by-step instructions, images, tabs, graphs and anything you'd need to feel inspired.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/SDqNaqEHwzE" frameborder="0" allowfullscreen></iframe>

## Notes on the main project
The [Chaotic Robots](http://dev.hacklabterni.org/projects/cr21) project concerns the developement of BEAM (<b>B</b>iology, <b>E</b>lectronics, <b>A</b>esthetics, <b>M</b>echanics) robots.
High Entropy circuits and accurately located light sources control the robots behaviour. An openFrameworks application obtains the images from a camera positioned on the ceiling facing downwards towards the robots arena. The data are visually rendered as colored curved trails following the robots tracks as they move .
The application is available for download at the bottom of the section.

![robot A]({{site.baseurl}}/assets/images/chaotic-robots-music/a.jpg){: width="100%" } | ![robot B]({{site.baseurl}}/assets/images/chaotic-robots-music/b.jpg){: width="100%" }


## Notes on the complementary project

_Chaotic Robot Music_ is a [**PureData**](http://puredata.info) patch

While tracking  and tracing the robots trajectories, the main application is also sending important information about that very trajectories via OSC messages.

The PureData patch receives the messages and computes the data in order to obtain the proper input to compose music in real time.
In the final music composition we can hear a rhythmic drums session (kick, snare, tom) and a bass line.
A polyphonic-stereo synth handles the harmonic elements producing the chord notes.
Other mono synths have their controls  subjected to robots movements.

## Downloads
[Here](https://github.com/Limulo/ChaoticRobotsMusic)'s the GitHub page of the project. You can find the main application source code and the puredata patches to download.

---

## Instructions

<iframe width="100%" height="360" src="http://www.youtube.com/embed/Qxm16oeOaQE"  allowfullscreen></iframe>

To test the application without the actual robots wandering around, we can use a simulation application written in **Processing**. The simulation application mimics the robots moving on the arena and sends the data to the _Chaotic Robot_Music_ patch.

We need two tools:

* **Processing** (you can find it [here](http://www.processing.org));
* **PureData** (versione **extended**, you can find it [here](http://puredata.info));

In order to communicate via OSC from Processing(the _test_ application) to PureData (the _ChaoticRobotsMusic_ patch)and viceversa, we need the **oscP5** Processing external library, by Andreas Schlegel. You can find it [here](http://www.sojamo.de/libraries/oscP5/) or you can install it directly within the Processing IDE (Menu Sketch > Import Library > Add Library. From the Library Manager window, select oscP5, the install it. Restart Processing for the changes to take effect).
([Here](http://www.processing.org/reference/libraries/) you can find more information about installing external libraries in Processing)


![play button]({{site.baseurl}}/assets/images/chaotic-robots-music/play-button.jpg){: width:"40%", border="1px solid #ccc;"}

To sum up, there are two files to execute:

* _test/test.pde_ (source code of the Processing simultaion application);
* _puredata/ChaoticRobotsMusic.pd_ (source code of the PureData patch to produce music procedurally);

Clicking on the play/run button in the Processing IDE starts the test application.

Clicking on the 'Audio_ON' switch in the 'MASTER' section in PureData activates DSP and audio production.

![interfaccia]({{site.baseurl}}/assets/images/chaotic-robots-music/interfaccia.jpg)


## Instructions for the test application

The application offers some basic controls to manage the visualisation of important data, such as the robots trajectories, the subdivision of the arena in 4 quadrants and position of the arithmetic avarage of the robots coordinates:

* Press ![1]({{site.baseurl}}/assets/images/chaotic-robots-music/1.jpg){: display="inline"}, ![2]({{site.baseurl}}/assets/images/chaotic-robots-music/2.jpg){: display="inline"}, ![3]({{site.baseurl}}/assets/images/chaotic-robots-music/3.jpg){: display="inline"}, ![4]({{site.baseurl}}/assets/images/chaotic-robots-music/4.jpg){: display="inline"}, to display the specif robot trajectory;
* Press ![C]({{site.baseurl}}/assets/images/chaotic-robots-music/C.jpg) to visualise the 4 quadrants subdivision of the arena;
* Press ![M]({{site.baseurl}}/assets/images/chaotic-robots-music/M.jpg) to picture the robots positions avarage;
* Press any other key to return to default view.


## Instructions for the _CHAOTIC ROBOTS MUSIC_ application

### Sections analysis

**OSC SECTION**
once given the communication port, clicking on the 'ON' button starts the receiving of messages coming from the main apllication.
The black blinking circle reveals the presence of OSC messages in input.

**AREA SECTION**
The sounds and the notes generation rely directly on the X and Y position of the robots. Thus in the 'width' and 'height' fields we need to specify the real dimensions (in pixels) of the area from which the main application obtains the data to be sent.

**ROBOTS SECTION**
Once a robot is added or removed from the arena, click on the corresponding button in this section to adjust the behaviour of the system. By default the application starts with one robot on the arena.

**CHORDS and STYLE SECTION**
This section provides a quick overview of the chord being played and the present rythmic style.

**MASTER SECTION**
The only switch present in this section is responsible for the starting and stopping of the patch audio engine.

**MIXER SECTION**
In this section we can regulate one by one the volumes of all the instrument present in the composition.
The R0, R1, R2 and R3 fader manage the 4 mono synths volumes.
PADS and BASS control the 'pads' polyphonic synth and the 'bass' volumes respectively.
KICK, SNARE and TAMB faders handle the drums (kick, snare, tom) volume.
REV and MASTER faders monitor the reverb effect and the global volum, each in order.
Every fader, save R0, R1, R2, R3 and MASTER, has a switch control to MUTE the sound.

### Behaviour analysis


The entire music piece structure is based on a 120 BPM tempo and the demisemiquaver (aproximately 62 msecs) as tempo unit.

The arrangement is given: the styles sequence in the same fashion. The whole duration is 96 bars + 8 silence bars.
In future versions we'll be able to manually operate on the BPM (tap tempo) and to create the arrangement in real time.

<div class="nota">
This section can be reached from the sub-patches 'time-control', 'mix-presets' and 'score-generator' within the MASTER section.
</div>

Every melodic/harmonic tool is in tune with a chord note. The chord choice is based on the avarage of the positions. There are four possible chords: C, G, F, Dmin.

The arena is subdivided in four quadrants. The avarage position, wavering from a quadrant to the next ones, select the chord corresponding to the loctaion.
The chord change happens on the strong stress of the bar (every 8 quavers), so the harmonic change is always 'in time' with music execution.

<div class="nota">
This feature can be analysed in the CHORDS and STYLES sections.
</div>

---

**SYNTH CHIMES1 and SYNTH CHIMES2**
The two mono synth are associated with the first two robots.
They execute the notes of the C pentatonic scale. The 5 notes are ascending or descending according to the robot direction.
Sometimes the notes are executed very quickly, resulting in a sort of trill/glissando.

**SYNTH PROPH** (arpeggiator)
This synth plays arpeggios of the current chord notes. The note order is linked to the rebot direction.

Applied to the sound from the synth there's a dynamic filter. When the robots move towards the rim of the arena, the filter closes, so only low frequencies make it across. If the robot heads towards the center of the arena, the filetr opens and the sound is clearer and  more vibrant.

**SYNTH SINGER** (with an automatic engine choosing the note to be sung)
This synth implements an intelligent system that choose the note to be sung immediately after the one currently in reproduction.
The system is based on these elements:

* the current chord;
* the direction (same intonation, lower or higher);
* the note currently reproduced.

For every note reproduced, the algorithm computes the probability for the next one.
Every note will have a different probability, according to three given rules:

1. the next note must have a "pA" probability of belonging to the current chord;
2. the next note must have a "pDIR" probability of being in the same direction chosen by the robot (if the robots moves in direction 0, we'll have a "pDIR" probability that the next note will be lower the the current one; if the robots moves in direction 1 or 2, that is, moving forward or turning right, we'll have "pDIR" probability for the note to be, respectively, higher or maintaining the intonation);
3. the next note must have a "pSN" probability of being near the current one. This is a normal distribution of 7 notes, centered on the actual one.

The synth can also sing music phrases avaragely 2 bars long; these phrases are separated by pauses.
The chance for the next note to be a quaver pause instead of a note is directly proportional to the number of notes (quavers) sung in sequence.
The longer the sung phrase is, the more likely it will ben interrupted by a quaver pause.
Similarly, the longer is the interruption, the more likely it is that the next note is a real note.

**PADS** (polyphonic stereophonic)
Pads is a polyphonic synth playing the chord notes, creating a persistent and dynamic sound that supports the solo executions of the robots.

**BASS**
Mono synth executin the bass line.

**KICK, SNARE and TAMB**
The three drums elements performing a rythmic pattern, according to the chosen musical theme.

**REV**
It' s a reverb effect. Its inputs are the aux sends from SINGER, SNARE and TAMB.
