---
layout: post
title: Animators
date: 2017-09-18 11:00:00
excerpt: A class to create simple animations
category: [coding, graphics]
usemath: true;
---

Say we want to create a simple animation for an object which has to appear and disappear according to specific events.

Say, when an **add** event is received, the object - from beeing completely transparent - will become more and more opaque. On the other hand, when a **remove** event is received, the object must return to a a state of complete transparency.

If we want to deal with such animation we can modify the transparency (_alpha_) value of the object color. We know that alpha normally goes from 0 to 255 but, for the sake of simplicity, we can consider a normalized interval from 0.0 to 1.0.

In order to make an animation like that, we also need to know how much time the alpha value will take to go from 0.0 to 1.0 ($$ t_{in} $$) and, on the opposite way, from 1.0 to 0.0 ($$ t_{out} $$).

Here's the graph representing the output value in time:

![graph]({{ site.baseurl }}/assets/images/animators-ar-asr/graph.png){: width="60%"}

## Linear Attack / Release Animator

The **Animator AR** class is a class to create a linear attack/release animation.

The animation will be triggered by a single event which will cause the _attack_ phase to fire. When this initial phase will be completed, the _release_ phase will be automatically triggered (without the need of a event to trigger it).

![AR state machine]({{ site.baseurl }}/assets/images/animators-ar-asr/AR-state-machine.png)

Here's the _Animator_AR_ class:

{% highlight c%}
class Animator_AR
{
  int t1, t2; // t attack, t release
  int dt;     // delta time
  int st;     // start time

  // states
  final int QUIET = -1;
  final int ATTACK  = 0;
  final int RELEASE   = 1;
  int state;

  float y;

  Animator_AR ( int t_1, int t_2 ) {
    t1 = t_1>0.0?t_1:10;
    t2 = t_2>0.0?t_2:500;
    state = QUIET;
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
        state = QUIET;
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
{% endhighlight%}

The **Animator** class is used as part of the parent class **Circle**; inside the code note where we use the animator. Animator is used to dynamically change the circle diameter:

{% highlight c%}
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_AR asr;
  float y_ar;

  Circle( int d ) {
    diameter = d;
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
{% endhighlight %}

Finally here's the main code is where a **Circle** object is used:

{% highlight c%}
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

void mousePressed() {
  c.bang();
}
{% endhighlight %}

Here you see this exact code in an interactive example: click inside the circle below to trigger the animation!

<iframe src="https://www.openprocessing.org/sketch/449430/embed/" width="100%" height="360"></iframe>

## Linear Attack / Sustain / Release Animator

Now we want to create a different animator in order to have a sligtly more complex behaviour made of three phases: attack, sustain and release. We'll call it **Animator ASR**.

![ASR state machine]({{ site.baseurl }}/assets/images/animators-ar-asr/ASR-state-machine.png)

Note that in this case we need two different "_trigger_" events, one to start the _attack_ phase, the other to fire the _release_ one.
{: class="note" }

Here's the _Animator_ASR_ class:

{% highlight c%}
class Animator_ASR
{
  int t1, t2;  // t attack, t release
  int dt;      // delta time
  int st;      // start time

  // states
  final int QUIET = -1;
  final int ATTACK  = 0;
  final int SUSTAIN  = 1;
  final int RELEASE = 2;
  int state;

  float y;

  Animator_ASR ( int t_1, int t_2 ) {
    t1 = t_1>0.0?t_1:10;
    t2 = t_2>0.0?t_2:500;
    state = QUIET;
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
        state = QUIET;
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
{% endhighlight %}

Like before, here's the **Circle** class where we use the animator. Pay attention that now the diameter stays the same, the animator is used to change the alpha value of the color!

{% highlight c%}
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_ASR asr;
  float y_asr;

  Circle( int d ) {
    diameter = d;
    asr = new Animator_ASR(1000, 2000);
    y_asr = 0.0;
  }

  void update() {    
    asr.update();
    y_asr = asr.getY();  
  }

  void draw() {
    pushStyle();
    fill( c, 255.0*y_asr );
    noStroke();
    ellipse(width/2, height/2, diameter, diameter);
    popStyle();
  }

  void add() {
    asr.triggerAttack();
  }

  void remove(){
    asr.triggerRelease();
  }
}

{% endhighlight %}

Here's the main code:

{% highlight c%}
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

void mousePressed() {
  c.add();
}

void mouseReleased() {
  c.remove();
}
{% endhighlight%}

Click and keep the mouse button pressed to trigger the _attack_ phase, then release it to trigger the _release_ phase.

<iframe src="https://www.openprocessing.org/sketch/449431/embed/" width="100%" height="360"></iframe>

**Special case**: What will happen if the _release_ phase is triggered during the _attack_ phase, when the latter isn't completed yet?
To contemplate this particular situation we have used a special algorithm inside the Animator `triggerRelease` method.
{: class="note"}

Here there's an image which is more coherent with the actual animator code:

![ASR state machine]({{ site.baseurl }}/assets/images/animators-ar-asr/ASR-state-machine-special.png)

## Put the two animator together

We can also use the two animation together in order to have an _attack_/_sustain_/_release_ animation for the alpha channel and a _attack_/_release_ animation for the diameter:

Note: we have used `1+y_asr` in order to have a diameter of the circle of at least `diameter*(1.0 + 0.0)`.
{: class="note"}

{% highlight c%}
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_AR ar;
  Animator_ASR asr;
  float y_ar, y_asr;

  Circle( int d ) {
    diameter = d;

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
{% endhighlight %}

There's the main:

{% highlight c%}
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
{% endhighlight %}


The interesting thing of having an _Animator_ class taking care of all the timing stuff and having a normalized output is  is that we can combine animations in very different ways.

Below, for example, we have the ASR animator acting, not only on the alpha channel for the color, but also on the overall amplitude of the diameter:

{% highlight c %}
fill( c, 255.0*y_asr );
noStroke();
ellipse(width/2, height/2, y_asr*diameter*(1+y_ar), y_asr*diameter*(1+y_ar));
{% endhighlight %}

Working with normalized values is a smart way of doing things because this way, anytime we want to change the Circle class, we can get rid of the Animator objects and use some other type of normalized-driver signal (a sound input for example) without change the Circle class implementeation!

## Future improvements

Now the animators are capable of creatign animations which correspond to a linear changing but what about an exponential curve animation? In future improvements we will add a more complex logic to deal with different kind of animation curves!
