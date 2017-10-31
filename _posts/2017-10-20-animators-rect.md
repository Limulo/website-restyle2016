---
layout: post
title: Animators pt3, rectangles
date: 2017-10-20 14:00:00
excerpt: A class to create a rectangle shaped animations
category: [coding, graphics]
usemath: true;
---

Eventually, after the [sine and ramp animations]({{ site.baseurl }}{% post_url 2017-10-19-animators-sine-ramp %}), is time to push the thing a little further.

Here we have used what developed in the previous posts to create a brand new animation: a rectangular one!

The theory is pretty straightforward, we are usign a ramp animation and we are setting a threshold. This threshold is variable between 0.0 and 1.0: we are using it to see when the ramp is below or above it.

We use the answer from the comparison to output a value which is respectively 1.0 or 0.0.
This way we can move the threshold up and down obtaining a different [duty cycle](https://en.wikipedia.org/wiki/Duty_cycle) for the rectangular output signal.

![animator rects]({{ site.baseurl }}/assets/images/animators-rect/rects.png)

Here's the final result if you want to test it: drag the mouse horizontally from left to right if you want to change the animation frequency between 1.0 to 4.0 cycle per second. You can drag the mouse vertically too to change the duty cycle between 0.25 to a maximum of 0.75.

<iframe src="https://www.openprocessing.org/sketch/462972/embed/" width="100%" height="400"></iframe>

Here's the animator code (as usual we are using [Processing](https://processing.org/), it's a great tool for prototyping ):
```
class Animator_Rec
{
  float freq;
  float phase;
  float t, t0, dt;
  float ctrl, y;
  float duty;

  Animator_Rec( float _freq, float _phase, float _duty )
  {
    freq = _freq>0.0?_freq:1;
    phase = abs(_phase)%(2*PI);
    // At the beginning 't0' and 't' are equal.
    t0 = t = (millis() * 0.001);
    dt = t - t0;
    ctrl = y = 0.0;
    duty = 0.0;
    changeDutyCycle( _duty );
  }

  void update()
  {
    t = (millis() * 0.001);
    dt = t - t0;
    // Support variable to convert
    // the 0-2PI phase to a 0-1 one.
    float phaseT = phase/(2*PI);

    ctrl = (phaseT + dt*freq) % 1;

    if( ctrl <= duty )
      y = 1.0;
    else
      y = 0.0;      
  }

  void changeFreq( float _freq )
  {
    // calculate the phase for the
    // upcoming sinusoid
    t = (millis() * 0.001);
    dt = t - t0;
    phase = phase + 2*PI*freq*dt;
    phase = phase % (2*PI);
    // define the new 't0' which is the
    // new reference for counting time
    t0 = t;
    // Finally, set the new frequency
    freq = _freq;
  }

  void changeDutyCycle( float _duty )
  {
    duty = _duty;
    if( duty > 1.0 )
      duty = 1.0;
    else if( duty < 0.0 )
      duty = 0.0;
  }

  float getY() {
    return y;
  }
}
```
The Circle class:
```
class Circle
{
  float x, y;
  int diameter;
  color c = color(137, 97, 255);
  Animator_Rec rec;
  float y_rec;

  Circle( float _x, float _y, int _d ) {
    x = _x;
    y = _y;
    diameter = _d;

    rec = new Animator_Rec( 1, 0.0, 0.5 );
    y_rec = 0.0;
  }

  void update()
  {    
    rec.update();    
    y_rec = rec.getY();
  }

  void display()
  {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(x, y, diameter*(1+y_rec), diameter*(1+y_rec));
    noFill();
    stroke(255, 200);
    ellipse(x, y, diameter*1, diameter*1);
    ellipse(x, y, diameter*2, diameter*2);
    popStyle();
  }

  void mouseDrag( float x, float y )
  {
    float newFreq = constrain(x, 0.0, width);
    newFreq /= width;
    newFreq = newFreq*3 + 1;
    rec.changeFreq( newFreq );

    float dc = constrain(y, 0.0, height);
    dc /= height;
    dc = dc * 0.5 + 0.25;
    rec.changeDutyCycle( dc );
  }
}
```
And the main program code:
```
Circle c;

void setup()
{
  size(300, 300);
  c = new Circle(width*0.5, height*0.5, 100);
}

void draw()
{
  background( 255, 197, 97 );

  c.update();
  c.display();
}

void mouseDragged()
{
  c.mouseDrag( mouseX, mouseY );
}
```

## Future experiments

We are going to implement some new animator and eventually use them in some of our project: stay tuned for more to come!
