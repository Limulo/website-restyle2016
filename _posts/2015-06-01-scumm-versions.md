---
layout: post
title: Scumm versions
date: 2015-06-01 09:00:00
excerpt: Let's talk about the different versions of Scumm interpreter
category: [game, scumm]
---

Quando nel 1987 **Ron Gilbert** e **Aric Wilmunder**, poi ribattezzati gli "_SCUMM lords_", si misero al lavoro su SCUMM, la pratica di scomporre il software in due parti concettualmente distinte, _risorse_ da una parte ed _interprete_ dall'altra, non era certo una novità, almeno per quanto riguarda i videogiochi di avventura.

La cosa era già stata sperimentata con successo dagli sviluppatori della **Sierra On-Line** sin dal 1984 con **AGI** e successivamente con **SCI** e prima ancora dalla celebre **Infocom**, siamo nell'anno 1979, con **Z-Machine**, la macchina virtuale in grado di interpretare i files di risorse che costituivano i contenuti delle loro _interactive fiction_.

![Adventure genre hierarchy](/assets/images/scumm/adventure-genre.png)

Se cercate _Interactive Fiction_ su Wikipedia, scoprirete che questo è uno dei nomi alternativi associati al sottogenere dei giochi di avventura testuali.

Senza entrare troppo nella cronologia, è interessante sapere che le avventure grafiche costituiscono un semplice sotto-genere del più ampio genere avventura.

La possibilità di utilizzare il mouse come principale mezzo per l'interazione con il gioco venne in seguito (da qui anche il nome alternativo di _avventura punta-e-clicca_), anche le immagini vennero in seguito, dapprima solo in bianco e nero, poi a colori, in vettoriale e poi ancora in grafica bitmap.

L'avventura divenne _grafica_ gradualmente mentre, in principio, l'eperienza di gioco consisteva nella lettura di un testo a schermo, al più qualche effetto sonoro e l'interazione consisteva nel digitare a tastiera la coppia di parole _verb-noun_ (verbo e sostantivo) per darle in pasto al _parser_ e far progredire la storia.

Ancora più gustoso è ricollegare tutto questo ad un genere letterario che ebbe la sua massima popolarità negli anni '80 ma che cominciò ad essere sperimentato sin dai '40: il **librogame**!

Mi fermo prima di perdermi definitivamente nella ricerca delle origini del genere, dalla sezione _Riferimenti_ potete comunque trovare tutti i link per saperne di più; ammetto tuttavia che mi piacerebbe molto approfondire ulteriormente questi argomenti, magari ne scriverò in qualche futuro post. Mi piacerebbe, ad esempio, analizzare le differenze tra il game engine della Sierra e quello della LucasArts per non dire che non ho ancora mai giocato ad una interactive fiction! Vedremo...

### Gioco ed interprete

Tornando a noi, per cominciare questa nostra avventura nell'universo SCUMM cerchiamo di capire meglio, magari con un esempio, la differenza che, nel sistema SCUMM,  sussiste tra il gioco e l'interprete.

Ho preparato persino un video per l'occasione!

<iframe width="100%" height="360" src="https://www.youtube.com/embed/ZCdnodwgBT4" allowfullscreen></iframe>

Supponendo che, come me, ancora conserviate i dati dei giochi LucasArts originali, avete almeno un paio di modi per mettere in pratica quello che di cui vi voglio parlare:

* il primo è quello di eseguire questi comandi sul vostro vecchio computer;
* il secondo modo, sicuramente più pratico, è quello di eseguirli su di un vecchio computer **virtuale**, ad esempio, facendo uso del software **DOSBox**;

Avviato DOSBox, partendo dal prompt dei comandi, si procede individuando la cartella del gioco che ci interessa esaminare. Ad esempio "**Indiana Jones and the Fate of Atlantis**".

Entriamo nella directory e stampiamo l'elenco dei files. Nell'elenco compare un file con estensione EXE.
Si tratta dell'interprete SCUMM: il programma che si occupava di decodificare i files risorse ed eseguire gli script del gioco.

Ci sarà utile individuare la **versione** dell'interprete, per farlo occorre far partire il programma indicando un parametro volutamente non corretto per indurre il programma a terminare l'esecuzione e mostrare alcuni messaggi a console.

![interpreter version](/assets/images/scumm/ver-interpreter.png)

Come si può vedere da questa schermata, il programma ci sta mostrando quali siano i paramentri corretti. Nell'angolo in alta a destra invece è ben visibile l'indicazione della sua versione.

Preso nota della versione dell'interprete, avviamo ora il programma passando i parametri che ci interessano. Ad esempio **v** per la grafica VGA e **s** per attivare il sonoro tramite scheda SoundBlaster.

A programma avviato, usiamo una combinazione di tasti per rivelare, quasta volta, la versione del gioco.

<p>La combinazione di tasti da usare è <img alt="Ctrl" src="http://www.limulo.net/images/scumm/Ctrl.jpg"> + <img alt="V" src="http://www.limulo.net/images/scumm/V.jpg"> e provocherà la comparsa di un messaggio al centro dello schermo che riporta appunto la versione del gioco, differente rispetto a quella dell'interprete, oltre ad altre statistiche relative all'uso della memoria (che magari vedremo meglio in un altro post).</p>

![game version](/assets/images/scumm/ver-game.png)

Versione del gioco e versione dell'interprete sono differenti perchè gioco ed interprete sono due componeneti software diverse tra loro. Il **gioco** altro non è che un insieme di dati come immagini, testo e scripts, compattati e codificati in files appositi all'interno della directory. L'**interprete** invece è un programma che, in poche parole, ha il compito di  scompattare ed interpretare questi files per far funzionare il videogame sul nostro computer.
{: class="note"}

La combinazione di tasti vista sopra è ancora valida se giochiamo al gioco utilizzando **ScummVM**!

![game version in scummVM](/assets/images/scumm/ver-game-scummvm.png)

Ecco una tabella in cui riporto le versioni degli interpreti per i nostri giochi LucasArts PC IBM compatibile originali:

<table id="versioni">
    <tr>
        <th rowspan="2"> </th>
        <th colspan="3">Interprete</th>
        <th colspan="2">Gioco</th>
    </tr>
    <tr>
        <th>eseguibile</th>
        <th>ver.</th>
        <th class="larga">timestamp</th>
        <th>ver.</th>
        <th>timestamp</th>

    </tr>
    <tr>
        <th>Monkey Island</th>
        <td>monkey.exe</td>
        <td>5.3.04 CD</td>
        <td class="larga">Apr 12 1994 15:49:24</td>
        <td>CD-ROM version 2.3</td>
        <td>//</td>
    </tr>
    <tr>
        <th>Indiana Jones and the Fate of Atlantis</th>
        <td>atlantis.exe</td>
        <td>5.2.23cd</td>
        <td class="larga">Sept 28 1994 14:32:05</td>
        <td>Ver 1.0 ITA</td>
        <td>20-09-92</td>
    </tr>
    <tr>
        <th>Monkey Island: LeChuck Revenge</th>
        <td>monkey2.exe</td>
        <td>5.2.25cd</td>
        <td class="larga">Sept 26 1994 12:09:02</td>
        <td>Ver 1.0</td>
        <td>21-11-91</td>
    </tr>
    <tr>
        <th>Day of The Tentacle</th>
        <td>tentacle.exe</td>
        <td>6.4.2</td>
        <td class="larga">Jun 02 1993 18:04:22</td>
        <td>Ver 1.0 ITA</td>
        <td>//</td>
    </tr>
    <tr>
        <th>Sam & Max Hit the Road</th>
        <td>samnmax.exe</td>
        <td>7.0.2F</td>
        <td class="larga">Jun 29 1994 15:39:02</td>
        <td>Ver CD 1.0</td>
        <td>05-01-95</td>
    </tr>
    <tr>
        <th>Full Throttle</th>
        <td>ft.exe</td>
        <td>7.3.5</td>
        <td class="larga">Jul 06 1995 10:40:24</td>
        <td>//</td>
        <td>//</td>
    </tr>
    <tr>
        <th>The Dig</th>
        <td>dig.exe</td>
        <td>7.5.0i2</td>
        <td class="larga">Feb 09 1996 13:31:00</td>
        <td>Ver 1.0</td>
        <td>//</td>
    </tr>
</table>

### Riferimenti

**Books and Papers**

* Accordi Richards, M. (2014). [Storia del videogioco](http://www.carocci.it/index.php?option=com_carocci&task=schedalibro&Itemid=72&isbn=9788843074167). Carocci Editore.

**Links**

* [Qui](http://wiki.scummvm.org/index.php/SCUMM/Versions) la sezione dedicata alle versioni, direttamente dalla _Technical Reference_ per SCUMM dal Wiki del progetto ScummVM;
* da Wikipedia: il genere [Avventura](https://en.wikipedia.org/wiki/Adventure_game), [Interactive Fiction](https://en.wikipedia.org/wiki/Interactive_fiction), [Librogame](https://it.wikipedia.org/wiki/Librogame);
