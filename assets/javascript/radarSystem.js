function radarSystem() {

	this.radarObjects = {};
	var radarObjectCount = 0;
	
	this.initalize = function() {
		// Do stuff here
	}
	
	this.update = function() {
		radarObjectCount = 0;
		
		this.checkInView();
	}
	
	this.checkInView = function() {
		gameEngine.returnSystem( 'radar' ).cleanRadarObjects();
		
		var camera   = gameEngine.returnSystem( 'threejs' ).getCamera();
		var shipArray = gameEngine.returnSystem( 'game' ).returnShipList();
		
		camera.updateMatrix(); // make sure camera's local matrix is updated
		camera.updateMatrixWorld(); // make sure camera's world matrix is updated
		camera.matrixWorldInverse.getInverse( camera.matrixWorld );
		
		var frustum = new THREE.Frustum();
		frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );
		
		$.each( shipArray, function( key, object ) {
			if(key != shipId) {
				object.object.updateMatrix(); // make sure plane's local matrix is updated
				object.object.updateMatrixWorld(); // make sure plane's world matrix is updated
				gameEngine.returnSystem( 'radar' ).testObject( object.object, frustum, key );
			}
		});
		
		//console.log(this.returnRadarObjects());
	}
	
	this.testObject = function( object, frustum, key  ) {
		if(object.type != "PointLight") {
			if(object.geometry === undefined) {
				gameEngine.returnSystem( 'radar' ).testObject( object.children[0], frustum, key );
			} else {
				if(frustum.intersectsObject( object )) {
					gameEngine.returnSystem( 'radar' ).addRadarObject( key );
				}
			}
		}
	}
	
	this.addRadarObject = function( key ) {
		var shipArray = gameEngine.returnSystem( 'game' ).returnShipList();
		var camera    = gameEngine.returnSystem( 'threejs' ).getCamera();
		var objectPosition = shipArray[key].object.position;
		
		radarObjectCount = radarObjectCount + 1;
		
		var distance = distanceVector(camera.position, objectPosition);
		
		if(distance < 8000000) {
			
			var xPosition = distanceFormula(camera.position.x,camera.position.z,objectPosition.x,objectPosition.y)
			
			var radarObject = {};
			radarObject.distance = distance;
			
			var xOffset = sideWaysTriangle( distance, xPosition )
			
			radarObject.x        = 100 - (xOffset / 40000);
			radarObject.y        = 200 - (distance / 40000);
			radarObject.hull     = shipArray[key].hull;
		
		
		// New 0,0 = 100,200
		
			this.radarObjects[key] = radarObject;
		}
	}
	
	this.cleanRadarObjects = function( key ) {
		this.radarObjects = {};
	}
	
	this.returnRadarObjects = function() {
		return this.radarObjects;
	}

}