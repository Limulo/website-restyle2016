var slider1, slider2, slider3;
var div1, div2, div3;
var value1, value2, value3;
var container;

var dw;
var door;

function setup()
{
  // get the main contatiner div
  container = select("#p5js-container");

  // create the main canvas
  var canvas = createCanvas( 300, 300 );
  canvas.parent(container);

  // create a doorway and the door
  dw = new Doorway( 300*0.5 - 60, 0, height, 10, 100 );
  door = new Door (dw.hinge.x, dw.hinge.y, 10, 100);
}

function draw()
{
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
    // apply a force (Newton)
    door.applyForce( 60 );
  }
}

function updateSlider_mass(value) {
  door.m = parseFloat(value);
  var div = select("#display_mass");
  div.html( value );
  //document.getElementById("display_mass").textContent = Number(value).toFixed(2)
}

function updateSlider_losses(value) {
  door.losses = parseFloat(value);
  var div = select("#display_losses");
  div.html( value );
  //document.getElementById("display_mass").textContent = Number(value).toFixed(2)

}

function updateSlider_stiffness(value) {
  door.spring.k = parseFloat(value);
  var div = select("#display_stiffness");
  div.html( value );
  //document.getElementById("display_mass").textContent = Number(value).toFixed(2)
}
