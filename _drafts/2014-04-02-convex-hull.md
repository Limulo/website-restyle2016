---
layout: post
title: Convex Hull & Graham Algorithm
date: 2014-04-02 09:30:00
excerpt: Trying to smooth values from analog sensors
category: [coding, math]
usemath: true
---

E' da un po' che volevamo lavorare con la [Delaunay Triangulation](http://en.wikipedia.org/wiki/Delaunay_triangulation) e con il duale [Voronoi Diagram](http://it.wikipedia.org/wiki/Diagramma_di_Voronoi).

Prima di poter arrivare a studiare come sia possibile realizzare uno sketch che usi queste tecniche di frammentazione dello spazio occorre dapprima comprendere come sia possibile risolvere il problema del [Convex Hull](http://en.wikipedia.org/wiki/Convex_hull).

<iframe src="http://www.youtube.com/embed/Pc1Wzi2h8aA" height="100%" width="500" allowfullscreen="" ></iframe>

Supponiamo di avere un numero arbitrario di punti nello spazio (nel nostro caso lo spazio è bidimensionale ma il ragionamento è applicabile anche alle 3 dimensioni). Dato questo insieme di punti vogliamo capire come sia possibile costruire il poligono convesso di area più piccola possibile che contenga tutti i punti dati.

Il problema è molto interessante ed esistono diversi [algoritmi](http://en.wikipedia.org/wiki/Convex_hull_algorithms) che si prestano a risolverlo con i rispettivi gradi di complessità.

Abbiamo deciso di cimentarci nell'implementazione dell'algoritmo di Graham utilizzando il linguaggio di programmazione Processing.

L' **algoritmo di Graham** prende il nome dal suo scopritore Ronald Graham, che lo pubblico' nel 1972.

Per capire come funziona l'algoritmo vi rimandiamo a questo [link](http://en.wikipedia.org/wiki/Graham_scan). Di seguito vi proponiamo una veloce analisi dei principali elementi della nostra implementazione:


1. tra tutti i punti identifichiamo il punto che si trova il più in alto a sinistra (in Processing tale punto è quello che ha minime le coordinate x e y). Lo chiameremo P0;
2. tracciando una retta orizzontale passante per P0, assegno a tutti gli altri punti un valore di un angolo che è quello formato tra la retta orizzontale e la retta passante per P0 e il punto in esame;
3. una volta trovati tutti gli angoli, ordino i punti per angolo crescente (abbiamo utilizzato l'algoritmo di 'merge sort');
4. tra tutti i punti tengo in considerazione soltanto i punti che non siano tra loro allineati (hanno lo stesso angolo) o coincidenti (stesso angolo e coordinate x e y). Dei punti allienati tengo in considerazione soltanto i quelli più distanti da P0;
5. Per ogni punto si determina se questo si trovi dallo stesso lato o dal lato opposto di P0 rispetto alla retta passante per i 2 punti precendenti. E' grazie a questo che sappiamo se il punto si trova sul contorno del poligono convesso o meno.

### Downloads

Dalla pagina del progetto su GitHub è possibile scaricare i codici sorgente per lo sketch di Processing che implementa l'algoritmo di Graham per il calcolo del poligono convesso. Ecco il [link](https://github.com/ariutti/Convex_Hull). Buon divertimento!
