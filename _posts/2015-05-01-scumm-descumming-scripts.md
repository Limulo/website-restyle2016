---
layout: post
title: descumming-scripts
date: 2015-05-01 09:00:00
excerpt: how to read the scumm scripts
category: [game, scumm]
---

Come fare per ottenere una decompilazione degli script di un gioco Lucas sfruttando gli ScummVM Tools?

Abbiamo già detto che gli script del gioco sono codificati e compattati assieme a molti altri files all'interno di files contenitore più ampi. Estrapolarli può essere un compito assai arduo ma, per fortuna, gli sviluppatori di ScummVM ci forniscono un utile strumento che farà al caso nostro! Questo strumento è integrato direttamente nell'applicativo **scummvm** ed è facilmente accessibile direttamente da linae di comando!

Una volta estratti, questi file saranno illeggibili perchè in formato binario. Occorre allora un secondo strumento che sia in grado di  ottenerene altri corrispondenti, in formato _human-readable_.
Questo secondo strumento è **descumm** e fa parte degli **ScummVM Tools**!

Vediamo il procedimento passo passo:

<div class="note">
<p>Le annotazioni seguenti sono state testate su Mac OS X 10.6.8. I giochi utilizzati come cavie per gli esperimenti sono videogiochi originali, versione per PC.</p>
</div>

## ScummVM da linea di comando
Per usare **ScummVM** da linea di comando e, al tempo stesso sfruttare la sua capacità di estrapolazione degli script, sarà indispensabile specificare alcuni parametri iniziali. Ecco il formato dell'istruzione da impartire a console:

<pre class="code">./scummvm OPTIONS TARGET</pre>

Per _TARGET_ si intende l'identificativo del videogioco che ScummVM deve interpretare, mentre per _OPTIONS_ si intendono una o più opzioni aggiuntive.

Supponiamo di voler esaminare alcuni scripts da **Monkey Island 2** e in particolare quelli tratti dalla room 35 la cascata di Phatt Island al salvataggio 29!

Per specificare che vogliamo caricare questo salvataggio, l'opzione da usare è <span class="code">-x</span> seguito da 29 nel nostro caso;

![Phatt Island Falls]({{ site.baseurl }}/assets/images/scumm/cascata-phatt.png)

L'altra opzione è, chiaramente, quella che attiva l'estrazione degli script. Si usa <span class="code">-u</span>. Importante ricordare che questa estrazione avviene soltanto se nella directory corrente esiste una sotto directory chiamata _dumps_, in caso contrario la creiamo!

<div class="dashed-border" style="padding: 1em;">
<p>Se non si conosce con precisione il nome del <em>TARGET</em> oppure si voglia visualizzare una lista di tutti i salvataggi relativi ad un TARGET specifico, basta avviare il programma con le 2 stringhe seguenti rispettivamente da linea di comando:</p>
<pre class="code">./scummvm -t<br>./scummvm - -list-saves=TARGET</pre>
</div>

<div class="note">
<p><b>CORREGGI l'errore nel codice soprastante anteponendo a copy-protection i due trattini separati</b></p>
</div>

Nel mio caso, il comando completo diventa quindi:

<pre class="code">./scummvm -x 29 -u monkey2-it</pre>

ScummVM si avvia, il gioco parte correttamente caricando il salvataggio specificato. Nel frattempo la cartella _dumps_ comincia a riempirsi di file con estensione **.dmp-**. A questo punto chiudiamo pure ScummVM e concentriamoci sui file contenuti nella cartella.

## descumm tool
Questi files **.dmp** sono i famosi files scritti in binario di cui abbiamo parlato poco più sopra e che, per poter essere letti, devono essere "de-codificati".

Per capire meglio cosa stiamo per fare può essere d'aiuto capire come questi file binari siano stati ottenuti.
Abbiamo più volte ripetuto che il gioco veniva scritto dai programmatori LucasArts facendo uso del linguaggio di scripting SCUMM. Tutti questi script venivano compilati con un apposito compilatore per ottenerne il codice binario (espresso in 0 e 1) corrispondente; questi codici erano successivamente integrati con moltissimi altri dati a formare i files di risorse leggibili dall'interprete ed essere finalmente _giocati_ dall'utente finale.

![Scumm Scripts Compiling]({{ site.baseurl }}/assets/images/scumm/scumm-compiling.png)

Con il passare del tempo e le esigenze tecniche ed artistiche delle nuove avventure grafiche, anche il linguaggio SCUMM evolveva, modificandosi ed ampliandosi di nuove istruzioni e funzionalità. Di pari passo evolveva quindi anche il compilatore il quale ora doveva tradurre in binario set di istruzioni via via differenti rispetto a quelli delle versioni di linguaggio precedenti.

Quello che qui ci accingiamo a fare è il processo inverso: la _de-compilazione_, ricavare cioè, partendo dal file binario, il listato del programma originale scritto in linguaggio SCUMM così come era stato steso dagli stessi programmatori Lucas nel 1991 (Monkey Island 2 è stato rilasciato a Dicembre di quell'anno).

E' qui che entra in gioco **descumm** degli ScummVM-Tools.

![Scumm Scripts De-compiling]({{ site.baseurl }}/assets/images/scumm/scumm-decompiling.png)

Anche per questo tool faremo uso della linea di comando passando lui alcune opzioni.
L'opzione più importante da passare al tool è la **versione** del linguaggio con cui il gioco è stato scritto, infatti è solo conoscendo il set di istruzioni del linguaggio SCUMM usato nello scrivere il listato originale che il de-compilatore **descumm** sarà in grado di tradurre il binario in modo corretto. Ecco perchè i primi tempi ci siamo soffermati su [questi]({% post_url 2015-06-01-scumm-versions %}) concetti.

L'output del comando descumm sarà lo script e verrà mostrato sullo standard output. E' tuttavia possibile reindirizzarlo per ottenere un più pratico file di testo.
La altre opzioni che è possibile specificare riguardano soprattutto la formattazione del codice in output, che noi, per il momento non useremo.

Ecco il comando completo:

<pre class="code">./descumm -5 -x -c INPUTFILE.dmp>OUTPUTFILE.txt</pre>

Come vedete ho aggiunto al comando gli attributi <span class="code">x</span> e <span class="code">c</span> che, rispettivamente, nascondo l'indicazione dell'offset e dell'opcode dall'output per una lettura più facile del codice.

Per avere maggiori informazioni sull'uso di questo tool e per conoscere gli altri attributi che si possono usare, digitate la seguente riga a console:

<pre class="code">./descumm - -help</pre>

<div class="note">
correggi l'errore qui sopra togliendo il doppio trattino.
</div>

## Riferimenti

**Links**

* **[a]** da Wikipedia: [Monkey Island 2](https://en.wikipedia.org/wiki/Monkey_Island_2%3A_LeChuck%27s_Revenge);
* **[b]** la pagina degli [Opcode](http://wiki.scummvm.org/index.php/SCUMM/V5_opcodes) e delle variabili per la versione 5 del linguaggio SCUMM, direttamente dalla _Technical Reference_ del Wiki per ScummVM;
