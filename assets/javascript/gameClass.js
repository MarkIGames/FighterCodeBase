function gameClass() {
	
	var gameId           = 0;       // Game ID (sector ID, later)
	var maxFuel          = 4400000; // Maximum fuel load
	var curFuel          = 4400000; // Starting Fuel
	var fuelLoss         = 100;     // Thruster Fuel Loss
	var sweep            = null;    // Radar Sweep
	var range            = null;    // Radar Range
	var mode             = null;    // Radar mode
	var shipList         = {};      // Object holding ship and bullet Objects
	var bulletArray      = {};      // Object holding ship and bullet Objects
	var shipCount        = 0;       // Integar for tracking number of ships
	var angleMod         = -1.7;    // Angle offset to make ship face the right way
	var fuelState        = false;   // Tracking state for refueling
	var modelLoadingDone = false;
	
	var spaceObjectsArray = {};
	
	// Initalize Main Game Class
	this.initalize = function() {
		this.buildObjects();
	}
	
	this.buildObjects = function() {
		if(spaceObjectsArray['humanFighter'] == undefined) {
			spaceObjectsArray['humanFighter'] = gameEngine.returnSystem( 'spaceObjects' ).returnPlayerShipObject();
			
			modelLoadingDone = false;
		} else {
			modelLoadingDone = true;
		}
		if(spaceObjectsArray['bulletMesh'] == undefined) {
			spaceObjectsArray['bulletMesh'] = gameEngine.returnSystem( 'spaceObjects' ).returnBulletObject();
			
			modelLoadingDone = false;
		} else {
			modelLoadingDone = true;
		}
	}
	
	this.update = function() {		
		var delta = gameEngine.returnSystem( 'threejs' ).getDelta();
		
		if(modelLoadingDone == false) {
			this.buildObjects();
		}
		
		this.updateWeaponStates();
		this.bulletUpdate( delta );
	}

	 this.moveShip = function() {
		 var camera   = gameEngine.returnSystem( 'threejs' ).getCamera();
		 
		 var lostFuel = fuelLoss;
		curFuel = curFuel - lostFuel;
		
		if(shipList['' + shipId + ''] != undefined) {
			shipList['' + shipId + ''].x = camera.position.x;
			shipList['' + shipId + ''].y = camera.position.y;
			shipList['' + shipId + ''].z = camera.position.z;
			
			shipList['' + shipId + ''].rotx = camera.rotation.x;
			shipList['' + shipId + ''].roty = camera.rotation.y;
			shipList['' + shipId + ''].rotz = camera.rotation.z;
		}
	}
	
	this.fireWeaponStates = function() {
		var playerObject = this.returnPlayerShip();
		
		if(playerObject['weapons']['left'][1] > 20) {
		
			playerObject['weapons']['left'][1] = playerObject['weapons']['left'][1] - 15;
			playerObject['weapons']['left'][2] = playerObject['weapons']['left'][2] - 15;
			
			if(playerObject['weapons']['left'][1] < 0) {
				playerObject['weapons']['left'][1] = 0;
			}
			
			if(playerObject['weapons']['left'][2] < 0) {
				playerObject['weapons']['left'][2] = 0;
			}
			
			playerObject['weapons']['right'][1] = playerObject['weapons']['right'][1] - 15;
			playerObject['weapons']['right'][2] = playerObject['weapons']['right'][2] - 15;
			
			if(playerObject['weapons']['right'][1] < 0) {
				playerObject['weapons']['right'][1] = 0;
			}
			
			if(playerObject['weapons']['right'][2] < 0) {
				playerObject['weapons']['right'][2] = 0;
			}
			
			this.updateShip(shipId, playerObject);
			
			return true;
		} else {
			return false;
		}
		

		
	}
		
	this.updateWeaponStates = function() {
		var playerObject = this.returnPlayerShip();
		
		playerObject['weapons']['left'][1] = playerObject['weapons']['left'][1] + 1;
		playerObject['weapons']['left'][2] = playerObject['weapons']['left'][2] + 1;
		
		if(playerObject['weapons']['left'][1] > 100) {
			playerObject['weapons']['left'][1] = 100;
		}
		
		if(playerObject['weapons']['left'][2] > 100) {
			playerObject['weapons']['left'][2] = 100;
		}
		
		playerObject['weapons']['right'][1] = playerObject['weapons']['right'][1] + 1;
		playerObject['weapons']['right'][2] = playerObject['weapons']['right'][2] + 1;
		
		if(playerObject['weapons']['right'][1] > 100) {
			playerObject['weapons']['right'][1] = 100;
		}
		
		if(playerObject['weapons']['right'][2] > 100) {
			playerObject['weapons']['right'][2] = 100;
		}
		
		this.updateShip(shipId, playerObject);
	}
	
	this.getWeaponStates = function() {
		var playerObject = this.returnPlayerShip();
		
		return playerObject['weapons'];
	}
	 
	this.processData = function ( data ) {
		for (var key1 in data) {
			if(data[key1].shipid == shipId) {
				shipList[key1].x          = parseFloat(data[key1].x);
				shipList[key1].y          = parseFloat(data[key1].y);
			} 
			if(key1 != shipId) {
				var newShip = true;
				for (var key2 in shipList) {
					if(data[key1].shipid == shipList[key2].shipid) {
						newShip = false;
					} 
				}

				if(newShip == true) {
					//if(shipObject != undefined) {
						var  newShipId = data[key1].shipid;
						
						shipList[newShipId] = data[key1];
						
						var object = gameEngine.returnSystem( 'spaceObjects' ).returnObject( data[key1].type );
						
						shipList[newShipId].object = object.clone();
						
						shipList[newShipId].object.position.x = parseFloat(data[key1].x);
						shipList[newShipId].object.position.y = parseFloat(data[key1].y);
						shipList[newShipId].object.position.z = parseFloat(data[key1].z);
						
						shipList[newShipId].object.name = 'ship_' + key1;
						
						var scene = gameEngine.returnSystem( 'threejs' ).getScene();
						
						// Add new ship here...
						scene.add( shipList[newShipId].object );
		
						this.addShipCount();
					//}
				} else {
					shipList[key1].object.position.x = parseFloat(data[key1].x);
					shipList[key1].object.position.y = parseFloat(data[key1].y);
					shipList[key1].object.position.z = parseFloat(data[key1].z);
					
					shipList[key1].object.rotation.x = parseFloat(data[key1].rotx);
					shipList[key1].object.rotation.y = parseFloat(data[key1].roty);
					shipList[key1].object.rotation.z = parseFloat(data[key1].rotz);
					
					shipList[key1].rawheading = parseFloat(data[key1].rawheading);
					shipList[key1].heading    = parseFloat(data[key1].heading);
					shipList[key1].speed      = parseFloat(data[key1].speed);
					
					//moveServerShip(shipList[key1], data[key1]);
					
					shipList[key1].hull       = parseFloat(data[key1].hull);
					shipList[key1].orderset   = parseFloat(data[key1].orderset);
					
					shipList[key1].sweep      = parseFloat(data[key1].sweep);
					shipList[key1].range      = parseFloat(data[key1].range);
					shipList[key1].mode       = parseFloat(data[key1].mode);
					shipList[key1].bonus      = parseFloat(data[key1].bonus);				
				}
			}		
		}
	}
	
	function moveServerShip( oldShip, newShip ) {
		var xSpeed = 0;
		var ySpeed = 0;
		var zSpeed = 0;
		
		if(Math.round(parseFloat(oldShip.x)) != Math.round(parseFloat(newShip.x))) {
			xSpeed = 0.00001;
		}
		if(Math.round(parseFloat(oldShip.y)) != Math.round(parseFloat(newShip.y))) {
			ySpeed = 0.00001;
		}
		if(Math.round(parseFloat(oldShip.z)) != Math.round(parseFloat(newShip.z))) {
			zSpeed = 0.00001;
		}				

		var newX = parseFloat(newShip.x) - parseFloat(oldShip.x);
		var newY = parseFloat(newShip.y) - parseFloat(oldShip.y);
		var newZ = parseFloat(newShip.z) - parseFloat(oldShip.z);
		
		oldShip.x = parseFloat(newShip.x);
		oldShip.y = parseFloat(newShip.y);
		oldShip.z = parseFloat(newShip.z);				
		
		var direction = new THREE.Vector3(newX, newY, newZ);
		var vector = direction.clone().multiplyScalar(xSpeed, ySpeed, zSpeed);
		
		oldShip.object.rotation.x = newShip.rotx;
		oldShip.object.rotation.y = newShip.roty * angleMod;
		oldShip.object.rotation.z = newShip.rotz;
		
		if(xSpeed > 0 || ySpeed > 0 || zSpeed > 0) {
			oldShip.object.position.add(direction);
		}
	}

	this.moveServerBullet = function( oldShip, newShip ) {
		var xSpeed = 0;
		var ySpeed = 0;
		var zSpeed = 0;
		
		if(Math.round(parseFloat(oldShip.x)) != Math.round(parseFloat(newShip.x))) {
			xSpeed = 0.00001;
		}
		if(Math.round(parseFloat(oldShip.y)) != Math.round(parseFloat(newShip.y))) {
			ySpeed = 0.00001;
		}
		if(Math.round(parseFloat(oldShip.z)) != Math.round(parseFloat(newShip.z))) {
			zSpeed = 0.00001;
		}				

		var newX = parseFloat(newShip.x) - parseFloat(oldShip.x);
		var newY = parseFloat(newShip.y) - parseFloat(oldShip.y);
		var newZ = parseFloat(newShip.z) - parseFloat(oldShip.z);
		
		oldShip.x = parseFloat(newShip.x);
		oldShip.y = parseFloat(newShip.y);
		oldShip.z = parseFloat(newShip.z);				
		
		var direction = new THREE.Vector3(newX, newY, newZ);
		var vector = direction.clone().multiplyScalar(xSpeed, ySpeed, zSpeed);
		
		oldShip.object.rotation.x = newShip.rotx;
		oldShip.object.rotation.y = newShip.roty * angleMod;
		oldShip.object.rotation.z = newShip.rotz;
		
		if(xSpeed > 0 || ySpeed > 0 || zSpeed > 0) {
			oldShip.object.position.add(direction);
		}
	}

	this.bulletUpdate = function( delta ) {
		var localBulletArray = this.getBulletArray();
		
		$.each( localBulletArray, function( key, object ) {
			object.translateZ( delta * -10128 );
			//console.log(delta);
			//detectCollision( object );
		});
			
		// expose the rotation vector for convenience
		//object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );
		
		//moveBullet();

	}

	function detectCollision( object ) {
		originPoint = object.position.clone();
		
		for (var vertexIndex = 0; vertexIndex < object.geometry.vertices.length; vertexIndex++)
		{		
			var localVertex = object.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( object.matrix );
			var directionVector = globalVertex.sub( object.position );
			
			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			
			var array = [];
			
			$.each( shipList, function( key2, object2 ) {
				if(key2 != shipId) {
					array.push(object2.object.children[0]);
				}
			});

			var collisionResults = ray.intersectObjects( array, true );

			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
				console.log('HIT!');
				console.log(collisionResults);
				//alert('HIT HIT HIT');
			}
		}
		
	}
	
	this.removeShip = function( shipToRemove ) {
		var scene = gameEngine.returnSystem( 'threejs' ).getScene();
		
		var selectedObject = scene.getObjectByName('ship_' + shipToRemove);
		
	    scene.remove( selectedObject );
		
		delete shipList[shipToRemove];
		
		this.removeShipCount();
	}
	
	this.addSocketFunctions = function( socket ) {
		socket.on('emit_wide_delete', function ( data ) { 
			if(data.shipid == shipId) {
				location.reload();
			} else {
				delete shipList['' + data.shipid + ''];
			}
		});
			
		socket.on('disconnect_action', function (data) {
			// Get the game class object
			game = gameEngine.returnSystem( 'game' );
			// Run the remove ship function
			game.removeShip( data );
		}); 	

		socket.on('broadcast_data', function (data) {
			// Get the game class object
			game = gameEngine.returnSystem( 'game' );
			// Run the process data function
			game.processData( data );
		});
		
		socket.on('add_bullet', function (data) {
			gameEngine.returnSystem( 'weaponManager' ).createWeapon( data );
		});

		socket.on('remove_bullet', function (data) {
			gameEngine.returnSystem( 'bulletManager' ).removeBullet( data );
		});
	}
	
	this.addExistingShip = function ( id, ship ) {
		shipList[id] = ship;

		this.addShipCount();
	}
	
	this.addShipCount = function() {
		shipCount = shipCount + 1;
	}
	
	this.removeShipCount = function() {
		shipCount = shipCount - 1;
	}
	
	this.returnPlayerShip = function() {
		return shipList[shipId];
	}
	
	this.returnShip = function( shipid ) {
		return shipList[shipid];
	}
	
	this.updateShip = function( shipid, shipobject ) {
		shipList[shipid] = shipobject;
	}
	
	this.returnShipList = function() {
		return shipList;
	}
	
	this.returnSpaceObjectsArray = function() {
		return spaceObjectsArray;
	}
	
	this.returnFuelObject = function() {
		var fuelObject = {};
		
		fuelObject.curFuel = curFuel;
		fuelObject.maxFuel = maxFuel;
		
		return fuelObject;
	}
	
	this.getBulletArray = function() {
		return bulletArray;
	}
	
	this.addBullet = function( id, object ) {
		bulletArray[id] = object;
	}
}