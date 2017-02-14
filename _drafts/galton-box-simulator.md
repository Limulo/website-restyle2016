---
layout: post
title: Galton Box Simulator
date: 2016-11-20 12:40:00
excerpt: How to use Box2D Physics library to simulate the Galton machine
category: [coding, physics]
---

Here's one of our first experiment with a physics library. We used **Box2D** library for Processing to recreate a physics simulation.

<iframe src="http://player.vimeo.com/video/87855949" height="375" width="100%" allowfullscreen="" ></iframe>    


Taking inspiration from the work of Sir Francis Galton, we have recreated his **Bean Machine** in code.

{% comment %}
Non vedevamo l'ora di acquisire le competenze necessarie per realizzare un sketch che implementasse un po' le leggi fisiche come forze, gravità, attriti, collisioni etc...

Ecco ci qui allora un piccolo esperimento per testare la libreria Box2D la quale aggiunge a Processing la capacità di computare le leggi fisiche.

<iframe src="http://player.vimeo.com/video/87855949" height="375" width="100%" allowfullscreen="" ></iframe>    

Abbiamo preso spunto dal lavoro di Sir Francis Galton e abbiamo simulato la sua macchina detta "Macchina di Galton" o "Scatola di Galton".

{% endcomment %}

> La macchina di Galton (detta anche "scatola di Galton", o "quinconce" ) è un dispositivo inventato da Sir Francis Galton per fornire una dimostrazione pratica del teorema del limite centrale e della distribuzione normale.

> Consiste in un piano verticale, sul quale sono piantati perpendicolarmente dei chiodi (o pioli) posizionati secondo la configurazione del quinconce (ossia come la rappresentazione del numero 5 sulla faccia di un comune dado da gioco). Da una fessura, posta in cima a tale piano, vengono fatte cadere delle palline (le quali, urtando i chiodi, si dirigono verso destra o verso sinistra).

> Sul fondo sono collocati dei contenitori cilindrici, dove le palline si depositano l'una sull'altra, formando delle pile. Al termine dell'esperimento, le altezze di queste pile assumono approssimativamente la forma di una curva a campana, tipica delle variabili casuali normali.

> [cit. _Wikipedia_: [Macchina di Galton](https://en.wikipedia.org/wiki/Bean_machine)]

## DOWNLOADS

Nell'attesa di capire come embeddare lo sketch direttamente nella pagina web vi lascio [qui](https://github.com/ariutti/galtonBox) il link alla pagina del progetto su GitHub dalla quale è possibile scaricare il codice sorgente.
