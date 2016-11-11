---
layout: post
title: SoundFace
date: 2016-10-22 09:31:00
excerpt: An interactive musical surface!
category: [installation]
shortcut: shortcut-soundface.png
---

The **long story short**: it's an interactive tangible surface. Like a table. It's possible to interact with the surface by placing little objects with different shapes upon it.

[![soundface](/assets/images/soundface/introduzione/orizzontale.jpg)]({{site.url}}/assets/images/soundface/introduzione/orizzontale.jpg)

Every object is associated with a sound and and image. The surface reacts creating graphics and sounds in real time.

![soundface players](/assets/images/soundface/introduzione/players_1.jpg){: width="100%"}

{% comment %}
[![soundface players](/assets/images/soundface/introduzione/giocatori-1.jpg"){: width="100%"}]({{site.url}}/assets/images/soundface/introduzione/giocatori-1.jpg") | [![soundface players](/assets/images/soundface/introduzione/giocatori-3.jpg"){: width="100%"}]({{site.url}}/assets/images/soundface/introduzione/giocatori-3.jpg")
{% endcomment %}

The software has been developed using **openFrameworks** libraries with some external addons, such as _ofxTUIO_ and _ofxOSC_. The audio is procedurally produced by a **Pure Data** patch we specifically developed.

<iframe width="100%" height="360" src="http://www.youtube.com/embed/0xcAOFFxWuc" allowfullscreen></iframe>

---

TO BE MOVED TO ANOTHER PAGE OR SECTION:

Theory and practice of the "Soundface" project

* [Soundface - last ver.]()

The developement and prototyping steps:

* [First prototypes]()
* [Step 1: "the assembly"]()
* [Step 2: "the setup: the camera"]()
* [lighting, little disks, the projector and mirrors!]()
* ["The tests -  how not to be defeated by discourage"]()
* [The projector and the dimming fabric]()

### Hardware

We said that the soundface is basically just a table. Well, yes, apparently it is. Anyway, it's also much more than this. Let's take a closer look...

What's inside of it?

![slide](/assets/images/soundface/slide-1-tavolo_2-1024x694.png")

In order to visualise the graphics you need three things:
* The projector: we use a _Acer S1210_ projector. We chose this model because it can render very big images at very small distances.
* A transparent plexiglass PMMA sheet.
* A _129 Heavy Frost_ sheet to be put upon the plexiglass sheet. The opacity provided by the frost let the user see what is projected from the engine underneath the surface on the plexiglass sheet

![materials](/assets/images/soundface/slide-2-materiali_2-1024x296.png)

![lamps](/assets/images/soundface/illuminatore-IR.jpg)

What about the infra-red ligh spotlights?

We placed 4 infra-red spotlights inside the table structure in order to properly radiate the infra-red light that hit the objects on the surface.

![camera](/assets/images/soundface/telecamera.jpg)

The infra-red light, after being bounced from the objects on the surface, is intercepted by the camera.

The camera is a  modified **ps3Eye**: it's our detector!
We removed the ps3Eye IR filter and we replaced it with a visible light filter (that filters out the visible light). Thus, only infra-red light can be detected by the camera.

We also changed the ps3Eye lens, provinding it with a a wide-angle lens. This new lens allows peripheral vision and we can reduce the distance among the plexiglass sheet and the camera.

![visible-IR-light](/assets/images/soundface/visible-IR-light.jpg)

Visible light domain | Infra-red light domain
Reception of the image related to the surface status | Projection of a graphic interface concordant with the surface statuse

For more details about infra-red lighting, take a look at this site: [lucidscience.com](http://www.lucidscience.com/tut-invisible%20light%20basics-1.aspx)

In order to isolate the infra-red illumination within the table structure, we use four dimming fabric sheets (one per angle).
The external visible light can't, then, interfere with the lighting and sensing inside the table.

As a precaution, to provide a proper air flow inside the table we mounted two fans, one to push hot air outside and the other to pull fresh air iniside.

Before implementing the '4 IR spotlights + camera' solution, we experimented other 'lighting and sensing' setups.
First, we tried  a surveillance IR camera with an integrated IR spothlight circuit (implemented in **Prototype #2**). Then we attempted to create a specific circuit implementing a 555 timer IC to create a pulsating IR light spotlight with some IR LEDs.

![555](/assets/images/soundface/circuito-555.jpg)

Due to many problems arising from these setups, we finally decided to implement the current solution.

### Software

We can create an analogy among the visible light - IR light domains and the client - server distinction.

By "Client" we mean an application demanding a service. By "Server" we mean an application which can supply the service.
Basically: the client asks the server a service -> the server identifies the client and supplies the service -> the client confirms the reception of the service to the server.

![client & server](/assets/images/soundface/client-e-server.jpg)

There are two main protocols to communicate between Client and Server. They both fulfill different and specific tasks:

* **TCP** protocol: to establish, maintain and close a connection it's mandatory to sent service packets. It's reliable but slow.
* **UDP** protocol: it doesn't handle packets rearrangement or retransmission of the lost ones. It's fast but unreliable.

Here's a framework showing some everyday activities in which the two protocols are involved (source [Wikipedia](http://it.wikipedia.org/wiki/User_Datagram_Protocol)):

<table class="dati" style="width: 100%;">
<tbody>
<tr>
<th style="width: 40%">Application</th>
<th style="width: 30%">Protocol Application layer</th>
<th style="width: 30%">Protocol Transport layer</th>
</tr>
<tr>
<td style="width: 40%">E-Mail</td>
<td style="width: 30%">SMTP</td>
<td style="width: 30%">TCP</td>
</tr>
<tr>
<td style="width: 40%">Access to remote terminal</td>
<td style="width: 30%">telnet</td>
<td style="width: 30%">TCP</td>
</tr>
<tr>
<td style="width: 40%">File transfer</td>
<td style="width: 30%">FTP</td>
<td style="width: 30%">TCP</td>
</tr>
<tr>
<td style="width: 40%">Web</td>
<td style="width: 30%">HTTP</td>
<td style="width: 30%">TCP</td>
</tr>
<tr>
<td style="width: 40%">Streaming Audio/Video</td>
<td style="width: 30%">RTSP/RTP</td>
<td style="width: 30%">TCP (comands) + UDP (flow)</td>
</tr>
<tr>
<td style="width: 40%">Remote file server</td>
<td style="width: 30%">NFS</td>
<td style="width: 30%">typically UDP</td>
</tr>
<tr>
<td style="width: 40%">VoIP</td>
<td style="width: 30%">SIP, H.323, altri</td>
<td style="width: 30%">tipicamente UDP</td>
</tr>
<tr>
<td style="width: 40%">Net management</td>
<td style="width: 30%">SNMP</td>
<td style="width: 30%">typically UDP</td>
</tr>
<tr>
<td style="width: 40%">Routing protocol</td>
<td style="width: 30%">RIP</td>
<td style="width: 30%">typically UDP</td>
</tr>
<tr>
<td style="width: 40%">Names resolution</td>
<td style="width: 30%">DNS</td>
<td style="width: 30%">typically UDP</td>
</tr>
</tbody>
</table>

These are the main protocols used in communications among Client and Server. TCP and UDP regulate the data tansport.
There are other protocols which specify the format and the type of the data they send.

* **OSC** protocol: tha data are transmitted by means of messages packets (among computers, synthesizers, multimedia instruments). The messages are typically sent and received via internet, subnets or LAns (UDP/IP, Ethernet).
* **TUIO** protocol:  the data are transmitted via network (local [LAN] or internet[Ethernet]). The transmission protocol id UDP/IP. The messages are formatted according to the OSC protocol. The architecture on which it relies is client-server based.

In more detail, here are the TUIO v1.1 (the one we use in our project) specs:

![tuio](/assets/images/logos/tuio-logo.jpg){: width="20%;"}

This is the structure of a TUIO message:
[src] / [alive] / [set] / [fseq]

in detail:

* **Src** = this part of the TUIO message identifies the TUIO source. Due to this field, in case of more than one source, the Client can recognize which message has been sent by the different sources.
* **Alive** = it's a list of Session IDs, that are numerical identifiers of all of the object detected on the surface at a given moment. It's like a snapshot of the surface status;
* **Set** = for each Session ID a Set message is sent. This message contains all of the information about that specific object (x and y position, rotation angle, speed and acceleration, etc..);
* **Fseq** = It's a timestamp placed at the and of the message. Every TUIO message is marked with a progressive Fseq timestamp. Thus, the Client is able to mantain the right execution order.

The TUIO protocol has been developed by M. Kaltenbrunner, T. Bovermann, R. Bencina, E. Costanza; it inspired the _Universitat Pompeu Fabra_ (Barcellona) [Reactable](http://www.reactable.com/) project and is mainly implemented in fiducial marker and computer vision interactive applications.

The TUIO protocol is the [ReacTIVision](http://reactivision.sourceforge.net/) core. ReacTIVision is a server software that eases the creation and dispatch of properly formatted messages within interactive applications.

![reacTIVision](/assets/images/logos/reactivision-logo.jpg){: width="20%;"}

What are Fiducial markers? They are symbols/images easily and uniquely recognizable by a computer vision system.

#### Fiducial evolution:

* [ARToolKit](http://www.hitl.washington.edu/artoolkit/) - Augmented Reality fiducial markers;

![ARToolkit fids]({{site.url}}/assets/images/soundface/ARToolkit.jpg)

* [d-touch](https://d-touch.org/) - generic fiducial markers. The markers discrimination is done on the basis of a topological analysis (black areas with white spots and viceversa);

![dtouch 0](/assets/images/soundface/dtouch-0.jpg)

![a](/assets/images/soundface/dtouch-a.jpg) | ![b](/assets/images/soundface/dtouch-b.jpg) | ![c](/assets/images/soundface/dtouch-c.jpg)


![d](/assets/images/soundface/dtouch-cards.jpg)

{% comment %}
<table>
<tbody>
<tr>
<td colspan="3" style="text-align:center; vertical-align:top;" ><img src="{{site.url}}/assets/images/soundface/dtouch-0.jpg" alt="Schermata 2013-10-19 a 18.32.33"/>
</td>
</tr>
<tr>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/dtouch-a.jpg" alt="a" />
</td>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/dtouch-b.jpg" alt="b" />
</td>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/dtouch-c.jpg" alt="c" />
</td>
</tr>
<tr>
<td colspan="3" style="text-align:center; vertical-align:top;" >
<img src="{{site.url}}/assets/images/soundface/cards.png" alt="cards" style="width: 60%;"/>
</td>
</tr>
</tbody>
</table>
{% endcomment %}

* [Amoeba](http://reactivision.sourceforge.net/) - d-touch improvement. Amoeba has been created by a genetic algorithm to fulfill the proper space and efficency needs of the [Reactable](http://www.reactable.com/) project.

![0](/assets/images/soundface/amoeba-0.jpg)

![1](/assets/images/soundface/amoeba-1.jpg) | ![2](/assets/images/soundface/amoeba-2.jpg) | ![3](/assets/images/soundface/amoeba-3.jpg)

![abcd](/assets/images/soundface/amoeba-abcd.jpg)

{% comment %}
<table class="img">
<tbody>
<tr>
<td colspan="3" style="text-align:center; vertical-align:top;" >
<img src="{{site.url}}/assets/images/soundface/Schermata-2013-10-19-a-18.34.28-1024x189.png" alt="Schermata 2013-10-19 a 18.34.28" />
</td>
</tr>
<tr>
<td colspan="3" style="text-align:center; vertical-align:top;" >
<img src="{{site.url}}/assets/images/soundface/Schermata-2013-10-19-a-18.33.34.png" alt="Schermata 2013-10-19 a 18.33.34"/>
</td>
</tr>
<tr>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/Schermata-2013-10-19-a-18.43.13.png" alt="Schermata 2013-10-19 a 18.43.13"/>
</td>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/Schermata-2013-10-19-a-18.43.03.png" alt="Schermata 2013-10-19 a 18.43.03"/>
</td>
<td style="width: 33%;">
<img src="{{site.url}}/assets/images/soundface/Schermata-2013-10-19-a-18.43.33.png" alt="Schermata 2013-10-19 a 18.43.33"/>
</td>
</tr>
</tbody>
</table>
 {% endcomment %}

We have just seen that two computers (a server and a client) can communicate using specific protocols according to messages nature. Now, we investigate the physical structure that transfer data between server and client.

Let's see some examples: The first one is the net (whether it's global or local), for example internet that can link two devices, no matter how distant they are.

![computers](/assets/images/soundface/slide-computers-1024x557.png)

The client and the server are not necessarily two physical separeted devices. The same device can work as a server and a client at the same time. In this case there will be two applications - one working as the client and the other as the server - running simultaneusly.

That's our case! In our project, reacTIVision, acting as a server, dispatches TUIO messages to our custom application that is the client.

![computer 2](/assets/images/soundface/slide-computer-2-1024x428.png)

Ci siamo quindi concentrati sullo sviluppo del client, per il quale siamo partiti praticamente da zero.

Volevamo realizzare un client il cui compito principale fosse quello di trasformare i messaggi TUIO in immagini, che restituisse un feedback visivo all'utente. Gli strumenti a nostra disposizione erano principalmente 3 e, di seguito, vedremo i pregi e i difetti di ciascuno per capire come siamo giunti alla scelta finale.

Oltre ad un feedback visivo, per questo progetto in particolare, ci piaceva l'idea che, oltre alle immagini, il sistema potesse rispondere riproducendo una serie si suoni. Non volevamo però mettere semplicemente in riproduzione files registrati precedentemente:  abbiamo sperimentato qualcosa di nuovo: l'audio procedurale. Tutti i suoni dovevano essere sintetizzati dal client in tempo reale (per approfondimenti sull'audio procedurale vi rimandiamo al sito di [Andy Farnell](http://obiwannabe.co.uk/html/papers/proc-audio/).

Di seguito una tabella che riassume le principali caratteristiche dei nostri strumenti di lavoro tipici oltre che ad alcune nostre personalissime constatazioni in merito che ci hanno poi portato a sceglierne alcuni in particolare piuttosto che altri.

<table class="dati" style="width: 100%">
<tbody>
<tr>
<td colspan="2" style="background-color: #ccc; text-align:left; vertical-align:top;" ><b>Linguaggi di programmazione pensati per la grafica</b></td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/processing-logo.jpg" alt="Processing_Logo" width="115" height="115" style="float:left;" />
</td>
<td style="text-align:center; vertical-align:top;" >
<a href="http://www.processing.org/" target="_blank" alt="Processing">Processing</a>: linguaggio e assieme IDE di programmazione. Nasce al MIT dal lavoro di Ben Fry e Casey Reas. Strumento molto versatile, veloce e facile da imparare.Purtroppo, se si rende necessario agire a basso livello per personalizzare il proprio programma, Processing non ne fornisce la possibilità.</td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/cinder-logo.jpg" alt="cinder" width="154" height="48" />
</td>
<td style="text-align:left; vertical-align:top;" ><a class="ext" title="Cinder" href="http://libcinder.org/" target="_blank">Cinder</a>: framework di librerie, principalmente pensato per la grafica e l'interattività. Basato su linguaggio C++. E' purtroppo disponibile per sola piattaforma Apple.
</td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/openframeworks-logo.jpg" alt="ofw-logo" width="114" height="60" />
</td>
<td style="text-align:left; vertical-align:top;" >
<a class="ext" title="OpenFrameworks" href="http://www.openframeworks.cc/" target="_blank">OpenFrameworks</a>: framework di librerie del tutto simile a Cinder. Anch'esso basato su C++. Disponibile per tutte le piattaforme.
Purtroppo, essendo sviluppato dalla comunità tramite l'apporto creativo di tutti gli utenti, seppur molto ricco di funzioni, è purtroppo un po' debole in documentazione e, talvolta presenta diversi problemi con le configurazioni iniziali.
</td>
</tr>
<tr>
<td colspan="2" style="background-color: #ccc; text-align:center; vertical-align:top;"><b>Linguaggi di programmazione pensati per il sonoro</b></td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/pd-2-logo.jpg" alt="pure_data_logo" width="126" height="81" />
</td>
<td style="text-align:left; vertical-align:top;" >
<a class="ext" title="Pure Data" href="http://puredata.info/" target="_blank">Pure Data</a>: nato dal lavoro di Miller Puckette all'IRCAM, si tratta di un linguaggio di programmazione così detto "a nodi". Specializzato nella generazione e nella manipolazione dei suoni, è possibile implementarne il core (scritto in linguaggio C) in altri programmi facendo uso della libreria <a class="ext" title="libpd" href="http://libpd.cc/" target="_blank">libpd</a> .
</td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/supercollider-logo.jpg" alt="SuperCollider" width="128" height="128" />
</td>
<td style="text-align:left; vertical-align:top;" >
<a class="ext" title="Supercollider" href="http://supercollider.sourceforge.net/" target="_blank">Supercollider</a>: linguaggio di programmazione "a script". specializzato come Pure Data nella generazioni e manipolazione dei suoni.
Molto più difficile e dispendioso in termini di risorse, a confronto di Pure Data, implementarlo all'interno di altri programmi.
</td>
</tr>
</tbody>
</table>

A seguito delle considerazioni di cui sopra abbiamo infine optato per l'abbinamento OpenFrameworks + PureData (via libpd) + TUIO.

Resta da capire: come mettere assieme openFrameworks, TUIO, PureData?

Semplice, tramite l'uso degli ofAddons! Un ofxAddon non è altro che un plug-in che, utilizzato all'iterno di OpenFrameworks, ne estende le capacità permettendo l'uso di nuovi strumenti che altrimenti non sarebbe possibile sfruttare.

Esistono 2 importanti addons di cui abbiamo fatto uso nel nostro progetto:

* **ofxPd**: permette di utilizzare la libreria libpd che consente di embeddare il core di PureData in programmi sviluppati in C, C++, java,...;
* **ofxTuio**: permette di creare e gestire direttamente nell'ambiente di sviluppo di openFrameworks un server e un client che comunicano tramite protocollo TUIO

<p class="nota">
<a class="ext" title="libpd" href="http://libpd.cc/" target="_blank">Libpd</a> è sviluppato da Peter Brinkmann<br>
<a class="ext" title="ofxpd" href="https://github.com/danomatika/ofxPd" target="_blank">ofxPd</a> è sviluppato da danomatika<br>
<a class="ext" title="ofxtuio" href="https://github.com/patriciogonzalezvivo/ofxTuio" target="_blank">ofxTuio</a> è sviluppato da patriciogonzalezvivo
</p>

## Downloads

Prima di proseguire vi lasciamo qui il [link](https://github.com/Limulo/videotavolo) al nostro repository GitHub dal quale potrete scaricare i codici sorgente del progetto.

Qui di seguito elenchiamo quelli che, secondo noi, sono stati degli ottimi strumenti di studio e di approfondimento per affrontare questa nostra avventura.

## PAPERS

<table class="dati" style="width: 100%;">
<tbody>
<tr>
<th style="background-color: #ccc; border-color: #fff; width: 20%;">Autori
</th>
<th style="background-color: #ccc; border-color: #fff;">Titolo del paper
</th>
<th style="background-color: #ccc; border-color: #fff; width: 20%;">Luogo e data
</th>
<th style="background-color: #ccc; border-color: #fff; width: 7%;">links
</th>
</tr>

<tr>
<td style="width: 20%;">Kaltenbrunner, M.Bovermann, T.Bencina, R.Costanza, E.
</td>
<td>"TUIO- A Protocol for Table-Top Tangible User Interfaces".Proceedings of the 6th International Workshop on Gesture in Human-Computer Interaction and Simulation (GW 2005)
</td>
<td style="width: 20%;">Vannes, France, 2005
</td>
<td style="width: 5%;">
<a class="ext" href="http://opensoundcontrol.org/files/tuio_gw2005.pdf" target="_blank">link</a>
</td>
</tr>

<tr>
<td style="width: 20%;">Kaltenbrunner, M.Bencina, R.
</td>
<td>"reacTIVision: A Computer-Vision Framework for Table-Based Tangible Interaction".Proceedings of the first international conference on "Tangible and Embedded Interaction" (TEI07)
</td>
<td style="width: 20%;">Baton Rouge, Louisiana, 2007
</td>
<td style="width: 5%;">
<a class="ext" href="http://vigliensoni.com/BUP/DropBox_10_12_09/proyectoMarco/Info/reactivision_tei2007.pdf" target="_blank">link</a>
</td>
</tr>
<tr>
<td style="width: 20%;">Wright, M.Freed, A.Momeni A.
</td>
<td>"OpenSound Control: State of the Art 2003".Proceedings of the 3rd Conference on New Instruments for Musical Expression (NIME 03)
</td>
<td style="width: 20%;">Montreal, Canada, 2003.
</td>
<td style="width: 5%;">
<a class="ext" href="http://cnmat.berkeley.edu/system/files/attachments/Open+Sound+Control-state+of+the+art.pdf" target="_blank">link</a></td>
</tr>
<tr>
<td style="width: 20%;">Kaltenbrunner, M.
</td>
<td>"reacTIVision and TUIO: A Tangible Tabletop Toolkit".Proceedings of the ACM International Conference on Interactive Tabletops and Surfaces (ITS2009)
</td>
<td style="width: 20%;">Banff, Canada.
</td>
<td style="width: 5%;">
<a class="ext" href="http://modin.yuri.at/publications/tuio_its2009.pdf" target="_blank">link</a>
</td>
</tr>
<tr>
<td style="width: 20%;">Bencina, R.Kaltenbrunner, M.
</td>
<td>"The Design and Evolution of Fiducials for the reacTIVision System".Proceedings of the 3rd International Conference on Generative Systems in the Electronic Arts (3rd Iteration 2005)
</td>
<td style="width: 20%;">Melbourne,Australia
</td>
<td style="width: 5%;">
<a class="ext" href="http://modin.yuri.at/publications/reactivision_3rditeration2005.pdf" target="_blank">link</a>
</td>
</tr>
</tbody>
</table>


## Books

![books](/assets/images/soundface/immagine-libri_v2_mod-1024x483.png)

<p>J. Kreidler, “<strong>loadbang</strong>”, 2009, wolke - un bel libro, leggero e veloce per imparare Pure Data.</p>
<p>
A. Farnell, ”<strong>Designing Sound</strong>”, 2010, MIT Press - Ottimo libro sul sound design e sull'audio procedurale. Come valore aggiunto, uno dei principali strumenti che l'autore utilizza è Pure Data.</p>
<p>
Wilson, Cottle, Collins, ”<strong>The SuperCollider Book</strong>”, 2011, MIT Press - Il titolo del libro dice tutto! Un bel libro per imparare ad utilizzare Super Collider
</p><p>
H. Scildt, “<strong>The Complete Reference C++</strong>”, 2003, McGraw Hill - Se si desidera imparare a programmare ecco un libro veramente completo che, partendo da C passa poi a C++ coprendo ogni argomento in modo molto esaustivo.</p>
<p>
J. Noble, ”<strong>Interactivity</strong>”, 2009, O'Reilly - Un libro interessante tratta l'argomento interattività in genere passando da Processing, Arduino e OpenFramewoks</p>
<p>
D. Shiffman, ”<strong>Learning Processing</strong>”, 2008, Morgan Kaufmann - Libro fantastico, simpatico, brillante, divertente per imparare a programmare in Processing. Bellissimo, come tutti gli altri lavori dell'autore.</p>

---


    <!-- ARTICOLO -->
    <article>
    <header>
    <a id="primi-prototipi"></a>
    <h2>Primi prototipi: Limulo @ Ohibò</h2>
    <time datetime="2013-06-09T13:00:00+01:00">Associazione Ohibò, 9 Giugno 2013</time>
    </header>

    <p>Il 9 giugno 2013 abbiamo presentato il nostro prototipo di tavolo interattivo da <a class="ext" href="http://www.associazioneohibo.it/wordpress/" target="_blank">Ohibò</a> in occasione dell'incontro domenicale con i ragazzi dell'<a class="ext" href="http://www.associazioneohibo.it/wordpress/seminari-laboratori/oratorio-digitale/" target="_blank">(Lab)oratorio Digitale</a>.</p>

<div class="img">
<img alt="Ohibo_1" src="http://127.0.0.1/images/soundface/Ohibo_1-1024x860.jpg" /></div>

<p>Questo primo prototipo è ispirato ai lavori sulla computer vision svolti dall'università Pompeu Fabra di Barcellona.</p>
<p>Si tratta di un gioco che riconosce i diversi markers grafici (fiducials) ed associa ad ognuno di essi suoni diversi sintetizzati in tempo reale.</p>
<p>Il ritmo ed il tempo musicale sono creati dal giocatore disponendo i markers a piacere sulla superficie di gioco.</p>

<h4>Dettagli:</h4>

<div >
<img alt="fiducials" src="http://127.0.0.1/images/soundface/fiducials-1024x768.jpg" style="float:left; width:20%;"/>


<p>Il piano di gioco è ricavato da un semplice sgabello. Ad una delle 4 gambe dello sgabello è stato fissato un manico di scopa e, sulla cima di questo, una telecamera/illuminatore ad infrarossi. La telecamera è rivolta verso il basso in modo tale da poter illuminare e riprendere gli oggetti disposti sulla superficie di gioco.</p>

<p>In questo primo prototipo gli oggetti di gioco sono stati ricavati da alcuni ritagli di cartone su cui sono state poi incollate le sagome dei "fiducials" precedentemente stampati su carta.</p>

<p>L'immagine ripresa dalla telecamera è inviata al computer per mezzo di una piccola scheda video USB, qui viene analizzata da <a class="ext" href="http://reactivision.sourceforge.net/" target="_blank">ReactiVision</a>.</p>

<p>Questo software analizza l'immagine e, in base ai diversi fiducial individuati, è in grado di associare ad ognuno di essi il relativo identificativo, posizione spaziale, angolo di rotazione etc...</p>

<hr class="clear" />
</div>

<div class="nota img">
<p><b>NOTA</b>: tutto questo è possibile solo se si è calibrato correttamente il software ReactiVision!</p>

<img alt="calibration" src="http://127.0.0.1/images/soundface/calibration.png"/>
<hr class="clear"/>
</div>


<p>Il nostro prototipo associa alla maggior parte dei fiducial una forma grafica quadrata.</p>

<div class="img">
<img alt="debug" src="http://127.0.0.1/images/soundface/debug.png" /></div>

<p>Il fiducial con identificativo 23 invece sarà associato ad un cerchio di colore blu; la rotazione di questo fiducial farà si che la porzione di corona circolare, rappresentata graficamente sul bordo del cerchio blu, si riempia o si svuoti proporzionalmente con la rotazione.</p>

<div class="img">
<img alt="corona_circolare" src="http://127.0.0.1/images/soundface/corona_circolare-1024x768.jpg" /></div>

<div class="img">
<img alt="rotation_test" src="http://127.0.0.1/images/soundface/rotation_test.png" /></div>

<p>Oltre che un'associazione grafica il nostro prototipo assegna ad ogni tipo di fiducial anche un significato sonoro per cui, facendo finta  che la superficie di gioco sia in realtà la rappresentazione spaziale di una battuta, ogni oggetto è di fatto uno strumento musicale!</p>

<p>La parte sonora è sintetizzata in tempo reale grazie all'implementazione della libreria <a class="ext" href="http://libpd.cc/" target="_blank">LibPd</a> che permette l'uso di <a class="ext" href="http://puredata.info/" target="_blank">Pure Data</a> in modalità embed con il nostro software scritto in C++ / <a class="ext" href="http://www.openframeworks.cc/" target="_blank">OpenFrameworks</a>.</p>

<p>Disponendo gli strumenti musicali in punti diversi della battuta è possibile realizzare in tempo reale ritmi e melodie differenti. La rotazione del fiducial 23 invece permette di modificare il tempo musicale da 20 a 180 BPM.</p>

<div class="img">
<img alt="Ohibo_2" src="http://127.0.0.1/images/soundface/Ohibo_2-1024x683.jpg" /></div>

<p>Il progetto sta piano piano evolvendo e, risolvendo i diversi problemi progettuali e realizzativi presto sarà pronto il nuovo prototipo, molto più grande e versatile!</p>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#indice">torna all'indice</a>
    </footer>
    </article>

    <!-- ARTICOLO -->
    <article>
    <header>
    <a id="fase-01"></a>
    <h2>Fase 1: "l'assemblaggio"</h2>
    </header>

    <p>Carichi di entusiasmo, previa progettazione con carta millimetrata - matita - gomma - righello - goniometro - ecc..., ci dotiamo di tutto il materiale necessario per erigere l'ossatura del nostro tavolo.</p>

<div class="img">
<img alt="P1010718" src="http://127.0.0.1/images/soundface/P1010718-1024x768.jpg"/>
</div>

<p>In una domenica pomeriggio ci mettiamo mascherine e occhialoni e iniziamo a segare pezzi di legno, a segnare punti in cui avvitare perni, a controllare millimetricamente che tutto coincida con i progetti e che il tutto stia in piedi (che è la cosa più importante).</p>

<p>[da notare Babi che fa capolino da dietro le travi, vicino alla tenda della finestra]</p>

<div class="img">
<img alt="20130728_122950" src="http://127.0.0.1/images/soundface/20130728_122950-1024x768.jpg"/>
<img alt="d" src="http://127.0.0.1/images/soundface/d1-1024x768.jpg"/>
<img alt="20130728_154017" src="http://127.0.0.1/images/soundface/20130728_154017-1024x768.jpg"/>
</div>

<p>Quando abbiamo finito il cielo è buio (ed è inizio agosto, quindi si parla di circa 7 ore di lavoro), noi siamo stanchi, le mani tremano per le viti inserite, i pezzi di legno tagliati e scartavetrati. Ma lui è lì!</p>

<p>Si regge in piedi. Perpendicolarmente, in piedi.</p>

<div class="img">
<img alt="a" src="http://127.0.0.1/images/soundface/a-768x1024.jpg"/>
</div>

<p>Missione "assemblaggio": compiuta.</p>

<h4>Note Tecniche</h4>
<p>Il tavolo è realizzato in legno di abete. A base quadrata (lato 80cm), alto 1m.</p>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#indice">torna all'indice</a>
    </footer>
    </article>



     <!-- ARTICOLO -->
    <article>
    <header>
    <a id="fase-02"></a>
    <h2>Fase 2: "il setup: la telecamera"</h2>
    </header>

    <p>Una volta compiuta l'opera di carpenteria, ci immergiamo in una nuova avventura: trovare una lastra plexiglass che possa fungere da pianale.</p>

<p>Inizia una lunga attesa nel corso della quale, aspettando la consegna della sopracitata lastra, ci muniamo anche di una nuova lente per la videocamera (PS3eye), con annesso nuovo mount e un nuovo filtro IR.</p>

<div class="img">
<img alt="IR_2" src="http://127.0.0.1/images/soundface/IR_21-1024x768.jpg" />
</div>

<p>Non contenti, decidiamo di fornire il nostro tavolo di una buona illuminazione a infrarossi, quindi ci dotiamo di 4 illuminatori IR, uno per angolo.</p>

<p>Finalmente arriva la lastra di plexiglass. Possiamo iniziare a impostare il tutto per iniziare a fare dei test.</p>

<p>Missione "setup": compiuta.</p>


<p>Alcuni dettagli della lavorazione:</p>
La telecamera è una Sony PS3 Eye cui è stata asportata la lente originale e il relativo supporto.

<div class="img">
<table class="img">
<tbody>
<tr>
<td>
<img alt="IR_3" src="http://127.0.0.1/images/soundface/IR_3-768x1024.jpg"/>
<br>per iniziare è necessario rimuovere i 4 tappini di gomma che, nel lato posteriore della camera, nascondono le 4 viti da svitare.
</td>
<td>
<img alt="IR_4" src="http://127.0.0.1/images/soundface/IR_4-768x1024.jpg"/>
<br>aprire la telecamera è un procedimento abbastanza semplice. Occorre fare un po' di forza per riuscire a separare le 2 metà della struttura.
</td>
</tr>
<tr>
<td>
<img alt="IR_5" src="http://127.0.0.1/images/soundface/IR_5-768x1024.jpg"/>
<br>una volta aperta la struttura esterna di plastica, occorre estrarre il circuito stampato.
</td>
<td>
<img alt="IR_6_mod" src="http://127.0.0.1/images/soundface/IR_6_mod-1024x768.jpg"/>
<br>siamo pronti per inserire il filtro e sostituire la lente.
</td>
</tr>
</tbody>
</table>
</div>

<p>La nuova <a class="ext" title="lente grand'angolo" href="http://dx.com/p/2-1mm-160-degree-wide-angle-lens-for-security-cameras-and-webcams-15237" target="_blank">lente grand'angolo</a> è stata acquistata presso il negozo on-line <a class="ext" title="negozio on-line DealExtreme" href="http://dx.com/" target="_blank">DealExtreme</a> .</p>
<p>Dallo stesso negozio si è acquistata una ulteriore <a class="ext" title="telecamera USB economica" href="http://dx.com/p/300kp-cmos-pc-usb-webcam-w-6-led-white-light-microphone-black-91983" target="_blank">telecamera USB economica</a> dalla quale si è ricato il supporto per la nuova lente.</p>

<p>Il filtro IR (modello NIR Optical Filter, 850DF20, 11.5mm painted edge - acquistato su e-Bay presso questo <a class="ext" title="omegabob2 su e-Bay" href="http://myworld.ebay.it/omegabob2" target="_blank">negozio</a> on-line) è un filtro che permette il passaggio della sola luce infrarossa e in particolare, soltanto quella la cui lunghezza d'onda sia pari a 850nm come si può vedere dal diagramma che accompagna il filtro nell'immagine qui sotto.</p>

<div class="img">
<img alt="IR_1" src="http://127.0.0.1/images/soundface/IR_1-1024x768.jpg" /></div>

<p>Per poter inserire il filtro all'interno del supporto è necessario esercitare un po' di pressione. Una volta completato il lavoro basterà avvitare il supporto sulla scheda, direttamente sopra al CCD.</p>

<div class="img">
<img alt="IR_8" src="http://127.0.0.1/images/soundface/IR_8-1024x768.jpg" /></div>

<p>Qui sotto un particolare del CCD della PS3 Eye.</p>

<div class="img">
<img alt="IR_7" src="http://127.0.0.1/images/soundface/IR_7-1024x768.jpg" /> </div>

<p>Una volta montato il supporto, la lente è facile da posizionare: basta infatti avvitarla sul supporto ed il gioco è fatto.</p>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#indice">torna all'indice</a>
    </footer>
    </article>



    <!-- ARTICOLO -->
    <article>
    <header>
    <a id="illuminatori"></a>
    <h2>illuminatori, dischetti, proiettore e specchi!</h2>
    </header>

    <p>Prima di cominciare i test è il momento di sistemare gli illuminatori ad infrarossi all'interno della struttura, incollare i fiducial sotto ai dischetti di plexiglass e posizionare il proiettore con il relativo specchio.</p>

<div class="img">
<img alt="P1010952" src="http://127.0.0.1/images/soundface/P10109521-1024x768.jpg" /> </div>


<p>Tanto per cominciare, posizioniamo i 4 illuminatori alla base del tavolo. Tutti e 4 puntano per ora verso l'alto. Probabilmente questo causerà una serie di riflessi fastidiosi che renderanno difficile la corretta elaborazione dell'immagine da parte della telecamera. Per ora, l'importante è piazzarli...</p>

<div class="img">
<img alt="P1010954" src="http://127.0.0.1/images/soundface/P1010954-1024x768.jpg" /></div>

<p>Continuiamo assicuriamo la telecamera ad un lato interno del tavolo. Puntiamo l'ottica verso l'alto, in direzione della superficie di plexiglass.</p>

<div class="img">
<img alt="P1010971" src="http://127.0.0.1/images/soundface/P10109711-1024x768.jpg" /></div>

<p>Da notare che, tolta la protezione e messo a fuoco, l'immagine captata dalla telecamera (mostrata sullo schermo del computer via driver <a class="ext" href="http://webcam-osx.sourceforge.net/" target="_blank">macam</a>), presenta già i primi problemi di riflessi... :(</p>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#indice">torna all'indice</a>
    </footer>
    </article>


    <!-- ARTICOLO -->
    <article>
    <header>
    <a id="fase-03"></a>
    <h2>Fase 3: "I test - o dell'arte di non farsi prendere dallo sconforto"</h2>
    </header>

    <p>Inutile dirlo... I primi test non danno molti frutti... anzi, in pratica evidenziano solo cose che bisogna cambiare/migliorare/rivedere/riprogettare.</p>

    <div class="img">
    <img alt="20130911_231914" src="http://127.0.0.1/images/soundface/20130911_2319141-1024x768.jpg"/>
    </div>

    <p>Per farla breve, dobbiamo adattare la dimensione dei fiducial alla distanza a cui abbiamo posto la PS3 Eye. Quindi passiamo serate a muovere dischetti di plexiglass su e giù.</p>

    <div class="img">
    <img alt="P1010948" src="http://127.0.0.1/images/soundface/P1010948-1024x768.jpg"/>
    </div>

    <p>Intervallando l'attività con un movimento simile anche della PS3 Eye, per trovare un giusto connubbio tra distanza, illuminazione, dimensione della superficie, spazio per il videoproiettore.</p>

    <div class="img">
    <img alt="20130912_002927" src="http://127.0.0.1/images/soundface/20130912_0029271-1024x768.jpg"/>
    </div>

    <p>Inoltre, sorge un nuovo ostacolo sulla via della realizzazione del tavolo: trovare il giusto videoproiettore / specchio.</p>

    <div class="img">
    <img alt="P1010977" src="http://127.0.0.1/images/soundface/P1010977-1024x768.jpg"/>
    </div>

    <p>Dotati di un vacillante ottimismo, non demordiamo.</p>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#indice">torna all'indice</a>
    </footer>
    </article>


    <!-- ARTICOLO -->
    <article>
    <header>
    <a id="proiettore"></a>
    <h2>Proiettore e tessuto oscurante</h2>
    </header>

    <p>Procedono i test e, piano piano, un pezzo alla volta, il tavolo comincia a prendere la sua forma definitiva.</p>

    <div class="img">
    <img alt="test2_08" src="http://127.0.0.1/images/soundface/test2_08-768x1024.jpg"/>
    </div>

    <p>Alcuni nuovi elementi sono stati aggiunti all'insieme: si tratta di 4 lembi di tessuto ignifugo e oscurante totale che, stesi nel vano interno, impediscono alla luce ambientale di penetrare e di disturbare la telecamera.</p>

    <div class="img">
    <img alt="test2_07" src="http://127.0.0.1/images/soundface/test2_07-1024x768.jpg"/>
    </div>

<p>Ulteriore elemento e di notevole importanza è il proiettore: si tratta di un proiettore Acer s1210.</p>

    <div class="img">
    <img alt="test2_06" src="http://127.0.0.1/images/soundface/test2_06-768x1024.jpg"/>
    </div>


<p>Abbiamo scelto questo proiettore  perchè in grado di proiettare a brevi distanze immagini sufficientemente grandi tanto da coprire quasi interamente la superficie del tavolo.</p>

<p>Il proiettore è stato posizionato verticalmente all'interno del tavolo con la lente direttamente puntata verso la superficie di plexiglass.</p>

<table class="img" style="width: 100%; border: none;">
<tbody>
<tr>
<td>
<img alt="test2_04" src="http://127.0.0.1/images/soundface/test2_04-1024x768.jpg"/>
</td>
<td>
<img alt="test2_03" src="http://127.0.0.1/images/soundface/test2_03-1024x768.jpg"/>
</td>
</tr>
<tr>
<td colspan="2" style="text-align:center; vertical-align:top;" >
Come si può vedere da questa vista dall'alto, il proiettore è stato assicurato ad una delle 4 pareti interne del tavolo tramite l'uso di una barra filettata e qualche dado. Questa struttura consente di assicurate il proiettore in una posizione perfettamente verticale
</td>
</tr>
</tbody>
</table>

<p>Con il proiettore così vicino alla superficie di proiezione (la distanza tra il plexiglass e l'ottica è di circa 50 cm), la distanza tra il bordo inferiore dell'immagine proiettata e il piano su cui poggia il proiettore è pari a circa 20cm, la quasi totalità della superficie è illuminata ma resta comunque una porzione su cui l'immagine proiettata non riesce ad estendersi.</p>

<div class="img">
<img alt="test2_05" src="http://127.0.0.1/images/soundface/test2_05-1024x768.jpg"/>
<br>L'area della superficie non illuminata, ben visibile nella parte bassa dell'immagine qui sopra, sta ad indicare che il posizionamento verticale del proiettore non è proprio il massimo se l'intenzione è quella di illuminare il più possibile l'area della superficie in plexiglass.
</div>

<p>
Diventa quindi necessario angolare il proiettore in modo tale da centrare  l'immagine sulla superficie eliminando, per quanto possibile, la porzione scura dall'area interattiva.</p>

<div class="img">
<img alt="test2_02" src="http://127.0.0.1/images/soundface/test2_02-1024x768.jpg"/>

<br>Eccoci allora nella delicata operazione di angolare il proiettore. Quest'ultimo sarà poi assicurato nella posizione prescelta tramite l'uso di appositi spessori in legno.
</div>



    <p>Questo purtroppo comporta inevitabilmente che l'immagine proiettata risulti distorta e rende necessaria una correzione a monte. L'immagine che verrà proiettata sarà distorta via software in maniera uguale e contraria in modo da dare la sensazione, una volta proiettata sulla superficie, di possedere le giuste proporzioni.</p>

    <p>Ad ogni modo, la resa è molto interessante</p>

    <div class="img">
    <img alt="test2_01" src="http://127.0.0.1/images/soundface/test2_01-1024x768.jpg"/>
    </div>

    <p>Si prospettano altre serate insonni e parecchi altri grattacapi ma per ora facciamo basta e andiamo a letto...</p>

    <div class="img">
    <img alt="test2_09" src="http://127.0.0.1/images/soundface/test2_09-1024x768.jpg"/>
    </div>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#top-page">torna all'indice</a>
    </footer>
    </article>

    </div> <!-- fine della sezione container -->

  </body>

</html>
