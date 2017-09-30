---
layout: post
title: Sharp IR distance sensor linearization
date: 2017-08-06 11:00:00
excerpt: how to find the correct formula for sensor data linearization
category: [coding, physical-computing]
usemath: true
---

Say we want to create a simple animation for an object which has to appear and disappear according to specific events. When an **add** event is received the object, from beeing completely transparent, will become more and more opaque. When a **remove** event is received the object must return to a complete transparency.

To do that we can modify the transparency (_alpha_) value of the object color. Now we know that alphanormally goes from 0 to 255 but, for the sake of semplicity, we can consider a normalized interval from 0.0 to 1.0.

In order to make an animation like that, we also need to know how much time the alpha value will take to go from 0.0 to 1.0 ($$ t_{in} $$) and, on the opposite way, from 1.0 to 0.0 ($$ t_{out} $$).

Here's the graph representing the alpha value in time:


## Linear Attack / Release Animator

![immagine macchian a stati](macchina a stati animatore AR)

The **Animator AR** class is a class to create a linear attack and release animation. Here's the Animator_AR class:
```
class Animator_AR
{
  int t1, t2; // t attack, t release
  int dt;     // delta time
  int st;     // start time

  // states
  final int INVALID = -1;
  final int ATTACK  = 0;
  final int RELEASE   = 1;
  int state;

  float y;

  Animator_AR ( int _t1, int _t2 ) {
    t1 = _t1>0.0?_t1:10;
    t2 = _t2>0.0?_t2:500;
    state = INVALID;
  }

  void update() {
    if( state == ATTACK ) {
      dt = millis() - st;
      y = (1.0*dt)/t1;
      if( y > 1.0 ) {
        y = 1.0;
        st = millis();
        state = RELEASE;
      }
    } else if ( state == RELEASE ) {
      dt = millis() - st;
      y = 1.0 - (1.0*dt/t2);
      if( y < 0.0 ) {
        y = 0.0;
        state = INVALID;
      }
    }
  }

  void trigger() {
    st = millis();
    state = ATTACK;
  }

  float getY() {
    return y;
  }
}
```
Here we use the class
```
Circle c;

void setup() {
  size(300, 300);
  c = new Circle(100);
}

void draw() {
  background( 120 );
  c.update();
  c.draw();
}

void keyPressed() {
  if( key == 't' ) {
    c.bang();
  }
}
```
We are usign the **Circle** class inside which we define an instace of the animator.
```
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_AR asr;
  float y_ar;

  Circle( int _d ) {
    ar = new Animator_AR(500, 1500);
    y_ar = 0.0;
  }

  void update() {    
    ar.update();
    y_ar = ar.getY();  
  }

  void draw() {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(width/2, height/2, diameter*y_ar, diameter*y_ar);
    popStyle();
  }

  void bang() {
    ar.trigger();
  }
}
```

<iframe src="https://www.openprocessing.org/sketch/449430/embed/" width="100%" height="300"></iframe>

## Linear Attack / Sustain / Release Animator

![immagine macchian a stati](macchina a stati animatore ASR)

The **Animator ASR** class is a class to create a linear attack, sustain and release animation. Here's the Animator_ASR class:
```
class Animator_ASR
{
  int t1, t2;  // t attack, t release
  int dt;      // delta time
  int st;      // start time

  // states
  final int INVALID = -1;
  final int ATTACK  = 0;
  final int SUSTAIN  = 1;
  final int RELEASE = 2;
  int state;

  float y;

  Animator_ASR ( int _t1, int _t2 ) {
    t1 = _t1>0.0?_t1:10;
    t2 = _t2>0.0?_t2:500;
    state = INVALID;
  }

  void update()
  {
    if(state == ATTACK) {
      dt = millis() - st;
      y =  (1.0*dt)/t1;
      if(y > 1.0) {
        y = 1.0;
        state = SUSTAIN;
      }
    } else if( state == RELEASE ) {
      dt = millis() - st;
      y =  1.0 - ( (1.0*dt)/t2 );
      if(y < 0.0) {
        y = 0.0;
        state = INVALID;
      }
    }
  }

  void triggerAttack() {
    state = ATTACK;
    st = millis();
  }

  void triggerRelease(){
    if(state == SUSTAIN) {
      st = millis();
    }
    else if (state == ATTACK) {
      st = int( millis()*(1+((1.0*t2)/t1)) - t2*(1 + ((1.0*st)/t1)) );
    }
    state = RELEASE;
  }

  float getY() {
    return y;
  }
}
```

Here we use the class

```
Circle c;

void setup() {
  size(300, 300);
  c = new Circle(100);
}

void draw() {
  background( 120 );
  c.update();
  c.draw();
}

void keyPressed() {
  if( key == 'a' ) {
    c.add();
  } else if ( key == 'r' ) {
    c.remove();
  }
}
```
We are usign the **Circle** class inside which we define an instace of the animator.
```
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_ASR asr;
  float y_asr;

  Circle( int _d ) {
    asr = new Animator_ASR(1000, 2000);
    y_asr = 0.0;
  }

  void update() {    
    asr.update();
    y_asr = asr.getY();  
  }

  void draw() {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(width/2, height/2, diameter*y_asr, diameter*y_asr);
    popStyle();
  }

  void add() {
    asr.triggerAttack();
  }

  void remove(){
    asr.triggerRelease();
  }
}
```

## Put the two animator together

We can also use the two animation together in order to have an _attack_ / _sustain_ / _release_ animation for the alpha channel and a _attack_/_release_ animation for the diameter:

Note: we have used `1+y_asr` in order to have a diameter of the circle of at least `diameter*(1.0 + 0.0)`.
{: class="note"}

```
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_AR ar;
  Animator_ASR asr;
  float y_ar, y_asr;

  Circle( int _d ) {
    diameter = _d;

    ar = new Animator_AR(50, 670);
    asr = new Animator_ASR(1200, 3500);

    y_ar = 0.0;
    y_asr = 0.0;
  }

  void update() {    
    ar.update();
    asr.update();

    y_ar = ar.getY();
    y_asr = asr.getY();
  }

  void draw() {
    pushStyle();
    fill( c, 255.0*y_asr );
    noStroke();
    ellipse(width/2, height/2, diameter*(1+y_ar), diameter*(1+y_ar));
    popStyle();
  }

  void add() {
    asr.triggerAttack();
  }

  void remove(){
    asr.triggerRelease();
  }

  void bang() {
    ar.trigger();
  }
}
```
There's the main:
```
Circle c;

void setup()
{
  size(300, 300);
  c = new Circle(100);
}

void draw()
{
  background( 120 );
  c.update();
  c.draw();
}

void keyPressed()
{
  if( key == 'a' ) {
    c.add();
  } else if ( key == 'r' ) {
    c.remove();
  } else if( key == 't' ) {
    c.bang();
  }
}
```

<iframe src="https://www.openprocessing.org/sketch/449431/embed/" width="100%" height="300"></iframe>

The interesting thing of having an Animator class taking care of all the timing stuff and having a normalized output is  is taht we can combine animations in very different ways.

Here, for example, we have the ASR animator acting not only on the alpha channel for the color but also on the overall amplitude of the diameter:
```
fill( c, 255.0*y_asr );
noStroke();
ellipse(width/2, height/2, y_asr*diameter*(1+y_ar), y_asr*diameter*(1+y_ar));
```
Having the outputs from the Animators as normalized values is also useful because we can substitute them with other values, coming from the sound amplitude for example, without changing the _Circle class_ implementation.
