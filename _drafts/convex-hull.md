<!-- ARTICOLO -->
<article style="clear: both;">
<header>
<a id="convex-hull"></a>
<h2>Convex Hull - Graham Algorithm</h2>
</header>

<p>E' da un po' che volevamo lavorare con la <a class="ext" title="Dalaunay Triangulation" href="http://en.wikipedia.org/wiki/Delaunay_triangulation" target="_blank">triangolazione Delaunay</a> e con il duale <a class="ext" title="Voronoi Diagram" href="http://it.wikipedia.org/wiki/Diagramma_di_Voronoi" target="_blank">diagramma di Voronoi</a> .</p>

<p>Prima di poter arrivare a studiare come sia possibile realizzare uno sketch che usi queste tecniche di frammentazione dello spazio occorre dapprima comprendere come sia possibile risolvere il problema del <a class="ext" title="Convex Hull" href="http://en.wikipedia.org/wiki/Convex_hull" target="_blank">Poligono Convesso</a> (Convex Hull).</p>

<div class="img">
<iframe src="http://www.youtube.com/embed/Pc1Wzi2h8aA" height="375" width="500" allowfullscreen="" ></iframe>
</div>

<p>Supponiamo di avere un numero arbitrario di punti nello spazio (nel nostro caso lo spazio è bidimensionale ma il ragionamento è applicabile anche alle 3 dimensioni). Dato questo insieme di punti vogliamo capire come sia possibile costruire il poligono convesso di area più piccola possibile che contenga tutti i punti dati.</p>

<p>Il problema è molto interessante ed esistono diversi <a class="ext" title="Convex Hull Algorithms" href="http://en.wikipedia.org/wiki/Convex_hull_algorithms" target="_blank">algoritmi</a> che si prestano a risolverlo con i rispettivi gradi di complessità.</p>

<p>Abbiamo deciso di cimentarci nell'implementazione dell'algoritmo di Graham utilizzando il linguaggio di programmazione Processing.</p>

<p>L'algoritmo di Graham prende il nome dal suo scopritore Ronald Graham, che lo pubblico' nel 1972.</p>

<p>Per capire come funziona l'algoritmo vi rimandiamo a questo <a class="ext" title="Graham Algorithm" href="http://en.wikipedia.org/wiki/Graham_scan" target="_blank">link</a>. Di seguito vi proponiamo una veloce analisi dei principali elementi della nostra implementazione:</p>
<ul style="list-style: none; margin: 0px; padding: 0px;">
<li>1) tra tutti i punti identifichiamo il punto che si trova il più in alto a sinistra (in Processing tale punto è quello che ha minime le coordinate x e y). Lo chiameremo P0;</li>
<li>2) tracciando una retta orizzontale passante per P0, assegno a tutti gli altri punti un valore di un angolo che è quello formato tra la retta orizzontale e la retta passante per P0 e il punto in esame;</li>
<li>3) una volta trovati tutti gli angoli, ordino i punti per angolo crescente (abbiamo utilizzato l'algoritmo di 'merge sort');
<li>4) tra tutti i punti tengo in considerazione soltanto i punti che non siano tra loro allineati (hanno lo stesso angolo) o coincidenti (stesso angolo e coordinate x e y). Dei punti allienati tengo in considerazione soltanto i quelli più distanti da P0;</li>
<li>5) Per ogni punto si determina se questo si trovi dallo stesso lato o dal lato opposto di P0 rispetto alla retta passante per i 2 punti precendenti. E' grazie a questo che sappiamo se il punto si trova sul contorno del poligono convesso o meno.</li>
</ul>

<h4>DOWNLOADS</h4>
<p>Dalla pagina del progetto su GitHub è possibile scaricare i codici sorgente per lo sketch di Processing che implementa l'algoritmo di Graham per il calcolo del poligono convesso. Ecco il <a onclick="javascript:_paq.push(['trackEvent', 'Downloaded', 'click', 'source code Convex Hull']);" class="ext" title="Github Convex Hull" href="https://github.com/ariutti/Convex_Hull" target="_blank">link</a>. Buon divertimento!</p>

<footer>
<div class="firma">http://www.limulo.net</div>
<a class="top" href="#top-page">torna all'indice</a>
</footer>
</article>
