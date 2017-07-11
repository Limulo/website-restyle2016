---
layout: post
title: Low pass filter (revisited)
date: 2017-02-09 09:30:00
excerpt: the missed theory behind a very interesting PureData patch by Andy Farnell
category: [coding, sound]
usemath: true
---

Recently I've examined in depth the theory behind digital filters and I think I've eventually understood what is going on at page 183 of <b>Andy Farnell</b>'s **Design Sound** book. Indeed, at the end of chapter 10, Andy talks about a way to filter out quick fluctuations on a floating point number stream.

![PD float Low Pass Filter patch]({{ site.baseurl }}/assets/images/rc-filter/03-puredata-lpf.png){: width="50%"}

This patch, he says, is a simple _low pass filter_ that follows this filter equation:

$$ y_{n} = Ax_{n}+By_{n-1} $$

The strenght of the filter is set by the ratio $$ A : B $$. Both $$ A $$ and $$ B $$ should be between $$ 0.0 $$ and $$ 1.0 $$ and add up to $$ 1.0 $$.

---

As I said earlier now that I've acquired greater certainty on the subject I want to fix here some of the things I consider to be important to remember.

First of all this filter is a _recursive_ filter, i.e. a filter which feed back its previuos output to compute the next one.

Let's examine the general case first (see _Miller_ section [7.4 Recirculating Delay network](http://msp.ucsd.edu/techniques/latest/book-html/node109.html))

![general delay network]()

Frequency response

![frequency response]()

Then note that the gain at DC and $$ \frac{2 \Pi}{d} $$ multiples is $$ \frac{1}{1-g} $$

Now lets reduce the delay time to a single sample (_Miller_ section [8.2.3 Elementary recirculating filter](http://msp.ucsd.edu/techniques/latest/book-html/node135.html) and _Pirkle_ section **5.15 First-Order Feed-Back Filter Revisited**)

![diagram]()

Frequency response

![frequency response]()

filter normalization and normalization position inside the computation chain (see _Miller_ section [8.3.9 Time varying coefficients](http://msp.ucsd.edu/techniques/latest/book-html/node148.html))

How to evaluate the _cut frequency_ look at the theory in _Miller_ section [8.3.1 One-pole low-pass- filter](http://msp.ucsd.edu/techniques/latest/book-html/node140.html).


## References

Here are some of the resources which helped me the most to understand the subject:

### Books

* <b>Will Pirkle<b>'s [Designing Audio Effect Plug-in in C++](https://www.routledge.com/Designing-Audio-Effect-Plug-Ins-in-C-With-Digital-Audio-Signal-Processing/Pirkle/p/book/9780240825151) - 2013, Focal Press;
* <b>Miller Puckette<b>'s [The theory and Technique of Electronic Music](http://msp.ucsd.edu/techniques.htm)

### Links

* [katjav](https://forum.pdpatchrepo.info/user/katjav)'s' fantastic [website](http://www.katjaas.nl/home/home.html), full of very interesting (and also funny!) resources to learn digital signal processing;
* WikiPedia [Low Pass Filter](https://en.wikipedia.org/wiki/Low-pass_filter#Discrete-time_realization) page;
* [Audio Eq Cookbook](http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt);
