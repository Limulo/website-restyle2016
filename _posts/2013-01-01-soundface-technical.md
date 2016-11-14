---
layout: post
title: SoundFace - technicals
date: 2016-10-22 09:31:00
category: [installation, soundface]
excerpt: technical details about soundface
---


### Hardware

The soundface is basically just a table. Well, apparently it is. Actually, it's also much more than this. 
Let's take a closer look...


![slide](/assets/images/soundface/slide-1-tavolo_2-1024x694.png")

In order to visualise the graphics you need three elements:
* The projector: we use a _Acer S1210_ projector. 

We chose this model because it can render very big images at very small distances.

* A transparent plexiglass PMMA sheet.

* A _129 Heavy Frost_ sheet to be put upon the plexiglass sheet. 

The opacity provided by the frost let the user see on the plexiglass sheet what is projected from the engine underneath the surface 

![materials](/assets/images/soundface/slide-2-materiali_2-1024x296.png)

![lamps](/assets/images/soundface/illuminatore-IR.jpg)

Now, let's consider the infra-red ligh spotlights.

We placed 4 of them inside the table structure in order to properly radiate the infra-red light to capture the objects on the surface.

![camera](/assets/images/soundface/telecamera.jpg)

The infra-red light, after being bounced from the objects on the surface, is intercepted by the camera.

The camera is a  modified **ps3Eye**.
We removed the ps3Eye IR filter and we replaced it with a visible light filter (that filters out the visible light). Thus, only infra-red light can be detected by the camera.

We also changed the ps3Eye lens, provinding it with a a wide-angle lens. This new lens allows peripheral vision and we can reduce the distance among the plexiglass sheet and the camera.

![visible-IR-light](/assets/images/soundface/visible-IR-light.jpg)

Visible light domain | Infra-red light domain
Reception of the image related to the surface status | Projection of a graphic interface concordant with the surface statuse

For more details about infra-red lighting, take a look at this site: [lucidscience.com](http://www.lucidscience.com/tut-invisible%20light%20basics-1.aspx)

In order to isolate the infra-red illumination within the table structure, we use four dimming fabric sheets (one per angle).
The external visible light won't interfere with the lighting and sensing within the table.

As a precaution, we mounted two fans to provide a proper air flow inside the table: one to push hot air outside and the other to pull fresh air iniside.

Before implementing the '4 IR spotlights + camera' solution, we experimented other 'lighting and sensing' setups.
First, we tried  a surveillance IR camera with an integrated IR spothlight circuit (implemented in **Prototype #2**). Then we attempted to create a specific circuit implementing a 555 timer IC to create a pulsating IR light spotlight with some IR LEDs.

![555](/assets/images/soundface/circuito-555.jpg)

Due to many problems arising from these setups, we finally decided to implement the current solution.

### Software

The software structure relies on a client-server architecture

By "Client" we mean an application demanding a service. By "Server" we mean an application that can supply the service.
Basically: the client asks the server a service. The server identifies the client and supplies the service. Eventually the client confirms the reception of the service to the server.

![client & server](/assets/images/soundface/client-e-server.jpg)

There are two main communictaion protocols between Client and Server. They both fulfill specific tasks:

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

TCP and UDP regulate the data tansport;  other protocols specify the format and the data type to be sent and received.
Amongst the others, we focused on these two:

* **OSC** protocol: tha data are transmitted by means of messages packets (among computers, synthesizers, multimedia instruments). The messages are typically sent and received via internet, subnets or LAns (UDP/IP, Ethernet).
* **TUIO** protocol:  the data are transmitted via network (local [LAN] or internet[Ethernet]). The transmission protocol id UDP/IP. The messages are formatted according to the OSC protocol. The architecture on which it relies is client-server based.

In more detail, here are the TUIO v1.1 specs:

![tuio](/assets/images/logos/tuio-logo.jpg){: width="20%;"}

This is the structure of a TUIO message:
[src] / [alive] / [set] / [fseq]

in detail:

* **Src** = this part of the TUIO message identifies the TUIO source. Due to this field, in case of more than one source, the Client can recognize which message has been sent by the different sources.
* **Alive** = is a list of Session IDs, i.e. numerical identifiers of all of the object detected on the surface at a given moment. It's like a snapshot of the surface status;
* **Set** = for each Session ID a Set message is sent. This message contains all of the information about that specific object (x and y position, rotation angle, speed and acceleration, etc..);
* **Fseq** = It's a timestamp placed at the and of the message. Every TUIO message is marked with a progressive Fseq timestamp. Thus, the Client is able to mantain the right execution order.

The TUIO protocol has been developed by M. Kaltenbrunner, T. Bovermann, R. Bencina, E. Costanza; it inspired the _Universitat Pompeu Fabra_ (Barcellona) [Reactable](http://www.reactable.com/) project and is mainly implemented in fiducial marker and computer vision interactive applications.

The TUIO protocol is at the core of [ReacTIVision](http://reactivision.sourceforge.net/).
ReacTIVision is a server software that eases the creation and dispatch of properly formatted messages within interactive applications.

![reacTIVision](/assets/images/logos/reactivision-logo.jpg){: width="20%;"}

It's time to dive more deeply into the fiducial markers issue.
Fiducial markers are symbols/images easily and uniquely recognizable by a computer vision system.

#### A brief history of fiducial evolution:

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

let's now investigate the physical structure that transfer data between a server and a client.

Here are some examples: 

* the **net** (whether global or local), for example internet that can link two devices, no matter how distant they are.

![computers](/assets/images/soundface/slide-computers-1024x557.png)

* the client and the server are not necessarily two physical separeted devices. The same device can work as a server and a client at the same time. In this case there will be two applications - one working as the client and the other as the server - running simultaneusly.


The latter is our case! In our project, reacTIVision, acting as a server, dispatches TUIO messages to our custom application that is the client.

![computer 2](/assets/images/soundface/slide-computer-2-1024x428.png)


We use Reactivision on the server side, so we focused on the client side developement.
We wanted our client to be able to render TUIO messages into immages as a visual feedback.

We could choose amongst many tools to accomplish this. Later we'll discuss our choises.
Before doing that, we miss a little piece of implementation.
We wanted the visual feedback to match with sound production.
Instead of using pre-recorded samples we experimented with procedural audio: every sound is synthesized in real time by the client
Volevamo realizzare un client il cui compito principale fosse quello di trasformare i messaggi TUIO in immagini, che restituisse un feedback visivo all'utente. Gli strumenti a nostra disposizione erano principalmente 3 e, di seguito, vedremo i pregi e i difetti di ciascuno per capire come siamo giunti alla scelta finale.
To examine in depth procedural audio, follow [Andy Farnell](http://obiwannabe.co.uk/html/papers/proc-audio/) site.

### Tools

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
<a href="http://www.processing.org/" target="_blank" alt="Processing">Processing</a>: both a language and an IDE. It's been developed at MIT by ben fry and Casey Reas. It's very adaptable and easy to learn. Anyway, if you need low level control, that's probably not the tool for you.
</td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/openframeworks-logo.jpg" alt="ofw-logo" width="114" height="60" />
</td>
<td style="text-align:left; vertical-align:top;" >
<a class="ext" title="OpenFrameworks" href="http://www.openframeworks.cc/" target="_blank">OpenFrameworks</a>: 
It'a set of utilities libraries that embed Processing easiness within C/C++ completeness.
Just like processing, it's a comunity developed project, suited for the main OSes (Linux, OSX, windows, ...)
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
<a class="ext" title="Pure Data" href="http://puredata.info/" target="_blank">Pure Data</a>:
it's a programmable DSP developed by Miller Puckette at IRCAM and maintained by the community.
You can program PureData directly inside its IDE using graphical tools, or you can embed it inside your C program.
</td>
</tr>
<tr>
<td style="width: 10%">
<img src="{{site.url}}/assets/images/logos/supercollider-logo.jpg" alt="SuperCollider" width="128" height="128" />
</td>
<td style="text-align:left; vertical-align:top;" >
<a class="ext" title="Supercollider" href="http://supercollider.sourceforge.net/" target="_blank">Supercollider</a>: it's a scripting language use for the generation and manipulation of sounds in real time. It' internal architecture is based on a server-client structure.
</td>
</tr>
</tbody>
</table>

We opted for the _OpenFrameworks + PureData + TUIO_ setup.

To link together these three tools we used ofAddons.
An ofAddon is a plugin that embed some functionalities within the openframeworks core.
In that way we could embed new features to our code.

More precisely, we used:

* **ofxOSC**: to be able to send and receive OSC messages
* **ofxTuio**: to be able to use the TUIO protocol to format and interpret some of the OSC messages

## Downloads

Here's our [source code](https://github.com/Limulo/videotavolo) al nostro repository GitHub dal quale potrete scaricare i codici sorgente del progetto.

## To go further

<table class="dati" style="width: 100%;">
<tbody>
<tr>
<th style="background-color: #ccc; border-color: #fff; width: 20%;">Authors
</th>
<th style="background-color: #ccc; border-color: #fff;">Title
</th>
<th style="background-color: #ccc; border-color: #fff; width: 20%;">Where and when
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


