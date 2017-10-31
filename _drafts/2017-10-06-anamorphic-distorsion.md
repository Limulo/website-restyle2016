---
layout: post
title: Anamorphic distorsion
date: 2017-10-06 19:00:00
excerpt: How to correct a distorsion created by an inclined projector.
category: [coding, graphics]
---

The problem we are facing today seems to be related to many different computer vision applications like projection mapping, augmented reality, [anamorphic art](https://anamorphicart.wordpress.com/) a many more.

A particular case of [texture mapping](https://en.wikipedia.org/wiki/Texture_mapping) is called [projection texture mapping](https://en.wikipedia.org/wiki/Projective_texture_mapping)

A particular case of anamorphic art is the case when the image is projected on a plane (see [this link](https://anamorphicart.wordpress.com/2010/04/22/plane-anamorphosis/)).

A particular tool that will be useful in a case like this is something called [homography](https://en.wikipedia.org/wiki/Homography_%28computer_vision%29).

Fortunately there is some ofx addons which can be helpful in such a case like:
* [ofxMltMapping2D](https://github.com/morethanlogic/ofxMtlMapping2D)

Interesting [lessons](https://www.youtube.com/playlist?list=PL1pxneANaikCO1-Z0XTaljLR3SE8tgRXY) by Peter Corke.

Escher

[Julian Beever](http://www.julianbeever.net/index.php?option=com_phocagallery&view=category&id=2&Itemid=8)


## Affine transform

This is a quick example on how to manipulate a matrix to create an affine transformation.
L'[immagine](https://upload.wikimedia.org/wikipedia/commons/a/a5/Rapa-Nui-Landscape.jpg) tratta da Wikipedia.

[Shear Matrix](https://en.wikipedia.org/wiki/Shear_matrix) and [Shear mapping](https://en.wikipedia.org/wiki/Shear_mapping)

```
#include "ofMain.h"

class ofApp : public ofBaseApp
{
private:
	ofVec3f v;
	ofMatrix4x4 m;
	float* points;

	float w, h;
	float k;

	ofTexture t;
	ofPoint src[4];

public:
	void setup();
	void update();
	void draw();
	void mouseDragged(int x, int y, int button);
};


#include "ofApp.h"

void ofApp::setup()
{
  w = ofGetWidth();
  h = ofGetHeight();

  // src
  src[0].x = 0;
  src[0].y = 0;
  src[1].x = 576;
  src[1].y = 0;
  src[2].x = 576;
  src[2].y = 432;
  src[3].x = 0;
  src[3].y = 432;
x
  t.allocate(576, 432, GL_RGB);
  ofLoadImage(t, "rapanui.png");

  v.set(0, 0);

  k = 0.0;

  ofBackground( 200 );
}

void ofApp::draw()
{
  // draw the reference figure
  t.draw( src[0], src[1], src[2], src[3] );

  // draw the translate figure
  ofPushMatrix();
  ofTranslate( (w)/3, (h)/3 );
  ofMultMatrix( m ); // we apply the translation matrix
  t.draw( src[0], src[1], src[2], src[3] );
  ofPopMatrix();
}

void ofApp::mouseDragged(int x, int y, int button)
{
  k = ofMap(x, 0, ofGetWidth(), -3, 3 );
  m( 1, 0 ) = k;
  cout << ofToString( k ) << endl;
}
```
