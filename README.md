Welcome in this repo!

This is hte place where we are saving our **WIP** files for [limulo.net](http://www.limulo.net) website restyle.

For this particular restyle we are using a Jekyll theme called [**Hyde**](http://hyde.getpoole.com/) made by [Mark Otto](https://twitter.com/mdo).

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

## How to create an internal link between posts

```
[here'a link between post]({% post_url 2015-02-01-name-of-the-post %})
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

Use these _liquid_ tags before and after code blocks.

```
{% highlight c %}

	[code blocks]

{% endhighlight %}
```

## How to deploy the site

[Here](http://jekyllrb.com/docs/deployment-methods/) you will find a useful link!

### Before

Use the following code in inserting images:

```
({{ site.baseurl }}/assets/images/petunia-la-rana/festa-mondiale-zanzare-2011.jpg)
```

instead of this one:

```
(/assets/images/petunia-la-rana/festa-mondiale-zanzare-2011.jpg)
```

Use the folling code for link:

```
<h3 class="post-title"><a href="{{ site.baseurl }}{{post.url}}">{{ post.title }}</a></h3>
```

instead of this:

```
<h3 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h3>
```



## Useful links

* [Liquid Syntax](https://github.com/shopify/liquid/wiki/Liquid-for-Designers);
* [Jekyll official site](http://jekyllrb.com/);
* **Hyde** [theme repository](https://github.com/poole/hyde) and [demo page](http://hyde.getpoole.com/);
* Inkscape [extensions]() ([this one](https://github.com/fsmMLK/inkscapeCircuitSymbols) for example let's you create circuits symbols)!
