---
layout: post
title: Bluetooth test
date: 2016-09-19 18:48:00
excerpt: testing our first BlueTooth Modem!
category: [coding, physical-computing]
---

una pagina dove raccogliere tutti i nostri esperimenti con il protocollo di comunicazione bluetooth.
Buon divertimento!

Abbiamo connesso il modulo **BlueSmirf** alla porta _Serial1_ dell'Arduino Mega. In tale modo ci è stato possibile scrivere sulla UART (per comunicare con il computer connesso via USB) e comunque ricevere dati via bluetooth senza usare la libreria _Software Serial_ .
Ecco il codice:

![fritzing breadboard scheme]({{ site.baseurl }}/assets/images/bluetooth-test/fritzing_bb.jpg)

{% highlight c %}
void setup()
{
    Serial.begin(115200); // Serial monitoring
    delay(1000);
    Serial1.begin(115200); //Bluethooth monitoring
    delay(1000);
}

void loop()
{
     while(Serial.available())
    {
        char c = Serial.read();
        Serial1.write(c);
        //Serial.print(&quot;\tcharacter &quot;); Serial.print(c); Serial.println(&quot; written!&quot;);
    }

    while(Serial1.available())
    {
        char c = Serial1.read();
        Serial.write(c);
    }
}
{% endhighlight c %}

Per testare l'effettivo funzionamento della comunicazione bluetooth ci serviva un altro dispositivo capace di ricevere ed inviare bytes con questo stesso protocollo. Abbiamo scelto di usare i nostri _macbook_ (ah, quale errore!)

Dopo ore di sperimentazione, ecco quale sembra essere la procedura corretta per far funzionare il tutto:

* sul macbook, attivare il sistema _bluetooth_ e impostare la _visibilità_;

![01]({{ site.baseurl }}/assets/images/bluetooth-test/01.jpg)

* Alimentare Arduino e caricare lo sketch;
* accedere alla _COMMAND MODE_ del BlueSmirf usando il comando ```$$$``` (ricorda di usare il _no line ending_);
* fare uno scanning per individuare i dispositivi raggiungibili (comando **I** - ricorda di usare il _newline_);
* mi connetto ad uno di questi usando il comando **C, indirizzo**;
* esco dal _COMMAND MODE_ (non indispensabile).
* Sul macbook effettuare l'aventuale <strong>pairing</strong> se la connessione viene effettuata per la prima volta (inserire il **PIN: 1234**).

![02]({{ site.baseurl }}/assets/images/bluetooth-test/02.jpg)

* accedere alle preferenze Bluetooth e, selezionato il dispositivo _bluesmirf_, impostare la porta seriale di uscita per lo stesso: click sul simbolo della rotellina sotto l'elenco dei device quindi _modifica porte seriali_;

![03]({{ site.baseurl }}/assets/images/bluetooth-test/03.jpg)

* click su **+** per aggiungere una porta seriale quindi click  su _applica_ per rendere effettive le modifiche.

![04]({{ site.baseurl }}/assets/images/bluetooth-test/04.jpg)

* accedere via terminale, ad esempio usando il comando **screen** (ricorda: per uscire dal programma usa ```CTRL+A``` seguito da ```CTRL+\```) o via software (con **CoolTerm**, scaricabile da [qui](http://freeware.the-meiers.org/) allo stream sulla porta seriale inviando e ricevendo dati.
* per inviare dati dalla UART di Arduino usando il computer connesso via USB è sufficiente usare il _monitor seriale_, scrivere nel campo in alto e premere 'send'.
