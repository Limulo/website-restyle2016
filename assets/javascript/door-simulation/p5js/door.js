/*************************************************/
function Door( _x, _y, _w, _l)
{

  this.hinge = new p5.Vector( _x, _y );
  this.w = _w;
  this.l = _l;

  this.spring = new Spring();

  this.aAcceleration = 0.0;
  this.aVelocity = 0.0;
  this.angle = 0.0;

  this.aMax = +PI *0.5 ;
  this.aMin = -PI *0.5 ;

  this.m = 30; // kg
  this.I = this.m * this.l * this.l / 3;

  this.Ue = 0.0;
  this.Uk = 0.0;
  this.U = this.Ue + this.Uk;

  this.losses = 0.03; // losses (0.0 - 1.0)
  this.active = false;

  /*************************************************/
  this.update = function()
  {
    this.spring.update();

    if( this.active )
      {
      this.aVelocity += this.aAcceleration;
      this.angle += this.aVelocity;

      // menage the case we push the door
      // too hard and make it reach its maximum
      // opening/closing extensions
      if( this.angle > this.aMax )
      {
        //print("\tSBAAAM !");
        this.angle = this.aMax;
        this.aVelocity = 0.0;
      }
      else if( this.angle < this.aMin )
      {
        //print("\tSBAAAM !");
        this.angle = this.aMin;
        this.aVelocity = 0.0;
      }
      else
      {
        this.aVelocity *= 1.0-this.losses;
      }

      //this.spring.calculatePotential( this.angle );
      this.Ue = this.spring.Ue;
      this.Uk = 0.5 * this.m * this.aVelocity * this.aVelocity;
      this.U = this.Ue + this.Uk;

      //print("potential: " + this.U +";");

      if( this.U < 1E-4 )
      {
        // potential energy is now very little
        // so we can stop the physic simulation an
        // put the door at rest.
        //print("\t REST ");
        this.active = false;
        this.aVelocity = 0.0;
        this.aAcceleration = 0.0;
        this.angle = 0.0;
        this.U = this.Ue = this.Uk = 0.0;
      }

      /** Heavy audio commands **/
      // uncomment these lines if you want to connect
      // the P5js sketch to the Enzien applet.
      // Note: connecting them I've noticed an annoying
      // delay between animation and sound. Why?
      //updateSlider_U( this.U );
      //updateSlider_velocity( this.aVelocity );

      this.aAcceleration = 0.0;
    }
    else
    {
      // physic simulation now can sleep
      //print("sleeping");
    }
  }

  /*************************************************/
  this.display = function()
  {
    push();

    translate( this.hinge.x, this.hinge.y );

    // draw the frame
    fill(180, 83, 35, 120);
    noStroke();
    rect(0, 0, this.l, this.w);

    rotate( this.angle );

    // draw the door
    fill(180, 83, 35);
    rect(0, 0, this.l, this.w);

    // draw the hinge
    fill(120);
    ellipse(0, 0, 5, 5);

    pop();
  }

  /*************************************************/
  // When we calculate torque we take for granted
  // that all forces are applyed perpendicularly
  // to the door so the cross product is simply:
  // M = r*F
  // where r is the lenght of the level arm
  // that is the distance form the hinge and the
  // application point of the force vector.
  // For semplicity sake we are also considering a
  // lever arm of lenght 'l', the same as the door lenght!
  this.applySpringForce = function()
  {
    // do necessary computation only if the door is active
    if( this.active )
    {
      // we make the spring act on the 10% of the door lenght
      var rSpring = this.l * 0.1;
      this.calculateI();
      this.spring.calculateForce( this.angle );
      //this.aAcceleration += rSpring * spring.getForce( this.angle ) / this.I;
      this.aAcceleration += rSpring * this.spring.Fe / this.I;
    }
  }

  /*************************************************/
  this.applyForce = function( magnitude )
  {
    this.active = true;
    var rCustom = this.l;
    this.calculateI();
    this.aAcceleration += rCustom * magnitude / this.I;
  }

  /*************************************************/
  // I moved the calculation of the iniertia momentum
  // here in order to calculat it in run time.
  // This gave me the possibility to tweak mass parameter
  // in run time!
  this.calculateI = function()
  {
    this.I = this.m * this.l * this.l / 3;
  }

}
