---
layout: post
title: Heartbeat sounds
date: 2016-04-03 09:00:00
excerpt: <b>HeartBeater</b> and <b>LovelyHeart</b> synthetizers!
category: [sound-design, tool]
shortcut: shortcut-lovelyheart.png
---

Heartbeat sound is maybe the most familiar and atavistic sound we know. It's power, both relaxing and angsty at the same time, can be useful to obtain some involvement in the listener. Here's a sample sound:

<audio controls="controls" style="width:100%;">
Your browser does not support the <code>audio</code> element.
<source src="{{ site.url }}/assets/sounds/heartbeat/Human_heart_beating_at_61_bpm_(Cc-by-3.0).ogg" type="audio/ogg">
</audio>
<br/>
<caption>Human heart beating at 61 bpm (Cc-by-3.0)</caption>

Without bothering of too many details, let's examine the typical ECG (electrocardiograph) curve: we will use this information to recreate the same curve procedurally.

<!-- <p>Senza entrare troppo nei dettagli esaminiamo la curva tipica del battito così come ce la mostra il grafico dell'elettrocardiogramma. Useremo questa curva come linea guida per la costruzione del nostro modello.</p>-->

![Normal sinus rhythm image]({{ site.url }}/assets/images/heartbeat/nsr2.png){: width="100%;"}

As we see, the waveform is made-up of many portions (wave P, Q, R, S, T and U), each one related to the contraction/relaxation of a specific section of the heart muscle.

<!-- <p>Come vediamo la forma d'onda è costituita da più parti (curve P, Q, R, S, T e U), ognuna delle quali associata ad una contrazione/rilassamento di una particolare parte del muscolo cardiaco.</p> -->

Each of these parts has it's own relative amplitude and duration. We've based our calculations on these average values, since they vary not only from individual to individual but also from the measurement point. Thus we have drawn a qualitative graph on witch we can base our sound waveshaping.

<!-- <p>Ogni parte ha una propria ampiezza e durata relativa. Anche se si tratta di valori medi, che variano da individuo a individuo e da quale sia il punto in cui la misurazione è stata effettuata, abbiamo costruito un grafico qualitativo sul quale basarci per la sintesi.</p> -->

![waveform]({{ site.url }}/assets/images/heartbeat/waveform.jpg)

 This is a challenging work, we don't know how it will sound at the end, but we're sure it's worth working on.

### HeartBeater: first attempt of heartbeat sound synthesis

![HeartBeater interface]({{ site.url }}/assets/images/heartbeat/heartbeater-interface.png)

**HeartBeater** is our first attempt to build a synthetizer producing an heartbeat sound in a procedural way.

HeartBeater synth creates the sound calculating the ECG graph in real-time according to the BPM frequency you have set.

<!-- <p>Qualche tempo fa abbiamo voluto giocare con <b>Pure Data</b> e realizzare una piccola <b>patch</b> che potesse riprodurlo in modo procedurale.<br>
Il suono del cuore avrebbe dovuto essere abbastanza verosimile e al tempo stesso controllabile nella frequenza del battito, sì da poter ricreare facilmente una sensazione di tensione in aumento!</p> -->

Each curve portion is approximated usign a cosine function. This cosine is warped in different ways so it conforms to the ECG graph.

Each part duration, as well as time between them, has been parametrized so it's possibile to vary the BPM frequency without losing the genearal waveform shape.

<!-- <p>Ogni parte della curva è stata approssimata scolpendo opportunamente l'onda cosinusoidale, la quale è stata deformata e distorta in diversi modi così da adattarsi alla sagoma del tracciato. La durata delle diverse parti, così come quella degli intervalli tra una e l'altra, sono stati epsressi in forma parametrica in modo da poter essere variati a piacere senza perdere per questo la struttura complessiva della forma d'onda.</p> -->

<!-- <p>Alla patch è stato fornito anche uno slider per un controllo variabile tra i valori estremi di 30 e 200 BPM.<br>
La patch è stata arricchita con una sezione di controlli master, di registrazione, e di controllo via MIDI.</p> -->

Here's the sound as recorded directly from the patch. As you can hear it is slightly different from the sample sound shown at the beginning of this article.

<audio controls="controls" style="width:100%;">
Your browser does not support the <code>audio</code> element.
<source src="{{ site.url }}/assets/sounds/heartbeat/PD_heartbeat.ogg" type="audio/ogg">
</audio>
<br/>
<caption>heart sound synthetized with HeartBeater PureData patch by tracing the ECG curve shape</caption>

The main difference is that this sound doesn't have the double beat rhythm characteristic of the sample sound and, though it has been used with interesting result (e.g. [OTTO]()) it is necessary to improve the PuraData patch to create a more realistic one.

<!--<p>Il risultato sonoro è, a mio parere, abbastanza efficacie e permette, magari con ulteriori interventi di post-processing, di ottenere un suono interessante e verosimile!</p>-->

### LovelyHeart

![LovelyHeart interface]({{ site.url }}/assets/images/heartbeat/lovelyheart-interface.png)

Thus, we restarted from scratch, redesigning the patch, basing no more on the ECG graph but applying a "_retro-engineering_" process on the sample sound!

We finally ended up with **LovelyHeart**, new heartbeat synthetizer that seems to sound more realistic.

As you can perceive in the samples below (recorded directly within the patch), the new sound is made up of two distinct components:

* beats (two) - some cosine cycles;
* murmur - conveniently filtered noise;

<audio controls="controls" style="width:100%;">
 Your browser does not support the <code>audio</code> element.
 <source src="{{ site.url }}/assets/sounds/heartbeat/LovelyHeart_mix.ogg" type="audio/ogg">
</audio>
<br/>
<caption>beats and murmurs mixed together</caption>

<audio controls="controls" style="width:100%;">
Your browser does not support the <code>audio</code> element.
<source src="{{ site.url }}/assets/sounds/heartbeat/LovelyHeart_beats.ogg" type="audio/ogg">
</audio>
<br/>
<caption>beats sounds only</caption>

<audio controls="controls" style="width:100%;">
Your browser does not support the <code>audio</code> element.
<source src="{{ site.url }}/assets/sounds/heartbeat/LovelyHeart_murmur.ogg" type="audio/ogg">
</audio>
<br/>
<caption>murmurs sounds only</caption>

### Downloads

![GitHub Octocat]({{ site.url }}/assets/images/logos/github-octocat.jpg){: float="left;" width="20%;" }

* If you want to try our **HeartBeater** PureData patch, you can download it for free from our [GitHub project page](https://github.com/Limulo/HeartBeater). It's free software!
* If you want to use the newer **LovelyHeart** synthetizer [here](https://github.com/Limulo/LovelyHeart)'s the project link;

Remember, in order to use these patches you need **PureData** (Vanilla version is sufficient) up and running: you can download it from the [PureData](http://puredata.info/) official web site.

Read synth manuals for more information. Contact us for any question or suggestion. We're looking forward for hearing from you.

Enjoy!

### Riferimenti

* from Wikipedia: [Heart sound](https://en.wikipedia.org/wiki/Heart_sounds), [elettrocardigramma](https://it.wikipedia.org/wiki/Elettrocardiogramma);
* from [WikiDoc](http://www.wikidoc.org/index.php/Normal_sinus_rhythm);
* from Michigan University [Heart Sound & Murmur Library](http://www.med.umich.edu/lrc/psb_open/repo/primer_heartsound/primer_heartsound.html#);
* from UCLA University [Auscultation Assistant](http://www.med.ucla.edu/wilkes/inex.htm);
