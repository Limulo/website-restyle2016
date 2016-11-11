---
layout: post
title: Soundface building process
excerpt: building the soundface step by step
category: [installation, soundface]
date: 2013-06-09 09:31:00
---

{% comment %}date: 2013-06-09 09:31:00{% endcomment %}

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
