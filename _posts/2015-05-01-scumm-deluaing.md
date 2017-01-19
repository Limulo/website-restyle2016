---
layout: post
title: de-LUA-ing-scripts
date: 2015-05-01 09:00:00
excerpt: if you want to know how the Grim Fandango scripts works...
category: [game, scumm]
---

<div class="note">
<p>Le annotazioni seguenti sono state testate su Mac OS X 10.6.8. I giochi utilizzati come cavie per gli esperimenti sono videogiochi originali, versione per PC.</p>
</div>

E' vero, Grim Fandango non ha nulla a che fare con Scumm, ma questo argomento è comunque collegato.

Articolo dedicato al sistema di script implementato in **GrimE** (Grim Fandango Engine), motore di gioco che rappresenta la moderna evoluzione del sistema Scumm per il funzionamento dei videogiochi di avventura di nuova generazione come **Grim Fandango** e **Escape from Monkey Island**.

Scumm non era più sufficiente: ora la necessità era quella di implementare un motore di calcolo floating point ma soprattutto la fantastica grafica 3D!

Il programmatore **Bret Mogilefsky** si è occupato del lavoro di traduzione di Scumm in GrimE, effettuando un simbolico passaggio di testimone dal sig. **Ron Gilbert**.

occorre parlare di:
* floating point
* 3D
* Linguaggio di scripting non da reinventare da capo e quindi **Lua**

Sappiamo che, a differenza di Scumm, il linguaggio di scripting utilizzato per la realizzazione di Grim Fandango non è stato riscritto da zero. All'epoca, parliamo del 1998, i progettisti hanno pensato bene di cercare un linguaggio di scripting già esistente e che si potesse adattare bene alle loro esigenza: trovarono Lua, al tempo alla version **XXX**.

<div class="note">
<p>Documenta un po' meglio il discorso del linguaggio di pregramamzione LUA</p>
</div>

Ebbene, scelto Lua come linguaggio per la stesura degli script, questi stessi script sono compattati assieme a tutte le altre risorse del gioco all'interno di file contenitore denominati **.LAB** (acronimo per LucasArts Bundle).

Informazioni utili sul bundle e il tipo di risorse contenute so trovano al link **[h]** cliccabile dalla sezione riferimenti più in basso.

![GrimE Scripts Compiling](/assets/images/scumm/grime-compiling.png)

Il progetto **ResidualVM** si è occupato di riscrivere l'interprete GrimE per rendere possibile l'esecuzione di questi giochi sui moderni sistemi.

Come per il progetto ScummVM, i programmatori costruirono una nutrita suite di tools per esaminare i files eseguibili originali, così anche il progetto ResidualVM possiede i propri tools (vedi **[f]**).

Nonostante questi tools non siano così ben documentati come lo sono quelli della controparte ScummVM, è possibile utilizzarli facendo lavoro di intuito: dopo una configurazione e una compilazione per il proprio sistema operativo, i tools che possono essere utilizzati sono i seguenti:
* **unlab**: tool per l'estrazione dal file risorse **.LAB** delle singole componenti (files audio, scripts, modelli 3D, etc...);
* **delua**: tool per la decompilazione del codice binario degli script lua;

Ebbene sì, sembra che gli script .lua siano stati impacchettati nei file contenitore una volta che siano già stati compilati. Per riuscire a leggerli sono necessarie quindi due operazioni: lo spacchettamento e la decompilazione lua entrambe visibili nella figura sottostante e denominate rispettivamente con il nome del tool preposto all'operazione, **unlab** e **delua**.

![GrimE Scripts De-Compiling](/assets/images/scumm/grime-decompiling.png)

I comandi da terminale per eseguire le operazioni di cui sopra sono i seguenti:

<pre class="code">./unlab NOMEFILE.lab</pre>
<pre class="code">./delua INPUTFILE.lua > OUTPUTFILE.lua</pre>

non ci sarebbe nessuan differenza nel voler utilizzare un file <span class="code">.txt</span> come output, il comando allora diverrebbe il seguente:

<pre class="code">./delua INPUTFILE.lua > OUTPUTFILE.txt</pre>

## Decompressione dei files audio

Un archivio **.LAB** può contenere anche molte altre tipologie di files oltre agli scripts, una di queste è la tipologia file audio.

In un archivio .LAB possono essere presenti diversi files audio con estensione **.wav** che ho scoperto però essere illeggibili da un qualsiasi riproduttore musicale. Questo perchè i suddetti files sono in formato "compresso" ed occorre provvedere alla relativa decompressione prima di poter udire il sonoro vero e proprio.

Il tool preposto per decomprimere questi file audio è **vima**; il comando da terminale che utilizzo è questo:

<pre class="code">./vima FILECOMPRESSO.wav > FILENONCOMPRESSO.wav</pre>

Sembra che i files audio di Grim Fandango subissero una compressione denominata VIMA, come descritto qui **[g]**.

## Altri spunti interessanti per continuare a scrivere l'articolo

Ecco un link interessante al [Grim Fandango Puzzle Document](http://www.grimfandango.net/downloads/puzzle-document).
Grim Fandango [Hacking](http://www.grim-fandango.com/hacking.php)!!

Necessari approfondimenti sugli altri tools e, senza dubbio un approfondimento sul formato dei file audio che vengono estratti dai files di risorse. Stessa cosa dicasi per le mesh e per i costumes.

## Riferimenti

**Links**

* **[a]** [LUA](http://www.lua.org);
* **[b]** [Lua in Grim Fandango](http://www.grimfandango.net/features/articles/lua-in-grim-fandango) by **Bret Mogilefsky**. Interessanti anche le sue due interviste [qui](http://www.grimfandango.net/features/interviews/interview-with-bret-mogilefsky) e [qui](http://www.grimfandango.net/features/interviews/interview-with-bret-mogilefsky-2);
* **[c]** le [slides](http://www.lua.org/wshop05/Mogul.pdf) del talk tenuto dallo stesso Mogilefsky in occasione del [workshop](http://www.lua.org/wshop05.html);
* **[d]** sito interessante 1: [link](http://grim-fandango.com/);
* **[e]** sito interessante 2: [link](http://www.grimfandango.net/);
* **[f]** link alla pagina del progetto [ResidualVM]http://residualvm.org/) e a quella GitHub dei relativi [tools](https://github.com/residualvm/residualvm-tools).    
* **[g]** [VIMA](http://wiki.multimedia.cx/index.php?title=VIMA) codec;    
* **[h]** [.LAB](http://forums.residualvm.org/viewtopic.php?t=257) topic;
