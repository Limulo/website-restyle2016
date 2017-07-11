---
layout: post
title: Debug
date: 2015-05-01 09:00:00
excerpt: SCUMM & ScummVM Debugging
category: [game, scumm]
---

Come si può leggere nel WiKi del progetto ScummVM **[a]** e **[b]**, i giochi della LucasArts possiedono delle password e delle combinazioni di tasti per effettuare il controllo degli errori all'interno del gioco.<br>Questo tipo di _debug_ viene escluso dal sistema ScummVM: queste combinazioni e password non funzionano se il gioco è giocato al suo interno, tuttavia è ancora possibile vederle in azione se si fa uso degli eseguibili Dos originali (ad esempio tramite DOSBox).

ìPer il gioco **Indiana Jones and the Fate of Atlantis** ad esempio, occorre inserire prima di tutto una password (**debug pasword**) alla quale viene fatta seguire una prima combinazione di tasti (**activation key**), per attivare la modalità di _debug_ e poi una seconda combinazione, per effettuare il controllo o la modifica del comportamento del gioco.

Sul WiKi **[b]** sono riportate tutte le informazioni relative alle modalità di debug per i vari giochi LucasArts. In questo articolo ci concentreremo sul mio favorito 'Indiana Jones And the Fate of Atlantis'.

La password deve essere inserita esattamente così com'è, a seguire, una combinazione di attivazione va fatta seguire per entrare a tutti gli effetti nella modalità debug!

<div class="dashed-border" style="padding: 1em;">

<p><b>Debug Password</b>: shinymetal</p>
<p><b>Activation Key</b>: <b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="Shift" src="http://127.0.0.1/limulo.net/images/scumm/shift.jpg"> + <img alt="D" src="{{ site.baseurl }}/assets/images/scumm/D.jpg"></b></p>
<p><b>Keys</b></p>
<ul>
    <li><b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="E" src="http://127.0.0.1/limulo.net/images/scumm/E.jpg"> =</b> Set variable ;</li>
    <li><b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="F" src="http://127.0.0.1/limulo.net/images/scumm/F.jpg"> =</b> Fast mode ;</li>
    <li><b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="G" src="http://127.0.0.1/limulo.net/images/scumm/G.jpg"> =</b> Goto room ;</li>
    <li><b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="O" src="http://127.0.0.1/limulo.net/images/scumm/O.jpg"> =</b> Pick up object in room x ;</li>
    <li><b><img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="L" src="http://127.0.0.1/limulo.net/images/scumm/L.jpg"> =</b> Enter a bootparam ;</li>
</ul>
</div>

<p>La console di ScummVM si abilita tramite la combinazione di tasti <img alt="Ctrl" src="{{ site.baseurl }}/assets/images/scumm/Ctrl.jpg"> + <img alt="D" src="{{ site.baseurl }}/assets/images/scumm/D.jpg"> . <br>Si tratta di una console interattiva che permette di controllare e manipolare i dati utilizzati dall'engine di gioco in tempo reale. Molto utile per fare debug ed esperimenti vari!</p>

<p>Dall'esperienza personale posso dire che talvolta la manipolazione di questi dati può comportare il crash della macchina virtuale! Usate questi comandi a vostro rischio e pericolo :)!</p>

<h3>Comandi di Default</h3>

<p>I comandi di default che la console fornisce sono (per l'interprete ScummVM v. 1.7):</p>
<ul>
    <li><b>help</b> : Display the list of available commands;</li>
    <li><b>exit</b> : Exit the debug console;</li>
    <li><b>debugflag_list</b> : list the available debug flags and their status;</li>
    <li><b>debugflag_enable &lt;debugflag></b> : enable a given debugflag;</li>
    <li><b>debugflag_disable &lt;debugflag></b> : disable a given debugflag;</li>
</ul>

<p>Questi comandi sono poi estesi con ulteriori comandi dipendenti dall'engine del gioco specifico che con cui si sta giocando.</p>

<h3>Comandi Specifici</h3>

<p>Utilizzando L'interprete ScummVM ver. 1.7 e giocando a Indiana Jones and the Fate of Atlantis ver 1.0, ecco quali sono i comandi (come vedere la versione dell'engine o del videogioco? ecco il <a href="#ver">post</a> dedicato !):</p>

<table class="dati">
  <tr><td>actor</td>		<td>hide</td>		<td>objects</td>	<td>savegame</td>	</tr>
  <tr><td>actors</td>		<td>importres</td>	<td>openlog</td>	<td>src</td>		</tr>
<tr><td>box</td>		<td>imuse</td>		<td>quit</td>		<td>script</td>		</tr>
<tr><td>camera</td>		<td>loadgame</td>	<td>resetcursor</td><td>scripts</td>	</tr>
<tr><td>continue</td> 	<td>matrix</td>		<td>restart</td>	<td>show</td>		</tr>
<tr><td>debuglevel</td> <td>object</td>		<td>room</td>		<td> </td>			</tr>
</table>

<p>le variabili sono invece</p>
<ul>
<li>debug_countdown</li>
<li>scumm_speed</li>
<li>scumm_room</li>
<li>scumm_roomresource</li>
<li>scumm_vars</li>
</ul>
<p>(vedremo poi quale sia il loro utilizzo)</p>

<h3>Riferimenti</h3>

<p><b>Links</b></p>
<ul>
    <li><b>[a]</b> <a class="ext" href="http://wiki.scummvm.org/index.php/SCUMM/Debug_Codes" target="_blank">SCUMM Debug Codes</a>;</li>
<li><b>[b]</b> <a class="ext" href="http://wiki.scummvm.org/index.php/Debugging_ScummVM" target="_blank">Debugging ScummVM</a>;</li>
</ul>


<h3>ANALISI DEI COMANDI di DEBUG per l' ENGINE</h3>

<div>
<h3>ACTOR</h3>
<p><b>Syntax</b>:</p>
<p class="code">actor &lt;actornum> &lt;command> &lt;parameter></p>
<p><b>Description</b>:</p>
<p>modifica il comportamento di un attore. Utilizza un valore molto alto per "actornum" così da ottenere un warning che indica il numero massimo di attori disponibili</p>
<p><b>Comandi</b>:</p>
<ul>
<li>"animvar" - ???</li>
<li>"anim" - ???</li>
<li>"ignoreboxes" - permette all'attore di ignorare le costrizioni dettate dalle walk boxes e camminare a piacimento ovunque.</li>
<li>"x" - impostare la posizione x</li>
<li>"y" - impostare la posizione y</li>
<li>"_elevation" - impostare il valore di elevazione</li>
<li>"costume" - settare una apparenza grafica differente per l'attore (utilizza un valore alto per mostrare il numero di costumes available)</li>
<li>"name" - per mostrare il nome dell'attore</li>
<li>"condmask" - ???</li>
</ul>
<p><b>Esempio</b>:</p>
<ul>
<li class="code">actor 1 costume 3</li>
<li class="code">actor 1 ignoreboxes 1/0</li>
</ul>
</div>		


<div>
<h3>ACTORS</h3>
<p><b>Syntax</b>:</p>
<p class="code">actors</p>
<p><b>Description</b>:</p>
<p>mostra una tabella che riporta tutte le informazioni relative a tutti gli attore presenti sulla scena.<br>
TODO : riporta un esempio di tabella e spiega quali siano i significati per ogni grandezza e variabile riportata.</p>
</div>

<div>
<h3>ROOM</h3>
<p><b>Syntax</b>:</p>
<p class="code">room<br>
room &lt;roomnum></p>
<p><b>Description</b>:</p>
<p>Mostra il numero identificativo della room corrente. Se si specifica un valore numerico subito dopo il comando 'room', è possibile cambiare room istantaneamente nonappena si ritorna al gioco.</p>
</div>


<div>
<h3>SCRIPTS</h3>
<p><b>Syntax</b>:</p>
<p>scripts</p>
<p><b>Description</b>:</p>
<p>Mostra la lista degli script e relativi dati per la room corrente.</p>
</div>

<div>
<h3>SCRIPT</h3>
<p><b>Syntax</b>:</p>
<p class="code">script &lt;scriptnum> &lt;command></p>
<p><b>Description</b>:</p>
<p>il comando permette di agire sull'esecuzione degli script della room. I comandi che possono essere usati sono kill/stop oppure run/start.</p>
</div>


<div>
<h3>DEBUG</h3>
<p><b>Syntax</b>:</p>
TODO: riordinare le cose che scrivo
usa DEBUG per vedere quali siano i flag disponibili per subire il debug.
apri la console per permettere visualizzare output del debugger.
indica quale canale di debugger preferisci analizzare attraverso l'uso del comando DEBUGFLAG_ENABLE o DEBUGFLAG_DISABLE
<p><b>Description</b>:</p>
</div>


<div>
<h3>DEBUGLEVEL</h3>
<p><b>Syntax</b>:</p>
<p class="code">debuglevel &lt;level></p>
<p><b>Description</b>:</p>
<p>specificando un livello di debug compreso tra 0 e 10 per ricevere debug in uscita<br>
specifica un livello -1 per annullare il debug.</p>
</div>		


<div>
<h3>OBJECT</h3>
<p><b>Syntax</b>:</p>
<p class="code">object &lt;objectnum> &lt;command> &lt;parameter></p>
<p><b>Description</b>:</p>
<p>i comandi possono essere 'pickup', 'state' oppure 'name'.<p>
<pre>
"pickup" BUG?
00497         if (argc == 3)
00498             _vm->addObjectToInventory(obj, _vm->_currentRoom);
00499         else
00500             _vm->addObjectToInventory(obj, atoi(argv[3]));
</pre>
</div>

<div>
<h3>OBJECTS</h3>
<p><b>Syntax</b>:</p>
<p class="code">objects</p>
<p><b>Description</b>:</p>
<p>mostra i dati degli oggetti presenti nella room corrente.</p>
</div>

<div>
<h3>CAMERA</h3>
<p><b>Syntax</b>:</p>
<p class="code">camera</p>
<p><b>Description</b>:</p>
<p>Mostra i dati relativi alla camera nel formato "cur (%d,%d) - dest (%d,%d) - accel (%d,%d) - last (%d,%d)"</p>
</div>

<div>
<h3>SRC</h3>
<p>???</p>
</div>

<div>
<h3>IMPORTRES</h3>
<p><b>Syntax</b>:</p>
<p class="code">importres &lt;restype> &lt;filename> &lt;resnum></p><p>??????</p>
        <p>"scr" ???</p>
        <p><b>Description</b>:</p>
<p>drafts Command only works with Loom/LoomCD</p>
</div>

<div>
<h3>LOADGAME</h3>
<p><b>Syntax</b>:</p>
<p class="code">loadgame &lt;slotnum></p>
<p><b>Description</b>:</p>
<p>???</p>
</div>

<div>
<h3>SAVEGAME</h3>
<p><b>Syntax</b>:</p>
<p class="code">savegame &lt;slotnum></p>
<p><b>Description</b>:</p>
<p>???</p>		
</div>

<div>
<h3>SHOW</h3>
<p><b>Syntax</b>:</p>
<p class="code">???</p>
   	<p>"hex" ,  "sta" (for STACK dumping) ???</p>
<p><b>Description</b>:</p>
<p>???</p>
</div>

<div>
<h3>HIDE</h3>
<p><b>Syntax</b>:</p>
<p class="code">???</p>
<p>"hex" ,  "sta" (for STACK dumping) ???</p>
<p><b>Description</b>:</p>
<p>???</p>
</div>

<div>
<h3>IMUSE</h3>
<p><b>Syntax</b>:</p>
<p class="code">???</p>
<p>"panic" - Stop all music tracks, "play" &lt;number|"random">, "stop" &lt;number|"all"></p>
<p><b>Description</b>:</p>
<p>???</p>
</div>

<footer>
<div class="firma">http://www.limulo.net</div>
<a class="top" href="#indice">torna all'indice</a>
</footer>
</article>  
