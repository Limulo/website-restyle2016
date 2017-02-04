---
layout: post
title: Sharp IR distance sensor linearization
date: 2016-11-20 12:40:00
excerpt: how to find the correct formula for sensor data linearization
category: [coding, physical-computing]
usemath: true
---

It is decisely easier to linearize the IR SHARP **GP2Y0A21YK** than any other SHARP IR distance sensor simply because this one is used as an example inside [this](https://acroname.com/blog/linearizing-sharp-ranger-data) technical document by _Acroname_ and all the  matemathical process is very well explained there.

Here's the formula for the linearization of the sensor data:

$$

R = \frac{6787}{(V_{adc} - 3)} - 4.

$$

where $$ R $$ represents the distance between the obstacle and the sensor (expressed in _cm_) while $$ V_{adc} $$ is the corresponding 10bit voltage value as sampled by the microcontroller.

## differnet sensors, different equations ?

Now, if we consider a different Sharp IR distance sensor, like the **GP2Y0A02YK0F**, we have to calculate that formula ourself.

First of all we need to compile a table:

* in the first column we put the distances (expressed in _cm_) between the sensor and an obstacle while this one is placed closer and closer to the sensor (from a distance of 150 cm to a minimum distance of 20cm, as we read from the sensor [datasheet](https://acroname.com/sites/default/files/assets/sharp_gp2y0a02yk0f_e.pdf));
* in the second column, the corresponding 10bit voltage values, as read by the microcontroller ADC ($$ V_{adc} $$ ).

![tabella](tabella)

A questo punto si può tracciare il grafico $$\frac{Range(cm)}{V_{adc}} $$: si tratta come si vede di una curva non lineare; in altre parole, ad eguali variazioni nella distanza, non corrispondono eguali variazioni nei valori $$ V_{adc} $$ misurati.

![grafico](grafico)

E' qui che entra in gioco la prima equazione:

$$

Vadc = \frac{1}{(R + k)}

$$

dove $$ k $$ è un parametro che va scelto empiricamente. L'operazione di divisione agisce come una funzione linearizzatne che trasforma la curva sgraziata in una tracciato più simile ad una linea. Questo nuovo grafico è il grafico $$  \frac{1}{(R+k)}\times\frac{1}{V_{adc}} $$. Con un opportuno valore di $$ k $$ i grafico è quello di una funzione leggermente 'ammorbidita'.

A tale punto si può calcolare la retta di regressione lineare:

$$

y = m \times x + b

$$

che interpoli tutti i valori di tale grafico e ricavarne poi:

* coefficinete angolare **m**;
* e intercetta **b**;

Sostituendo ora a _y_, la formula in ordinata per l'ultimo grafico $$ \frac{1}{(R+k)} $$ e ad _x_ il valore dell'ascissa _valore ADC_ la formula diventa:

$$

\frac{1}{(R+k)} = m \times V_{adc} + b

$$

Ricavandone $$ R $$:

$$

R = \frac{1}{(m \times V_{adc} + b)} - k

$$

Sostituendo poi

* $$ m' = \frac{1}{m} $$;
* $$ b' = \frac{b}{m} $$;

l'equazione si trasforma ulteriormente in:

$$

R = \frac{m'}{(V_{adc} + b')} - k

$$

A seguito di diverse prove ne ricavo che i valori per i diversi parametri sono i senguenti:

* k = 11
* m = 0.0000631428
* b = 0.0011059075
* m'= 15837 circa
* b'= 18 circa

La formula si linearizzazione specifica per il sensore **GP2Y0A02YK0F** diventa quindi la

$$

R = \frac{15837}{(V_{adc} + 18)} - 11

$$

## NOTE

Quanto descritto è stato testato sul seguente sistema:
* S/O: Debian GNU/Linux 8 (jessie) 64-bit / Gnome 3.14.1
* Libre Office: versione 5.1.3.2

Probabilmente la parte più difficile di tutto questo procedimente è la sistemazione di tutti questi dati all'interno di un foglio di calcolo per essere poi in grado di studiarli ed analizzarli come si deve.

In particolare ecco alcune delle difficoltà che ho dovuto affrontare e delle soluzioni applicate:

* Graficare i dati in modo opportuno (specialmente disporre i **valori ADC** in modo omogeneo sull'asse delle ascisse) - creato il grafico cliccare su di esso in modo da evidenziarne l'asse delle ascisse. Cliccare con il tasto destro e selezionare la voce _Format Axis..._. Quindi, dal tab _Scale_ selezionare l'opzione _Date_ dal menù _Type_. In questo modo tutto si imposterà automaticamente per disporre le ascisse omogeneamente.

* visualizzazione di molte cifre decimali - tasto destro sulla cella, **Format Cells..**. Dal tab **Numbers** selezionare **Numbers** dalla colonna **Category**, quindi aumentare il valore del campo **Options/Decimal Places**.

* formule per il calcolo del coefficiente angolare e dell'intercetta della retta - le fomula sono rispettivamente la ```=SLOPE(Data Y, Data X)``` e ```=INTERCEPT(Data Y, Data X)```, le quali permettono di impostare quale il range dei dati per le ordinate e quali per le ascisse. Entrambe le formule sono semplici da implementare se si usa il **Function Wizard**. Le formule si trovano anche descritte in [questo articolo](https://help.libreoffice.org/Chart/Trend_Lines) tratto dall'help di Libre Office.
