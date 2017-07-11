<!-- ARTICOLO -->
<article style="clear: both;">
<header>
<a id="libreria-box2d"></a>
<h2>Box2D per i videogiochi</h2>
</header>

<p>Era da un po' di tempo che volevamo provare a fare qualche programma che implementasse una simulazione delle leggi fisiche quali la gravità, l'attrito, le collisione tra oggetti e simili.</p>

<p>Il supporto di Nature of Code di Daniel Shiffman ancora una volta è stato di grande aiuto e ci ha permesso di venire a conoscenza di una libreria interessante. Si tratta di <a class="ext" title="Box2D physics engine" href="http://box2d.org/">Box2D</a>, ecco come ne parla lo stesso Shiffman.</p>

<p><em>"Box2D nacque come un set di tutorial di fisica scritti in C++ da Erin Catto per la Game Developer's Conference del 2006. Nel corso degli ultimi anni Box2D si è evoluta in un motore fisico open-source ricco ed elaborato. E' stato utilizzato per una infinità di progetti, tra i più noti si possono citare i giochi di grande successo come il premiato puzzle game Crayon Physic, e la fenomenale hit per mobile e tablet Angry Birds"</em> [Natore of Code, Daniel Shiffman - Ch6 Physics Libraries]</p>

<p>Ecco i giochi in questione:</p>
<table style="width: 40%; float:left; border: none;">
<tbody>
<tr>
<td style="text-align: center;" >
<a href="http://www.crayonphysics.com/">
<img alt="Crayon Physics" src="http://www.limulo.net/images/box2d-videogames/crayon-physics.jpg" style="width: 115px" />
<br>Crayon Physics</a>
</td>
<td style="text-align: center;" >
<a href="http://www.angrybirds.com/">
<img alt="Angry Birds" src="http://www.limulo.net/images/box2d-videogames/angry-birds.jpg" style="width: 115px"/>
<br>Angry Birds</a>
</td>
</tr>
</tbody>
</table>

<p>Sono entrambi giochi molto belli soprattutto affascinanti per come le animazioni risultino così realistiche. C'è da dire che, a differenza di quanto succeda in alcuni altri videogiochi (soprattutto in quelli più vecchi) in cui l'animazione è realizzata basandosi su fotogrammi singoli preparati in precedenza e messi in rapida successione uno con l'altro (vedi <a class="ext" title="Sprite" href="http://en.wikipedia.org/wiki/Sprite_%28computer_graphics%29">sprite</a>), l'animazione in un gioco dove tutto sia basato su un motore fisico è realizzata tecnicamente in modo diverso.</p>

<p>Nel primo caso è il team di animatori ad occuparsi della realizzazione dei vari fotogrammi. Questi fotogrammi non saranno in realtà niente di diverso rispetto a quanto non venga preparato per la realizzazione di un cartone animato in tecnica tradizionale. In sostamza: l'animazione è creata a priori.</p>

<p>Nel secondo caso l'animazione viene creata in tempo reale e non si base su nulla di preconfezionato (o quasi). I movimenti, le posizioni, le rotazioni etc.. sono computati mentre si sta giocando facendo affidamento al motore fisico che lavora in sottofondo. Questa tecnica di animazione viene detta animazione procedurale (per approfondimenti vedi <a class="ext" title="procedural generation" href="http://en.wikipedia.org/wiki/Procedural_generation">qui</a>).</p>

<p><em>"Uno dei punti chiave di Box2D è che si tratta di un motore fisico VERO. Box2D non conosce nulla in merito alla computer grafica e al "mondo dei pixels"; è semplicemente una libreria che prende numeri e butta fuori ancora altri numeri. Che cosa sono questi numeri? Metri, Kilogrammi, Secondi, etc...</em><em>Tutti i calcoli e le misurazioni di Box2D sono per misurazioni nel mondo reale, anche se per "mondo" si intende un piano bidimensionale con bordo superiore, inferiore, sinistro e destro."</em>
[Natore of Code, Daniel Shiffman - Ch6 Physics Libraries]</p>

<p>Nel concreto cerchiamo di capire come usare questa libreria per un particolare linguaggio di programmazione ad esempio Processing.</p>

<p><em> "Bene, se Box2D è un motore fisico che non conosce nulla in merito alla computer grafica basata sul pixel ed è scritto in C++, come si ritiene sia possibile usarla in  Processing?</em></p>

<p><em>La buona notizia è che Box2D è una libreria così utile e bella che tutti la voglio utilizzare - programmatori Flash, Javascript, Python e Ruby. Oh, e anche i programmatori Java. C'e' qualcosa chiamato <a class="ext" title="JBox2D" href="http://www.jbox2d.org/">JBox2D</a>, un porting di Box2D per Java. E dal momento che Processing è costruito su Java, JBox2D può essere utilizzata direttamente in Processing!"</em></p>

<p>Per ulterriori approfondimenti vi rimando al <a class="ext" title="Nature of Code" href="http://natureofcode.com/">Nature of Code</a> di Shiffman (<a class="ext" title="Nature Of Code - Ch05" href="http://natureofcode.com/book/chapter-5-physics-libraries/">Capitolo 05</a>). Per un esempio completo di applicazione, date un'occhiata all'articolo sulla <a href="pensatoio.php#galton-box">Galton Box</a>!</p>
