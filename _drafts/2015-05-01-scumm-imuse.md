---
layout: post
title: iMuse
date: 2015-05-01 09:00:00
excerpt: interactive music
category: [game, scumm]
---

No, non si tratta di un nuovo prodotto Apple! **iMUSE** sta per <b>I</b>nteractive <b>MU</b>sic <b>S</b>treaming <b>E</b>ngine ed è un motore integrato all'interno dell'engine SCUMM (a partire dalla versione 5) per occuparsi della gestione delle risorse audio per la colonna sonora delle avventure grafiche LucasArts.

L'obiettivo è permeare l'intera avventura grafica con una colonna sonora persistente e sempre in linea con i momenti emozionali della storia che, non potendo essere previsti o prefissati, deve essere pronta ad adattarsi dinamicamente all'impronta interattiva del gioco.

**iMuse** venne sviluppata da Micheal land a seguito della sua frustrazione legata al precedente sistema audio in uso presso la LucasFilm Games. All'epoca Land stava lavorando al progetto The Secret of Monkey Island e la sua frustrazione nasceva dal fatto che, giocandoci, non si riusciva ad avere l'impressione di una colonna sonora ben integrata nelle dinamiche del gioco. Spessi erano i momenti in cui, nei passaggi tra una room e l'altra o tra 2 situazioni emotive diametralmente opposte, la musica, anzichè seguire l'andamento della storioa in un cuntinuum coerente, fosse soltanto un brusco passaggio tra due tracce audio completamente discordi tra loro.

iMUSE was developed out of Michael Land's frustration for the audio system used by LucasArts while composing The Secret of Monkey Island. His goal was to create a system which would enable the composer to set the mood via music according to the events of the game. The project was much more daring than he had imagined. He then brought in an old friend, Peter McConnell, to collaborate on creating the system which they later patented together.[4] The first game to use the iMUSE system was Monkey Island 2: LeChuck's Revenge,[5] and it has been used in all LucasArts adventure games since.[6] It has also been used for some non-adventure LucasArts titles such as the DOS version of Star Wars: TIE Fighter.[7]

Il sistema iMuse contiene diverse componenti software. Abbiamo una prima parte che è il database, ovvero la raccolta di tutti dati MIDI delle musiche e talvolta anche degli effetti sonori che debbano essere riprodotti dirante il gioco. Queste sequenze musicali contengono al loro interno dei cosidetti _punti decisionali_, dei marker in buona sostanza che indicano dove possano avvenire eventuali cambiamenti su base delle condizioni di gioco in tempo reale.

Le azioni includono:
* la possibilità attivare o _mute_-are (o eventualmente regolare il volume) di uno o più parti strumentali.
* la trasposizione di alcune parti musicali;
* change instrument selection;
* saltare ad altre sezioni;
* mettere in loop una o più sequenze;
* ritardare l'esecuzione di una sequenza;
* effettuare il _detuning_ di uno strumento;
* fare il _pan_ ning;
* alterare la velocità di un suono;
* e così via...

Quando il driver sonoro raggiunge il _punto decisionale_, procede a valutare la condizione che è stata impostata, e determina l'azione appropriata.

brevetto iMuse

che cosa fa?

Si può apprezzare meglio ad esempio in Monkey Island 2, forse perchè il ritmo e il genere è più o meno lo stesso, coerente dall'inizio alal fine del gioco

esempio degli strumenti che entrano, uno dopo l'altro in sequenza mano a mano che ci si addentra nella palude di woodoo lady

oppure le sequenza di ingresso o di fine

Fate of atlantis: menzione speciale per musiche lunghe ed interessanti, non stancano!

Altre Idee

ci furono 4 giochi adventure significativi basati sul MIDI 16-bit iMuse:

* The Secret of Monkey Island 2:LeChuck's Revenge (1991)
* Sam & Max Hit The Road (1993)
* Indiana Jones and the Fate of Atlantis (1992)
* The Day of The Tentacle (1993)
Tutti i giochisono stati co-composti da Clint Bajakian, Peter McConnell e Micheal Land, i creatori del sistema iMuse.

Una colonna sonora che comincia all'inizio del gioco e termina alla fine.

La musica non poteva rispondere intelligentemente agli eventi del gioco, e il risultato era, tipicamente, transizioni abbastanza jarring(?) tra sequenze musicali nel gioco (HARD CUTS).

## Riferimenti

**Books and Papers**

* **[1]** Collins, K. (2008). [Game Sound](http://mitpress.mit.edu/books/game-sound). The MIT Press.;

**links**

* **[a]** [link](http://patentimages.storage.googleapis.com/pdfs/US5315057.pdf) al brevetto iMuse, Patent US5315057, May 24, 1994;
* **[b]** da Wikipedia: [iMuse](https://en.wikipedia.org/wiki/IMUSE);
