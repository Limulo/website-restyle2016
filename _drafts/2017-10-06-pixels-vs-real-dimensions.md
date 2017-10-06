---
layout: post
title: pixel dimensions vs. actual dimension
date: 2017-10-06 09:00:00
excerpt: how are the pixels and actual dimensions correlated?
category: [coding, graphics]
usemath: true
---


Today we focuses our attention to the interesting topic of converting pixel dimensions (i.e. of an image shown on the computer monitor) to the real-world dimension, as them may be measured using a simple ruler.

Suppose we have two different monitor with different characteristics (the last column shows the resolution we have choosen for the two monitor, we could have choosen a different one which would have get different numerical results):

| monitor | diagonal (inches) | aspect ratio | screen resolution |
| A | 19" | 16:10 | 1440x900px |
| B | 15" | 4:3 | 800x600px |

Now let's make an experiment and draw a simple square grid on the screen, I'll use openFrameworks for the purpose but you can use any other framework/programming language you prefer.

Here's the `main.cpp` file:
```
#include "ofMain.h"
#include "ofApp.h"

int main()
{
	ofSetupOpenGL(640, 640, OF_WINDOW);
	ofRunApp( new ofApp());
}

```

Inside this file we are defining the window dimensions to be 640 pixels wide by 640 pixels high; it will be the window where we will place aour grid.

Let's continue with the `App.h` _header_ file:
```
#include "ofMain.h"

class ofApp : public ofBaseApp
{
private:
	float w, h;

public:
	void setup();
	void draw();
};
```

Here we define two support variables, `w` and `h`; we will use them to calculate the spacings of each grid cell. As you see we will only use the setup and draw methods, nothing more than those.

Finally, the `App.cpp` implementation file:
```
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
```

We divide the window width and height creating and 8 x 8 grid made of square cells. We are drawing their outline and also the two diagonals. This is not necessary but it can be useful so at a glance we should see if something is looking weird or not.

![grid]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/grid.png){: width="60%"}

Then we use our ruler to make some measurements and here what we came out with

| monitor | side (640px) |
| A | 181mm |
| B | 244mm |

As you see, the image changes if displayed on different screens, it depends on the dimensions of the single pixel which is dependent on the screen resolution we've choosen for the particular monitor.

We are interested on how to obtain such a result from the information we have about _aspect ratio_ and _screen resolution_ of the particular monitor.
Let's consider the first monitor **monitor A**: it has a diagonal of 19", an aspect ratio of 16:10 and the resolution we are usign now is of 1440x900 pixels.

![img 16:10]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/16-10.png)

Now, using some similarity we get:

$$
\sqrt{16^2 + 10^2} : 19" = 16 : W"
$$

and

$$
\sqrt{16^2 + 10^2} : 19" = 10 : H"
$$

Now we have $$W$$ and $$H$$ for monitor A, so we can calculate the size of the pixel simply by dividing these values by the corresponding resolution factor:

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

Now we can use a simple multiplication in order to find if we come out with the result we expect, that is that 640px, shown on monitor A, measures exactly 181 mm.

$$
640 \times 0.2841 = 181.88 mm
$$

And here we are: we've got the same result! This is a proof that we are doing the thing in the correct way so, let's do the same calculation for **monitor B** and we get

![img 4:3]({{ site.baseurl }}/assets/images/pixels-vs-real-dimensions/4-3.png)

| | width (inches/mm) | height (inches/mm) |
| screen | 12" / 304.8 mm | 9" / 228.6 mm |
| pixel | 0.015" / 0.381 mm | 0.015" / 0.381 mm  |

then:

$$
640 \times 0.381 = 243.84 mm
$$

Here's another confirmation!

This observation is interesting because it also give us the possibility to use the inverse process: if we have a particular area on the screen - espressed in inches/mm - and we want to cover it with an image or a graphics, we only need some informations about the monitor (like the screen size and resolution) and then we can calcualte exactly how many pixels to use.

## References
* from WiKipedia: [Display Size](https://en.wikipedia.org/wiki/Display_size) and [Display Resolution](https://en.wikipedia.org/wiki/Display_resolution);
