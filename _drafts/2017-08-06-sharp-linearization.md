---
layout: post
title: Sharp IR distance sensor linearization
date: 2017-08-06 11:00:00
excerpt: how to find the correct formula for sensor data linearization
category: [coding, physical-computing]
usemath: true
---

It is decisely easier to linearize the IR SHARP **GP2Y0A21YK** than any other SHARP IR distance sensor simply because this one is used as an example inside [this](https://acroname.com/blog/linearizing-sharp-ranger-data) technical document by _Acroname_ and all the  matemathical process is very well explained there.

![Sharp]({{ site.baseurl }}/assets/images/sharp-linearization/sharp-Y0A21.jpg)

Here's the formula for the linearization of the sensor data:

$$
R = \frac{6787}{(V_{a2d} - 3)} - 4.
$$

where $$ R $$ represents the distance between the obstacle and the sensor (expressed in _cm_) while $$ V_{a2d} $$ is the corresponding 10bit ADC voltage value as sampled by the microcontroller.

## Different sensors? different equations!

Now if we consider a different Sharp IR distance sensor we have to calculate that formula ourself. Take the **GP2Y0A02YK0F** for example:

![Sharp]({{ site.baseurl }}/assets/images/sharp-linearization/sharp-Y0A02.jpg){: width="60%"}

this sensor is capable of detecting obstacles in a range between 20 cm and 150 cm (as we know from the sensor [datasheet](https://www.sparkfun.com/datasheets/Sensors/Infrared/gp2y0a02yk_e.pdf)).

So in order to obtain the formula we first need to compile a table where we have:

* in the first column, the distances - expressed in _cm_ - between the sensor and an obstacle while this one is placed closer and closer to the sensor;
* in the second column, the corresponding 10bit voltage values value as returned from the microcontroller A2D converter ($$ V_{a2d} $$ ).

here's the table I've compiled

R (cm) | A2D
| :-: | :-: |
20 | 498
25 | 442
30 | 388
35 | 340
40 | 304
45 | 270
50 | 246
55 | 222
60 | 203
65 | 186
70 | 174
75 | 162
80 | 154
85 | 145
90 | 137
95 | 130
100 | 125
105 | 117
110 | 113
115 | 107
120 | 103
125 | 98
130 | 95
135 | 90
140 | 87
145 | 84
150 | 80

Now that we have collected all that data let's plot them in order to get the big picture (I'm using [LibreOffice](https://www.libreoffice.org/) **Calc** to do this, I will be very useful for all the upcoming calculation we need)

![graph 1]({{ site.baseurl }}/assets/images/sharp-linearization/graph1.png)

As we can see there's no linear relationship between distance and the 10bit A2D values; in other terms, equals variations in distance doesn't correspond to equal variations in measured $$ V_{a2d} $$ values.

---

Now let's plot another graph. This time we place $$ V_{a2d} $$ values on the x-axis and for the y-axis we use the following formula:

$$
y = \frac{1}{(R + k)}
$$

where $$ k $$ is a parameter we have to choose empirically: let's say $$k=0.5$$.

This division operation acts as a "_linearizing_" function which helps to make the curve looking more like a straight line.

In order to see the graph like this we need to place our $$V_{a2d}$$ values correctly on the x-axis (see the appendix below on how to do this in _Libre Office_).
{: class="note"}

![graph 2]({{ site.baseurl }}/assets/images/sharp-linearization/graph2.png)

If we choose $$k$$ accurately we can make the graph even more similar to a straight line: here's how it looks for $$k=11$$

![graph 3]({{ site.baseurl }}/assets/images/sharp-linearization/graph3.png)

Now is time to calculate the _regression line_ for these data in order to find out **m** and **q**, respectively the _slope_ and the _intercept_ of the line equation

$$
y = m \times x + q
$$

Once again _LibreOffice_ offers a tool to do this. See the appendix below for more about it.
{: class="note"}

![graph 4]({{ site.baseurl }}/assets/images/sharp-linearization/graph4.png)

$$
m = 0,0000603553
$$

$$
q = 0,0015304544
$$

Going on with our reasoning, we can make some substitution placing $$ \frac{1}{(R+k)} $$ instead of $$y$$ and $$V_{a2d}$$ in place of $$x$$. Our equation now becomes:

$$
\frac{1}{(R+k)} = m \times V_{a2d} + q
$$

Let's obtain $$R$$ from it:

$$
R = \frac{1}{(m \times V_{a2d} + q)} - k
$$

Making an helpful substitution with:

* $$ m' = \frac{1}{m} $$;
* $$ q' = \frac{q}{m} $$;

the equation eventually becames:

$$
R = \frac{m'}{(V_{a2d} + q')} - k
$$

where, to sum up, starting with $$k = 11$$, $$m = 0,0000603553$$ and $$q = 0,0015304544$$, we get (approximately):

$$
m'= 16569
$$

$$
q'= 25
$$

This way we have obtained a tailored linearization formula for the **GP2Y0A02YK0F** sensor:

$$
R = \frac{16569}{(V_{a2d} + 25)} - 11
$$


-Nick

## Appendix

The data from the sensor have been elaborated usign [LibreOffice]() Calc. You can download the _.ods_ file from [here]({{ site.baseurl }}/assets/downloads/sharp-linearization/Sharp_regression.ods).

Probably the trickiest part of all this job has been to introduce the data inside the Calc document and to fit them inside graphs in order to show them correctly and to compute the regression line.

Here're some of the difficulties I had and the solutions I've found (maybe they ca halp you as well):

1. I found difficult to place $$V_{a2d}$$ values on the x-axis in a correct way, here's the solution: once you have created the graph, click on it in order to focus the x-axis the click on it with the right button and select _Format Axis..._. Then, from the _Scale_ tab, from the _type_ menu, select the _Date_ option. This way x-axis data will be correctly displaced on the axis;

2. How to visualize decimals? In order to visualize a custom number of decimals you need to right click on the cell and select the **Format Cells..** option. Form the **Numbers** tab now select **Numbers** from the **Category** column, then increase the value on the **Option/Decimal Places** field;

3. Slope and Intercept calculation formulae: these formulae are ```=SLOPE(Data Y, Data X)``` and ```=INTERCEPT(Data Y, Data X)``` respectively and let you select data ranges for X and Y. You can use the **Function Wizard** to insert them inside a cell. These formulae are also described from [this](https://help.libreoffice.org/Chart/Trend_Lines) LibreOffice help article.


## References

* Sharp [GP2Y0A21YK](https://www.sparkfun.com/datasheets/Components/GP2Y0A21YK.pdf) and [GP2Y0A02YK0F](https://www.sparkfun.com/datasheets/Sensors/Infrared/gp2y0a02yk_e.pdf) datasheets;
* an interesting [article](https://acroname.com/blog/linearizing-sharp-ranger-data) about IR sensor linearization by **Acroname**;
* IR sensor linearization [topic](http://arduino.cc/forum/index.php?topic=56730.0) on the Arduino forum;
* Here're two links I found useful to understand how to work with LibreOffice regression line: [link 1](http://www.oooninja.com/2007/12/display-equations-for-regression-lines.html) and [link 2](https://help.libreoffice.org/Chart/Trend_Lines);

{% comment %}

* Graficare i dati in modo opportuno (specialmente disporre i **valori ADC** in modo omogeneo sull'asse delle ascisse) - creato il grafico cliccare su di esso in modo da evidenziarne l'asse delle ascisse. Cliccare con il tasto destro e selezionare la voce _Format Axis..._. Quindi, dal tab _Scale_ selezionare l'opzione _Date_ dal menù _Type_. In questo modo tutto si imposterà automaticamente per disporre le ascisse omogeneamente.

* visualizzazione di molte cifre decimali - tasto destro sulla cella, **Format Cells..**. Dal tab **Numbers** selezionare **Numbers** dalla colonna **Category**, quindi aumentare il valore del campo **Options/Decimal Places**.

* formule per il calcolo del coefficiente angolare e dell'intercetta della retta - le fomula sono rispettivamente la ```=SLOPE(Data Y, Data X)``` e ```=INTERCEPT(Data Y, Data X)```, le quali permettono di impostare quale il range dei dati per le ordinate e quali per le ascisse. Entrambe le formule sono semplici da implementare se si usa il **Function Wizard**. Le formule si trovano anche descritte in [questo articolo]() tratto dall'help di Libre Office.

{% endcomment %}
