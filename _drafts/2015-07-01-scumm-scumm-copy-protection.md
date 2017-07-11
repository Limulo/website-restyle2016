---
layout: post
title: Savegame & Copy Protection Interface
date: 2015-07-01 09:00:00
excerpt: ovvero primordiali sistemi di protezione dalla copia!
category: [game, scumm]
---

All'epoca, io e mio fratello eravamo alle prese con **Indiana Jones and the Fate of Atlantis**, stavamo giocando con il percorso che, inconsapevolmente, credevamo essere l'unico possibile: il **Percorso Squadra**.

In seguito un nostro amichetto ci aprì gli occhi sulla verità: avevamo appena scoperto l'esistenza di ben altri 2 modi diversi di giocare la stessa avventura, uno in cui farsi largo con la forza bruta sfidando i cattivi a suon di pugni, l'altro più macchinoso in cui gli enigmi erano ancora più difficili. Si trattava rispettivamente del percorso **Pugni** e del percorso **Ingegno**.

La cosa che ci saltò all'occhio immediatamente era che il nostro amichetto, in quel momento stava esplorando luoghi di cui mio fratello ed io non sapevamo nemmeno l'esistenza: "Come ci sei riuscito?"

D'altronde saremmo stati benissimo in grado di scoprirlo anche noi, con le nostre sole forze: c'erano le riviste specializzate, ma noi non le compravamo e di sicuro non le leggevamo.

A dire il vero avevamo a disposizione anche una vecchia copia interamente fotocopiata del manuale di gioco che era però in inglese e figuriamoci...

Forse un indizio dal quale avremmo potuto capire era quella immagine proprio tra le prime pagine del manuale...

![boat image]({{ site.baseurl }}/assets/images/scumm/boat-image.jpg)

Una barca? ma quando? dove?

Cosa curiosa è che, se avessimo letto quel manuale però, oltre a scoprire l'esistenza di più percorsi di gioco, avremmo certo risparmiato una nottata insonne a nostro padre!

Ricordo distintamente un episodio in cui lui ci chiamò, era tardi ed era ormai ora di andare a letto. Io e mio fratello avevamo impiegato l'intera giornata, come oramai facevamo da settimane durante quell'estate, per progredire più che potevamo con l'avvetura di Indy.

Eravamo affranti dal fatto che, se non ce l'avessimo fatta, saremmo poi stati costretti a ricominciare tutto da capo l'indomani, ben sapendo che spegnere il PC per andare a letto, significava perdere tutti i progressi fatti fino a quel momento. Nella nostrà ingenuità ignoravamo assolutamente l'esistenza dei **Salvataggi**.

Fu nostro padre che nel vederci così disperati, mosso a compassione, spento il computer e messici a letto, decise di prendere quel manuale e cominciare a sfogliarlo.

Io non so che sforzo indicibile possa essere stato per lui, decisamente avverso alla tecnologia, allora come oggi, affrontare quel manuale, in inglese, durante la notte e leggere di requisiti di sistema, di installazioni, percorsi, controlli e altre stramberie senza senso...

Fatto sta che lo fece: l'indomani a pranzo ci svelò una più grande verità: l'esistenza di un modo per _salvare_ i propri progressi aprendoci un mondo di nuove possibilità, fu allora che mio fratello ed io scoprimmo i **Salvataggi**!!!

![combinazioni]({{ site.baseurl }}/assets/images/scumm/combinazioni.png)

Rimembranze a parte, qualche tempo fa mi sono tornati alla mente altri particolari. Forse non sono l'unico ad essermi chiesto "ma che fine hanno fatto gli enigmi iniziali? Quelli che eri obbligato a superare ancor prima di cominciare a giocare sul serio?"

Forse alcuni di voi si ricorderanno di immagini come queste:

<table style="width: 100%;">  
<tr>
  <td>
    <img src="{{ site.baseurl }}/assets/images/scumm/copy-protection-indy-2.png" alt="Indy Copy Protection"/>
  </td>
  <td>
    <img src="{{ site.baseurl }}/assets/images/scumm/copy-protection-monkey2-2.png" alt="Monkey 2 Copy Protection" />
  </td>
</tr>
<tr>
  <td>
    <img src="{{ site.baseurl }}/assets/images/scumm/copy-protection-monkey.png" alt="Monkey Copy Protection" />
  </td>
  <td>
    <img src="{{ site.baseurl }}/assets/images/scumm/copy-protection-samnmax.png" alt="Sam and Max Copy Protection" />
  </td>
</tr>
</table>

E' interessante ricordare come questi sistemi fossero i primissimi tentativi ci controllo della copia.

All'epoca, per le case produttrici di software, non vi era praticamente nessun metodo che potesse impedire la copia: se qualcuno voleva passare il videogioco ad un amico, gli copiava i _floppini_; nulla di più semplice.

Tuttavia si poteva cercare di limitare questa tendenza applicando due principali strategie:

<ul>
    <li>rendere il gioco qualcosa di unico e di desiderabile! Ecco allora le scatole decorate, che al loro interno contenevano i cosiddetti <em>feelies</em> <b>[a]</b> magari: accessori fisici come ad esempio mappe, cartoline, stampe, piccoli pupazzetti e soprammobili, etc...;</li>
    <li>legare il software a qualche altro oggetto che da un lato contenesse un indizio fondamentale per il completamento del gioco e dall'altro, la cui copia non sarebbe stata altrettanto agevole da parte dell'utente finale.</li>
</ul>

Alcuni dei sistemi più usati nei videogiochi degli anni '80 e '90 era quello di inserire indizi chiave all'interno del manuale di gioco, magari in codice oppure nascosti tra le righe stampate in colori diversi, leggibili soltanto con speciali lenti colorate, oppure usare le simpatiche _Code wheel_: _Dial-A-Pirate_ **[b]** per Monkey Island 1, solo per citarne una tra le più famose...

Con l'andare del tempo questo sistema venne poco a poco abbandonato a causa degli alti costi di produzione e del progressivo diffondersi delle informazioni attraverso i sempre più comuni _forums_.

### Copy Protection via ScummVM

Quando rigiochiamo ad uno di questi vecchi giochi su ScummVM, il software ignora questa sezione di _copy protection_ se presente. E' comunque possibile attivarla utilizzando un parametro passato da console!

Infatti, se usiamo ScummVM avviandolo da console, è possibile impartire determinati comandi per eseguire operazioni di diverso tipo. Una di queste è proprio quella di attivare la sezione _copy-protection_ per un particolare gioco.

Il comando da impartire è quello mostrato qui di seguito:

<pre class="code">./scummvm --copy-protection TARGET</pre>

dove per <span class="code">TARGET</span> si intende l'identificativo che ScummVM associa al gioco.

---

Per conoscere tutti i nomi <span class="code">TARGET</span> dei giochi che avete aggiunto a ScummVM, usate il seguente comando da console:
<pre class="code">./scummvm -t</pre>

---

Come esempio quindi, ecco che se volessi riattivare la copy protection per Indiana Jones and The Fate of Atlantis via ScummVM (che ha come nome <span class="code">TARGET</span>: <em>atlantis-it</em>), devo usare il seguente comando da console:
<pre class="code">./scummvm --copy-protection atlantis-it</pre>

Ho notato che il comando non funziona per tutti i giochi.

Questo è probabilmente imputabile al fatto che il codice necessario per il funzionamento della _copy-protection_ non venne originariamente implementato in alcune versioni.

Un esempio è Monkey Island versione CD: forse per l'epoca l'impossibilità di masterizzare il supporto già costituiva in sè un deterrente piuttosto efficace, senza doversi accanire ulteriormente con la _copy-protection_ software!

Per maggiori informazioni sull'uso di ScummVM via terminale usate quest'altro comando per accedere alla sezione HELP:
<pre class="code">./scummvm -h</pre>
In alternativa potete consultare la pagina Wiki del progetto ScummVM dedicata **[c]**.

## Riferimenti

**Links**

* **[a]** da Wikipedia: [feelie](https://en.wikipedia.org/wiki/Feelie);
* **[b]** Online interactive version of The Secret of Monkey Island "[Dial-A-Pirate](http://www.oldgames.sk/docs/Dial-A-Pirate/) wheel;
* **[c]** ScummVM [Wiki](http://wiki.scummvm.org/index.php/User_Manual/Appendix:_Command_line_options);
* Un [articolo](http://gameological.com/2013/05/inventory-9-games-with-creative-drm-copy-protection/) carino sui vecchi sistemi di copy protection.
