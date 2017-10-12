---
layout: post
title: Pixel dimensions vs. actual dimension
date: 2017-10-06 09:00:00
excerpt: how are the pixels and actual dimensions correlated?
category: [coding, graphics]
usemath: true
---


Today we focuse our attention to the interesting topic of converting pixel dimensions (i.e. of an image shown on the computer monitor) to the real-world dimension, as them may be measured using a simple ruler.

Suppose we have two different monitors with different characteristics (the last column shows the resolution we have choosen for each monitor, we could have choosen a different one which would have caused different numerical results):

| monitor | diagonal (inches) | aspect ratio | screen resolution |
| A | 19" | 16:10 | 1440x900px |
| B | 15" | 4:3 | 800x600px |

Now let's make an experiment and draw a simple square grid on the screen, we'll use _openFrameworks_ for this purpose but you can use the framework/programming language you prefer.

Here's the `main.cpp` file:

{% highlight c%}

#include "ofMain.h"
#include "ofApp.h"

int main()
{
	ofSetupOpenGL(640, 640, OF_WINDOW);
	ofRunApp( new ofApp());
}

{% endhighlight %}

Inside this file we are defining the window dimensions to be 640 pixels wide by 640 pixels high; it will be the window where we will place our grid.

Let's continue with the `App.h` _header_ file:

{% highlight c%}
#include "ofMain.h"

class ofApp : public ofBaseApp
{
private:
	float w, h;

public:
	void setup();
	void draw();
};
{% endhighlight %}

Here we define two support variables, `w` and `h`; we will use them to calculate the dimensions of each grid cell. As you see we will only use the setup and draw methods, nothing more than those.

Finally, the `App.cpp` implementation file:

{% highlight c%}
#include "ofApp.h"

void ofApp::setup()
{
  w = ofGetWidth() / 8.0;
  h = ofGetHeight() / 8.0;
}

void ofApp::draw()
{
  // draw the background
  ofSetColor(200);
  ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight() );

  ofSetColor(0);
  // draw horizontal and verticla lines
  for(int i=0; i<= 8; i++)
  {
    ofDrawLine(i*w, 0, i*w, ofGetHeight() );
    ofDrawLine(0, i*h, ofGetWidth(), i*h );
  }

  // draw diagonals
  ofDrawLine(0, 0, ofGetWidth(), ofGetHeight() );
  ofDrawLine(ofGetWidth(), 0, 0, ofGetHeight() );
}
{% endhighlight %}

We divide the window width and height creating and 8 x 8 grid made of square cells. We are drawing their outline and also the two main diagonals. This is not necessary but it can be useful so at a glance we should see if something is looking weird or not.

![grid]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/grid.png){: width="60%"}

Then we use our ruler to measure the side of the grid, as it appears on each screen, and here what it comes out:

| monitor | side (640px) |
| A | 181mm |
| B | 244mm |

As you see, the image changes if displayed on different screens, it depends on the dimensions of the single pixel which in turn is dependent on the screen resolution we've choosen for the particular monitor.

***

Now we are interested on how to obtain such a result from the information we have about _aspect ratio_ and _screen resolution_ of the particular monitor.

## Monitor A

Let's consider the first monitor, **monitor A**: it has a diagonal of 19", an aspect ratio of 16:10 and the resolution we are using now is of 1440x900 pixels.

![img 16:10]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/16-10.png)

Now, using some similarity we get:

$$
\sqrt{16^2 + 10^2} : 19" = 16 : W"
$$

and

$$
\sqrt{16^2 + 10^2} : 19" = 10 : H"
$$

Now we have obtained $$W$$ and $$H$$, so we can calculate the size of the pixel simply by dividing these values by the corresponding resolution factor:

$$
pixelA_{width} = W : 1440
$$

$$
pixelA_{height} = H : 900
$$

Here the results both in inches and millimeters:

| | width (inches/mm) | height (inches/mm) |
| screen | 16.11" / 409.24 mm | 10.06" / 255.77 mm |
| pixel | 0.0111" / 0.2841 mm | 0.0111" / 0.2841 mm  |

Note how the pixel width and height are the same! This means that the pixel has a square shape.
{: class="note" }

Now we can use a simple multiplication in order to find if we come out with the result we expect, that is 640px, shown on monitor A, measures exactly 181 mm.

$$
640 \times 0.2841 = 181.88 mm
$$

And here we are: we've got the same result!

## Monior B

This is a proof that we are doing the thing in the correct way so, let's do the same calculation for **monitor B** and we get

![img 4:3]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/4-3.png)

| | width (inches/mm) | height (inches/mm) |
| screen | 12" / 304.8 mm | 9" / 228.6 mm |
| pixel | 0.015" / 0.381 mm | 0.015" / 0.381 mm  |

then:

$$
640 \times 0.381 = 243.84 mm
$$

Here's another confirmation!

## Project

Now I want to test the same thing with a projector: the _Acer S1210_ of mine. I'm placing it at a distance of about 1mt from the wall. I've selected a resolution of 1600x1200px and a 4:3 aspect ratio.

![particular]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/P1020840.jpg){: width="60%"}

![particular]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/P1020842.jpg)

Now let's examine the measure of the grid in this situation:

![particular]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/P1020851.jpg){: width="60%"}

The grid now is more than 650 mm wide and high!

As we can read from the [user manual](https://www.acer.com/ac/en/GB/content/support-product/3985?b=1) (table at page 22), for a distance of 1mt we expect the diagonal to be 81 inches.

![S1210 manual pg22]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/projector-image.png){: width="80%"}

Giveng that, let' do some calculation:

| | width | height |
| ratio | 4 | 3 |
| resolution (px) | 1600 | 1200 |
| actual size (inches) | 64.4 | 48.6 |
| actual size (mm) | 164.592 | 123.444 |
| pixel | 0.10287 | 0.10287 |
| grid (640px) | 65,83 mm | 65,83 mm |

Everithing works as expected!

***

This observation is interesting because it also give us the possibility to use the inverse process: if we have a particular area on the screen - espressed in inches/mm - and we want to cover it with an image or a graphics, we only need some informations about the monitor (like the screen size and resolution) and then we can calcualte exactly how many pixels to use.

## References
* from WiKipedia: [Display Size](https://en.wikipedia.org/wiki/Display_size) and [Display Resolution](https://en.wikipedia.org/wiki/Display_resolution);
