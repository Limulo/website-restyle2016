---
layout: post
title: Tools
date: 2015-05-01 09:00:00
excerpt: to create
category: [game, scumm]
---

Come gli stessi creatori del sistema SCUMM hanno raccontato (vedi **[a]** e **[b]**), il sistema **SCUMM** era molto più che un linguaggio di scripting, una modalità di codifica e di un interprete. Il sistema SCUMM in realtà comprendeva anche una serie di altri tools appositamente progettati per facilitare il lavoro degli sviluppatori e anche quello degli artisti, il cui compito era quello di preparare i vari assets dei giochi.

Scherzosamente gli sviluppatori Lucas avevano deciso di assegnare ad ognuno di questi tools nomi corrispondenti ad un ben preciso fuido corporeo!
Ed è così che si potevano vedere in funzione applicativi come MMUCUS, SPIT, FLEM, BYLE, CYST...

## SPIT
SPIT era un semplice editor di font che permetteva di creare diversi formati di testo per le varie sezioni dell'interfaccia come ad esempio:
* Il font per i dialoghi mostrati nella parte superiore delo schermo;
* Il font usato per mostrare il testo della schermata d'interfaccia per i salvataggi e i caricamenti;
* Un altro font ancora per la parte bassa dell'interfaccia, quella che mostra i _verbs_;

## FLEM

Si trattava di un tool grafico, utilizzato per gestire le _rooms_.

Con questo tools, a partire da una immagine che mostrava una grafica di background, era possibile delineare le sagome degli oggetti interattivi all'interno della _room_, indicare i loro differenti stati (ad esempio Aperta o Chiusa nel caso l'oggetto fosse stato una porta), e anche costruire le _walk-boxes_.

FLEM permetteva inoltre di avere un veloce preview dei cosiddetti _clipping-planes_, altrimenti detti _z-planes_ (che analizzeremo in dettaglio in un futuro articolo).

## MMUCUS

Funzionava in congiunzione con FLEM e, a partire dall'immagine della room e dagli object data, i clipping-planes e le walk-boxes, arrivava ad ottenere in uscita un file room compresso contenente tutte queste informazioni. Ho letto inoltre che MMUCUS si occupava anche di ottenere in uscita i files .LFL quando il gioco finale veniva compilato (tutti i byte venivano XOR-ati con 0x69 per impedire una eventuale tentativo di crack!). Ron Gilbert aggiunge questi particolari alla descrizione di MMUCUS in un post **[d]** sul diario di lavorazione i _Timbleweed Park_, un nuovo progetto su cui sta lavorando assieme al suo vecchio collega Gary Winnick.

## Byle e CYST

## Altri

Altri tools, non nominati da Ron in quella occasione ma che so essere utilizzati sono:
* iMuse: ;
* INSANE: ;

vedi qui e qui
* http://grumpygamer.com/
* http://blog.thimbleweedpark.com/archives


## Riferimenti

**Links**

* **[a]** **Ron Gilbert**'s [talk](https://www.youtube.com/watch?v=RjA6GJfCDpY&t=6m24s) in occasione del PAX 2009;
* **[b]** [Articolo](http://www.gamasutra.com/view/feature/196009/the_scumm_diary_stories_behind_.php?print=1) su Gamasutra: "**The SCUMM Diary: Stories behind one of the greatest game engines ever made**" by **Mike Bevan**;
* **[c]** [Qui](http://wiki.scummvm.org/index.php/SCUMM#Subsystems_of_SCUMM) ne parla il Wiki del progetto ScummVM;
* **[d]** Timbleweed Park Dev. Diary: **The Big Decision** [post](http://blog.thimbleweedpark.com/tool_names);
