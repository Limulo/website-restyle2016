---
layout: post
title: Processing Virtual Oscilloscope
date: 2017-02-09 09:30:00
excerpt: A processing sketch to plot data coming from Arduino!
category: [coding, physical-computing]
---

We have created this sketch because we don't have a real oscilloscope and we've tried to find a confortable way to plot signals we read from different kind of analog sensors usign our Arduino board.

This can be a solution when you are sending data coming from multiple sensors and you can't use the _Arduino Serial plotter_ tool.

Here's a screenshot of the _virtual oscilloscope_ plotting signals from two potentiometers.

![plotter in action screenshot ]({{ site.baseurl }}/assets/images/processing-oscilloscope/screenshot.png)

As you can see, the graphs from the two potentiomenters are drawn one below the other. The oscilloscope shows also a series of vertical red lines in order to mark the time (one line for each second passed).

You can also use the _screenshot mode_ to freeze the image. You can use the mouse and place the cursor over the curves to examine them in more detail.

## Installation

In order to use this _virtual oscilloscope_ you simply need to have [Processing](https://processing.org/) and [Arduino](https://www.arduino.cc/) up and running.

## How to use it

### Theory

We know that Arduino quantizes the analog input values usign **10bit**: analog readings from Arduino can be expressed as number from 0 to 1023. So, In order to maintain the higher fidelity with the original 10bit sampled signal and not to loose any information in sending these information via serial, we need 2 byte at least.

Taking inspiration from the MIDI protocol, we decided to split these 10bit numbers into two part:

* the most significant bits are contained inside a first byte that is always sent as the first of a sequence of two; we call it the **status byte**;
* a second byte, we call it the **data byte**, is sent immediately after the _status_ one and contains the remainig bits (the least significants).

On the receiver side, we needed a way for Processing to differentiate between _status_ and _data_ bytes, so we dedicated the most significant bit of these two types of byte for the purpose:

* when the oscilloscope reads a byte whose most significan bit is 1, he knows it is a _status byte_;
* when this bit is 0, he knows he is reading a _data byte_ instead;

We use the remaining 4 bit of the status byte to send information about the _sensor number_: this is a useful information we can use if there are more than one analog signal we want to plot (using this protol we can plot up to 16 sensors simultaneosly)!

![byte structure]({{ site.baseurl }}/assets/images/processing-oscilloscope/messages-protocol.png)

### Sender side: Arduino

Once you have created your circuit and your Arduino program and you want to plot some data from it, you have to add some line of code to your Arduino sketch in order to correctly format the data and send them via serial to the _virtual oscilloscope_.

Suppose your circuit is a circuit like that:

![fritzing circuit]({{ site.baseurl }}/assets/images/processing-oscilloscope/fritzing_sketch_bb.png)


Here we are using 2 potentiometers and we are reading their analog values via the Arduino analog pins 0 and 3 respectively. The code we will use to convert data and send them over serial is the following:

{% highlight c %}
boolean bSendToPlotter;

// SETUP //////////////////////////////////
void setup() {
  Serial.begin( 9600 );
  bSendToPlotter = false;
}

// DRAW ///////////////////////////////////
void loop() {

  if( bSendToPlotter )
  {
    analogPlot( 0, 0 );
    analogPlot( 3, 1 );
  }
}

// ANALOG PLOT ////////////////////////////
void analogPlot( int _analogPinNumber, int _addr )
{
  int value = analogRead( _analogPinNumber );

  byte lower = value & 0x7F; // 0x7F = 0111 1111
  byte addr = _addr & 0x0F; // 0x0F = 0000 1111
  byte upper = (value >> 7) | (addr << 3) | 0x80; // 0x80 = 1000 0000

  Serial.write( upper );
  Serial.write( lower );
  delay( 1 );
}

// SERIAL EVENT ///////////////////////////
void serialEvent()
{
  byte b = Serial.read();
  if (b == 'o' || b == 'O')
    bSendToPlotter = true;
  else if (b == 'c' || b == 'C')
    bSendToPlotter = false;
  //else if (b == 'r')
    // do something like a reset
}
{% endhighlight %}

As you see, here we call the function ```analogPlot``` once for each potentiometer, passing the _analogPin number_ and the _plotter graph address_ as arguments. This way the values coming from the first potentiometer will be plotted on the first graph, the upper one, while the second graph will plot data coming from the second potentiometer which is connected to analog pin 3.

### Receiver side: Processing

By default the _virtual oscilloscope_ expects receiving 2 analog sensor readings and it plots them as line graphs of **512 points** in resolution.

If you want you can always change these values acting respectively on the variable ```int N = 2;``` and ```int K = 512;``` in the Processing code. Obviously you have also to update your Arduino code accordingly.

This is the Processing code:

{% highlight java %}
import processing.serial.*;
Serial s_port;
boolean bSerialListen;

// incoming serial data
int sensorAddr, upper, lower;

int N = 2;   // number of sensor to be plotted
int K = 512; // number of values to be stored
Graph graphs[];

// plotter and graph interface aspect elements
int topMargin    = 50;
int bottomMargin = 50;
int leftMargin   = 50;
int rightMargin  = 50;
float plotterWidth, plotterHeight;
float graphHeight;
int intergraphMargin = 10;

boolean bScreenShotMode;

PFont f;

// SETUP ////////////////////////////////////////
void setup()
{
  size( 700, 512 );
  frameRate(30);
  smooth();

  f = createFont("Courier", 14);

  //println(Serial.list());
  s_port = new Serial(this, Serial.list()[0], 9600);
  bSerialListen = false;

  plotterWidth  = width - leftMargin - rightMargin;
  plotterHeight = height- topMargin - bottomMargin;
  graphHeight = plotterHeight / N - intergraphMargin;

  graphs = new Graph[ N ];
  for( int i=0; i<N; i++ )
  {
    float x = leftMargin;
    float y = topMargin + (graphHeight + intergraphMargin)*i;
    graphs[i] = new Graph( x, y, plotterWidth, graphHeight, K);
  }
  sensorAddr = 0;
  upper = 0;
  lower = 0;
  bScreenShotMode = false;
}

// DRAW /////////////////////////////////////////
void draw()
{
  background(0);

  // display plotter area
  noStroke();
  fill(0, 0, 255);
  rect( leftMargin, topMargin, plotterWidth, plotterHeight );

  // display graps
  if( bSerialListen ) {
    for(int i=0; i<N; i++)
      graphs[i].display();
  }
}

// SERIAL EVENT /////////////////////////////////
void serialEvent(Serial s)
{
  int b = s.read();
  if (b >= 128 )
  {
    // a "status" byte
    sensorAddr = (b & 0x78) >> 3;  // 0111 1000
    upper = b & 0x07;    // 0000 0111  
    //print( sensorAddr + ": [" + upper + "]+");
  }
  else
  {
    if( sensorAddr < N )
    {
      // a "data" byte
      lower = b & 0x7F; // 0111 1111
      int value = (upper << 7) | lower ;
      //println("[" + lower + "] = " + value);

      if( !bScreenShotMode ) {
        // now that we have read the complete 10bit value
        // from the serial port we can write it inside the
        // corresponding array.
        graphs[ sensorAddr ].insertNewReading( value );
      }                                    
    }
  }
}


// KEYBOARD /////////////////////////////////////
void keyPressed()
{
  if (key == 'o' || key == 'O')
  {
    println("open");
    s_port.write('o');
    bSerialListen = true;
  }
  else if( key == 'c' || key == 'C')
  {
    println("close");
    s_port.write('c');
    bSerialListen = false;
  }
  else if (key == ' ')
  {
    // screenshot mode: we have to stop the
    // screen to be refreshed with new values and
    // maintain the last visualization
    bScreenShotMode = !bScreenShotMode;
    if( bScreenShotMode )
    {
    for(int i=0; i<N; i++)
      graphs[i].screenshotMode();
      //lastCurrent[ i ] = current[ i ];
    }
  }
}

// MOUSE ////////////////////////////////////////
void mouseMoved()
{
  for(int i=0; i<N; i++)
  {
    graphs[i].mouseInteraction( mouseX, mouseY );
  }
}

// GRAPH CLASS //////////////////////////////////
class Graph
{
  int K; //# of values to store
  int values[];
  int times[];

  int currentIndex, lastIndex;

  // interface aspect
  float x, y, w, h, stepWidth;

  // TIMES
  long lastTime;

  int mouseCoordsX, mouseCoordsY;
  boolean bInside;

  /* CONSTRUCTOR *********************************/
  Graph(float _x, float _y, float _w, float _h, int _K)
  {
    x = _x;
    y = _y;
    w = _w;
    h = _h;
    K = _K;
    stepWidth = w / K;

    values = new int[K];
    times = new int[K];
    for(int j=0; j<K; j++)
    {
      values[j] = 0;
      times[j] = 0;
    }

    currentIndex =  0;
    lastIndex = 0;  
    lastTime = millis();

    bInside = false;
  }

  /* DISPLAY *************************************/
  void display()
  {

    pushMatrix();
    translate( x, y );

    /* SHAPE */
    noFill();
    stroke(255);
    strokeWeight(3);
    beginShape();
    for(int i=0; i<K; i++)
    {
      // we draw the graph from right to left
      int graphIndex = K - i;

      // we read the 'values' array from right to left
      // beginning with the last value we have stored.
      // this way we have the most recent value we have read to the right.
      // NOTE: inside currentIndex now we have an index that is grater of 1 unit
      // that the one where we placed the last reading from the sensor.
      // This is why we are not usign the following formula
      // int valuesIndex = (K-1) - ((K - 1 - currentIndex ) + i) % K;
      int valuesIndex;
      if( bScreenShotMode )
        valuesIndex = (K-1) - ((K - lastIndex ) + i) % K;
      else
        valuesIndex = (K-1) - ((K - currentIndex ) + i) % K;
      int v = values[ valuesIndex ];
      v = (int) map(v, 0, 1023, 0, h);

      // draw time lines ****************************************************
      if( times[valuesIndex] == 1 )
      {
        pushStyle();
        stroke(255, 0, 0);
        strokeWeight(1);
        line(graphIndex*stepWidth, h, graphIndex*stepWidth, 0);
        popStyle();
      }

      // draw grap line *****************************************************
      vertex(graphIndex*stepWidth, h-v);
    }
    endShape();

    // display graph outline
    noFill();
    strokeWeight(1);
    stroke(0, 255, 0);
    rect(0, 0, w, h);

    popMatrix();

    // display mouse cursor
    if( bInside )
    {
      stroke(255, 255, 0);
      strokeWeight(1);
      line( mouseCoordsX, y, mouseCoordsX, y+h); // vertical line  

      // we want to obtain the stored value inside the values
      // array according to the mouse position on the graph.
      int mappedMouseX = (int) map( constrain(mouseCoordsX-x, 0, w) , 0, w, K, 0);

      int valuesIndex;
      if( bScreenShotMode )
        valuesIndex = (K-1) - ((K - lastIndex ) + mappedMouseX) % K;
      else
        valuesIndex = (K-1) - ((K - currentIndex ) + mappedMouseX) % K;
      int v = values[ valuesIndex ];

      float vMapped = map(v, 0, 1024, h, 0);
      line( x, y+vMapped, x+w, y+vMapped);  // horizontal line

      // text
      textAlign(LEFT);
      fill(255);
      textFont(f);
      text(v +";", x-40, y+vMapped);
    }

  }

  /* INSERT NEW READINGS *************************/
  void insertNewReading( int value )
  {
    values[ currentIndex ] = value;

    // TIME
    if(millis() - lastTime >= 1000)
    {
      times[ currentIndex ] = 1;
      lastTime = millis();
    }
    else
    {
      times[ currentIndex ] = 0;
    }

    // we update the index so to be ready to
    // store the next incoming value from teh sensor
    currentIndex = ( ++currentIndex ) % K;

  }

  /* SCREENSHOT MODE *****************************/
  void screenshotMode()
  {
    lastIndex = currentIndex;
  }

  /* MOUSE ***************************************/
  void mouseInteraction( int _mouseX, int _mouseY )
  {
    mouseCoordsX = _mouseX;
    mouseCoordsY = _mouseY;
    // mouse inside graph area
    if( mouseCoordsX > x && mouseCoordsX < x + w && mouseCoordsY > y && mouseCoordsY < y + h )
      bInside = true;
    else
      bInside = false;    
  }
} // Graph class
{% endhighlight %}

---

Once the _virtual oscilloscope_ has been lauched, you can enable the serial communication with the Arduino board by pressing the **o** or **O** keys. This way the Arduino board will start to send bytes over the USB connection to the Processing sketch.

If you want to close the serial communication press **c** or **C**: this will interrupt the byte flow.

### Screenshot Mode

Every time you want to pause the continuous plotting and examine a fixed portion of the graphs simply press the **spacebar**. This will make the plotter enter its _screenshot mode_.

When in _screenshot mode_ the plotter will continue receiving serial data from the Arduino board but it will discard them while continuously drawing a fixed image showing the last portion of the graphs.

### Mouse interaction

Every time you move the mouse on a graph, both in _screenshot mode_ than not, a vertical and an horizontal line will appear.

These lines respectively represent the mouse horizontal position - among the 512 stored values - and the corresponding graph value. You will also see a numeric value on the left indicating the 10bit value as originally read by the Arduino board.

## Notes

For a more updated version of the code, please visit the [GitHub repository](https://github.com/Limulo/Processing-oscilloscope).
