---
layout: post
title: a MIDI controlled polyphonic organ in Chuck!
date: 2017-10-31 15:00:00
excerpt: What else?!
category: [coding, sound]
---

Here we would like to share with you an experiment we made usign the [chuck](http://chuck.cs.princeton.edu/) programming language!

Chuck is a very powerful tool; it was a long time since we wanted to explore it and we would also like to share with you a great resource we used to learn it: we are talking about the [kadenze](https://www.kadenze.com/)'s "[Introduction to Programming for Musicians and Digital Artists](https://www.kadenze.com/courses/introduction-to-programming-for-musicians-and-digital-artists-iv-i)" MOOC by [Ajay Kapur](http://www.ajaykapur.com/) (with special participation by [Ge Wang](http://www.gewang.com/), [Perry Cook](http://www.cs.princeton.edu/~prc/) e [Spencer Salazar](http://spencersalazar.com/)).

If you are interested in some other corse which uses _chuck_ as one of the main core tools, take a look a the "[Physics-Based Sound Synthesis for Games and Interactive Systems](https://www.kadenze.com/courses/physics-based-sound-synthesis-for-games-and-interactive-systems-iv)" by [Perry Cook](http://www.cs.princeton.edu/~prc/) at kadenze.
{: class="dashed" }

---

Now, concerning our experiment, this is a MIDI controlled 4-voice polyphony organ.
In order to run the chuck code you must first install it and install also the [miniAudicle](http://audicle.cs.princeton.edu/mini/) chuck IDE.

The program is meant to be used with a MIDI keyboard connected to the computer. Probably You'll need to change the `port` variable to match with your input MIDI device.

The program is a sort of exercise we've done playing with _functions_, _midi events_ and _classes_.

We implemented a dynamic voice allocation mechanism which is responsible to steal the oldest voice in order to re-allocate it to new incoming MIDI note. The `POLYPHONY` is set to 4 in order to make the _stealing_ mechanism more evident but you can change it if you like.

---

The code is full of comments so to understand all the different instructions used. Feel free share the code and use it in your own project. Let us know if you need help or if you have any suggestions. Enjoy!

<script src="https://gist.github.com/ariutti/cd3bd5912fb986984c233093497872ad.js"></script>
