---
layout: post
title: Resources
date: 2015-05-01 09:00:00
excerpt: resources
category: [game, scumm]
---

Sono 2 i contenitori di infomrazioni principali **Index File** e **???**.

## Index File

L'**Index File** SCUMM contiene speciali informazioni per permettere un accesso randomico alle risorse all'interno degli altri files del gioco. Questo files contiene, tra le atre cose, anche i nomi delle room e i limiti massimi per il gioco.

Sono quelli mostrati qui di seguito i nomi di file che si usano per identificare i files di indice:


<p>cosa si vede in maniac mansion  / cosa in Indy / cosa in Day Of The Tentacle / cosa Full Throttle</p>

<table>
<tr>
    <td>filename</td>
    <td>SCUMM version</td>
</tr>
<tr>
    <td>00.lfl / 000.lfl</td>
    <td>V3/4</td>
</tr>
<tr>
    <td>.000</td>
    <td>V5/6</td>
</tr>
<tr>
    <td>.LA0</td>
    <td>V7/8</td>
</tr>
</table>

A Chunk is a named part of the file, e.g. RNAM. Each chunk has a header that contains at least the chunk name and its size. The following chunks are available:

<table>
    <tr>
        <td>RNAM</td>
        <td>Room Names</td>
    </tr>
    <tr>
        <td>MAXS</td>
        <td>Maximum Values</td>
    </tr>
    <tr>
        <td>DROO</td>
        <td>Directory of Rooms</td>
    </tr>
    <tr>
        <td>DSCR</td>
        <td>Directory of Scripts</td>
    </tr>
    <tr>
        <td>DSOU</td>
        <td>Directory of Sounds</td>
    </tr>
    <tr>
        <td>DCOS</td>
        <td>Directory of Costumes</td>
    </tr>
    <tr>
        <td>DCHR</td>
        <td>Directory of Charsets</td>
    </tr>
    <tr>
        <td>DOBJ</td>
        <td>Directory of Objects</td>
    </tr>
</table>



## L'altro file

blah blah blah

## Riferimenti

**Links**

* **[a]** ScummVM Technical Reference, [Index File](http://wiki.scummvm.org/index.php/SCUMM/Technical_Reference/Index_File#Scumm_5);
