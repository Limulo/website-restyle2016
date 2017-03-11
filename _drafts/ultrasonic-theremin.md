---
layout: post
title: Arduino Ultrasonic Theremin
date: 2017-03-08 18:48:00
excerpt: making a theremin like musical instrument with Arduino
category: [coding, physical-computing]
---

<div>
<img alt="Leon Theremin e il suo strumento" src="http://www.limulo.net/images/arduino-theremin/leon-theremin.jpg" style="float: left; width: 15%" />

<p>Voglia di ritornare un poco su Arduino, facciamo una esperimento allora, construimo un piccolo dispositivo che possa emettere suono. Come?</p>

<p>Prendiamo spunto dal <a class="ext" title="Theremin" href="http://it.wikipedia.org/wiki/Theremin">Theremin</a> ad esempio (l'immagine qui a fianco ritrae Leon Theremin con il suo strumento); per chi non lo conoscesse, il theremin è stato il primo strumento musicale elettronico mai realizzato. Per essere suonato questo strumento non prevede il contatto fisico con l'esecutore. Allontanando e avvicinando le mani alle 2 antenne dello strumento si possono creare variazioni di intonazione e di volume.</p>

<p>Proviamo a fare un Theremin anche noi, sì ma molto più semplice. Diciamo che ci limiteremo a realizzare uno strumento che per emettere suono, non abbia bisogno del contatto fisico dell'esecutore.</p>

<hr class="clear" />
</div>

Dopo aver analizzato le caratteristiche tecniche del sensore ad ultrasuoni Devantech SRF04, potremmo ora pensare di rispolverare il vecchio codice per ampliarlo e inserire una componente che si occupi di generare suono. Diciamo che utilizzeremo un piccolo altoparlante piezoelettrico (buzzer).

![schematic]({{ site.baseurl }}/assets/images/arduino-theremin/fritzing.jpg)
<br>Arduino Theremin schematic

<div>
<img alt="operating principle" src="http://www.limulo.net/images/arduino-theremin/schema.png" style="float: right; width: 30%;"/>
<br>
<p>Avremo così uno strumento sensibile alla distanza:</p>
<ul>
<li>più la mano è vicina allo strumento, più bassa sarà la frequenza del suono riprodotto;</li>
<li>viceversa, allontanando la mano otteremo un suono dalla frequenza più acuta.</li>
</ul>

<p>Anche l'occhio vuole la sua parte per cui lascieremo ad un piccolo led il compito di accendersi o spegnersi per indicare la prossimità o la lontananza rispettivamente.</p>

<hr class="clear" />
</div>

<div class="img">
<img style="display: inline;" alt="schematic" src="http://www.limulo.net/images/arduino-theremin/foto-arduino-theremin.jpg"/>
</div>


<h4>Il codice</h4>
<p>Ecco il codice sorgente dello sketch. Analizziamolo passo passo tramite i commenti:</p>

<script type="syntaxhighlighter" class="brush: java; highlight: [34, 60];">
<![CDATA[
/*   	
* su base della distanza dal sensore,
* l'altoparlante piezoelettrico emetterà
* un suono di frequenza proporzionale
*/  

// useremo 3 pin fisici della scheda Arduin UNO
int pinTrig = 9;       // il pin 9 per inviare il trigger al sensore
int pinEcho = 10;      // il pin 10 per ricevere il segnale dal sensore
int pinBuzz = 11;      // il pin 11 per collegare il buzzer
int pinLED  = 13;      // il pin 13 per accende o spegnere un led

int minDist = 10;      // distanze espresse in cm
int maxDist = 40;      // distanze espresse in cm
long echo = 0;

// utilizziamo un array per memorizzare
// le ultime 4 distanze captate dal sensore
// ne ricaveremo la media e, su base di quella,
// genereremo il suono.
const int NUMVAL = 4;
long storicoDistanze[NUMVAL];
long distanzaMedia;

int minFreq = 500;  // minima frequenza audio
int maxFreq = 2000; // massima frequenza audio
int minFreqT;
int maxFreqT;
int t;              // il valore di tempo 't' sarà utile
                // per generare il suono

boolean near = false; // variabile booleana di supporto

void setup() {
// inizializziamo la media e tutti i valori dell'array
distanzaMedia = 0;
for (int i=0; i&lt;NUMVAL; i++) {
  storicoDistanze[i] = 0;
}

//Serial.begin(9600); // attivazione della comunicazione seriale
                     // per ottenere i dati di ritorno dal sensore

// setto il pind dedicato al buzzer come output
pinMode(pinBuzz, OUTPUT);
digitalWrite(pinBuzz, LOW);

// setto il pind dedicato al led come output
pinMode (pinLED, OUTPUT);
digitalWrite (pinLED, LOW);

t = 0;

// ricavo i periodi 'minFreqT' e 'maxFreqT' (espressi in micro-secondi)
// dalle rispettive frequenze 'minFreq' e 'maxFreqT'
minFreqT = (1000000/minFreq);
maxFreqT = (1000000/maxFreq);
}

void loop() {

// retrocedendo elemento per elemento all'interno dell'array
// sposto tutti gli elementi di una posizione.
// Mentre mi occupo di fare lo shift degli elementi, ne faccio la somma
// memorizzandola all'interno della variabile 'distanzaMedia'
for(int i=NUMVAL-1; i&gt;0; i--) {
  storicoDistanze[i] = storicoDistanze[i-1];
  distanzaMedia += storicoDistanze[i];
}
// Nella posizione dell'array rimasta libera, quella con indice 0,
// inserirò il nuovo valore appena arrivatomi dal sensore ad ultrasioni
storicoDistanze[0] = ping();

distanzaMedia += storicoDistanze[0];
// calcolo la media delle distanze fino ad ora registrate
distanzaMedia /= NUMVAL;

if (distanzaMedia &gt; minDist &amp;&amp; distanzaMedia &lt; maxDist) {
  // se il valore medio è compreso tra 'minDist' e
  // 'maxDist' (valori in cm) allora
  // SONO VICINO
  digitalWrite (pinLED, HIGH); // accendo il led

  // calcolo il valore di tempo 't' mappandolo tra gli estremi
  // 'minFreqT' e 'maxFreqT' secondo il valore medio della distanza
  t = map(distanzaMedia, minDist, maxDist, minFreqT, maxFreqT);

  // chiamo la funzione appositamente creata per sintetizzare il suono
  playTone(t/2);

  // aggiorno il valore della variabile booleana 'near'
  if(!near)
     near = true;
} else {
  // SONO LONTANO
  digitalWrite (pinLED, LOW);  // spengo il led
  digitalWrite (pinBuzz, LOW); // riporto il buzzer a riposo
  t = 0;

  // aggiorno il valore della variabile booleana 'near'
  if(near)
     near = false;
}

// prima di triggerare un nuovo impulso al sensore ultrasuoni
// dobbiamo discriminare tra i due stati della variabile booleana 'near'
// 1) se sono nell'area vicina (near = true)
//    non c'è bisongo di attedere per inviare un nuovo impulso di trigger
//    in quanto il tempo di attesa è già trascorso nel frattempo che
//    la sintesi sonora aveva luogo (vedi la funzione playTone() )
// 2) in caso contrario attendo 150 ms prima di triggerare
//    nuovamente il sensore
if (!near)
  delay(150);

}
]]></script>


<p>Qui di seguito la prima delle due funzioni custom:</p>
<h4>PING</h4>
<p>questa funzione restituisce un valore di tipo 'long' che rappresenta la distanza (espressa in cm) tra il sensore e l'ostacolo.</p>

<script type="syntaxhighlighter" class="brush: java; highlight: 16;">
<![CDATA[
[...]
// la seguente porzione di codice è da inserire nel setup
// impostazione inziale
pinMode(pinEcho, INPUT); // il pin pinEcho è settato come input
digitalWrite(pinEcho, HIGH); // attiviamo la resistenza di pull-up
pinMode(pinTrig, OUTPUT); // il pin pinTrig è settato come output
digitalWrite(pinTrig, LOW); // 0 volt iniziali al pin pinTrig

delayMicroseconds(2); // delay di 2 microsecondi in cui
                     // il pin rimane low per evitare
                     // rumore di fondo causa alimentazione
                     // (vedi specifiche tecniche del sensore)

[...]

long ping() {

// invio del Trigger
digitalWrite(pinTrig, HIGH); // invio di 5 volt al pin pinTrig
delayMicroseconds(10); // il pin rimane impostato come high
                      // per 10 microsecondi
digitalWrite(pinTrig, LOW); // misurazione dell' eco

echo = pulseIn(pinEcho, HIGH, 37000); // ascolta l'eco
long valoreUS = (echo / 58.138); // valore di echo in cm
return valoreUS;
}
]]></script>

<h4>PLAYTONE</h4>
<p>la seconda funzione si chiama "Playtone", questa funzione non ha ritorno ma ha per paramentro un valore intero 't_': si tratta di un valore di tempo (espresso un microsecondi) che rappresenta il semiperiodo di un'onda quadra.</p>

<div class="img">
<img style="display: inline;" alt="graph 1" src="http://www.limulo.net/images/arduino-theremin/grafico2.jpg" />
<br>graph 1
</div>

Questo segnale elettrico viene sintetizzato da Arduino e inviato al pin ```pinBuzz``` e quindi al buzzer.

{% highlight c%}
void playTone(int t_) {
int semiT = t_;
long intialTime = millis();
long spentTime = 0;
while (spentTime &lt; 150) {
  digitalWrite(pinBuzz, HIGH);
  delayMicroseconds(semiT);
  digitalWrite(pinBuzz, LOW);
  delayMicroseconds(semiT);
  spentTime = millis() - intialTime;
}
digitalWrite(pinBuzz, LOW);
}
{% endhighlight %}

Tra una lettura dal sensore e la successiva intercorre sempre un intervallo di tempo pari a 150ms. Normalmente questo è un normale tempo di attesa che viene però speso emettendo suono quando l'ostacolo si trovi nella zona di prossimità.
