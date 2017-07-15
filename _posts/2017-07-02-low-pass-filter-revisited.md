---
layout: post
title: Low pass filter (revisited)
date: 2017-07-02 09:30:00
excerpt: the missed theory behind a very interesting PureData patch by Andy Farnell
category: [coding, sound]
usemath: true
---

Recently I've examined in depth the theory behind digital filters and I think I've eventually understood what is going on at page 183 of <b>Andy Farnell</b>'s **Design Sound** book. Indeed, at the end of chapter 10, Andy talks about a way to filter out quick fluctuations on a floating point number stream.

![PD float Low Pass Filter patch]({{ site.baseurl }}/assets/images/rc-filter/03-puredata-lpf.png){: width="50%"}

This patch, he says, is a simple _low pass filter_ that follows this filter equation:

$$ y_{n} = A \times x_{n}+B \times y_{n-1} $$

The strenght of the filter is set by the ratio $$ A : B $$. Both $$ A $$ and $$ B $$ should be between $$ 0.0 $$ and $$ 1.0 $$ and add up to $$ 1.0 $$.

This patch was earlier mentioned [here]({{ site.baseurl }}{% post_url 2017-02-09-RC-filter %})  while now I would like to continue examing it in more depth.

---

As I said earlier now that I've acquired greater certainty on the subject I want to fix here some of the things I consider to be important to remember.

First of all, this patch is an implementation of a _recursive_ filter, i.e. a filter which feed back its previuos output to compute the next one.

Let's examine the general case first (see _Miller_ section [7.4 Recirculating Delay network](http://msp.ucsd.edu/techniques/latest/book-html/node109.html)

![general delay network]({{ site.baseurl }}/assets/images/float-filter-revisited/recirculant-delay-diagram.png){: width="30%"}

Here we add the incoming signal to a delayed copy of itself but, prior to do that, we multiply the latter by a gain factor. Here _d_ is the delay time and _g_ is the feedback coefficient.

In order to keep this network stable, _g_ must be lesser than 1!

The frequency response of such a delay netwrok configuration is shown in the image below:

![frequency response]({{ site.baseurl }}/assets/images/float-filter-revisited/recirculant-delay-freq.png)

Then note that at DC and $$ \frac{2 \pi}{d} $$ multiples the gain is $$ \frac{1}{1-g} $$.

Now lets reduce the delay time to a single sample (_Miller_ section [8.2.3 Elementary recirculating filter](http://msp.ucsd.edu/techniques/latest/book-html/node135.html) and _Pirkle_ section **5.15 First-Order Feed-Back Filter Revisited**), and draw a new diagram of the same recirculating filter:

![diagram]({{ site.baseurl }}/assets/images/float-filter-revisited/one-sample-dly.png){: width="60%"}

(Don't mind if some symbols look different from the diagram we've seen before, essentially the working principle is the same: the incoming signal is added with a deleyad copy of itself. The delay last only 1 single sample and the delay copy is scaled down usign _g_, the feedback coefficient.)

The frequency response is similar to the one from before, the only difference is in where these peaks are:

![frequency response]({{ site.baseurl }}/assets/images/float-filter-revisited/one-sample-dly-freq.png)

Now the peaks are located at $$2\pi$$ multiples which means we have a peak at DC and one at Nyquist ($$\frac{f_s}{2}$$). If we concentrate our attention only on the audible spectrum (approximately from 0 to $$\pi$$ radians) we can see this delay network behaves like a **low pass filter**!

Now, what about if we want unity gain at these peaks? We can multiply the input signal for a normalization factor of $$1-g$$:

![diagram]({{ site.baseurl }}/assets/images/float-filter-revisited/one-sample-dly-normalized.png){: width="60%"}

An interesting thing to note here is the place we inserted the normalization factor: we placed on the input side instead of the output. Even if in theory it would have been the same thing, we need to consider some side effects as described by _Miller_ in section [8.3.9 Time varying coefficients](http://msp.ucsd.edu/techniques/latest/book-html/node148.html).
{: class="dashed"}

Now let's pause for a moment and look back where we started. Now its clearer where the theory behind Farnell patch comes from: the $$B$$ coefficient is indeed the _feedback coefficient_ of a recirculating delay network (_g_) while $$A$$, used to multiply the input, is the _normalization factor_ (we saw its value is equal to $$1-g$$).

Now the formula below becomes pretty starightforward

$$ y_{n} = A \times x_{n}+B \times y_{n-1} $$

it is indeed the same as

$$ y_{n} = (1-g) \times x_{n} + g \times y_{n-1} | g \in [0, 1]$$

Now is also clear why $$B$$ (and $$A$$) must be lesser than one and $$A$$ and $$B$$ must sum up to 1: this is the "_recipe_" to build up a low pass filter!

But how to set _g_ in order to get a filter with the exact cutoff frequency we want?

## Cut frequency eveluation

On how to solve this problem, I suggest to take a look to the theory (_Miller_ section [8.3.1 One-pole low-pass-filter](http://msp.ucsd.edu/techniques/latest/book-html/node140.html)) while here we can make the long story short.

We can say that, for geometrical considerations on the complex plane (see image below),

![complex plane]({{ site.baseurl }}/assets/images/float-filter-revisited/complex-plane.png)

 ...if we consider an _half power pulsation_ which is relatively small, we can also write:

$$ \omega_{-3dB} \simeq 1 - g $$

which implies that, beeing $$R$$ the sampling frequency, we can obtain the _cut frequency_ ($$f_c$$) from the relation below:

$$f_c = \frac{\omega_{-3dB} \times R}{2\pi} $$

which can be further transformed into

$$f_c = \frac{(1-g) \times R}{2\pi} $$

Using this formula we can get both the _normalization factor_ and the _feedback coefficient_, having the _cutoff frequency_ and the _sampling rate_!

$$1-g = \frac{2\pi \times f_c}{R}$$

$$g = 1 - \frac{2\pi \times f_c}{R}$$

## References

Here are some of the resources which helped me the most to understand the subject:

### Books

* <b>Will Pirkle</b>'s [Designing Audio Effect Plug-in in C++](https://www.routledge.com/Designing-Audio-Effect-Plug-Ins-in-C-With-Digital-Audio-Signal-Processing/Pirkle/p/book/9780240825151) - 2013, Focal Press;
* <b>Miller Puckette</b>'s [The theory and Technique of Electronic Music](http://msp.ucsd.edu/techniques.htm)

### Links

* [katjav](https://forum.pdpatchrepo.info/user/katjav)'s' fantastic [website](http://www.katjaas.nl/home/home.html), full of very interesting (and also funny!) resources to learn digital signal processing;
* WikiPedia [Low Pass Filter](https://en.wikipedia.org/wiki/Low-pass_filter#Discrete-time_realization) page;
* [Audio Eq Cookbook](http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt);
