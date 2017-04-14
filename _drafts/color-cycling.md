---
layout: post
title: Color Cycling
date: 2015-05-01 09:00:00
excerpt: blah blah blah
category: [game, color cycling]
---

Una cosa tira l'altra.

E' capitato che un giorno mi imbattessi nella parola "Color Cycle". Se si fa una veloce ricerca in internet si scopre che per questo termine non c'è moltissimo. La stessa pagina di Wikipedia liquida rapidamente l'argomento rimandando ad un link esterno che suscitò la mia curiosità "Old School Color Cycling with HTML5" [LINK] e qui la prima botta!

Ma facciamo un passo indietro: nel frattempo, seguendo già da qualche giorno un canale di retrogaming-streaming di alcuni amici, avevo immagazzino un altro termine che, come scopriremo più tardi, sarà davvero molto importante: DeluxePaint.

Ora vi invito a soffermarvi su questa immagine, tenetela a mente. (sfondo di monkey island con color Cycling fatto da Mark Ferrari).

Torniamo ora a quel link di Wikipedia. Vengo condotto in una pagina dove si racconta in modo molto chiaro e conciso che cosa sia il Color Cycling.
In pratica scopro che questo era il nome con cui si identificavano quegli effetti visivi tipici dei videogiochi anni '90, che si ottenevano nel modificare la palette dei colori da cui il nome alternativo con cui la tecnica è conosciuta (Palette Shifting).

Ok, prendiamoci una momento per riflettere: abbiamo parlato di videogames anni '90? cavolo, ecco che comincia a salirmi la nostalgia. Su ScummVM ho pronto Indiana Jones and The Fate of Atlantis. Ma sì, rilassiamoci un momento e carichiamo un vecchio salvataggio.

Ecco, il labirinto di Creta, la stanza della cascata! Siamo pronti, ok, parte la fantastica colonna sonora di AUTORE ma aspetta un attimo.
La cascata. La cascata è viva e reale. Sta succedendo qualcosa, vuoi vedere che questo è un Color Cycling?

Ritorno sul browser e continuo a leggere. Sì, come pensavo, quei giochi anni '90 cui si faceva riferimento sono, tra gli altri, anche le avventure della LucasArts. Seconda Botta, più profonda.
Bello questo articolo, chi lo ha scritto? mi segno l'autore. Chi? Joseph Huckaby, ok.

Perso nel flusso di pensiero e ancora un po' intorpidito inciampo sull'hyperlink MARK FERRARI, lo seguo.

Botta numero 3: faccio in fretta ad accorgermi che questo MarkFerrari è un artista fenomenale e ancora più in fretta seguo il link 8bit Game Art [LINK] per rimanere un'altra volta di stucco: una intera galleria di capolavori 640x480 a 256 colori. Queste immagini sono una più bella dell'altra e non so quanto tempo ho perso guardandomele una per una.

E' stato ancora più bello quando ho scoperto quest'altra cosa: dalla galleria di Mark si ritorna diretti al sito di Huckaby per sconvolgersi definitivamente [LINK - http://www.effectgames.com/demos/canvascycle/ ] arriva arriva arriva Botta 4!.

Le immagini di Mark prendono vita incastonate così efficaciemente in una pagina web. Con HTML5 e sfruttando le potenzialità offerte dall'oggetto CANVAS Huckaby ha realizzato una meraviglisa applicazione web ad-hoc, la cui interfaccia permette di cliccare, modificare variabili e soprattutto di capire così intuitivamente quale è il vero cuore pulsante di tutto questo: il Color Cycling.

Ebbene sì l'applicazione di Huckaby non fa altro che simulare, usando le moderne tecnologie del web, quello che avveniva un tempo sui vecchi computer le cui limitazioni tecniche erano spesso aggirate inventandosi nuovi e ingegnosi espedienti.

NOTA STORICA:
E' nel 1992 che Commodore esce con AGA il nuovo chip montato sui nuovi modelli Amiga 1200 e Amiga 4000. Il chip permetteva di utilizzare fino a 256 colori!

Non finisce qui.

Alcuni anni prima, nel 1985 il programmatore Dan Silva realizza per Electronics Arts uno dei software, credo personalmente, più famosi almeno all'epoca per il disegno e l'editing dell'immagine: Deluxe Paint (ecco che ritorna).
Nel 1992 ormai era arrivato alla versione IV ed era diventato lo standard; anche i grafici della LucasArts lo utilizzavano per dipingere i fondali e realizzare ogni elemento grafico per le loro avventure grafiche. Ehi, aspetta anche Mark Ferrari ha fatto parte del team della LucasArts e ha realizzato molti dei fondali per ….. (vedi l'immagine + su) (inserisci screen shot dei titoli di coda del videogioco). Botta 5.

Continuiamo?
Immagini indicizzate [LINK Wiki]. Normalmente si pensa ad una immagine come un contenitore di informazioni sui colori dei vari pixel che la compongono, quindi, come esempio, data una immagine da 320 x 200, e volendo esprimere:
- ogni colore con 1 BYTE (valori da 0-255);
- ogni pixel con 3 BYTE per descrivere i 3 canali colore principali ROSSO, VERDE e BLUE,
otterrei un file dal peso complessivo di 180 KB circa.
320 x 200 x 3

ma se invece di memorizzare i dati relativi ai colori direttamente nel pixel li memorizzassimo altrove? magari in una specie di tavolozza come fanno pittori?!
Al posto di quei dati, al pixel basterebbe contenere l'indice del proprio colore sulla tavolozza. Basta solo 1 BYTE per indicizzare uno dei 256 colori possibili messi a disposizione dalla palette. Ecco che il
Il peso finale del file si riduce a soli 64KB circa.
320 x 200 x 1 + (256 x 3 palette)

Perchè vi annoio con questo?
perchè era proprio con DeluxePaint che i pazzi della Lucas realizzavano le loro grafiche sottoforma di immagini indicizzate + palette dei colori. Volete una prova di questo?

Conoscete ScummVM no? Per ora mi limito a indicarvi il 'chunk' APAL che è proprio il blocco che raccolgie tutte le informazioni in merito alla palette colori all'interno di struttura files di un gioco scritto in SCUMM [ http://wiki.scummvm.org/index.php/SCUMM/Technical_Reference/SCUMM_6_resource_files#3.1_Structure ] .

Purtroppo DeluxePaint può esportare immgini soltanto in formato ILBM[LINK Wiki], un formato ormai desueto, sottotipo dell'IFF, introdotto dalla Electronics Arts durante lo sviluppo di DP; lo stesso Huckaby per poter mostrare a schermo le immagini di Mark Ferrari ha docuto realizzare un convertitore apposito (il codice sorgente è disponibile da [QUI]).

Ho recuperato alcuni installer del programma DeluxePaint è li ho caricati su DosBox per provarlo. Ecco qui il risultato!

[ VIDEO con DELUXE PAINT ]

Come vedete DeluxePaint mette a disposizione degli strumenti appositi per creare una serie di range di colori. Questi Range di colore sono utilissimi per realizzare i gradienti e i nostri amati Color Cycle come recita il manuale del software [LINK per scaricare il manuale .pdf].

Il formato proprietario che DP usava per salvare il file permetteva di memorizzare alcuni particolari 'chunk' non standard (CRNG e CCRT [Wiki]) che raccoglievano le informazioni come:
- rate: velocità con cui i colori del range in esame ciclavano;
- flags: rotazione colori in un senso o nel senso opposto
- low: l'indice del primo colore della palette appartenente a questo range;
- high: l'indice dell'ultimo colore del range.

Ho cercato invano di trovare un software che come DeluxePaint permetta di settare informazioni come quelle appena viste.
Ho provato ASEPRITE, una utility molto interessante legata alla libreria Allegro[LINK];
- ASEPRITE
- GRAPH2X
-


http://www.aaronbell.com/secret-colours-of-the-commodore-64/
