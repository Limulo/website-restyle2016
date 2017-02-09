---
layout: post
title: SDL and Bit Blitting, SDL_BlitSurface vs. Custom Blit
date: 2015-05-22 09:00:00
excerpt: una funzione alternativa a SDL_BlitSurface per fare Bit Blit tra due Surfaces indicizzate
category: [coding, game, focus]
---

<!--
<meta name="keywords" content="blit, SDL, Surface, BlitSurface, SDL_BlitSurface">
<meta name="description" content="una funzione alternativa a SDL_BlitSurface per fare Bit Blit tra due Surfaces indicizzate">
-->

	<div>
	<img src="{{ site.baseurl }}/assets/images/logos/sdl-logo.jpg" alt="sdl logo" style="float: left;"/>

	<p>Da qualche giorno Valentina ed io abbiamo ripreso lo studio della libreria SDL e ci siamo da subito scontrati con un problema interessante:<br>
come si fa a copiare le informazioni dei pixel da una immagine sorgente ad una di destinazione?</p>

	<hr class="clear">
	</div>


L'operazione che ci interessa svolgere porta il nome di **Bit Blit** (vedi **[a]**), in poche parole, una operazione di computer graphics in cui differenti immagini bitmap vengono combinate tra loro.
{: class="note"}

	<p>Usando le "<em>superfici</em>" come strutture contenitore delle immagini da manipolare, la libreria SDL mette a disposizione una funzione particolare chiamata:</p>
	<p class="code">int SDL_BlitSurface( SDL_Surface* src, const SDL_Rect* srcrect, SDL_Surface* dst, SDL_Rect* dstrect )</p>

	<p>Questa funzione è studiata appositamente per effettuare in modo efficiente la copia dei dati dei pixels di una data superficie di partenza <em>src</em>, contenuti all'interno di uno specifico <span class="code">SDL_Rect</span> <em>srcrect</em>, sui pixels della superficie <em>dst</em>, all'interno del corrispondente rettangolo <em>dstrect</em>.</p>


	<div class="img" >
	<img src="{{ site.baseurl }}/assets/images/game-focus-03/schematico.png" alt="scheme"/>
	</div>


	<p>Questa funzione può essere utilizzata su superfici di qualsiasi formato e internamente opera dapprima una validazione dei due rettangoli passati come parametri, poi un eventuale clipping degli stessi (vedi più avanti) ed infine invoca la funzione <span class="code">SDL_LowerBlit()</span>, la quale si occupa della copia vera e propria.</p>

	<p>Facendo alcune prove, ci siamo accorti che, fornendo due superfici in formato indicizzato ( <span class="code">SDL_PIXELFORMAT_INDEX8</span> ), il comportamento della funzione di Blitting non era proprio quello che ci aspettavamo.</p>

	<p>Abbiamo notato infatti che la funzione, anzichè copiare pedissequamente i valori dei pixel (gli indici a 8 bit) da <em>src</em> a <em>dst</em>, ottiene piuttosto il corrispondente colore dalla palette sorgente, cerca quello che più gli assomigli nella palette di destinazione e ne scrive l' indice sulla <em>dst</em>. Il che ricorda il comportamento della funzione <span class="code">SDL_MapRGB()</span>.</p>

	<p>In pratica, sembra che la <span class="code">SDL_LowerBlit</span>, invocata dalla <span class="code">SDL_BlitSurface</span>, in qualche modo si serva di questa <span class="code">SDL_MapRGB</span>.<br>
Uhm...</p>

<p>Questo tipo di comportamento non ci piace tanto, desidereremmo avere ancora più controllo sulla manipolazione dei pixel ma la libreria SDL, almeno a quanto abbiamo avuto modo di vedere, non sembra fornire metodi alternativi; se conoscete qualche altra funzione che possa fare al caso fatecelo sapere! :)</p>

<div class="separatore">
</div>

<p>A questo punto è diventato fondamentale crearci una nostra funzione ad-hoc per operare il nostro Blit personalizato. Vogliamo analizzarla qui assieme a voi.</p>

<p>Per semplificare di molto le cose diremo che la funzione opererà soltanto su Superfici in formato indicizzato e si servirà delle funzioni <span class="code">getpixel</span> e <span class="code">putpixel</span>, per ora proprio come riportate alla sezione PixelAccess della SDL Documentation Wiki (vedi <b>[c]</b>).</p>

<p>La nostra funzione dovrebbe occuparsi dei controlli del caso sulle superfici e i rettangoli passati come parametro prima di cominciare a lavorare sul serio, proprio come fa la <span class="code">SDL_BlitSurface</span>:</p>
<ol>
	<li>le due superifici sono valide (diverse da NULL e a colori indicizzati)?</li>
	<li>i due rettangoli passati come parametro sono validi (diversi da NULL e con area non nulla)?</li>
</ol>
<p>e così via...</p>

<p>Prima di tutto diamo a ciascun elemento il proprio nome:</p>

<table class="dati" style="width: 100%;">
	<tr>
		<th style="text-align: center;">A</th>
		<th style="text-align: center;">B</th>
	</tr>

	<tr>
		<td><img src="{{ site.baseurl }}/assets/images/game-focus-03/A-didascalie-bianco.png" alt="A" style="width: 80%;"/>
</td>
		<td><img src="{{ site.baseurl }}/assets/images/game-focus-03/B-didascalie-bianco.png" alt="B" style="width: 80%;"/>
</td>
	</tr>

	<tr>
		<td><b>sA</b>: La superficie sorgente. Potrebbe trattarsi ad esempio dello spritesheet da cui ricavare le grafiche da blittare sulla Superficie di Destinazione ;</td>
		<td><b>sB</b>: La superficie destinazione, quella sulla quale deve avvenire il blit. ;</td>
	</tr>

	<tr>
		<td><b>pA</b>: il pixel sulla superficie A ha coordinate <span class="code">xA</span> e <span class="code">yA</span> ;</td>
		<td><b>pB</b>: il pixel su cui riversare il dato in arrivo. Ha coordinate <span class="code">xB</span> e <span class="code">yB</span> ;</td>
	</tr>

	<tr>
		<td><b>crA</b> (Clip Rect per sA): è il rettangolo che racchiude l'intera superficie A, ottenuto ad esempio tramite il metodo <span class="code">SDL_GetClipRect()</span> applicato su <b>sA</b> ;</td>
		<td><b>crB</b> (Clip Rect per sB): è il rettangolo che racchiude l'intera superficie B ;</td>
	<tr>
		<td><b>rA</b>: è il rettangolo che racchiude tutti e solo i pixel della <b>sA</b> interessati dalla operazione di copia (in teoria <b>rA</b> dovrebbe essere più piccolo di <b>crA</b>, inoltre dovrebbe essere incluso in esso. Se così non fosse occorre prendere le opportune precauzioni).</td>
		<td><b>rB</b>: è il rettangolo che racchiude la zona della <b>sB</b> da aggiornare con i dati in arrivo ;</td>
	</tr>
</table>


<p>Ecco un veloce diagramma di flusso delle prossime operazioni da completare: come si può vedere, subito dopo aver valutato la validità delle 2 superfici, passiamo a controllare il rettangolo di sorgente <b>rA</b>.<br>Nel caso esso sia <span class="code">NULL</span> oppure abbia area = 0 (in altre parole si non valido) esso viene fatto coincidere con il <b>crA</b>.</p>

<div class="img" >
<img src="{{ site.baseurl }}/assets/images/game-focus-03/diagramma-parte-1.png" alt="diagram-part-1" style="width: 50%;"/>
</div>

<div class="dashed-border" style="padding: 1em;">
<p>A questo punto possono verificarsi due situazioni:</p>

	<table style="width: 100%;">
		<tr>
			<td>
			<img src="{{ site.baseurl }}/assets/images/game-focus-03/A-dentro-fondo-bianco.png" alt="A-dentro" style="width: 70%;"/>
			</td>
			<td>
			<img src="{{ site.baseurl }}/assets/images/game-focus-03/A-fuori-fondo-bianco.png" alt="A-fuori" style="width: 70%;"/>
			</td>
		</tr>
	</table>

<p>Nel caso <b>rA</b> sia interno alla superficie <b>sA</b>, in altri termini interno a <b>crA</b>, tutto ok (figura a sopra a sinistra)!<br>Il problema è quando il rettangolo <b>rA</b> è soltanto parzialmente sovrapposto alla <b>sA</b> (figura in alto a destra).<br>
In tal caso è necessario '<em>clippare</em>' il rettangolo <b>rA</b> alle dimensioni di <b>crA</b> in modo che, nella fase di copia dei dati non si vadano ad interrogare pixels inesistenti nella <b>sA</b>.</p>
</div>

<p>Proseguiamo.<br>L'operazione di clip del rettangolo <b>rA</b> è mostrata nei primi due blocchi in alto a sinistra della figura sottostante.</p>
<p>Terminata la valutazione e l'eventuale clip per il rettangolo di sorgente, passiamo a valutare il rettangolo di destinazione.</p>
<p>Prendiamo spunto dalla <span class="code">SDL_BlitSurface</span> e, nel caso <b>rB</b> sia <span class="code">NULL</span> o invalido, impostiamo l' "<em>Upper Left Corner</em>" per il rettangolo di destinazione a <span class="code">(0, 0)</span>.<br>
Se invece il rettangolo <b>rB</b> è valido, ne conserviamo la posizione per l' "<em>Upper Left Corner</em>", senza modifiche. In entrami i casi settiamo larghezza ed ampiezza di <b>rB</b> pari a quelle di <b>rA</b>.</p>
<div class="img">
<img src="{{ site.baseurl }}/assets/images/game-focus-03/diagramma-parte-2.png" alt="diagram-part-2" style="width: 50%;"/>
</div>

<p>A questo punto i due rettangoli <b>rA</b> e <b>rB</b> hanno le stesse dimensioni ma questo non significa che i problemi siano finiti!</p>

<div class="dashed-border" style="padding: 1em;">
<p>Che cosa succede se il rettangolo di destinazione <b>rB</b> si trova al di fuori della superficie di destinazione <b>sB</b>, in altre parole, se <b>rB</b> e <b>crB</b> non si intersecano?
In tal caso la funzione dovrebbe semplicemente <em>ritornare</em> senza fare alcuna copia.

<div class="img">
<img src="{{ site.baseurl }}/assets/images/game-focus-03/diagramma-parte-3.png" alt="diagram-part-3" style="width: 50%;"/>
</div>

<p>Prendiamo un altro caso non impossibile, sebbene molto poco probabile, in cui <b>sA</b> sia molto più ampia di <b>sB</b>: potrebbe verificarsi che i rettangoli <b>rA</b> e <b>rB</b> (a questo punto di dimensioni identiche) siano più grandi di <b>sB</b>.</p>

<p>Lo stesso tipo di problema lo si avrebbe con sovrapposizione parziale del <b>rB</b> con <b>sB</b>; qui come prima, pur sicuri di copiare dati soltanto da pixels validi da <b>sA</b> (interni a <b>rA</b>), non esisterebbero alcuni dei pixels corrispondenti nella superficie di destinazione <b>sB</b>.</p>
</div>

<p>In tutte queste situazioni occorre prendere le giuste precauzioni. Diamo un'occhiata a due casi limite d'esempio:</p>

	<table class="dati" style="width: 100%;">
		<tr>
			<th>Caso Limite 1</th>
			<th>Caso Limite 2</th>
		</tr>
		<tr>
			<td>
			<img src="{{ site.baseurl }}/assets/images/game-focus-03/B-fuori-bianco-1.png" alt="caso-limite-1" style="width: 70%;"/>
			</td>
			<td>
			<img src="{{ site.baseurl }}/assets/images/game-focus-03/B-fuori-bianco-2.png" alt="caso-limite-2" style="width: 70%;"/>
			</td>
		</tr>
		<tr>
			<td colspan=2 >
			Come si può vedere nelle 2 illustrazioni qui sopra, esistono alcuni pixels di destinazione che, pur contenuti in <b>rB</b> (area a strisce nere oblique), non sono al contempo interni alla superficie di destinazione <b>sB</b>.<br>In altri termini, dobbiamo assicurarci che l'operazione di Blit avvenga per i soli pixels validi, ovvero soltanto quelli che costituiscono l'area colorata di blu.
			</td>

		</tr>
	</table>

	<p>Possiamo ora scegliere di agire in uno dei due modi seguenti:</p>
	<ol>
		<li>ciclare attraverso i soli pixels di destinazione che fanno parte dell'area di sovrapposizione tra <b>rB</b> e <b>sB</b> (area blu);</li>
		<li>ciclare comunque su tutti i pixels che costituiscono l'area di <b>rB</b> e fare gli opportuni controlli per capire se essi siano interni o meno rispetto a <b>sB</b>.</li>
	</ol>

	<h3>Modo 1</h3>
	<p>Per risolvere il problema occorre individuare i 4 valori <span class="code">left</span>, <span class="code">right</span>, <span class="code">top</span> e <span class="code">bottom</span> per sapere entro quali minimi e massimi si possano muovere rispettivamente le coordinate <em>xB</em> e <em>yB</em> del pixel di destinazione <b>pB</b>.</p>

	<p>Entrambi i casi limite sono così sistemati!</p>
	<pre style="padding: 1em 0 0 0;">
	left   = (rB.x > 0) ? rB.x : 0 ;
	top    = (rB.y > 0) ? rB.y : 0 ;
	right  = (crB.w &lt;= (rB.x + rB.w)) ? crB.w : (rB.x + rB.w) ;
	bottom = (crB.h &lt;= (rB.y + rB.h)) ? crB.h : (rB.y + rB.h) ;
	</pre>

	<p>A questo punto facciamo ciclare xB e yB tra i rispettivi massimi e minimi:<br>
	<pre style="padding: 1em 0 0 0;">
	for( left &lt;= xB &lt; right )
	for( top  &lt;= yB &lt; bottom )
	</pre>

	<p>Ricavo le coordinate corrispondenti rispetto al sistema di riferimento del rettangolo <b>rB</b>:<br>
	<pre style="padding: 1em 0 0 0;">
	xDST = xB - rB.x ;
	xDST = yB - rB.y ;
	</pre>

	<p>Queste coordinate sono le stesse del punto che si muove all'interno del rettangolo <b>rA</b>:<br>
	<pre style="padding: 1em 0 0 0;">
	xSRC = xDST ;
	xDST = yDST ;
	</pre>

	<p>Infine recupero le corrispondenti coordinate nel sistema di riferimento della surface sorgente <b>sA</b>:<br>
	<pre style="padding: 1em 0 0 0;">
	xA = rA.x + xSRC ;
	yA = rA.y + ySRC ;
	</pre>

	<h3>Modo 2</h3>

	<p>Decisamente meno efficiente, ciclo direttamente tutti i pixels contenuti nel rettangolo di destinazione <b>rB</b>, effettuando per ciascuno di essi il controllo di validità.<br>
	<pre style="padding: 1em 0 0 0;">
	left   = rB.x ;
	top    = rB.y ;
	right  = rB.x + rB.w ;
	bottom = rB.y + rB.h ;

	for( left &lt;= xB &lt; right )
	for( top  &lt;= yB &lt; bottom )
	</pre>

	<p>Controllo che <b>xB</b> e <b>yB</b> siano valori validi, ossia interni alla <b>sB</b>. In caso contrario passo al pixels successivo:<br>
	<pre style="padding: 1em 0 0 0;">
	if( xB &lt; 0 || xB >= crB.w || yB &lt; 0 || yB >= crB.h )
		continue;
	</pre>

	<p>Da questo momento le operazioni da compiere sono le stesse del <u>Modo 1</u>:</p>
	<pre style="padding: 1em 0 0 0;">
	xDST = xB - rB.x ;
	xDST = yB - rB.y ;

	xSRC = xDST ;
	xDST = yDST ;

	xA = rA.x + xSRC ;
	yA = rA.y + ySRC ;
	</pre>

	<h3>Conclusioni</h3>
	<p>Date ora le coppie di coordinate (<span class="code">xA</span>, <span class="code">yA</span>) e (<span class="code">xB</span>, <span class="code">yB</span>), rispettivamente per i pixel <b>pA</b> e <b>pB</b>, basta invocare i metodi <span class="code">getpixel</span> e <span class="code">putpixel</span>.</p>
	<pre style="padding: 1em 0 0 0;">
	Uint32 pixelvalue = getpixel( sA, xA, yA );
	putpixel( sB, xB, yB, pixelValue );
	</pre>

	<p>Da non dimenticare l'inserimento di un controllo sul colore di chiave. Se per la superficie <b>sA</b> è settato un colore chiave, i pixel <b>pA</b> che portano quel valore non dovranno essere copiati sulla <b>sB</b>.

	<p>In aggiunta si potrebbe eventualmente inserire un parametro aggiuntivo detto <span class="code">offset</span>, utile nel caso in cui i valori dei pixels debbano essere copiati sulla <b>sB</b> non prima di aver subito un opportuno offset.</p>

	<p>Il codice sarebbe allora:</p>
	<pre style="padding: 1em 0 0 0;">
	Uint32 colorKey;
	SDL_GetColorKey( _srcS, &colorKey);
	[...]
			Uint32 pixelValue = getpixel( sA, xA, yA );
			if( pixelValue == colorKey ) continue;
			pixelValue += offset;
			if( pixelValue > 255)
				pixelValue = 255;
			else if( pixelValue < 0)
				pixelValue = 0;
			putpixel( sB, xB, yB, pixelValue );
	</pre>

	<p>Ecco il codice sorgente completo per la funzione che abbiamo studiato:</p>
	<script type="syntaxhighlighter" class="brush: c++;">
    <![CDATA[
int blitCustomIndexedSurface( SDL_Surface* sA,
							  SDL_Rect* _rA,
							  SDL_Surface* sB,
							  SDL_Rect* _rB,
							  Uint32 offset=0 )
{	printf("Blit Custom Indexed Surface:\n");

	// se le superfici non sono valide esco subito
	if( (sA == NULL) || (sB == NULL) )
	{	printf("\tSuperficie A o B non valide\n\n");
		return -1;
	}

	// se le superfici non sono indicizzate esco subito
	if( sA->format->BitsPerPixel != 8 )
	{	printf("\tLa superficie sorgente non è in formato indicizzato\n\n");
		return -1;
	}
	if( sB->format->BitsPerPixel != 8 )
	{	printf("\tLa superficie destinazione non è in formato indicizzato\n\n");
		return -1;
	}

	Uint32 colorKey;
	int rc = SDL_GetColorKey( sA, &colorKey);
	if( rc == -1 )
		printf("\tLa superficie sA non ha colore di chiave.\n");
	else
		printf("\tIl colore di chiave per sA è la entry: %u;\n", colorKey);

	SDL_Rect rA, crA, rB, crB;

	SDL_GetClipRect( sA, &crA );
	printf("\tcrA è (%3d, %3d, %3d, %3d);\n", crA.x, crA.y, crA.w, crA.h);
	SDL_GetClipRect( sB, &crB );
	printf("\tcrB è (%3d, %3d, %3d, %3d);\n", crB.x, crB.y, crB.w, crB.h);

	if( SDL_RectEmpty( _rA ) )
	{	/* il rettangolo sorgente non + valido */
		printf("\trA NON valido\n");
		rA.x = crA.x;
		rA.y = crA.y;
		rA.w = crA.w;
		rA.h = crA.h;
	} else
	{	/* se invece il _rA è valido, calcolo l'intersezione con crA
		in modo tale da evitare casi in cui le aree siano parzialmente sovrapposte */
		SDL_IntersectRect( _rA, &crA, &rA );
		if( SDL_RectEmpty( &rA ) )
		{	printf("\tIl rettangolo di intersezione tra rA e crA non è valido!\n\n");
			return -1;
		}
	}
	printf("\tIl rect sorgente è (%3d, %3d, %3d, %3d);\n", rA.x, rA.y, rA.w, rA.h);


	if( SDL_RectEmpty( _rB ) )
	{	/* se il rettangolo di destinazione non è valido, oppure ha area nulla
		allora le coordinate Top e Left sono impostate a 0 */
		printf("\trB NON valido\n");
		rB.x	= 0;
		rB.y	= 0;
	} else
	{	if( !SDL_HasIntersection( _rB, &crB ) )
		{	printf("\tIl rB non è incluso in crB per sB, do nothing!\n\n");
			return 0;
		}
		rB.x	= _rB->x;
		rB.y	= _rB->y;
	}
	rB.w = rA.w;
	rB.h = rA.h;
	printf("\tIl rect destinazione è (%3d, %3d, %3d, %3d);\n",
									  rB.x, rB.y, rB.w, rB.h);
	printf("\tNOTA: i rettangoli SRC e DST hanno ora la stessa area.\n");

	if( !SDL_HasIntersection( &rB, &crB ) )
	{	printf("rB è esterno alla sB, do nothing!\n\n");
		return 0;
	}

	// MODO 1
	int left   = (rB.x > 0) ? rB.x : 0 ;
	int top    = (rB.y > 0) ? rB.y : 0 ;
	int right  = (crB.w <= (rB.x + rB.w)) ? crB.w : (rB.x + rB.w) ;
	int bottom = (crB.h <= (rB.y + rB.h)) ? crB.h : (rB.y + rB.h) ;

	int xB, yB, xA, yA;
	for( xB = left; xB < right; xB++ ) {
		for( yB = top; yB < bottom; yB++ ) {

			xA = rA.x + ( xB - rB.x ) ;
			yA = rA.y + ( yB - rB.y ) ;

			Uint32 pixelValue = getPixel( sA, xA, yA );
			printf("\t\tSRC pixel index %u --> ", pixelValue);
			if( pixelValue == colorKey )
			{	printf("è di chiave, NON copio;\n");
				continue;
			}

			pixelValue += offset;
			if( pixelValue > 255)
				pixelValue = 255;
			else if( pixelValue < 0)
				pixelValue = 0;
			printf("%u, DST pixel index;\n", pixelValue);
			putPixel( sB, xB, yB, pixelValue );		
		}
	}

	/*
	// MODO 2
	int left   = rB.x ;
	int top    = rB.y ;
	int right  = rB.x + rB.w ;
	int bottom = rB.y + rB.h ;

	int xB, yB, xA, yA;
	for( xB = left; xB < right; xB++ ) {
		for( yB = top; yB < bottom; yB++ ) {
			if( xB < 0 || xB >= crB.w || yB < 0 || yB >= crB.h )
				continue;

			xA = rA.x + ( xB - rB.x ) ;
			yA = rA.y + ( yB - rB.y ) ;

			Uint32 pixelValue = getpixel( sA, xA, yA );
			printf("\t\tSRC pixel index %u --> ", pixelValue);
			if( pixelValue == colorKey )
			{	printf("è di chiave, NON copio;\n");
				continue;
			}

			pixelValue += offset;
			if( pixelValue > 255)
				pixelValue = 255;
			else if( pixelValue < 0)
				pixelValue = 0;
			printf("%u, DST pixel index;\n", pixelValue);
			putpixel( sB, xB, yB, pixelValue );		
		}
	}
	*/

	printf("\n");
	return 0;
}
	]]></script>


	<h3>Riferimenti</h3>

    <p><b>Links</b></p>
    <ul>
        <li><b>[a]</b> da Wikipedia: <a class="ext" href="https://en.wikipedia.org/wiki/Bit_blit" target="_blank">Bit Blit</a>;</li>
        <li><b>[b]</b> <a href="http://www.limulo.net/it/templates/games-focus-02.php">Colore Indicizzato</a>, un nostro articolo scritto al riguardo;</li>
        <li><b>[c]</b> SDL Documentation Wiki <a class="ext" href="http://sdl.beuc.net/sdl.wiki/Pixel_Access" target="_blank">Pixel Access</a> section, <a class="ext" href="http://wiki.libsdl.org/SDL_BlitSurface" target="_blank">SDL_BlitSurface</a>, <a class="ext" href="http://wiki.libsdl.org/SDL_LowerBlit" target="_blank">SDL_LowerBlit</a>, <a class="ext" href="http://wiki.libsdl.org/SDL_MapRGB" target="_blank">SDL_MapRGB</a>,  <a class="ext" href="http://wiki.libsdl.org/SDL_GetClipRect" target="_blank">SDL_GetClipRect</a>, <a class="ext" href="http://wiki.libsdl.org/SDL_IntersectRect" target="_blank">SDL_IntersectRect</a>;</li>
    </ul>
