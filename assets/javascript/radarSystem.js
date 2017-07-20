function radarSystem() {

	this.radarObjects    = {};
	var radarObjectCount = 0;
	var radarRange       = 400000;
	var viewRadarRange   = 40;
	var lockState        = false;
	var lockActive       = null;
	
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
			gameEngine.returnSystem( 'hud' ).updateRadarRange(viewRadarRange);
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
			gameEngine.returnSystem( 'hud' ).updateRadarRange(viewRadarRange);
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
			gameEngine.returnSystem( 'hud' ).updateRadarRange(viewRadarRange);
			return true;
		}
	
		if(radarRange == 1200000) {
			if(!(newRange == 'up')) {
				radarRange = 400000;
				viewRadarRange = radarRange / 10000;
			}	
			gameEngine.returnSystem( 'hud' ).updateRadarRange(viewRadarRange);
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
		
		window.foundLock = false;
		
		$.each( shipArray, function( key, object ) {
			if(key != shipId) {
				object.object.updateMatrix(); // make sure plane's local matrix is updated
				object.object.updateMatrixWorld(); // make sure plane's world matrix is updated
				gameEngine.returnSystem( 'radar' ).testObject( object.object, frustum, key );
			}
		});
		
		if(!window.foundLock) {
			lockActive = null;
			gameEngine.returnSystem( 'hud' ).hideTargetBox();
		}
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
				radarObject.lock     = false;
				//console.log('X: ' + radarObject.x + ' Y: ' + radarObject.y);
			
				if(lockActive == key && lockState == true)  {
					radarObject.lock = true;
					lockActive = key;
					window.foundLock = true;
				}

				// New 0,0 = 100,200
			
				this.radarObjects[key] = radarObject;
				
				if(lockActive == null) {
					this.getNextTarget();
				}
								
			//}
		}
	}
	
	this.getNextTarget = function() {
		if(lockState) {
			window.NextTarget = false;
			
			$.each( this.radarObjects, function( key, object ) {
				if(window.NextTarget) {
					lockActive = key;
					//object.lock = true;
					window.foundLock = true;
				} else {
					if(key == lockActive) {
						lockActive = null;
						//object.lock = false;
						window.NextTarget = true;
					}
				}
			});
			window.NextTarget = true;
			if(lockActive == null) {
				$.each( this.radarObjects, function( key, object ) {
					if(window.NextTarget) {
						lockActive = key;
						window.NextTarget = false;
						window.foundLock = true;
					}
				});
			}
		}
	}
	
	this.changeLockType = function() {
		if(lockState == false) {
			lockState = true;
			gameEngine.returnSystem( 'hud' ).updateLockState('ON');
		} else {
			lockState = false;
			gameEngine.returnSystem( 'hud' ).updateLockState('OFF');
			lockActive = null;
		}
	}	
	
	this.cleanRadarObjects = function( key ) {
		this.radarObjects = {};
	}
	
	this.returnRadarObjects = function() {
		return this.radarObjects;
	}

	this.returnLockKey = function() {
		return lockActive;
	}
	
}