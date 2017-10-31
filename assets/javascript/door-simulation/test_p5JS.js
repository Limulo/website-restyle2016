var slider1, slider2, slider3;
var div1, div2, div3;
var value1, value2, value3;
var container;

var dw;
var door;

function setup()
{
  // get the main contatiner div
  container = select("#container");

  // create the main canvas
  var canvas = createCanvas( 300, 300 );
  canvas.parent(container);

  // create a doorway and the door
  dw = new Doorway( 300*0.5 - 60, 0, height, 10, 100 );
  door = new Door (dw.hinge.x, dw.hinge.y, 10, 100);

  // Now let's create all the sliders to control
  // the various simulation parameters
  div1 = createDiv("mass").class("slider");
  div2 = createDiv("losses").class("slider");
  div3 = createDiv("elasticity").class("slider");
  div1.parent( container );
  div2.parent( container );
  div3.parent( container );

  slider1 = createSlider(0.5, 20, door.m, 0.1);
  slider1.parent( div1 );
  value1 = createP("").class("value").id("mass");
  value1.parent( div1 );

  slider2 = createSlider(0.01, 0.5, door.losses, 0.01);
  slider2.parent( div2 );
  value2 = createP("").class("value").id("losses");
  value2.parent( div2 );

  slider3 = createSlider(0.05, 10, door.spring.k, 0.001);
  slider3.parent( div3 );
  value3 = createP("").class("value").id("elasticity");
  value3.parent( div3 );
}

function draw()
{
  value1.html( slider1.value() );
  value2.html( slider2.value() );
  value3.html( slider3.value() );

  background(255);
  //dw.update();
  door.applySpringForce();
  door.update();
  dw.display();
  door.display();
}

function mousePressed()
{
  if( mouseX >= 0.0 && mouseX < width && mouseY >= 0.0 && mouseY < height )
  {
  door.applyForce( 60 );
  }
}
