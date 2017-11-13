function Spring()
{
  // Because this is a rotational spring
  // all these variables represent angles.

  // we make anchor and rest angle coincide
  this.angle = 0.0;   // rotational displacement
  this.anchor = 0.0;  // angle which the spring is attached to
  this.rest = 0.0;    // angle where the spring is at its rest position

  this.k = 60; // stiffness
  this.Fe;

  this.Ue; // elastic potential energy

  this.update = function ()
  {
    //do nothing
  }

  this.calculateForce = function( _aCurrent )
  {
    this.angle = (_aCurrent - this.anchor) - this.rest;
    this.Fe = -1*this.k*this.angle;

    this.calculatePotential( this.angle );
    //print("spring: " + this.Fe);
  }

  this.calculatePotential = function( a )
  {
    this.Ue = 0.5 * this.k * a * a;
  }
}
