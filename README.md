Welcome in this repo!

This is the place where we are saving our **WIP** files for [limulo.net](http://www.limulo.net) website.

For this particular restyle we are using a Jekyll theme called [**Hyde**](http://hyde.getpoole.com/) made by [Mark Otto](https://twitter.com/mdo).

## How to deploy changes

### phase 1: update the repository
First we need to update this git repository the usual way, using ```git add```, ```git commit``` and ```git push```.

### phase 2
Than we need to compile the site an upload it to the server usign **Filezilla**.

The command to use to compile is
```
bundle exec jekyll build
```
Possibly you can use the ```--future``` argument.

Then you need to open **FileZilla** and upload the ```_site``` folder content.

Use the following options which makes the job easier:
* toggle _synchronized browsing_ on;
* toggle _directory comparison_ on;
* "_overwrite if different size or source newer_" + "_Always use this action_";

## How to create a page

If you want the page to appears inside the sidebar you have to give that page a **front matter** like the one shown below

```
	---
	layout: page
	title: myAwsomwTitle
	---
```

where you explicitly define the title for the page.

If you don't want your page to appear in the sidebar, simply put the title of the page outside the **front matter**:

```
	---
  	layout: page
  	---
	# myAwsomwTitle
```

## How to create a post

to create a post put relevant information inside the **front matter** such as:

* title
* date
* excerpt
* categories

A post cannot avoid having at least one **category** since categories provides the site navigation logic. If you want your post to have more than one category, simply put all of them inside square brackets, comma separeted. For example:

 	category: [installation, issue]

A post can also have a shortcut image that will be shown at the bottom of the **homepage**.

	shortcut: shortcut-jags.png

If you don't specified a dedicated image for the post, the post will be given a default image accoring to its belonging to a particular category.

In this case you will not see the post listed in the homepage but you can access the post browsing its category page.  

### Categories

Here a list of the categories currently in use:

* sound-design: work, tool
* installation: _none_, soundface, issue
* coding: math, physics, graphics, physical-computing, sound
* game: experiment, scumm, technique, abandonia(?)
* teaching: _none_
* linuxday2016: installation

## How to create Tables
[Here](http://kramdown.gettalong.org/syntax.html#tables) you can find more information, but in general below the code you can use to creare a simple table with an header and content centered:

```
header cell 1 | header cell 2 | header cell 3
| :-: | :-: | :-: |
data 1 | data 2 | data 3
```

## How to create a NOTE section
To create a **note** section, simly put this line of code after the paragraph end (on a new line):

```
{: .note}
```

## How to create a .png shortcut from a font awesome character
Use [font-awesome-png-converter](https://github.com/Pythonity/icon-font-to-png), an interesting utility to convert vectorial fonts into png images.

Donwload the last **Font awesome** archive and browse inside it.

Use the following command to generate the `IMAGE` from the corresponding `CHARACTER`:

```
icon-font-to-png --css ../css/font-awesome.css --ttf ./fontawesome-webfont.ttf --size 110 CHARACTER --filename IMAGE
```

## How to render Math formulae inside a post

We can use [MathJax](https://www.mathjax.org/) as explained in the Jekyll Documentation [here](http://jekyllrb.com/docs/extras/#math-support).

If you want to write a mathematical formula you have to create a _math latex block_ ([here](https://en.wikibooks.org/wiki/LaTeX/Mathematics) some info on how to create latex formulae), than you have to surround it with _two dollar sign_:

```
$$ x+y = 5 $$
```

## How to create a LaTeX formula inside an Inkscape images

Use the ```Extensions -> Render -> LaTeX formula...``` extension. In the editable field add LaTeX formulae like the one shown below:

```
$\frac{1}{\sqrt{2}}$
```

## How to have synthax highlighted

Use these _liquid_ tags before and after code blocks. [Here](http://pygments.org/languages/)'s a list of supported languages.

```
{% highlight c %}

	[code blocks]

{% endhighlight %}
```

## NOTE

Because of the filesystem structure of the website,

![website structure](http://www.limulo.net/website/website-structure-1.png){: width="40%"}

we are usign 2 important **YAML** variable inside the ```config.yml``` file:

* url: ```http://www.limulo.net```
* baseurl: ```/website```

We have to pay attention when we create:

### links to posts inside Liquid block code

Use the folling code for links:

```
<h3 class="post-title"><a href="{{ site.baseurl }}{{post.url}}">{{ post.title }}</a></h3>
```

instead of this:

```
<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
```

### internal link between posts

Use this synthax:

```
[here'a link between post]({{ site.baseurl }}{% post_url 2015-02-01-name-of-the-post %})
```
instead of this:

```
[here'a link between post]({% post_url 2015-02-01-name-of-the-post %})
```

### images

Use the following code in inserting images:

```
![image]({{ site.baseurl }}/assets/images/petunia-la-rana/festa-mondiale-zanzare-2011.jpg)
```

instead of this one:

```
![image](/assets/images/petunia-la-rana/festa-mondiale-zanzare-2011.jpg)
```

## Loading Problems

Because we want to load **MathJax** and **FontAwesome** scripts only when it is necessary, we inserted inside the ```head.html``` file some Liquid Code to prevent these scripts to be loaded in each page of the web site.

Thisi code checks if the page/post contains special variables inside the _Front Matter_ so to decide if the corresponding script has to be loaded.

Here's the code:

```
{% if page.usefa %}
<!-- Font Awesome -->
<script src="https://use.fontawesome.com/d68500c562.js"></script>
{% endif %}

{% if page.usemath %}
<!-- MathJax for matemathics formulae rendering -->
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
{% endif %}
```

If you want your page to use math formulae remember to insert the variable ```usemath``` in the _Front Matter_ like this:

```
...
usemath: true
___
```


## How to deploy the site

[Here](http://jekyllrb.com/docs/deployment-methods/) you will find a useful link!

## Analytics

We use [Open Web Analytics](http://www.openwebanalytics.com/).
[Direct link](http://www.limulo.net/analytics) to our site analytics.
[Wiki](https://github.com/padams/Open-Web-Analytics/wiki)

## Useful links

* [Liquid Syntax](https://github.com/shopify/liquid/wiki/Liquid-for-Designers);
* [Jekyll official site](http://jekyllrb.com/);
* **Hyde** [theme repository](https://github.com/poole/hyde) and [demo page](http://hyde.getpoole.com/);
* Inkscape [extensions]() ([this one](https://github.com/fsmMLK/inkscapeCircuitSymbols) for example let's you create circuits symbols)!
