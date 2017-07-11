function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function distanceVector( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

function sortNumber(a,b) {
    return a - b;
}

function distanceFormula(x1,y1,x2,y2) { 
	  if(!x2) x2=0; 
	  if(!y2) y2=0;
	  
	  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
}

function sideWaysTriangle( c, b ) {
	var c2 = c * c;
	var b2 = b * b;
	
	var a2 = c2 - b2;
	
	if(a2 < 0) { a2 = a2 * -1; }
	
	var a = Math.sqrt(a2);
	
	if(a2 < 0) { a = a * -1; }
	
	return a;
}