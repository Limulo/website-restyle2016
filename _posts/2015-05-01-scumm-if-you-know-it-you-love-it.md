---
layout: post
title: ScummVM, if you know it, you love it!
date: 2015-05-01 09:00:00
excerpt: SCUMM and ScummVM, what are the two?
category: [game, scumm]
---

{% comment %}
    <p><b>SCUMM under the hood!</b></p>
    <ol>
    <li><a href="#ver">Versioni</a>: Interprete SCUMM & SCUMM Games;</li>
    <li><a href="#glossario">Glossario</a>: capiamoci! Un po' di terminologia utile;</li>

    <!--  -->

    <li><a href="#risorse">Risorse</a>: come è strutturato l'insieme delle risorse di un gioco LucasArts;</li>
    <li>ScummVM <a href="#debugger">Debugger</a>, un primo strumento per esplorare lo SCUMM game!</li>
    <li><a href="#boxes-walk-matrix">Boxes e Walk Matrix</a>;</li>
    <li>SCUMM <a href="#descumming-scripts">Scripts</a>: come decodificarli;</li>
    <li><a href="#tools-01">Tools</a> per creare;</li>
    <li><a href="#tools-02">Tools</a> per analizzare e per giocare;</li>
    <li><a href="#descumming-scripts">Descumming Scripts</a>;</li>
    <li><a href="#deluaing-scripts">De-Lua-ing Scripts</a>;</li>
    <li><a href="#scaling">Scaling</a>;</li>
    <li>Roland <a href="#roland">MT-32</a>;</li>
    <li><a href="#imuse">iMuse</a>;</li>

    </ol>  

    <p><b>Curiosità</b></p>
    <ol>
    <li>Old <a href="#copy-protection">copy protection</a> systems;</li>

    <li><a href="#json">JSON</a> & LucasFilm games</li>

    </ol>
{% endcomment %}

I videogiochi di avventura grafici sono opere multimediali sbalorditive.

Nate come naturale evoluzione delle avventure testuali dei primi '80, la avventure grafiche racchiudono al loro interno tutte le caratteristiche di un film: storia, dialoghi, personaggi, immagini, animazioni, colonna sonora, effetti sonori e visivi. In più l'avventura grafica è interattiva: il giocatore è il protagonista!

Tra tutte le software house che producevano avventure grafiche all'inizio degli anni '90, sicuramente quella a cui sono più affezionato è stata la **LucasArts**.

I loro giochi hanno profondamente cambiato il mio concetto di intrattenimento videoludico!

Dal punto di vista tecnico, se proviamo a metterci nei panni di chi le avventure grafiche le realizzava, ci si rende subito conto che è notevole la mole di dati da gestire: si parla di file audio per le musiche, gli effetti sonori e le voci dei personaggi, le immagini per descrivere i vari frame delle animazioni, oppure i fondali e gli oggetti con cui il giocatore interagisce. Ci sono poi le stringhe di testo relative ai dialoghi, i codici che regolano i comportamenti degli '_attori_' all'interno del gioco, le meccaniche del gameplay, gli alberi logici decisionali su base dei quali talvolta l'avventura può modificare il proprio corso a seconda della azioni intraprese, etc...

Non si trattava soltanto di un problema di risorse (moltissime e di tipologia differente tra loro), il problema più grande era dato dal fatto che sarebbero occorsi anni per scrivere tutto il codice sorgente di un solo videogioco usando il linguaggio **assembly**. Uno strumento in grado di ottimizzare questo workflow ancora non esisteva, e venne ben presto creato dal nulla...

<!-- e, poco a poco, spinto dal desiderio costante di "<em>smontare le cose per vedere come sono fatte dentro</em>", oltre a continuare a giocarci, ho cominciato a smontarli, un pezzo alla volta, per cercare di capire come funzionassero.</p> -->

### SCUMM

Sin dalla loro prima avventura grafica, sto parlando di **Maniac Mansion**, i programmatori della LucasArts (allora ancora LucasFilm games) utilizzarono un sistema di loro invenzione: SCUMM (**Script Creation Utility** for **Maniac Mansion**) <b>[a]</b>, un linguaggio di programmazione appositamente studiato per facilitare la creazione di questo tipo di videogiochi.

![Scumm bar](/assets/images/scumm/scumm-bar.png)

I programmatori sarebbero così stati in grado di manipolare la moltitudine di risorse di cui il gioco aveva bisogno in modo tutto sommato semplice, sfruttando una serie di funzioni ad-hoc preconfezionate, stilando script, più compatti e comprensibili, senza perdersi nella stesura di innumerevoli righe di codice a basso livello.


![Scumm interpreter](/assets/images/scumm/scumm-interpreter.png)

Volendo, il termine SCUMM si può estendere al modo in cui i dati del gioco venivano codificati ed accorpati in grandi files contenitore, all'interno dei quali, oltre alle risorse di cui abbiamo parlato, venivano immagazzinati gli stessi scripts.

Questi files contenitore venivano poi letti e decodificati da uno speciale programma, diverso da piattaforma a piattaforma, così da eseguire il gioco vero e proprio. Questo programma era il cosiddetto **interprete** SCUMM (più tardi ribattezzato **SPUTM** come <b>S</b>CUMM <b>P</b>resetation <b>U</b>tility (<b>tm</b>) <b>[h]</b>). Si trattava di una vera e propria macchina virtuale (<em>process virtual machines</em>) progettata per eseguire un singolo programma per computer - il gioco appunto - fornendogli un ambiente di esecuzione astratto e indipendente dalla piattaforma.


Sistema SCUMM **=** codifica dei file di risorse **+** linguaggio di scripting **+** interprete SCUMM <b>[b]</b>
{: class="note"}

Con gli interpreti era così possibile mantenere separate le risorse del gioco (i cosiddetti **game assets**) dai dettagli di implementazione, più legati alle caratteristiche hardware della piattarforma su cui il gioco doveva essere giocato (_Commodore_, _Pc_ o _Apple_ ad esempio). Con il passare del tempo e la nascita di nuovi sistemi e dispositivi, ben presto questi giochi non poterono più essere messi in esecuzione in quanto i loro interpreti non sono più stati aggiornati per adattarli alle caratteristiche hardware delle macchine moderne.

Ed è qui che entra in gioco il Team ScummVM!

### ScummVM

![ScummVM Logo](/assets/images/scumm/scummvm-128.png)

L'idea che sta alla base del lavoro degli sviluppatori del sistema ScummVM  è semplice: costruire nuovi interpreti SCUMM. <b>[c]</b>

Ad oggi (Maggio 2015), dopo 13 anni di sviluppo <b>[d]</b>, il progetto ScummVM rende possibile l'esecuzione di questi giochi su una miriade di piattaforme tra cui Windows, Linux, Mac, PlayStation3, iOS, Android, Dreamcast, Tizen, Amiga OS, SamsungTV, solo per citarne alcune, senza contare che se inizialmente (come il nome stesso fa intuire) il core del progetto si focalizzava solamente su alcuni giochi della LucasArts, esso si è via via ingrandito tanto da contemplare giochi da innumerevoli software house (Sierra, Revolution Software, Activision, Coktel Vision etc...), espandendosi sempre più...

ScummVM nasce dalla collaborazione di centinaia di programmatori, e, come mostra il video qui sotto, si tratta di un software molto complesso e articolato che racchiude il codice di moltissimi interpreti diversi, non soltanto relativi ai videogiochi SCUMM. <br>ScummVM funziona su moltissime piattaforme e incorpora al suo interno codice da altri progetti software nati indipendentemente come ad esempio il progetto _Munt_<b>[e]</b>, per emulare la scheda audio Roland MT-32 e i suoi suoni tipici di quell'epoca.

<iframe width="560" height="315" src="https://www.youtube.com/embed/iZpf15F3ink" allowfullscreen></iframe>

Dobbiamo pensare che alla base di questo vi è un lavoro ancora più grande ossia quello della **retro-engineering** operata sui files binari dei giochi originali! Questo perchè le software house non hanno ancora rilasciato informazioni in merito ai propri codici sorgente.

Ci sono però alcune eccezioni, come nel caso della _Revolution Software_ che lasciò agli sviluppatori del progetto ScummVM libero accesso ai codici sorgente dei loro giochi _Lure of the Temptress_ e _Beneath a Steel Sky_, risparmiando loro i mal di testa derivati dall'ennesimo lavoro di retro-engineering.

Lo stesso fu poi per _Adventure Soft_ e altre software house che in questo spirito di condivisione rilasciarono versioni freeware dei loro giochi, scaricabili direttamente da una apposita pagina del progetto <b>[f]</b>.

Un esempio della qualità e della cura maniacale per i dettagli sta nel fatto che gli sviluppatori hanno incluso codici per risolvere persino i _bugs_ dei videogiochi nella loro versione originale! <b>[j]</b>

Lo spirito che anima il team di sviluppo è l'**open source**: altra grande nota di merito è che ScummVM è software **free** e che tutto il codice sorgente del progetto è liberamente fruibile e distribuito con licenza di tipo GPL.

Insomma ...tanto di cappello e lunga vita a **ScummVM**!

### e poi...

Il progetto ScummVM non è certo l'unico attraverso il quale ci è possibile rigiocare ai vecchi giochi o far funzionare vecchi programmi. Tra tutte le altre possibilità credo doveroso menzionare il sistema **DOSBox** <b>[g]</b>.


![DOSBox Logo](/assets/images/scumm/dosbox-128.png)

Si tratta sempre di una macchina virtuale, anche se in questo caso parliamo di una _System virtual machine_ anzichè di un _Process virtual machine_.

Una emulazione quindi di un sistema completo, un computer PC IBM compatibile con installato un sistema operativo DOS, con tanto di emulazione di periferiche grafiche e scheda audio IBM compatibile. Questo significa che ai vecchi programmi (non soltanto giochi) viene fornito un ambiente in cui questi possono funzionare correttamente, ignari di star girando su di un moderno dispositivo!

Il progetto DOSBox è di poco più giovane di ScummVM (la prima release per DOSBox risale al Giugno 2002 mentre quella per ScummVM all'Ottobre 2001) e, proprio come ScummVM si tratta di **software free**, distribuito con licenza GNU GPL.

### Riferimenti

**Links**

* <b>[a]</b> da Wikipedia: <a href="https://en.wikipedia.org/wiki/SCUMM">SCUMM</a>;
* <b>[b]</b> un <a href="https://www.youtube.com/watch?v=wNpjGvJwyL8" >talk</a> interessante tenuto da **Ron Gilbert** al _Game Forum Germany 2011_ in cui Ron parla di _Maniac Mansion_ e dell'engine _SCUMM_ con diverse curiosità;
* <b>[c]</b> ScummVM Project: <a href="http://www.scummvm.org/">Home Page</a>, <a  href="https://en.wikipedia.org/wiki/ScummVM">Wikipedia</a>;
* <b>[d]</b> Un interessante <a  href="http://arstechnica.com/gaming/2012/01/16/maniac-tentacle-mindbenders-of-atlantis-how-scummvm-kept-adventure-gaming-alive/">articolo</a> sulla storia del progetto ScummVM. l'articolo è stato scritto da _Richard Moss_ e si intitola "**Maniac Tentacle Mindbenders: How ScummVM’s unpaid coders kept adventure gaming alive**", buona lettura;
* <b>[e]</b> Il progetto <a href="https://github.com/munt/munt">Munt</a> (emulazione software della scheda Audio Roland-MT32);
* <b>[f]</b> ScummVM Project: pagina <a href="http://www.scummvm.org/games/">freeware</a> games;
* <b>[g]</b> DOSBox Project: <a href="http://www.DOSBox.com/">Home Page</a>, <a class="ext" href="https://en.wikipedia.org/wiki/DOSBox">Wikipedia</a>;
* <b>[h]</b> <a class="ext" href="http://www.gamasutra.com/view/feature/196009/the_scumm_diary_stories_behind_.php?print=1">Articolo</a> su Gamasutra: "**The SCUMM Diary: Stories behind one of the greatest game engines ever made**" by **Mike Bevan**;
* <b>[i]</b> la pagina dello <a href="http://wiki.scummvm.org/index.php/SCUMM">SCUMM engine</a> direttamente dal Wiki di ScummVM;
* <b>[j]</b> la pagina relativa ai <a href="http://wiki.scummvm.org/index.php/SCUMM/Bugs">bugs</a> dei videogiochi basati sul sistema SCUMM, in parte risolti dal progetto ScummVM;
* Vari da Wikipedia: <a href="https://en.wikipedia.org/wiki/Virtual_machine">Virtual Machine</a>;
