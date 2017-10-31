---
layout: post
title: Animators pt2, Sine and Ramp
date: 2017-10-19 11:00:00
excerpt: A class to create sinusoidal and ramp animations
category: [coding, graphics]
usemath: true;
---

## Sine Animation

And here we are again to see [another]({{ site.baseurl }}{% post_url 2017-09-18-animators-ar-asr %}) example of procedurally generated animation.

This time we would like to create an animator which would use a `sin` function to do the job.

Below is the final result: you can interact with it by dragging the mouse from left to right in order to change the oscillation frequency from 1.0 to 4.0 cycles per second.

<iframe src="https://www.openprocessing.org/sketch/462860/embed/" width="100%" height="400"></iframe>

Here's the _animator_ code (as usual we are usign [Processing](https://processing.org/) here as the base of the prototyping):

```
class Animator_Sine
{
  float freq;
  float phase;
  float t, t0, dt;
  float y;

  Animator_Sine ( float _freq, float _phase )
  {
    freq = _freq>0.0?_freq:1;
    phase = abs(_phase)%(2*PI);
    // At the beginning 't0' and 't' are equal.
    t0 = t = (millis() * 0.001);
    dt = t - t0;
  }

  void update()
  {
    t = (millis() * 0.001);
    dt = t - t0;
    y = sin( phase + 2*PI*freq*dt );
    y = (y+1)*0.5;
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

  float getY() {
    return y;
  }
}
```
Here is where we use the Animator:
```
class Circle
{
  int diameter;
  color c = color(255, 150, 50);
  Animator_Sine sine;
  float y_sine;

  Circle( int _d )
  {
    diameter = _d;
    sine = new Animator_Sine( 1, 0.0 );
    y_sine = 0.0;
  }

  void update()
  {    
    sine.update();    
    y_sine = sine.getY();
  }

  void draw()
  {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(width/2, height/2,
            diameter*(1+y_sine),
            diameter*(1+y_sine)
            );
    popStyle();
  }

  void mouseDrag( float x )
  {
    float newFreq = constrain(x, 0.0, width);
    newFreq /= width;
    newFreq = newFreq*3 + 1;
    sine.changeFreq( newFreq );
  }
}
```
Finally this is our main program:
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

void mouseDragged()
{
  c.mouseDrag( mouseX );
}
```

What's the math behind that? So let's consider this simple illustration:

![animator sinusoids]({{ site.baseurl }}/assets/images/animators-sine-ramp/sinusoids.png)

Here two different oscillations are shown (different frequencies and intial phases):

$$
y_{1} = sin( \phi_{1} + 2 \pi f_{1} ( t - t_{0}' ))
$$

$$
y_{2} = sin( \phi_{2} + 2 \pi f_{2} ( t-t_{0}''))
$$

**Note**: we have used _single quote_ and _double quotes_ to identify times belonging respectively to the first and the latter reference system.
{: class="note"}

Now suppose we want to change the frequency in run time, it is like if we want to move from the oscillation on the left to the one shown in the right side of the illustration above.

The frequency must be updated to the new desired value and we need also to take care of the phase we are at in order not to brake the animation coherence.

How can we calculate all the needed parameters?

First we know that the two oscillations must be equal so let's force $$y_{1} = y_{2}$$ and we obtain:

$$
sin( \phi_{1} + 2 \pi f_{1} ( t-t_{0}')) = sin( \phi_{2} + 2 \pi f_{2} ( t-t_{0}''))
$$

which implies:

$$
\phi_{1} + 2 \pi f_{1} ( t-t_{0}') = \phi_{2} + 2 \pi f_{2} ( t-t_{0}'')
$$

Now let's think for a moment to the second oscillation: when doeas it assume this output?

The second oscillation will assume this exact value when its time starts counting from its relative beginning, i.e. when its time starts from its $$t_{0}''$$ reference, in other word when $$\Delta t'' = (t - t_{0}'') = 0$$.

This yields to the following result:

$$
\phi_{2} = \phi_{1} + 2 \pi f_{1} ( t-t_{0}')
$$

You can see this passage in code at the following line inside the `changeFreq` method:
```
phase = phase + 2*PI*freq*dt;
```

Now that we have the new phase we must re-initilize the time we will start counting from now on.

To do this we set $$t_{0}''$$ (the initial time for the second reference system) to the elapsed time $$t$$.

Here's the line where we do this (it is always inside the same `chageFreq` method):
```
t= millis()*0.001;
[...]
t0 = t;
```

## Ramp animations

Something similar can be done for another kind of animation. Basically what changes here is that we are not using the `sin` function anymore, instead we use a _ramp_ oscillation (_sawtooth_ if we want).

Here you can play the interactive example: drag from left to right to change the frequency from 1.0 to 4.0 cycles per second.

<iframe src="https://www.openprocessing.org/sketch/462905/embed/" width="100%" height="400"></iframe>

**Note**: there are two animated circles intead of one because there are two different animations: on the left you can see a _rising ramp_ while on the right we have a _falling_ one.
{: class="note" }

![ramps]({{ site.baseurl }}/assets/images/animators-sine-ramp/ramps.png)

Here's the code for this particular animator; we are using the boolean variable `inverse` to select if we should use the rising or the falling animation.

```
class Animator_Ramp
{
  float freq;
  float phase;
  float t, t0, dt;
  float y;
  // Set this boolean if you want the ramp
  // going the opposite direction.
  boolean inverse = false;

  Animator_Ramp ( float _freq, float _phase, boolean _inverse )
  {
    freq = _freq>0.0?_freq:1;
    phase = abs(_phase)%(2*PI);
    // At the beginning 't0' and 't' are equal.
    t0 = t = (millis() * 0.001);
    dt = t - t0;
    inverse = _inverse;
  }

  void update()
  {
    t = (millis() * 0.001);
    dt = t - t0;
    // Support variable to convert
    // the 0-2PI phase to a 0-1 one.
    float phaseT = phase/(2*PI);
    if( !inverse )
      y = (phaseT + dt*freq) % 1;
    else
      y = 1.0 - ( (phaseT + dt*freq) % 1 );
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

  float getY() {
    return y;
  }
}
```
The _Circle_ class; it isn't changed much from the previous example, we have only added two thin circles in order to show the maximum and minimum extensions of the animation:
```
class Circle
{
  float x, y;
  int diameter;
  color c = color(255, 179, 125);
  Animator_Ramp ramp;
  float y_ar;

  Circle( float _x, float _y, int _d, boolean _inverse )
  {
    x = _x;
    y = _y;
    diameter = _d;
    ramp = new Animator_Ramp( 1, 0.0, _inverse );
    y_ar = 0.0;
  }

  void update()
  {    
    ramp.update();    
    y_ar = ramp.getY();
  }

  void display()
  {
    pushStyle();
    fill( c );
    noStroke();
    ellipse(x, y, diameter*(1+y_ar), diameter*(1+y_ar));
    noFill();
    stroke(255, 200);
    ellipse(x, y, diameter*1, diameter*1);
    ellipse(x, y, diameter*2, diameter*2);
    popStyle();
  }

  void mouseDrag( float x )
  {
    float newFreq = constrain(x, 0.0, width);
    newFreq /= width;
    newFreq = newFreq*3 + 1;
    ramp.changeFreq( newFreq );
  }
}
```
Time for the main program:
```
Circle c[];

void setup()
{
  size(600, 300);
  c = new Circle[2];
  c[0] = new Circle(150, height*0.5, 100, flase);
  c[1] = new Circle(450, height*0.5, 100, true);
}

void draw()
{
  background( 125, 168, 255 );

  c[0].update();
  c[1].update();
  c[0].display();
  c[1].display();
}

void mouseDragged()
{
  c[0].mouseDrag( mouseX );
  c[1].mouseDrag( mouseX );
}
```

## Future experiments

We are going to make some future experiments to create new different kinds of animator. At the end we will have a complete collection of these and we will be albe to chose the best one according to the project needs. Stay tuned!
