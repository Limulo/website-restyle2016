---
layout: post
title: Supercollider simple piano sampler
date: 2017-02-23 09:30:00
excerpt: On how to load lots of piano samples on a SuperCollider synth
category: [coding, sound]
---

In this post I will run through the process of creating a simple _sampler_ using the **SuperCollider** platform. If you don't know what SuperCollider is, I highly recommend you to visit the official [SuperCollider website](https://supercollider.github.io/).

I've also found this really well-made series of [video tutorial](https://www.youtube.com/playlist?list=PLPYzvS8A_rTaNDweXe6PX4CXSGq4iEWYC) by **Eli Fieldsteel** a great way to start learning it.

## Premise

Some time ago, I found [this](https://freesound.org/people/neatonk/packs/9133/) beautiful collection of piano samples from [freesound.org](https://freesound.org/) (by the way, **freesound** is one of my favourite websites but this is actually another topic). These are very good samples recorded from a **Steinway & Sons** piano.

I wanted to create a virtual instrument in SuperCollider with these requisites:
* it should have used the samples from the collection;
* it should have been playable via MIDI, using a MIDI keyboard connected to the computer.

{% comment %}
this is something I will talk in an another . Like all the sounds hosted on the website, these samples too were made available under a very permissive license.

From the collection description I read the instrument recorded is a **Steinway & Sons** piano; all samples are in stereo format, 44100Hz@16bit. As you can see, the description contains also a lot of other interesting informations like the gears they used to record, the microphone placement, the personnel involved and more.
{% endcomment %}

### The Problem

If I download the sample collection from _freesound.org_ and take a look at the samples file names, I will see that they force the entire collection to appear completely unorganized as shown in the image below.

![unorganized list]({{ site.baseurl }}/assets/images/supercollider-simple-sampler/folder-02.jpg)

If I play the audio files in order, from the first one onward, I will hear sounds from different octaves unevenly mixed up.

The problem remains even after I import them inside _buffer_ objects in _SuperCollider_.

### The Solution

The solution stands in renaming all the audio files in a convenient way in order to load them in ascending order, from the lower tone to the higher one.

Even if the easiest solution remains that of renaming the files manually, I wanted the job done in a quicker and automated way, so I started thinking about a **Python** script that could do the job. At first I started looking the file name structure, then tryed to figure out what operations could accomplish my goal.

### Renamer Script!

Let's take a look at the first audio file from the collection:

```
148270__neatonk__piano-med-db4.wav
```

As you see the file name starts with something that means nothing to us. I would like only to preserve informations about the note name (```db```), the octave (```4```) and the stroke pressure (```med``` or ```loud```).

At the same time I wanted to order the files starting from lower the sound to the higher one.

Eventually I came out with this _python_ script (maybe it is not the best declared one but is seemed to work pretty well):

{% highlight python %}
#!/usr/bin/python

import os

for filename in os.listdir("."):
    extension = filename[-4:]

    if extension == ".wav":
        parts = filename.rsplit("-")

        dynamic = parts[1] # es. med, loud
        therest = parts[2] # es. db4.wav
        octave =  int( therest[-5:-4] ) # es. 4
        note = therest[:-5] # es. db

        index = (octave+1) * 12

        if note == "c":
            index = index + 0
        elif note == "db":
            index = index + 1
        elif note == "d":
            index = index + 2
        elif note == "eb":
            index = index + 3
        elif note == "e":
            index = index + 4
        elif note == "f":
            index = index + 5
        elif note == "gb":
            index = index + 6
        elif note == "g":
            index = index + 7
        elif note == "ab":
            index = index + 8
        elif note == "a":
            index = index + 9
        elif note == "bb":
            index = index + 10
        elif note == "b":
            index = index + 11

        if index <100:
            // if the index has only 2 digit, we place a 0 in front of them
            newname = dynamic + "-0"+str(index) + "-" + note + str(octave) + extension
        else:
            newname = dynamic + "-"+str(index) + "-" + note + str(octave) + extension

        os.rename(filename, newname)           

{% endhighlight %}

I decided to use the [standard MIDI note numbering](http://newt.phys.unsw.edu.au/jw/graphics/notesinvert.GIF) for indexing the files so that a **e7**, for example, would have corresponded to the _index_ **100**, or a **c4** to the **60**:
* ```148577__neatonk__piano-med-e7.wav``` would be renamed this way ```med-100-e7.wav```;
* ```148432__neatonk__piano-loud-c4.wav``` would be renamed this way ```loud-060-c4.wav``` (mind the ```0``` I've used to be consistent with a 3 digit enumeration);

Here's an image from the folder containing all the ```med``` renamed files:

![well organized list]({{ site.baseurl }}/assets/images/supercollider-simple-sampler/folder-01.jpg)

## SuperCollider

Time to move to SuperCollider. First I loaded the sound files inside buffers using the following code:

{% highlight SuperCollider %}
~samples = Array.new;
~folder = PathName.new("path/to/your/samples/folder/");

(
~folder.entries.do({
	arg path;
	~samples = ~samples.add(Buffer.read(s, path.fullPath));
});
)

{% endhighlight %}

Then I created a **SynthDef**. I declared some argument in order to be able to modify them from the outside:
* ```buf``` will be the number of the buffer to play the sound from. I'll be able to identify it thanks to the MIDI note number;
* ```gate``` will be useful to trigger _attack_ and _release_ portions of the amplitude envelope;
* ```vel``` this is the velocity value I will use to calculate an overall volume multiplication.

{% highlight SuperCollider %}
(
SynthDef.new(\piano, {
	arg buf, vel=64, gate=0, rate=1;
	var sig, env, amp;
	env = EnvGen.kr(Env.asr(), gate, doneAction:2);
	sig = PlayBuf.ar(2, buf, rate*BufRateScale.ir( buf ));
	amp = LinExp.kr(vel, 1, 127, 0.01, 1);
	sig = sig * env * amp;
	Out.ar(0, sig);
}).add;
)
{% endhighlight %}

Next I made an array to store all of the synth instances I'd create every time a new key is pressed:

{% highlight SuperCollider %}
~keys = Array.newClear(128);
{% endhighlight %}

Now I needed MIDI methods and definitions to manage the incoming MIDI messages from the external MIDI keyboard. In particular I needed a ```noteOn``` method to create and store the synth inside the ```~keys``` array and to send it the```buf```, ```vel``` and ```gate``` values:

{% highlight SuperCollider %}
MIDIClient.init;
MIDIIn.connectAll;

(
MIDIdef.noteOn(\noteOnDef, {
	arg vel, note, ch, src;

	~keys[note] = Synth.new(\piano, [
		// MIDI note 23 corresponds to
    // the 0 index in the sample  array
		\buf, ~samples[note-23].bufnum,
		\vel, vel,
		\gate, 1
	]
	);
});
)
{% endhighlight %}

Then I needed a method to deal with the _noteOff_ MIDI messages. This method, called ```noteOff```, simply looks inside the ```~keys``` array for the correct synth to refer to.

Then it sets its ```gate``` value to zero in order to start the releasing phase and eventually free the synth from the server (see the _doneAction_ argument for the _EnvGen_ method inside the _SynthDef_).

{% highlight SuperCollider %}
)
MIDIdef.noteOff(\noteOffDef, {
	arg vel, note, ch, src;
	~keys[note].set(\gate, 0);
});
)
{% endhighlight %}
