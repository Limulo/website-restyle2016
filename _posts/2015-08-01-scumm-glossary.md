---
layout: post
title: Glossay
date: 2015-08-01 09:00:00
excerpt: words and meanings for bettere understand SCUMM
category: [game, scumm]
---

Negli articoli precedenti abbiamo accennato velocemente alle _risorse_ del gioco: abbiamo visto nello specifico come un gioco di avventura della LucasArts sia suddiviso in 2 principali componenti: uno è l'**interprete**, l'altro è l'insieme delle **risorse** di gioco come suoni, immagini, testi, scripts, etc.

L'intertprete è un programma specifico per la piattaforma su cui si desidera giocare. Ci sarà quindi un interprete Commodore 64, uno per Pc, un'altro ancora per Mac, etc.

Le risorse sono files comuni a tutte le versioni del gioco e sono lette dall'interprete che le elabora in maniera ottimale per il sistema in uso.

Prima di addentrarci a fondo nelle risorse volevo compilare di seguito un veloce elenco dei termini che ci capiterà più spesso di utilizzare, ai quali forse ho inevitabilmente dovuto fare riferimento anche in precedenza. Il loro significato potrebbe talvolta confondere e credo sia meglio mettere in chiaro alcune cose.

Col tempo mi riservo di ritornare qui per ampliare la sezione con nuovi termini specifici che, per ora, non è necessario approfondire: buona lettura!

## Actor

L'**Attore** è una struttura di controllo astratta. E' attraverso gli _Attori_ che l'engine riesce a controllare tutti quegli elementi di gioco che hanno bisogno di muoversi, parlare, agire nei modi più svariati all'interno del gioco.

Nei giochi LucasArts (e non solo) si usa il termine _Attore_ per l'intrinseca relazione che esiste tra il tipo di videogioco e il cinema o il teatro, come abbiamo già detto: così come nel teatro esiste il palcoscenico e nel cinema ci sono diverse scenografie, anche il gioco possiede i propri equivalenti. Il palcoscenico per il videogioco d'avventura porta il nome di **room** e presto lo studieremo da vicino.

Così è come se l'_Attore_ principale - un Guybrush, oppure un Indy - recitasse su di un palcoscenico virtuale, magari assieme a molti altri personaggi che, siano essi umani o non (animali, automobili, oggetti in movimento e così via), saranno comunque considerati come _Attori_ anch'essi.

## Camera

Continuando le nostre similitudini possiamo dire che, come per il cinema, anche per il gioco esiste la **camera** (telecamera o macchina da presa che dir si voglia): quella che riprende l'azione dallo stesso punto di vista del giocatore.

Il giocatore, seduto di fronte allo schermo, osserva lo svolgersi delle azioni come se stesse assistendo ad una proiezione cinematografica. L'immagine che il giocatore osserva sul proprio schermo, altro non è che l'immagine ripresa da questa _camera_ virtuale.

La _camera_ si può muovere eseguendo carrellate laterali, verticali, oppure può anche seguire i movimenti di un dato _Attore_.

<table class="img">
<tr>
  <td>
  <img alt="camera-azzorre" src="{{site.baseurl}}/assets/images/scumm/camera-azzorre.gif" />
  </td>
  <td>
  <img alt="camera-ascensore" src="{{site.baseurl}}/assets/images/scumm/camera-ascensore.gif" />
  </td>
</tr>

<tr>
  <td>La camera può eseguire carrellate laterali,</td>
  <td>oppure verticali!</td>
</tr>

<tr>
  <td>
  <img alt="camera-scabb" src="{{site.baseurl}}/assets/images/scumm/camera-scabb.gif" />

  </td>
  <td>
  <img alt="camera-newyork" src="{{site.baseurl}}/assets/images/scumm/camera-thera.gif" />
  </td>
</tr>

<tr>
  <td colspan= 2 >La camera può inoltre seguire i movimenti dell'attore nella scena.</td>
</tr>
</table>



<div class="separatore"></div>

<!--    
<p>Abbiamo detto che l'<em>Attore</em> è una entità astratta, essa conserva molti dati utili alla logica di gioco, come la posizione dell'<em>attore</em> in scena, la direzione in cui sta guardando, le velocità di spostamento, le dimensioni, eppure noi non saremmo in grado di vederlo se, tra le altre cose, l'attore non possedesse anche un proprio <b>Costume</b>.</p>

<p>Ebbene sì, l'Attore senza il <em>Costume</em> sarebbe "nudo"; e si potrebbe dire di più: un attore, talvolta con un po' di incoraggiamento (<b>*</b>), può anche cambiare il proprio <em>costume</em> nel corso del gioco!</p>  

<h3>Costume</h3>
<p>Abbiamo detto che l'attore è un'entità astratta, esso, per poter essere "visto" a schermo, ha bisogno di vestirsi: quale termine più adatto allora se non quello di <em>Costume</em>!</p>

<p>Costume è un concetto leggermente più concreto rispetto a quello dell'attore, legato a quello di immagine.</p>
<p>All'attore si associano una o più immagini che ne mostrano i vari stati e movimenti. Queste immagini sono gestite tramite il <em>Costume</em>.</p>
<p>E' probabile che un attore di importanza secondaria possieda pochi costumi da poter "indossare", è invece molto più probabile che un'attore principale abbia un "guardaroba" molto più ricco!</p>

<p>TODO: alcuni costumi sono fissi, altri sono invece animati?</p>

<p>Dal momento che il <em>Costume</em> è una collezioni di animazioni (ma anche di disegni singoli), spesso può essere necessario metterne in riproduzione una piuttosto che un'altra in relazione alle interazioni che l'<em>Attore</em> ha con l'ambiente circostante.</p>

<table style="width: 100%;">
<tr>
  <td>In altri casi può succedere che gli script del gioco forzino un attore a cambiare del tutto il proprio <em>Costume</em> e caricare così un set di disegni completamente nuovo (come ad esempio accade quando Indy si cambia d'abito all'interno del sommergibile tedesco).</td>
  <td>
    <img alt="cambio abito" src="{{ site.baseurl }}/assets/images/scumm/cambio-abito.gif" />
  </td>   
  <td>
    <img alt="abito 1" src="{{ site.baseurl }}/assets/images/scumm/abito-1.png" />
    <img alt="abito 2" src="{{ site.baseurl }}/assets/images/scumm/abito-2.png" />
  </td> 	
</tr>
</table>

<p>ScummVM offre alcuni comandi da console per forzare il caricamento di costume, a scopo di debug.<br>Vedremo questi comandi in dettaglio in un futuro post ma intanto eccovi un nuovo video per meglio capire di cosa stiamo parlando:</p>

<div class="nota">
TODO: link ad articolo comandi Console
</div>

<p>TODO: inserimento del video Youtube serie SCUMM Under the hood ep.2</p>

<div class="dashed-border">
<p>Se volete fare anche voi qualche prova, vi lascio qui alcune indicazioni:</p>
<ul>
  <li>Avviate ScummVM e caricate una partita di un gioco a vostra scelta!</li>
  <li>sulla tastiera del computer premete la combinazione di tasti <img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="D" src="{{ site.baseurl }}/assets/images/scumm/D.jpg"> per passare alla console di Debug;</li>
  <li>digitate il comando <span class="code">actors</span> e date l'invio per visualizzare in output una tabella che mostri le informazioni su tutti gli attori in scena;</li>
  <li>digitate il comando <span class="code">actor &lt;actorId> name</span>, sostituendo l'identificativo numerico dell'attore in vece di <span class="code">&lt;actorId></span>, quindi date l'invio. Otterrete così il nome dell'attore sotto forma di stringa in output;</li>
  <li>per effettuare un cambio di <em>Costume</em>, usate il comando <span class="code">actor &lt;actorId> costume &lt;costumeId></span> sostituendo l'identificativo numerico del costume da far indossare all'attore;</li>
  <li>infine premete <img alt="ESC" src="{{ site.baseurl }}/assets/images/scumm/Esc.jpg"> per tornare al gioco;</li>
</ul>

<br>

<div class="nota">
<p><b>ATTENZIONE</b>: usate questi comandi a vostro rischio e pericolo! Per esperienza personale posso dire che talvolta il loro uso può comportare il crash della macchina virtuale!</p>
</div>

<p>Ecco, ad esempio, i comandi che abbiamo usato nel video mostrato poco più sopra:</p>
<ul>
  <li><span class="code">actor 3 costume 86</span> - l'attore <em>Hoagie</em> indossa il costume da domestica!</li>
<li><span class="code">actor 3 costume 95</span> - ora è un gatto!</li>
  <li><span class="code">actor 3 costume 63</span> - ora invece siamo George Washington</li>
</ul>

<p>Provate ad indossare il costume 83 oppure il 107, il 110, 119, 129, 5, 6, 51, 52...</p>       
</div>

<h3>Room</h3>        
<p>Veniamo ora al palcoscenico! Ebbene sì, per indicare il luogo fisico su cui gli attori recitano e interagiscono tra loro e con altri oggetti lì presenti si usa il termine <em>Room</em>.</p>

<p>Per diverso tempo devo dire, ho fatto fatica a capire il perchè venisse usato questo termine; forse mi sarebbe sembrato più sensato sostituirlo con <em>livello</em>, <em>sfondo</em>, <em>set</em> o <em>stage</em>, non avrei certo usato <em>stanza</em>, anche perchè ci sono certe situazioni in cui gli attori tutto fanno tranne che muoversi all'interno di una <em>stanza</em>:</p>

<table class="img" style="width: 100%;">
<tbody>
    <tr>
        <td>
            <img alt="loom room image" src="{{ site.baseurl }}/assets/images/scumm/room-loom.png" />
        </td>
        <td>
            <img alt="indy room image" src="{{ site.baseurl }}/assets/images/scumm/room-indy.png" />
        </td>
    </tr>
  <tr>
        <td>
            <img alt="monkey2 room image" src="{{ site.baseurl }}/assets/images/scumm/room-monkey2.png" />
        </td>
        <td>
            <img alt="zack room image" src="{{ site.baseurl }}/assets/images/scumm/room-zack.png" />
        </td>
    </tr>
</tbody>
</table>

<p>Il termine venne usato per la prima volta nella versione 1.0 di SCUMM (interprete usato per <b>Maniac Mansion</b>) e da allora non subì più alcuna successiva modifica e rimase tale in tutte le versioni seguenti, seppur con una accezzione molto più generale.</p>
<p>In <b>Maniac Mansion</b> infatti i protagonisti si muovono esclusivamente all'interno di stanze!</p>   

<div>
<img alt="maniac room image" src="{{ site.baseurl }}/assets/images/scumm/room-maniac.png" style="width: 100%;">
</div>

<h3>Cut-scene</h3>
<p>Il termine <b>Cut-scene</b> identifica tutti quei momenti del gioco in cui l'azione, o per meglio dire l'interazione, viene interrotta.<br>Sul palco continuano ad esserci attori in movimento che parlano tra loro e si muovono, l'unica differenza rispetto ad una condizione di gioco normale è che il giocatore non è in grado di influenzare il loro comportamento. Infatti un tipico segno caratteristico delle cut-scene è che il cursore del mouse "sparisce", per poi ricomparire al termine della sequenza.</p>    
<p>Durante le cut-scenes, l'interazione viene momentaneamente interrotta per dare spazio a momenti più narrativi che servono a portare avanti la storia.</p>
-->

Bene, per oggi è tutto; la prossima volta continueremo ad arricchire il nostro vocabolario!
