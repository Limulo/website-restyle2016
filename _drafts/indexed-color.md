---
layout: post
title: Indexed Color and Direct Color
date: 2015-10-28 09:00:00
excerpt: Approfondimento sulla gestione del colore nei videogiochi
category: [game, focus]
---

<!--
<meta name="keywords" content="indexed, palette, bit, depth, Amiga, CGA, EGA, VGA, truecolor">
<meta name="description" content="Approfondimento sulla gestione del colore nei videogiochi">
-->

    <h2>Colore indicizzato e colore diretto</h2>
    </header>

    <p>In computer science, il <b>colore indicizzato</b> è una tecnica per gestire l'informazione sul colore nelle immagini digitali, in genere applicata in situazioni si restrizioni tecniche allo scopo di risparmiare memoria, spazio su disco e al contempo velocizzare il refresh a display e il trasferimento di file.</p>

    <p>Spesso basta una esempio per chiarire l'argomento: prendiamo il caso in cui ci sia la necessità di manipolare una immagine (tralasciamo per ora discorsi in merito alla tipologia del formato).</p>

    <h3>Direct Color, True Color</h3>

    <p>Personalmente sono abituato a pensare ad una immagine come un contenitore di <b>pixel</b>s dove l'informazione sul colore è contenuta direttamente in ciascuno di essi. Questa tecnologia è chiamata Colore Diretto o <b>Direct Color</b></p>

    <div class="img">
    <img src="http://www.limulo.net/images/game-focus-02/img-normal.png" alt="colori non indicizzati" style="width: 100%;"/>
    </div>

    <p>Supponiamo ora di utilizzare la rappresentazione <b>True
    color</b> per il colore: questa prevede l'uso di 24 bits per descrivere il colore nelle sue 3 differenti componenti, anche dette <b>canali</b> - rosso (<b>R</b>), verde (<b>G</b>) e blu (<b>B</b>).<br/>

    <p>Abbiamo detto 24 bits per 3 canali, in altre parole <b>8-bit</b>s (1 BYTE) per R, per G e per B. Saranno 3 i BYTEs totali utilizzati per descrivere il colore associato al singolo pixel.</p>

    <p>Potendo disporre di 8-bits possiamo rappresentare 256 valori
    numerici compresi tra 0 e 255; avendo 3 canali, è semplice vedere
    come siano pi&ugrave; di 16 milioni ( 256 * 256 * 256 = 16'777'216 ) i diversi colori possibili che si possono ottenere.</p>

    <p>Si chiama True Color non a caso: con 16 milioni di possibili colori, superiamo la capacità dell'occhio umano di distinguere tra un colore e l'altro (sono 10 milioni le possibili gradazioni di colore che l'occhio umano è in grado di distinguere). Una immagine mostrata in True color mostra quasi esattamente quello che un osservatore vedrebbe nella realtà!</p>

    <h3>Indexed Color (colore indicizzato)</h3>

    <p>Pensiamo però di essere attorno agli anni '80, primi anni '90:
    all'epoca l'hardware non dava la possibilità di rappresentare un
    numero così elevato di colori a schermo simultaneamente. Si doveva
    fare affidamento su un numero di colori limitato, quasi sempre
    predefinito e raramente modificabile dall'utente.</p>

    <p>La così detta <b>Color Depth</b>, profondità espressa in bit, con la quale era possibile rappresentare le informazioni associate al colore del singolo pixel in una immagine bitmap, non raggiungeva certo i 24 bits del True color.</p>

    <p>Con Color Depths relativamente basse, i bits associati al pixel
    non servivano tanto a descrivere direttamente le informazioni sul
    colore, quanto piuttosto a memorizzare un valore numerico che
    rappresentava un <b>indice</b>. Questo indice veniva utilizzato
    per localizzare un particolare elemento (<b>entry</b>) all'interno
    della così detta <b>Palette</b> che altro non &egrave; se non un array.</p>

    <p>Era l'epoca dei:</p>

    <table class="dati" style="width: 100%;">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3">Color Depth a<br/><b>2-bit</b></td>
            <td>Definito dalla specifica <b>CGA</b> (Color Graphic Adapter).<br/>Introdotta dalla IBM nel 1981 fu la prima scheda grafica e prima color display per i pc IBM.</td>
        </tr>
        <tr>
            <td><b>Massimo numero di colori simultanei a schermo: 4</b></td>
        </tr>
        <tr>
        	<td>
        	<img src="http://www.limulo.net/images/game-focus-02/CGA.png" alt="CGA" style="width: 60%;"/>
        	<img src="http://www.limulo.net/images/game-focus-02/palette-CGA.png" alt="palette CGA" style="width: 30%;"/>
        	</td>
        </tr>
    </table>



    <p>dei</p>

    <table class="dati" style="width: 100%;">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3">Color Depth a<br/><b>4-bit</b></td>
            <td>Indicato dalla <b>EGA</b> (Enhanced Graphics Adapter),<br/>introdotta nel 1984 dalla IBM e divenuta un'altra specifica standard per i display per computer.</td>
        </tr>
        <tr>
            <td><b>Massimo numero di colori simultanei a schermo: 16</b></td>
        </tr>
        <tr>
        	<td>
        	<img src="http://www.limulo.net/images/game-focus-02/EGA.png" alt="EGA" style="width: 60%;"/>
        	<img src="http://www.limulo.net/images/game-focus-02/palette-EGA.png" alt="palette EGA" style="width: 30%;"/>
        	</td>
        </tr>
    </table>

    <p>e dei:</p>

    <table class="dati" style="width: 100%;">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="2">Color Depth a<br/><b>5-bit</b> e <br/><b>6-bit</b></td>
            <td>Come era possibile fare sul chip <b>OCS</b> (Original Chip Set) montato sui computer <b>Commodore Amiga</b> tra il 1985 e il 1990. </td>
        </tr>
        <tr>
            <td><b>Massimo numero di colori simultanei a schermo: 32 </b>/<b> 64 </b>rispettivamente</td></tr>
    </table>
     <br/>
    <div>
    <img
        src="http://www.limulo.net/images/game-focus-02/amiga_logo.png"
        alt="amiga logo" style="float: right; width: 20%;">All'epoca
        le grandi capacità multimediali (non solo grafiche ma anche
        sonore) e i prezzi altamente
        competitivi rispetto alle piattaforme concorrenti, resero
        <b>Amiga</b> praticamente leader indiscusso del mercato e target principale per gran parte dei prodotti software, progettati e ottimizzati per sfruttare pienamente queste grandi capacità.</div>

    <br/>
    <p class="nota">
    <br/>
    Nel 1992 <b>Commodore</b> esce con <b>AGA</b> (Advanced Graphics
    Architecture) il nuovo chip montato sui nuovi modelli Amiga 1200 e
    Amiga 4000. Il chip permetteva di utilizzare fino a 256 colori simultaneamente!</p>

    <p>Anche se l'introduzione di <b>AGA</b> segnò l'inizio del declino per Commodore e la perdita della leadership tecnica nell'area del multimedia da parte di Amiga, il nuovo chip, come altri prodotti concorrenti dell'epoca, era in grado di visualizzare modi grafici con una Color Depth fino a 8-bits:</p>

        <table class="dati" style="width: 100%;">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3">Color Depth a<br/><b>8-bit</b></td>
            <td>Come era possibile disporre nella bassa risoluzione (320x200 pixels) per la specifica <b>VGA</b> (Video Graphics Array), ultimo standard grafico della IBM, introdotto nell'anno 1987 e implementato praticamente da qualsiasi hardware grafico per PC a partire dal 1990.<br/>Tra questi ad esempio, il chip grafico <b>AGA</b> di Amiga.</td>
        </tr>
        <tr>
            <td><b>Massimo numero di colori simultanei a schermo: 256</b></td>
        </tr>
        <tr>
        	<td>
        	<img src="http://www.limulo.net/images/game-focus-02/VGA.png" alt="VGA" style="width: 60%;"/>
        	<img src="http://www.limulo.net/images/game-focus-02/palette-VGA.png" alt="palette VGA" style="width: 30%;"/>
        	</td>
        </tr>
    </table>


    <p>In ognuno dei casi sopra menzionati, come già detto, l'informazione sul colore non era associata <i>direttamente</i> al pixel nell'immagine; questa veniva piuttosto elencata, colore per colore, all'interno di una tabella, così detta <b>Palette</b> dei colori.</p>

    <p>Per poter essere in grado di ricostruire le informazioni visive
    contenute nell'immagine, ai pixels era lasciato il compito di
    indicare la corrispondenza con un particolare colore
    (<b>entry</b>) all'interno della <b>Palette</b> (tramite il valore
    di <b>indice</b>).</p>

    <p>Il funzionamento era in pratica quello mostrato nella figura qui sotto:</p>

    <div class="img">
    <img src="http://www.limulo.net/images/game-focus-02/img-indexed.png" alt="colori indicizzati" style="width: 100%;"/>
    </div>

    <p>Va detto che il termine <b>palette</b>, nell'accezione usata fino ad ora, non è proprio corretto. Infatti sarebbe meglio chiamarla <b>pseudocolor palette</b> e lasciare il termine <b>palette</b> per descrivere un'altra entità.</p>

    <p>Andrebbe infatti detto che se la particolare Color Depth ci
    obbligava a scegliere tra un massimo di colori ben definito,
    ossia il massimo di colori che il particolare hardware consentiva
    di mostrare a schermo simultaneamente, questi colori potevano
    essere scelti all'interno di uno spazio di colori molto più ampio:
    <ul>
    <li>con il termine <b>pseudocolor palette</b> si identifica il massimo numero di colori che l'hardware è in grado di mostrare a schermo simultaneamente.</li>
    <li>il termine <b>palette</b> rappresenta, più in generale, uno spazio di colori molto più ampio. E' tra questi che vengono selezionati quei colori che formano la pseudocolor palette.</li>
    </ul>

    <p>In altre parole possiamo dire che la <b>pseudocolor palette</b> è un sottoinsieme della <b>palette</b> e che le sue entries sono accessibili grazie all'<b>indice</b> che ciascun pixel dell'immagine possiede.</p>

    <table class="dati" style="width: 100%;">
        <tr>
            <!-- <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3"><b>2-bit</b> color</td> -->
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"></td>
            <td style="width: 30%; text-align: center; v-align:
        middle; background-color: rgb(220, 220, 220);"><b>color
        palette</b><br/><span style="font-size: 0.8em;">numero totale dei colori tra i quali scegliere</span></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>pseudo color palette</b><br/><span style="font-size: 0.8em;" >massimo numero di colori simultanei a schermo</span></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b><br/><span style="font-size: 0.8em;">bits per pixel</span></td>
        </tr>
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>monochrome</b></td>
            <td style="width: 30%; text-align: center;">//</td>
            <td style="width: 30%; text-align: center;">2 colori</td>
            <td style="width: 30%; text-align: center;">indice da 1 bit</td>
        </tr>
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>CGA</b></td>
            <td style="width: 30%; text-align: center;">16
        colori<br/><span style="font-size: 0.8em;">4 bits per colore<br/>(1 per R, 1 per G, 1 per B + 1)</span></td>
            <td style="width: 30%; text-align: center;">4 colori</td>
            <td style="width: 30%; text-align: center;">indice da 2 bit</td>
        </tr>
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>EGA</b></td>
            <td style="width: 30%; text-align: center;">64
        colori<br/><span style="font-size: 0.8em;">6 bits per colore<br/>(2 per R, 2 per G e 2 per B)</span></td>
            <td style="width: 30%; text-align: center;">16 colori</td>
            <td style="width: 30%; text-align: center;">indice da 4 bit</td>
        </tr>
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="2"><b>Amiga OCS</b></td>
            <td style="width: 30%; text-align: center;"
        rowspan="2">4096 colori<br/><span style="font-size: 0.8em;">12 bits per colore<br/>(4 per R, 4
        per G e 4 per B)</span></td>
            <td style="width: 30%; text-align: center;">32 colori</td>
            <td style="width: 30%; text-align: center;">indice da 5 bit</td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">64 colori</td>
            <td style="width: 30%; text-align: center;">indice da 6 bit</td>
        </tr>
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="2"><b>VGA</b></td>
            <td style="width: 30%; text-align: center;">16 Milioni di
        colori<br/><span style="font-size: 0.8em;">24 bits per
        colore<br/>(8 per R, 8 per G e 8 per B)</span></td>
            <td style="width: 30%; text-align: center;" rowspan="2">256 colori</td>
            <td style="width: 30%; text-align: center;" rowspan="2">indice da 8 bit</td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">262'144
        colori<br/><span style="font-size: 0.8em;">18 bits per
        colore<br/>(6 per R, 6 per G e 6 per B)</span></td>
        </tr>

    </table>

    <p>Mano a mano che la Color Depth aumentava in seguito a
    miglioramenti tecnologici dei dispositivi, il numero di colori che
    avrebbero finito per fare parte della pseudocolor palette divenne
    molto alto e, in breve, poco pratico da gestire con il metodo
    della "mappa dei colori" fin qui descritto.<br/>
    Per questo, le informazioni relative al colore cominciarono ad
    essere memorizzate <i>direttamente</i> nel pixel.</p>

    <p>Ecco qui una tabella giusto per completare il nostro discorso sulla Color Depth:</p>

    <table class="dati" style="width: 100%;">
        <tr>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"></td>
            <td style="width: 80%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
        </tr>
        <tr>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>8-bit color</b><br/>anche detto<br/><b>truecolor 8-bit</b></td>
            <td style="width: 80%; text-align: center;">8 bits<br/>3 bits per R, 3 per G e 2 per B<br/><i>E' per il canale Blu che si usano solo 2 bits perchè l'occhio umano è molto meno sensibile per gradazioni del colore blu che per gradazioni della altre 2 componenti.</i></td>
        </tr>
        <tr>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>High Color</b></td>
            <td style="width: 80%; text-align: center;">15 / 16 bits</td>
        </tr>
        <tr>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>18-bit color</b></td>
            <td style="width: 80%; text-align: center;">18 bits</td>
        </tr>
        <tr>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>True color</b></td>
            <td style="width: 80%; text-align: center;">24 bits<br/>8 bits per R, per G e per B</td>
        </tr>
    </table>

    <br/>
    <div class="nota">
    <br/>da notare che la Color Depth 8 bit può essere usata
    <ul>
    <li>sia come valore di colore indicizzato;</li>
    <li>sia come valore di colore diretto!</li>
    </ul>    
    </div>

    <h3>Esercizio</h3>

    <p>Giusto per fare qualche esercizio di calcolo, capiamo quali siano le dimensioni in Byte di un file di immagine bitmap nelle diverse modalità grafiche:</p>

    <p>Ad esempio se ragioniamo in modalità grafica <b>CGA</b> sappiamo che la Color Depth è di 2-bits per pixel e si ha a disposizione una <b>pseudocolor palette</b> che conta un totale di 4 entries.</p>

    <p>Proseguendo nel ragionamento, avremmo che una immagine da 320 x 200 pixels in CGA ha un peso totale in BYTE pari a:</p>

    <table class="dati">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3"><b>CGA</b></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>risoluzione</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>numero di entries</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);">bits per <b>entry</b></td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">320 * 200</td>
            <td style="width: 20%; text-align: center;">2</td>
            <td style="width: 20%; text-align: center;">4</td>
            <td style="width: 20%; text-align: center;">4 bits</td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="4"><b>totale</b><br/>indici + palette : (320 * 200 * 2 bits) + (4 entries * 4 bits)<br/>quasi 16 KB</td>
        </tr>
    </table>

    <p>Aumentando la Color Depth possiamo continuare migliorando la rappresentazione del colore pur mantenendo la tecnologia di indicizzazione:</p>

    <table class="dati">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3"><b>EGA</b></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>risoluzione</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>numero di entries</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);">bits per <b>entry</b></td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">320 * 200</td>
            <td style="width: 20%; text-align: center;">4</td>
            <td style="width: 20%; text-align: center;">16</td>
            <td style="width: 20%; text-align: center;">6 bits</td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="4"><b>totale</b><br/>indici + palette : (320 * 200 * 4 bits) + (16 entries * 6 bits)<br/>circa 31 KB</td>
        </tr>
    </table>

    <p>Proviamo a vedere quali sarebbero i dati se fossimo su di una Amiga:</p>

    <table class="dati">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3">con<br/><b>OCS</b></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>risoluzione</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>numero di entries</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);">bits per <b>entry</b></td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">320 * 200</td>
            <td style="width: 20%; text-align: center;">6</td>
            <td style="width: 20%; text-align: center;">64</td>
            <td style="width: 20%; text-align: center;">12 bits</td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="4"><b>totale</b><br/>indici + palette : (320 * 200 * 6 bits) + (64 entries * 12 bits)<br/>quasi 47 KB</td>
        </tr>
    </table>

    <p>Proseguiamo analizzando il caso di una immagine indicizzata nel modo colore VGA:</p>

    <table class="dati">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3"><b>VGA</b></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>risoluzione</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>numero di entries</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);">bits per <b>entry</b></td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">320 * 200</td>
            <td style="width: 20%; text-align: center;">8</td>
            <td style="width: 20%; text-align: center;">256</td>
            <td style="width: 20%; text-align: center;">24 bits</td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="4"><b>totale</b><br/>indici + palette : (320 * 200 * 8 bits) + (256 entries * 24 bits)<br/>circa 63 KB</td>
        </tr>
    </table>

    <p>E se invece la memorizzassimo con modalità di colore diretta?</p>

    <table class="dati">
        <tr>
            <td style="width: 10%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);" rowspan="3"><b>True color</b></td>
            <td style="width: 30%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>risoluzione</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>color depth</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);"><b>numero di entries</b></td>
            <td style="width: 20%; text-align: center; v-align: middle; background-color: rgb(220, 220, 220);">bits per <b>entry</b></td>
        </tr>
        <tr>
            <td style="width: 30%; text-align: center;">320 * 200</td>
            <td style="width: 20%; text-align: center;">24</td>
            <td style="width: 20%; text-align: center;">//</td>
            <td style="width: 20%; text-align: center;">//</td>
        </tr>
        <tr>
            <td style="text-align: right;" colspan="4"><b>totale</b><br/>indici + palette : (320 * 200 * 24 bits)<br/>circa 188 KB</td>
        </tr>
    </table>

    <div class="nota">
    <br/>
    si vede facilmente come l'immagine a colori indicizzati, anche con entry in palette descritte col massimo numero di bits (modalità grafica VGA) resta, in occupazione di memoria, molto più leggera della corrispettiva versione in colore diretto. Il rapporto è quasi di 1 a 3!
    </div>

    <h3>Riferimenti</h3>
    <p>La maggiorparte dei contenuti qui riportati sono stati personalmente elaborati a partire da quanto raccolto nel corso dell'esperienza e in particolare dal mio punto di riferimento per eccellenza, <i>Wikipedia</i>:
    <ul>
    <li><a class="ext" href="http://en.wikipedia.org/wiki/Color_depth#8-bit_color" target="_blank">Color depth</a>;</li>
    <li><a class="ext" href="http://en.wikipedia.org/wiki/Amiga" target="_blank">Amiga</a>, <a class="ext" href="http://en.wikipedia.org/wiki/Original_Chip_Set" target="_blank">OCS</a> e <a class="ext" href="http://en.wikipedia.org/wiki/Amiga_Advanced_Graphics_Architecture" target="_blank">AGA</a>;</li>
    <li><a class="ext" href="http://en.wikipedia.org/wiki/Color_Graphics_Adapter" target="_blank">CGA</a>, <a class="ext" href="http://en.wikipedia.org/wiki/Enhanced_Graphics_Adapter" target="_blank">EGA</a> e <a class="ext" href="http://en.wikipedia.org/wiki/Video_Graphics_Array" target="_blank">VGA</a>;</li>
    <li><a class="ext" href="http://en.wikipedia.org/wiki/8-bit_color" target="_blank">8-bit color</a>, <a class="ext" href="http://en.wikipedia.org/wiki/Indexed_color" target="_blank">indexed color</a>;;</li>
    </ul>

    <footer>
    <div class="firma">http://www.limulo.net</div>
    <a class="top" href="#top-page">torna all'indice</a>
    </footer>
    </article>


    </div> <!-- fine della sezione container -->

  </body>

</html>
