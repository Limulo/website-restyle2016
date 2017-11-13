---
layout: post
title: Door simulation
date: 2017-10-23 14:00:00
excerpt: A door simulation
category: [coding, sound, physics]
usemath: true;
usep5js: true;
---

<!--
Here we must add something to the header:
* the files from the P5js simulation;
* some files coming from the JavaScript compiled versione of the PD patch by Enzien Audio;
-->

<head>
  <!-- a stylesheet in order to slylize both the P5js and the Heavy applets -->
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/javascript/door-simulation/styles.css">

  <!-- P5js code headers-->
  <script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/p5js/door.js"></script>
  <script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/p5js/doorway.js"></script>
  <script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/p5js/spring.js"></script>
  <script language="javascript" type="text/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/p5js/test_p5JS.js"></script>

  <!-- Heavy Audio headers -->
  <script type="application/javascript" src="{{ site.baseurl }}/assets/javascript/door-simulation/heavy/creaky_door_AudioLib.min.js"></script>
  <script type="text/javascript">
    var isPlaying = false;
    var webAudioContext = null;
    var webAudioProcessor = null;
    var creaky_door = null;

    window.onload = function(e) {

      webAudioContext = new (window.AudioContext || window.webkitAudioContext);

      blockSize = 2048

      creaky_door = new creaky_door_AudioLib({
        sampleRate: webAudioContext.sampleRate,
        blockSize: blockSize,
        printHook: hvPrintHook,
        sendHook: hvSendHook
      });

      webAudioProcessor = webAudioContext.createScriptProcessor(
        blockSize,
        creaky_door.getNumInputChannels(),
        // Note: make sure there is at least one output channel specified so that
        // we can process patches that have no i/o objects (i.e. control only)
        Math.max(creaky_door.getNumOutputChannels(), 1)
      );

      webAudioProcessor.onaudioprocess = function(e) { creaky_door.process(e); };

      document.getElementById("transportButton").textContent = "Play";
      isPlaying = false;

      // Generated Parameter Display Initialisations
      updateSlider_U(0.0);
      updateSlider_velocity(0.01);
    };

    function hvPrintHook(message) {
      console.log(message);
    }

    function hvSendHook(sendName, floatValue) {
      console.log(sendName, floatValue);
    }

    function start() {
      webAudioProcessor.connect(webAudioContext.destination);
      document.getElementById("transportButton").textContent = "Pause";
      isPlaying = true;
    }

    function stop() {
      webAudioProcessor.disconnect(webAudioContext.destination);
      document.getElementById("transportButton").textContent = "Play";
      isPlaying = false;
    }

    function toggleTransport(element) {
      (isPlaying) ? stop() : start();
    }

    // Generated Parameter Update Methods
    function updateSlider_U(value) {
      document.getElementById("display_U").textContent = Number(value).toFixed(2);
      creaky_door.setFloatParameter("U", value);
    }
    function updateSlider_velocity(value) {
      document.getElementById("display_velocity").textContent = Number(value).toFixed(2);
      creaky_door.setFloatParameter("velocity", value);
    }
  </script>
</head>

## The problem: introduction

Our purpose here is to create a plausible simulation of a door-spring system which will eventually be used to drive a procedural audio model of the creaking hinge sound.


## The physics behind the simulation

Physics explanation

## Processing: a first prototype

Download a Processing simulation made with

Below the code of the Processing.js simulation

Press the mouse button to apply a force to the door! If you want you can change the simulation parameter like the _stiffness/elasticity_ of the spring, the amount of _losses_ of the system or the door _mass_: simply use the sliders below.

<div id="p5js-container">
  <div class="table">

    <!-- Parameters -->
    <div class="row">
      <div class="cell">
        <input id="slider_mass" type="range" min="1" max="100" step="1" value="30" onchange="updateSlider_mass(value);" oninput="updateSlider_mass(value)">
      </div>
      <div class="cell" id="display_mass">30</div>
      <div class="cell"><strong>mass</strong></div>
    </div>

    <div class="row">
      <div class="cell">
        <input id="slider_losses" type="range" min="0.01" max="0.9" step="0.001" value="0.03" onchange="updateSlider_losses(value);" oninput="updateSlider_losses(value)">
      </div>
      <div class="cell" id="display_losses">0.03</div>
      <div class="cell"><strong>losses</strong></div>
    </div>

    <div class="row">
      <div class="cell">
        <input id="slider_stiffness" type="range" min="1" max="100" step="1" value="60" onchange="updateSlider_stiffness(value);" oninput="updateSlider_stiffness(value)">
      </div>
      <div class="cell" id="display_stiffness">60</div>
      <div class="cell"><strong>stiffness</strong></div>
    </div>
  </div>
</div> <!-- p5js container -->


## Pure Data: time to make some sound

TODO: Farnell, Heavy compiler


### Heavy Audio Tools

Add here the code of the sound simulation powered by Heavy Framework

<!--
<iframe type="text/html" frameborder="0"
    width="100%" height="187"
    src="https://enzienaudio.com/h/moscardo/spooky_door/3/web/spooky_door.html">
</iframe>
-->

<div id="heavy-container">

  <div>
    <button style="padding: 10px;" type="button" id="transportButton" onclick="toggleTransport(this);"/>
  </div>

  <div class="table">

    <!-- Parameters -->
    <div class="row">
      <div class="cell">
        <input id="slider_U" type="range" min="0.0" max="30.0" step="0.01" value="0.0" onchange="updateSlider_U(value);" oninput="updateSlider_U(value)">
      </div>
      <div class="cell" id="display_U"></div>
      <div class="cell"><strong>U</strong></div>
    </div>

    <div class="row">
      <div class="cell">
        <input id="slider_velocity" type="range" min="0.0" max="0.1" step="0.001" value="0.01" onchange="updateSlider_velocity(value);" oninput="updateSlider_velocity(value)">
      </div>
      <div class="cell" id="display_velocity"></div>
      <div class="cell"><strong>velocity</strong></div>
    </div>

  </div>

  <div>
    <p style="padding: 10px;"><em>powered by </em><a href="https://enzienaudio.com"><strong>Heavy</strong></a></p>
  </div>
</div> <!-- heavy container -->

---
## Godot: final implementation inside the game engine

NOTE: libpd/Godot implementation link to the specific article about the topic.


## Refereces and resources

* The [Godot]() game engine;
* The [Enzien Audio "Heavy Audio Tools"](https://enzienaudio.com/)
