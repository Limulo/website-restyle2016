---
layout: post
title: LiPo battery polarity
date: 2016-10-20 09:30:00
excerpt: When you find that the polarity of your battery is wrong!
category: [installation, issue]
tags: [interactive, Arduino, electronics]
---

Work in progress! This article will be soon available!

{% comment %}

Nelle nostre sperimentazioni abbiamo capito che in applicazioni in cui occorra percepire l'interazione dell'utente sottoforma di tocco o prossimità, l'**MPR121** è la soluzione! Questo chip è stato progettato per lavorare con sensori di tipo capacitivo e implementa al suo interno tutta una serie di algoritmi che lo rendono molto versatile e robusto.

Il chip _MPR121_ lo si trova integrato ad esempio in una piccola _breakout board_ prodotta da **Adafruit**: si tratta della [Adafruit 12-Key Capacitive Touch Sensor Breakout - MPR121](https://www.adafruit.com/product/1982) che abbiamo usato con grande soddisfazione in diversi progetti. La scheda _Adafruit_ monta tutto il necessario a renderla compatibile con Arduino e velocemente interfacciabile tramite protocollo **I2C**.

Se però si è un po' di corsa e serve qualcosa di immediatamente funzionante si può optare per la **TouchBoard**. La _TouchBoard_ è una scheda prodotta dall'inglese **BareConductive** ed è derivata dall'**Arduino Leonardo**. Oltre a tutte le funzionalità di un Arduino, aggiunge quelle dell'**MPR121** per gestire i 12 elettrodi capacitivi integrati e in più ingloba un _mp3 player_ con relativa presa _mini jack TRS_ per la riproduzione del suono e slot per _microSD_ card a contenere i files audio.

La forza della _TouchBoard_ sta proprio nella velocità con cui si possono realizzare diversi progetti di interazione che includano il tocco o la prossimità e al contempo la riproduzione di materiale audio. Ancora più sfiziosa è la possibilità di alimentare la scheda con una **batteria LiPo** e rendere così il tutto indipendente dall'alimentazione di rete.

## Polarity

Ed è proprio della batteria che vogliamo parlarvi e in particolare della sua **polarità**. Ebbene sì, acquistata una nuova batteria a polimeri di litio, era arrivato il momento di connetterla alla scheda _TouchBoard_ ma non sapevamo se la polarità della batterie fosse quella corretta.
Abbiamo cercato informazioni sul sito ma, trovandole un po' scarne e non particolarmente chiare, pensiamo sia meglio ocndividere qui la nostra esperienza.

La nostra è una piccola batteria ai polimeri di litio (_LiPo_) da 3,7V 2000mAh. La batteria, come tutte quelle di questo tipo, almeno a quanto abbiamo potuto constatare sul sito del nostro [fornitore](https://www.futurashop.it/), dispone di un **connettore** di tipo [**JST serie PH**](https://en.wikipedia.org/wiki/JST_connector) a **2 vie**.

Il [datasheet](https://www.bareconductive.com/wp-content/uploads/2015/01/TouchBoard_TechDataSheet.pdf) della _TouchBoard_ dal sito di _BareConductive_ specifica che il **pin 1** della batteria dovrebbe essere quello positivo mentre il **pin 2** il negativo (pin 1 +ve, pin 2 -ve); nonostante queste indicazioni purtroppo ma non siamo riusciti a capire con assoluta certezza quale fosse l'uno oppure l'altro, anche perchè sul connettore della nostra batteria non vi è alcuna indicazione.

Approfondendo la cosa siamo arrivati a [questo documento](http://www.jst-mfg.com/product/pdf/eng/ePH.pdf) che descrive proprio la tipologia di connettori di cui stiamo parlando e qualcosa ha cominciato ad essere più chiaro.

![battery img 1]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0782.jpg)

In sostanza abbiamo scoperto che la polarità della nostra batteria non era quella giusta. Così, armati di pazienza e _mano ferma_ l'abbiamo invertita semplicemente tagliando i due conduttori e facendo un paio di piccole saldature.

![battery img 2]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0784.jpg)
![battery img 3]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0785.jpg)

Nelle foto è mostrato il risultato finale dove si può vedere anche l'uso di guaina termorestringente a protezione dei punti dove abbiamo effettauto la saldatura.

![battery img 4]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0788_mod.jpg)

Ora, con la polarità invertita, la batteria lavora nel modo descritto da _BareConductive_. Connettendo alla scheda anche il cavo micro USB se ne ha la prova in quanto il led ambra **CHG** si accende e resta illuminato per tutta la fase di ricarica della batteria.

In queste ultime foto invece è mostrata la batteria e la scheda _TouchBoard_ come appaiono nella loro sistemazione definitiva, alloggiate all'interno della piccola centralina costruita appositamente in occasione del [Linux Day 2016](http://www.linuxdaymilano.org/).  

![battery img 5]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0794_mod.jpg)
![battery img 6]({{ site.baseurl }}/assets/images/lipo-battery/IMG_0799_mod.jpg)

A titolo di promemoria lasciamo qui anche alcuni altri riferimenti ad informazione relative alla batteria, raggiungibili dalla sezione [FAQ](https://faqs.bareconductive.com/hc/en-gb/categories/200751141-Touch-Board) del sito _BareConductive_:

* [Purchasing the right battery](https://faqs.bareconductive.com/hc/en-gb/articles/204750492-Purchasing-the-right-battery)
* [Battery connector type](https://faqs.bareconductive.com/hc/en-gb/articles/204847261-Battery-connector-type)
* [Charging Batteries via the Touch Board](https://faqs.bareconductive.com/hc/en-gb/articles/204847281-Charging-Batteries-via-the-Touch-Board)

## References

* Adafruit 12-Key Capacitive Touch Sensor Breakout [tutorial](https://learn.adafruit.com/adafruit-mpr121-12-key-capacitive-touch-sensor-breakout-tutorial/pinouts);
* [JST connector](http://www.jst-mfg.com/product/detail_e.php?series=199);

---

## More

* Check out our [LinuxDay 2016]({% post_url 2016-10-22-linuxday2016 %}) page if you need more information about the event and the other interactive installations.

{% endcomment %}
