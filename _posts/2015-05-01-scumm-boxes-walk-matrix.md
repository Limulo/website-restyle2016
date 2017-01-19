---
layout: post
title: Boxes & walk matrix
date: 2015-05-01 09:00:00
excerpt: a place to walk
category: [game, scumm]
---

Tutto è cominciato quando ho cercato di capire che tipo di algoritmo usasse SCUMM per muovere i vari attori all'interno della room.

Ad ogni click l'attore, lo SCUMM engine individua un percorso e l'attore comincia a muoversi, camminando verso il punto in cui si è cliccato, aggirando gli ostacoli presenti. Come è possibile tutto questo?

La letteratura **[1]** tratta approfonditamente l'argomento, indicando diversi tipi di algoritmi che si usano per risolvere problemi di questo tipo, detti problemi del _pathfinding_. il più conosciuto è forse <b>A*</b>.

<div class="note">
<img alt="Edsger Dijkstra" src="{{site.url}}/assets/images/scumm/Dijkstra.jpg" style="float: right;" />
<p>Come riporta <b>[1]</b>, l'algoritmo <b>A*</b> è una naturale evoluzione del più semplice algorimo di <b>Dijkstra</b>. Quest'ultimo viene più spesso utilizzato per risolvere problemi di <em>tactical decision making</em> piuttosto che per il <em>pathfinding</em>.</p>
<p>L'agoritmo di Dijkstra prende il nome dal suo scopritore, il matematico Edsger Dijkstra. Originariamente progettato per risolvere un problema nella teoria matematica dei grafi, un problema detto dello <em>shortest path</em>, questo algoritmo è stato poi messo al servizio del videogioco ed è diventato il punto di partenza per la risoluzione di una particolare classe di problemi.</p>
<p>Tra le altre cose, proprio il sig. Dijkstra, con il suo celebre articolo <em>"GOTO statement considered harmful"</em> <b>[b]</b> del 1968, si batteva contro lo <em><b>Spaghetti code</b></em>, ossia contro i programmi di scarsa qualità, difficilmente leggibili e modificabili per la malsana tendenza all'uso della direttiva <b>GOTO</b> (vedi <b>[c]</b>).</p>
<hr class="clear" />
</div>

<b>A*</b> tuttavia è un algoritmo abbastanza complesso e articolato per essere utilizzato all'interno di SCUMM, a causa forse delle limitazioni computazionali dei dispositivi dell'epoca? non saprei dire, fatto sta che SCUMM utilizza invece un sistema molto più semplice e, in questa sua semplicità, direi molto elegante!


## Fingolfin Docet

Per meglio capire in cosa consiste questo sistema voglio citare le parole di **Max "Fingolfin" Horn**, ormai ex-membro del team di sviluppo di ScummVM, direttamente tratte da un suo intervento (vedi **[a]**) sul forum:

<div class="traduzione dashed-border">

<p>ScummVM doesn't using anything complicated like A* at all!</p>

<p>Rather, the game screen is divided into so-called "boxes" (which in the later SCUMM versions could essentially be almost arbitrary non-overlapping quadrangles).</p>

<p>Normally, an "actor" (like e.g. Guybrush in Monkey Island) is confined to movement within those boxes. So at any time, an actor has a "current box" attribute assigned to it. Let's assume the actor is in box 1.</p>

<p>When the user clicks somewhere, the engine first determines which box the click was in. If it's the same as the actor to be moved is in anyway, it can just be walked there. That's easy. Now assume the click was in a different box, e.g. box 5. THen the engine first determines how to get to that box. For this, it looks in the "box matrix", which is essentially a precomputed n*n matrix, where n is the total number of boxes in the room. For each pair (i,j) of boxes, it contains a value k which says: "If you are in box i and want to get to get to box j, first go to box k". Note that "k" could equal j if box i and j are adjacent.<br>
Now, equipped with this value, the engine will first compute a path for the actor to walk from its current position to the new box k. This depends on how the boxes i and k "touch".</p>
<p>Anyway, so the actor walks a bit and reaches box k. If this was the same as the box of our final destination, then we just walk to the final destination, and are done. If not, we rince and repeat: Look up the entry (k,j) in the box matrix to find the next box; walk to that; etc.</p>

<p>[...]</p>

</div>

**Fingolfin** dice sostanzialmente che l'area di gioco è suddivisa in aree quadrangolari non sovrapposte, chiamate **boxes**.

I movimenti dell'**attore** (come ad esempio Indiana Jones) sono confinati all'interno di queste aree (per questo, l'attore possiede un attributo denominato **current box**).

Quando l'utente clicca, per prima cosa l'engine determina in quale box è avvenuto il click. Se il click è avvenuto nella stessa box in cui risiede l'attore, l'attore camminerà verso il punto del click, semplicemente.

_TODO: e se il click avviene al di fuori di tutte le box??_

Se invece il click è avvenuto in una box differente, allora l'engine deve dapprima determinare come poterci arrivare. Per farlo consulta la **box matrix** (anche chiamata **walk matrix**), che è essenzialmente una matrice precostruita di $$ n * n $$ elementi, dove **n** è il numero totale di box nella room.

Per ogni coppia di box (**i**, **j**) la matrice contiene un valore **k** che sta a significare:

<p style="text-align: center">"<em>Se ti trovi nella box </em><b>i</b><em> e vuoi raggiungere la </em><b>j</b><em>, raggiungi prima la </em><b>k</b>"</p>

da notare che **k** può anche essere uguale a **j** se **i** e **j** sono adiacenti.

<p>Ora, a partire da questo valore, l'engine deve occuparsi di calcolare un percorso per l'attore per condurlo dalla sua posizione attuale alla box <b>k</b>. Questo dipende dal modo in cui le due box, <b>i</b> e <b>k</b> sono affiancate.</p>
<p>Una volta che l'attore ha raggiunto la box <b>k</b> si valuta se sia questa la box che contiene la destinazione finale:</p>
<ul>
    <li>Se sì, allora all'attore basterà muovere pochi ulteriori passi per raggiungere quel punto.</li>
    <li>Se no il procedimento ricomincia: si consulta la <b>box matrix</b> cercando l'entry associata alla nuova coppia (<b>k</b>, <b>j</b>), si ricava la prossima box, e si cammina fino a là, etc...</li>
</ul>


## In pratica...

<p>Wow, tutto questo è molto interessante ma forse un poco troppo astratto. Vogliamo fare un esempio un po' più concreto?</p>
<p>Possiamo usare ScummVM e sperimentare con il suo debugger. Sotto allora e carichiamo un salvataggio da <b>Indiana Jones and the Fate of Atlantis</b>.</p>
<p>Carichiamo il salvataggio <em>Tikal</em> ed entriamo nel templio.</p>

<div class="img">
<img alt="tikal" src="http://www.limulo.net/images/scumm/tikal.png" />
</div>

Una volta qui, richiamiamo il debugger di ScummVM con la combinazione di tasti ![Ctrl]({{site.url}}/assets/images/scumm/Ctrl.jpg){: display="inline"} + ![D]({{site.url}}/assets/images/scumm/D.jpg){: display="inline"}

Il debugger di ScummVM offre 2 principali comandi per esaminare le informazioni di cui abbiamo parlato; esaminiamoli nel dettaglio:
* comando <a href="#debugger-comando-box">box</a>;</li>
* comando <a href="#debugger-comando-matrix">matrix</a>.</li>

<p>TODO VIDEO</p>

## Comando BOX

<p>Il comando <b>box</b> mostra un resoconto delle più importatnti informazioni relative alle box della room corrente, proviamo a digitarlo a console e a dare l'invio: ecco qui quanto riportato dall'output:</p>

<div class="img">
<img alt="tikal boxes" src="http://www.limulo.net/images/scumm/console-01.png" />
</div>

<p>12 righe di testo in output, una per ciascuna delle box presenti nella room (la room 0 sembra avere delle caratteristiche anomale e per il momento la tralascieremo). Le informazioni sono mostrate nella forma seguente (la versione SCUMM su cui questo gioco si basa è la 5, per altri giochi le informazioni mostrate potrebbero essere diverse):</p>

<table class="dati">
    <tr>
        <th>Upper Left Coords</th>
        <th>Upper Right Coords</th>
        <th>Lower Right Coords</th>
        <th>Lower Left Coords</th>
        <th>Mask</th>
        <th>Flags</th>
        <th>Scale</th>
    </tr>
</table>

<p>Tralasciando per ora gli ultimi tre campi (<b>Mask</b>, <b>Flags</b> e <b>Scale</b>) che tratteremo in articoli separati, concentriamoci ora sulle prime 4 coppie di valori.</p>

<div>
<img alt="box" src="http://www.limulo.net/images/scumm/box.jpg" style="margin: 1em; float: right;" />

<p>Ognuna di queste coppie altro non è che una coppia di coordinate espresse in <em>pixels</em> relative ai vertici della <b>box</b>, (ricordiano che la box altro non è se non un' area quadrangolare).</p>
<p>I vertici vengono indicati da quello più in alto a sinistra (<b>U</b>pper <b>L</b>eft) fino a quello che si trova in basso a sinistra (<b>L</b>ower <b>L</b>eft)procedendo in senso orario. Nell'ordine quindi si hanno i 4 vertici <b>UL</b>, <b>UR</b>, <b>LR</b> e infine <b>LL</b>, come mostrato nella figura qui di fianco.</p>

<hr class="clear" />
</div>

<div class="note">
<p><br>ATTENZIONE: ricontrollare la sezioni qui sopra. Non sono convinto fino in fondo che i vertici della box vengano forniti in senso ORARIO!!!</p>
</div>

<p>Riportando i valori delle coordinate sull'immagine di sfondo otteniamo questa rappresentazione che rende subito l'idea di come siano fatte le box e di come esse siano disposte in modo tale da affiancarsi tra loro per creare, di fatto, l'intera area calpestabile dagli attori.</p>

<div class="img">
<img alt="tikal boxes" src="http://www.limulo.net/images/scumm/tikal-boxes-02.png" />
</div>

<div class="note">
<p>Da notare inoltre un particolare interessante: come si può vedere dall'immagine, alcuni di questi quadrangoli possono degenerare in semplici linee se i loro vertici coincidono a 2 a 2. Nella room corrente è il caso delle box <b>7</b>, <b>8</b> e <b>9</b>.</p>
</div>

<a id="debugger-comando-matrix"></a>

## Comando MATRIX

<p>Usiamo ora il comando <em>matrix</em>, eccone l'output:</p>

<div class="img">
<img alt="tikal boxes" src="http://www.limulo.net/images/scumm/console-02.png" />
</div>

<p>Visto così non è molto chiaro. Costruiamoci uno spreadsheet ricavando le informazioni necessarie in questo modo:</p>
<ul>
    <li>La prima riga della matrice (nell'output della console indicata da <b>1:</b>) ha per elementi:
        <ul>
            <li>il valore 1, situato all'incrocio con la colonna 1</li>
            <li>il valore 2, per le colonne dalla 2 alla 8;</li>
            <li>il valore 10, in corrispondenza della colonna 10;</li>
            <li>nessun valore specificato per le altre colonne (9 e 11);</li>
        </ul></li>
    <li>La seconda riga della matrice ha per elementi:
        <ul>
            <li>il valore 1, situato all'incrocio con la colonna 1</li>
            <li>il valore 2, situato all'incrocio con la colonna 2</li>
            <li>il valore 3, situato all'incrocio con la colonna 3</li>
            <li>il valore 4, situato all'incrocio con la colonna 4</li>
            <li>il valore 3, per le colonne dalla 5 alla 8;</li>
            <li>il valore 10, in corrispondenza della colonna 10;</li>
            <li>anche per questa riga, nessun valore specificato per le colonne 9 e 11;</li>
        </ul></li>
</ul>

<p>Proseguiamo così per le righe rimanenti e otteniamo la tabella mostrata qui di seguito.</p>

<table class="walk-matrix">
    <tr>
        <th class="gray1"> </th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
    </tr>
    <tr>
        <th>1</th>
        <td class="gray1">1</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td class="gray2">//</td>
        <td>10</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>2</th>
        <td>1</td>
        <td class="gray1">2</td>
        <td>3</td>
        <td>4</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td class="gray2">//</td>
        <td>10</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>3</th>
        <td>2</td>
        <td>2</td>
        <td class="gray1">3</td>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>7</td>
        <td class="gray2">//</td>
        <td>2</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>4</th>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td class="gray1">4</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td class="gray2">//</td>
        <td>2</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>5</th>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td class="gray1">5</td>
        <td>6</td>
        <td>3</td>
        <td>3</td>
        <td class="gray2">//</td>
        <td>3</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>6</th>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td class="gray1">6</td>
        <td>7</td>
        <td>7</td>
        <td class="gray2">//</td>
        <td>3</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>7</th>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td class="gray1">7</td>
        <td>8</td>
        <td class="gray2">//</td>
        <td>3</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>8</th>
        <td>7</td>
        <td>7</td>
        <td>7</td>
        <td>7</td>
        <td>7</td>
        <td>7</td>
        <td>7</td>
        <td class="gray1">8</td>
        <td class="gray2">//</td>
        <td>7</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>9</th>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray1">9</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>10</th>
        <td>1</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td class="gray2">//</td>
        <td class="gray1">10</td>
        <td class="gray2">//</td>
    </tr>
    <tr>
        <th>11</th>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray2">//</td>
        <td class="gray1">11</td>
    </tr>
</table>

## Esercizi

Per comodità, torno a mostrare l'immagine vista poco più su. Facciamo ora un paio di esperimenti come se fossimo noi l'engine di gioco e dovessimo risolvere il problema del _pathfinding_!

![tikal boxes](/assets/images/scumm/tikal-boxes-02.png)

Supponiamo che l'attore Indy si trovi sulla box **1** (Indy->currente box = 1).

Supponiamo di cliccare in corrispondenza della box **4**, la nostra _final destination_ si trova all'interno della box 4 (target box = 4). Come raggiungerla?

Consultiamo la **Walk Matrix** e leggiamo il valore in corrispondenza dell'incrocio riga-colonna 1-4.

Il valore che leggiamo è **2**.

Bene! questo significa che Indy, per riuscire a raggiungere 4 partendo da 1 deve dapprima passare per 2, come per altro ci conferma anche l'immagine qui sopra: la box 1 è affiancata alla 2.

Dopo una breve passeggiata Indy si trova ora sulla box 2 (Indy->currente box = 2).

La box attuale corrisponde alla nostra _target box_? La risposta è no, per cui l'operazione va ripetuta.

Consultiamo di nuovo la **Walk Matrix**, questa volta leggiamo il valore all'incrocio della riga 2 e della colonna 4: il valore letto è 4.

Ancora una volta, interpretare la tabella sottoforma di immagine ci rende pù semplice la comprensione: la box 4 è affiancata alla 2!

Basta un'altra semplice passeggiata per far sì che Indy passi dalla box 2 alla 4 e, infine, raggiunga senza ulteriori sforzi la nostra _final destination_.

Provate ora con un altro esperimento, provate a "cliccare" sulla box **6**. Consultate la tabella, riuscite a ricostruire il ragionamento dell'engine in questo caso?


## Riferimenti

**Books and Papers**

* **[1]** Millington, I., & Funge J. (2009). [Artificial Intelligence for Games](http://ai4g.com/) (2nd ed.). Morgan Kaufmann.

**Links**

* **[a]** ScummVM Forum pathfinding [topic](http://forums.scummvm.org/viewtopic.php?t=4532);
* **[b]** [Go-to statement considered harmful](https://www.cs.utexas.edu/users/EWD/ewd02xx/EWD215.PDF);
* **[c]** da Wikipedia: [Spaghetti Code](https://en.wikipedia.org/wiki/Spaghetti_code), [Programamzione Strutturata](https://en.wikipedia.org/wiki/Structured_programming);
* **[d]** ScummVM, SCUMM technical reference: [Box resources](http://wiki.scummvm.org/index.php/SCUMM/Technical_Reference/Box_resources);
