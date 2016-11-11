---
layout: post
title: SoundFace, early prototypes
date: 2013-06-09 09:31:00
excerpt: An interactive musical surface!
category: [installation, soundface]
---

Il 9 giugno 2013 abbiamo presentato il nostro prototipo di tavolo interattivo da [Ohibò](http://www.associazioneohibo.it/wordpress/) in occasione dell'incontro domenicale con i ragazzi del [(Lab)oratorio] Digitale(http://www.associazioneohibo.it/wordpress/seminari-laboratori/oratorio-digitale/).

![Ohibo 1](/assets/images/soundface/Ohibo_1-1024x860.jpg)

Questo primo prototipo è ispirato ai lavori sulla computer vision svolti dall'università **Pompeu Fabra** di Barcellona.

Si tratta di un gioco che riconosce i diversi markers grafici (fiducials) ed associa ad ognuno di essi suoni diversi sintetizzati in tempo reale.

Il ritmo ed il tempo musicale sono creati dal giocatore disponendo i markers a piacere sulla superficie di gioco.

### Dettagli:

[fiducials](/assets/images/soundface/fiducials-1024x768.jpg){: width="20%;"}

Il piano di gioco è ricavato da un semplice sgabello. Ad una delle 4 gambe dello sgabello è stato fissato un manico di scopa e, sulla cima di questo, una telecamera/illuminatore ad infrarossi. La telecamera è rivolta verso il basso in modo tale da poter illuminare e riprendere gli oggetti disposti sulla superficie di gioco.

In questo primo prototipo gli oggetti di gioco sono stati ricavati da alcuni ritagli di cartone su cui sono state poi incollate le sagome dei "fiducials" precedentemente stampati su carta.

L'immagine ripresa dalla telecamera è inviata al computer per mezzo di una piccola scheda video USB, qui viene analizzata da [ReactiVision](http://reactivision.sourceforge.net/).

Questo software analizza l'immagine e, in base ai diversi fiducial individuati, è in grado di associare ad ognuno di essi il relativo identificativo, posizione spaziale, angolo di rotazione etc...

---

<div class="nota img">
<p><b>NOTA</b>: tutto questo è possibile solo se si è calibrato correttamente il software ReactiVision!</p>

<img alt="calibration" src="{{site.urls}}/assets/images/soundface/calibration.png"/>
<hr class="clear"/>
</div>

Il nostro prototipo associa alla maggior parte dei fiducial una forma grafica quadrata.

![debug](/assets/images/soundface/debug.png)

Il fiducial con identificativo 23 invece sarà associato ad un cerchio di colore blu; la rotazione di questo fiducial farà si che la porzione di corona circolare, rappresentata graficamente sul bordo del cerchio blu, si riempia o si svuoti proporzionalmente con la rotazione.

![circular crown](/assets/images/soundface/corona_circolare-1024x768.jpg)

![rotation test](/assets/images/soundface/rotation_test.png)

Oltre che un'associazione grafica il nostro prototipo assegna ad ogni tipo di fiducial anche un significato sonoro per cui, facendo finta  che la superficie di gioco sia in realtà la rappresentazione spaziale di una battuta, ogni oggetto è di fatto uno strumento musicale!

La parte sonora è sintetizzata in tempo reale grazie all'implementazione della libreria [LibPd](http://libpd.cc/) che permette l'uso di [Pure Data](http://puredata.info/) in modalità embed con il nostro software scritto in C++ / [OpenFrameworks](http://www.openframeworks.cc/).

Disponendo gli strumenti musicali in punti diversi della battuta è possibile realizzare in tempo reale ritmi e melodie differenti. La rotazione del fiducial 23 invece permette di modificare il tempo musicale da 20 a 180 BPM.

![Ohibo 2](/assets/images/soundface/Ohibo_2-1024x683.jpg)

Il progetto sta piano piano evolvendo e, risolvendo i diversi problemi progettuali e realizzativi presto sarà pronto il nuovo prototipo, molto più grande e versatile!
