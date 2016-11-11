---
layout: post
title: Lone Knight
date: 2014-12-01 09:00:00
excerpt: Lone Knight screen saver, a web based contemplative game created by two brothers.
category: [game, experiment]
shortcut: shortcut-loneknight.png
---

**Lone Knight** is the first videogame experiment made by [Giovanni](https://www.facebook.com/pages/Art-of-Giovanni-Ariutti/442721242537449?fref=ts) and [Nicola Ariutti](http://www.limulo.net) inspired by [Mark Ferrari](http://markferrari.com/art/8bit-game-art/) and [Tim e Adrien Soret](http://timsoret.itch.io/the-last-night) works in order to take part to the [itch.io](http://itch.io) [Flying Toast With Jam](http://itch.io/jam/flying-toast-with-jam).

Take a look at the game [here](http://www.limulo.net/games/loneknight). [Here](http://limulo.itch.io/lone-knight) instead you can find the original version of it.



![screen shot](/assets/images/lone-knight-focus/copertina-utente-loneknight-640_236.png)


### Tech notes

Lone Knight is a web app that takes advantage of the HTML5 _canvas_ object strength. Like the old '80 and '90 s videogames, the [indexed colors](#) and **Palette Shifting** techniques are implemented.


![aseprite](/assets/images/lone-knight-focus/aseprite-logo.png)

The artwork has been made by Giovanni on the basis of an old flash animation project. The images have been converted in pixel art paintings using [Aseprite](http://www.aseprite.org/). The code has been written by Nicola.


![comparison](/assets/images/lone-knight-focus/cavaliere.gif)

The very first videogame version resolution is 320x240 pixels, with a **pseudocolor palette** with 256 colors.

Game assets:

* 1x **spritesheet** with 12 knight animation **sprite**s. This describes the main game element animation.


![spritesheet](/assets/images/lone-knight-focus/spritesheet.png)

* 4x files describing the 4 parallax elements.

![parallax](/assets/images/lone-knight-focus/schema-parallasse.png)

The images are converted in **JSON**, so they can be parsed by the **JavaScript** code.

 This conversion has been also useful to include in the same element file different information regarding the local pseudocolor palettes (8 for each element).


Here's a snippet of a JSON file used in the game:


```   
[
    {
        "width" : 640,
        "height" : 240,
        "nSprites" : 12,
        "Time" : 504,
        "palettes": [
            [[255, 0, 0], [ 35,  47,  71], ..., [ 39,  47,  83], [  0,   0,  43]], /* palette 0 */
            [[255, 0, 0], [ 11,  23,  43], ..., [ 21,  27,  49], [  7,   0,  23]], /* palette 1 */
            [[255, 0, 0], [ 17,  25,  49], ..., [ 16,  33,  71], [ 33,  41,  85]], /* palette 2 */
            [[255, 0, 0], [215, 201,  56], ..., [103, 103, 135], [255, 211, 171]], /* palette 3 */
            [[255, 0, 0], [223, 215,  83], ..., [163, 139, 135], [254, 226, 198]], /* palette 4 */
            [[255, 0, 0], [247, 239,  87], ..., [255, 215, 191], [119,  92, 108]], /* palette 5 */
            [[255, 0, 0], [254, 201, 102], ..., [253, 190, 125], [212,  94,  95]], /* palette 6 */
            [[255, 0, 0], [ 27,  39,  62], ..., [ 28,  34,  61], [  7,   0,  33]]  /* palette 7 */
        ],
        "indexes" : [0, 0, 0, 1, 6, 6, 6, 8, 1, 2, ... ] /* indexes array */
    }
]

```

### Palette Shifting

As time goes by, every color in the main pseudocolor palette is given as the interpolation between the 8 different local palettes corresponding colors.

Every local pseudocolor palette entry represent one of the element colors at a given hour of the day. Entry 0 is always the key color; Here's an example:    


<table class="dati" style="width: 100%; ">
<tr>
    <td style="width: 20%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"></td>
    <td style="width: 40%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>00:00</b></td>
    <td style="width: 40%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>09:00</b></td>
</tr>
<tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>sky</b></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/cielo_0_AM.png" alt="cielo_00_AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/cielo_9_AM.png" alt="cielo_09_AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: right; vertical-align: top; background-color: rgb(200, 200, 200);"><i>palette</i></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-0-cielo.png" alt="palette cielo 00 AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-9-cielo.png" alt="palette cielo 09 AM" style="width: 100%;" /></td>
</tr>

 <tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>mountains 1</b></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/montagne2_0_AM.png" alt="montagne2_00_AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/montagne2_9_AM.png" alt="montagne2_09_AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: right; vertical-align: top; background-color: rgb(200, 200, 200);"><i>palette</i></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-0-montagne-dietro.png" alt="palette montagne2 00 AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-9-montagne-dietro.png" alt="palette montagne2 09 AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>mountains 2</b></td>
       <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/montagne1_0_AM.png" alt="montagne1_00_AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/montagne1_9_AM.png" alt="montagne1_09_AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: right; vertical-align: top; background-color: rgb(200, 200, 200);"><i>palette</i></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-0-montagne-davanti.png" alt="palette montagne1 00 AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-9-montagne-davanti.png" alt="palette montagne1 09 AM" style="width: 100%;" /></td>
</tr>


<tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>grass</b></td>
     <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/prato_0_AM.png" alt="prato_00_AM" style="width: 100%;" /></td>
     <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/prato_9_AM.png" alt="prato_09_AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: right; vertical-align: top; background-color: rgb(200, 200, 200);"><i>palette</i></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-0-prato.png" alt="palette prato 00 AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-9-prato.png" alt="palette prato 09 AM" style="width: 100%;" /></td>
</tr>

<tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>knight</b></td>
    <td style="width: 40%; text-align: center;"><img src="http://www.limulo.net/images/lone-knight-focus/cavaliere_0_AM.png" alt="cavaliere_00_AM" /></td>
    <td style="width: 40%; text-align: center;"><img src="http://www.limulo.net/images/lone-knight-focus/cavaliere_9_AM.png" alt="cavaliere_09_AM" /></td>
    </tr>

<tr>
    <td style="width: 12%; text-align: right; vertical-align: top; background-color: rgb(200, 200, 200);"><i>palette</i></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-0-cavaliere.png" alt="palette cavaliere 00 AM" style="width: 100%;" /></td>
    <td style="width: 40%; "><img src="http://www.limulo.net/images/lone-knight-focus/palette-9-cavaliere.png" alt="palette cavaliere 09 AM" style="width: 100%;" /></td>
 </tr>

<tr>
    <td style="width: 12%; text-align: center; vertical-align: middle; background-color: rgb(200, 200, 200);"><b>total</b></td>
    <td style="width: 40%; text-align: center;"><img src="http://www.limulo.net/images/lone-knight-focus/totale_0_AM.png" alt="totale_00_AM" style="width: 100%;" /></td>
    <td style="width: 40%; text-align: center;"><img src="http://www.limulo.net/images/lone-knight-focus/totale_9_AM.png" alt="totale_09_AM" style="width: 100%;" /></td>
</tr>

</table>

Thus, thanks to this technique, every pixels is colored with the appropriate nuance according to the time flow.


![](/assets/images/lone-knight-focus/processing-debug.png)

### Future improvements

As an homage to the old videogames, the next improvement will be the introduction of the color cycling feature.
