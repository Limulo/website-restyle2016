---
layout: post
title: Animators pt4, lines
date: 2018-08-16 13:18:00
excerpt: A class to create a linear transitions
category: [coding, graphics]
usemath: true;
---

Time for a new animator!

Today we want to create an object capable to reach a destination in given time (a sort of the PD's **[line]** object).

This object accepts two arguments:

* the target value;
* the ramp time to reach it;

Normally this object is in a _quiet_ state and, when triggered, it enters the _ramp_ state.
In this state the object updates its internal _y_ value, making it change gradually till it reachs the _target_ value.
This change happens in _ramp time_ interval.

![machine]({{ site.baseurl }}/assets/images/animators-line/line-state-machine.png){: width="60%"}

Here's the final result if you want to test it: click with the mouse inside the canvas:

* orizontal position will define the next _target_ value (the diameter of the circle);
* vertical position will define the _ramp time_ to reach the new diameter (time will go from ```100``` and ```3000``` ms);

<iframe src="https://www.openprocessing.org/sketch/580779/embed/" width="100%" height="400"></iframe>

Here's the animator code (as usual we are using [Processing](https://processing.org/), it's a great tool for prototyping ):
```
class Animator_Line
{
  // time represent x axis
  int t;  // ramp time
  int x;  // delta time
  int x1; // start time
  int x2; // final time
  float y1, y2;

  // states
  final int QUIET = -1;
  final int RAMPUP  = 0;
  final int RAMPDOWN  = 1;
  int state;

  float y;

  Animator_Line ( int rampTime ) {
    t = rampTime>0.0?rampTime:1000;
    state = QUIET;
    y1 = y = 0.0;
  }

  void update() {
    if( state == RAMPUP ) {
      x = millis();
      y = (x - x1) * ( (y2 - y1)/((x2 - x1)*1.0) ) + y1;
      if( y > y2 ) {
        y = y1 = y2;
        state = QUIET;
      }
    } else if( state == RAMPDOWN ) {
      x = millis();
      y = (x - x1) * ( (y2 - y1)/((x2 - x1)*1.0) ) + y1;
      if( y < y2 ) {
        y = y1 = y2;
        state = QUIET;
      }
    }
  }

  void trigger(float target, int rampTime) {
    //println("target: " + target + "; rampTime: " + rampTime + ";");
    y2 = target;
    t  = rampTime;
    x1 = millis();
    x2 = x1 + t;
    y1 = y;
    if( y2 >= y1 )
      state = RAMPUP;
    else
      state = RAMPDOWN;
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
  PVector pos;
  int diameter;
  color c = color(255, 150, 50);
  Animator_Line anim;
  float y;

  Circle( float x, float y, int d ) {
    pos = new PVector(x, y);
    diameter = d;
    anim = new Animator_Line(1000);
    y = 0.0;
  }

  void update() {    
    anim.update();
    y = anim.getY();

  }

  void draw() {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(pos.x, pos.y, y, y);
    popStyle();
  }

  void bang( float target, int rampTime ) {
    anim.trigger( target, rampTime );
  }
}
```
And the main program code:
```
Circle c;

void setup() {
  size(300, 300);
  c = new Circle(width*0.5, height*0.5, 0);
}

void draw() {
  background( 120 );
  c.update();
  c.draw();
}

void mousePressed() {
  float target   = abs((mouseX - width*0.5)) * 2;
  int rampTime = (int)constrain(map(mouseY, 0, height, 100, 3000), 100, 3000);
  c.bang(target, rampTime);
}
```

## Future experiments

We are going to implement some new animator and eventually use them in some of our project: stay tuned for more to come!
