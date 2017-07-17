function radarSystem() {

	this.radarObjects = {};
	var radarObjectCount = 0;
	var radarRange = 400000;
	var viewRadarRange = 40;
	
	this.initalize = function() {
		// Do stuff here
	}
	
	this.update = function() {
		radarObjectCount = 0;
		
		this.checkInView();
	}
	
	this.updateRadarRange = function( newRange ) {
		if(radarRange == 50000) {
			if(newRange == 'up') {
				radarRange = 200000;
				viewRadarRange = radarRange / 10000;
				
			}
			
			return true;
		}

		if(radarRange == 200000) {
			if(newRange == 'up') {
				radarRange = 400000;
				viewRadarRange = radarRange / 10000;
			} else {
				radarRange = 50000;
				viewRadarRange = radarRange / 10000;
			}
			
			return true;
		}
	
		if(radarRange == 400000) {
			if(newRange == 'up') {
				radarRange = 1200000;
				viewRadarRange = radarRange / 10000;
			} else {
				radarRange = 200000;
				viewRadarRange = radarRange / 10000;
			}	
			
			return true;
		}
	
		if(radarRange == 1200000) {
			if(!(newRange == 'up')) {
				radarRange = 400000;
				viewRadarRange = radarRange / 10000;
			}	
			
			return true;
		}
		
	}
	
	this.getRadarViewRange = function() {
		return viewRadarRange;
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
		

		var cloneObject = shipArray[key].object.clone();
		
		cloneObject.applyMatrix( new THREE.Matrix4().getInverse( gameEngine.returnSystem('threejs').getCamera().matrixWorld ) );
		
		radarObjectCount = radarObjectCount + 1;
		
		var distance = distanceVector(camera.position, objectPosition);
		
		var radarMultiplier = 200 / radarRange;
		
		if(distance < radarRange) {
			
			//var xPosition = distanceFormula(camera.position.x,camera.position.y,cloneObject.x,cloneObject.y)
						
			var radarObject = {};
			radarObject.distance = distance;
			
			//var xOffset = sideWaysTriangle( distance, xPosition )
			//if( (55 + (cloneObject.position.x)) > 0 && (55 + (cloneObject.position.x)) < 152) {
				radarObject.x        = 75 + (cloneObject.position.x * radarMultiplier);
				radarObject.y        = (cloneObject.position.z * radarMultiplier) + 185;
				radarObject.z        = (cloneObject.position.y * radarMultiplier);
				radarObject.hull     = shipArray[key].hull;
				console.log('X: ' + radarObject.x + ' Y: ' + radarObject.y);
			
			// New 0,0 = 100,200
			
				this.radarObjects[key] = radarObject;
			//}
		}
	}
	
	this.cleanRadarObjects = function( key ) {
		this.radarObjects = {};
	}
	
	this.returnRadarObjects = function() {
		return this.radarObjects;
	}

}