function Doorway( _x, _y, _h, _doorW, _doorL )
{
  this.pos = new p5.Vector( _x, _y );
  this.h = _h;
  this.sideSpaceSize = new p5.Vector( _doorL*10/100, _doorW );
  this.w = _doorL + 2*this.sideSpaceSize.x;
    
  this.leftSpace = new p5.Vector( 0, this.h*0.5 - _doorW*0.5 );
  this.rightSpace = new p5.Vector( this.w-this.sideSpaceSize.x, this.leftSpace.y);
    
  this.hinge = p5.Vector.add( this.pos, new p5.Vector( this.sideSpaceSize.x, this.leftSpace.y ));

    
  this.display = function()
  {
    push();
    translate(this.pos.x, this.pos.y );
    noStroke();
    fill(200);
    rect(0, 0, this.w, this.h);
    translate(this.leftSpace.x, this.leftSpace.y);
    fill(255);
    rect(0, 0, this.sideSpaceSize.x, this.sideSpaceSize.y);
    push();
    translate( this.rightSpace.x, 0);
    fill(255);
    rect(0, 0, this.sideSpaceSize.x, this.sideSpaceSize.y);
    pop();
    pop();
  }
}