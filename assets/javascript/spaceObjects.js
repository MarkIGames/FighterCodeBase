function spaceObjects() {

	// Game Objects
	var cruiserShipObject        = {};
	var destroyerShipObject      = {};
	var frigateShipObject        = {};
	var alienFighterShipObject   = {};
	var stationShipObject        = {};
	var weaponMeshObject         = {};
	var warningStationShipObject = {};
	
	// Values
	var radius        = 6371;
	var tilt          = 0.41;
	var rotationSpeed = 0.02;
	var cloudsScale   = 1.005;
	var moonScale     = 0.23;
	var geometry;
	
	// Three JS Objects
	var textureLoader = new THREE.TextureLoader();
	var objectLoader  = new THREE.ObjectLoader();
	
	this.initalize = function() {
		this.createPlayerShipObject();
		this.createCruiserShipObject();
		this.createDestroyerShipObject();
		this.createFrigateShipObject();
		this.createAlienFighterShipObject();
		
		this.createStationShipObject();
		this.createWarningStationShipObject();
		
		this.createBulletObject();
		
		this.buildPlanets();
	}
	
	this.createPlayerShipObject = function() {
		objectLoader.load("assets/models/humanFighterLights.json", function ( object ) {
			object.name = 'unnamed';

			object.scale.multiplyScalar( 0.3 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	if(obj.type != "PointLight") {
		        		obj.geometry.computeBoundingSphere();
		        	}
		        }
		    }
			
			object.updateMatrixWorld( true );

			gameEngine.returnSystem( 'spaceObjects' ).setPlayerShipObject(object);
		});
	}
	
	this.createBulletObject = function() {
		var bulletMesh = {};
		var bulletMap = new THREE.MeshPhongMaterial( {
			specular: 0xFFFFFF,
			shininess: 100,
			map: textureLoader.load( "assets/images/sun.jpg" ),
			normalScale: new THREE.Vector2( 0.85, 0.85 )
		} );
		
		var bulletMesh = new THREE.SphereGeometry( 1, 10, 10 );
		
		this.weaponMeshObject = new THREE.Mesh( bulletMesh, bulletMap );
	}
		
	this.createDestroyerShipObject = function() {
		objectLoader.load("assets/models/destroyer.json", function ( object ) {
			object.name = 'unnamed';
			
			object.scale.multiplyScalar( 100 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );

			gameEngine.returnSystem( 'spaceObjects' ).setDestroyerShipObject(object);
		});
	}
	
	this.createFrigateShipObject = function() {
		objectLoader.load("assets/models/frigate.json", function ( object ) {
			object.name = 'unnamed';
			
			object.scale.multiplyScalar( 100 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );

			gameEngine.returnSystem( 'spaceObjects' ).setFrigateShipObject(object);
		});
	}	
	
	this.createCruiserShipObject = function() {
		objectLoader.load("assets/models/cruiser.json", function ( object ) {
			object.name = 'unnamed';
			
			object.scale.multiplyScalar( 100 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );

			gameEngine.returnSystem( 'spaceObjects' ).setCruiserShipObject(object);
		});
	}	
	
	this.createAlienFighterShipObject = function() {
		objectLoader.load("assets/models/alienFighter.json", function ( object ) {
			object.name = 'unnamed';
			
			object.scale.multiplyScalar( 0.3 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );

			gameEngine.returnSystem( 'spaceObjects' ).setAlienFighterShipObject(object);
		});
	}
	
	this.createStationShipObject = function() {
		objectLoader.load("assets/models/citadel.json", function ( object ) {
			object.name = 'unnamed';
			
			object.scale.multiplyScalar( 100 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );
			
			gameEngine.returnSystem( 'spaceObjects' ).setStationShipObject(object);
		});
	}
	
	this.createWarningStationShipObject = function() {
		objectLoader.load("assets/models/warningStation.json", function ( object ) {
			object.name = 'unnamed';
			
			//object.rotateX( Math.PI / 2 );
			//object.rotateY( Math.PI / 2 );
			//object.rotateY( Math.PI / 2 );
			
			object.scale.multiplyScalar( 2 );
			
			for (var prop in object.children[0].children) {
				var obj = object.children[0].children[prop];
				
		        // skip loop if the property is from prototype
		        if(!obj.hasOwnProperty(prop)) {
		        	obj.geometry.computeBoundingSphere();
		        }
		    }
			
			object.updateMatrixWorld( true );
			
			gameEngine.returnSystem( 'spaceObjects' ).setWarningStationShipObject(object);
		});
	}
	
	this.setPlayerShipObject = function( object ) {
		this.playerShipObject = object;
	}
	
	this.setDestroyerShipObject = function( object ) {
		this.destroyerShipObject = object;
	}
	
	this.setFrigateShipObject = function( object ) {
		this.frigateShipObject = object;
	}
	
	this.setCruiserShipObject = function( object ) {
		this.cruiserShipObject = object;
	}
	
	this.setAlienFighterShipObject = function( object ) {
		this.alienFighterShipObject = object;
	}
	
	this.setWeaponMesh = function( object ) {
		this.weaponMeshObject = object;
	}
	
	this.setWarningStationShipObject = function( object ) {
		this.warningStationShipObject = object;
	}
	
	this.setStationShipObject = function( object ) {
		this.stationShipObject = object;
	}
	
	this.returnPlayerShipObject = function() {
		return this.playerShipObject;
	}
	
	this.returnDestroyerShipObject = function() {
		return this.destroyerShipObject;	
	}
	
	this.returnFrigateShipObject = function() {
		return this.frigateShipObject;	
	}
	
	this.returnCruiserShipObject = function() {
		return this.cruiserShipObject;
	}
	
	this.returnBulletObject = function() {
		return this.weaponMeshObject;
	}

	this.returnAlienFighter = function() {
		return this.alienFighterShipObject;
	}
	
	this.returnStationShipObject = function() {
		return this.stationShipObject;
	}
	
	this.returnWarningStationShipObject = function() {
		return this.warningStationShipObject;
	}
	
	this.returnObject = function( objectType ) {
		if(objectType == 'humanFighter') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnPlayerShipObject();
		}
		if(objectType == 'alienFighter') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnAlienFighter();
		}
		if(objectType == 'destroyer') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnDestroyerShipObject();
		}
		if(objectType == 'frigate') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnFrigateShipObject();
		}
		if(objectType == 'cruiser') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnCruiserShipObject();
		}
		if(objectType == 'station') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnStationShipObject();
		}
		if(objectType == 'warningStation') {
			return gameEngine.returnSystem( 'spaceObjects' ).returnWarningStationShipObject();
		}		
	}
	this.buildPlanets = function() {
		var scene = gameEngine.returnSystem( 'threejs' ).getScene();
		/*
		// Sun
			var sunMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 50,
				map: textureLoader.load( "assets/images/sun.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			sunGeo = new THREE.SphereGeometry( (radius * 100), 100, 50 );
			sunMesh = new THREE.Mesh( sunGeo, sunMap );
			sunMesh.rotation.y = 0;
			sunMesh.rotation.z = tilt;
			sunMesh.position.z -= 3129600;
			//meshPlanet3.position.x -= 1129600;
			
			sunMesh.geometry.computeBoundingSphere();
			
			sunMesh.name = 'Sun';

			scene.add( sunMesh );
			*/
		/*
		// Mercury
			var mercuryMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/mercury.jpg" ),
			} );
			
			mercuryGeo = new THREE.SphereGeometry( (radius * .38), 200, 50 );
			mercuryMesh = new THREE.Mesh( mercuryGeo, mercuryMap );
			mercuryMesh.rotation.y = 0;
			mercuryMesh.rotation.z = tilt;
			mercuryMesh.position.z -= 32200;
			mercuryMesh.position.x += 19200;
			
			mercuryMesh.geometry.computeBoundingSphere();
			
			mercuryMesh.name = 'Mercury';

			scene.add( mercuryMesh );		
			
		// Venus
			var venusMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/venus.jpg" ),
			} );
			
			venusGeo = new THREE.SphereGeometry( (radius * .95), 100, 50 );
			venusMesh = new THREE.Mesh( venusGeo, venusMap );
			venusMesh.rotation.y = 0;
			venusMesh.rotation.z = tilt;
			venusMesh.position.z -= 18600;
			venusMesh.position.x += 229600;
			
			venusMesh.geometry.computeBoundingSphere();
			
			venusMesh.name = 'Venus';

			scene.add( venusMesh );		
			
			// Venus Clouds
				var venusClouds = new THREE.MeshLambertMaterial( {
					map: textureLoader.load( "assets/images/venusClouds.png" ),
					transparent: true
				} );
				
				venusCloudMesh = new THREE.Mesh( venusGeo, venusClouds );
				venusCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
				venusCloudMesh.rotation.z = tilt;
				venusCloudMesh.position.z -= 18600;
				venusCloudMesh.position.x += 229600;
				
				venusCloudMesh.name = 'VenusClouds';
				
				scene.add( venusCloudMesh );		
		*/
		// Earth
			var earthMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/earth_atmos_2048.jpg" ),
				specularMap: textureLoader.load( "assets/images/earth_specular_2048.jpg" ),
				normalMap: textureLoader.load( "assets/images/earth_normal_2048.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );		
			
			earthGeo = new THREE.SphereGeometry( radius * 2, 100, 50 );
			earthMesh = new THREE.Mesh( earthGeo, earthMap );
			earthMesh.rotation.y = 0;
			earthMesh.rotation.z = tilt;
		
			earthMesh.geometry.computeBoundingSphere();
			
			earthMesh.name = 'Earth';

			scene.add( earthMesh );
			
			// Earth clouds
			var earthClouds = new THREE.MeshLambertMaterial( {
				map: textureLoader.load( "assets/images/earth_clouds_1024.png" ),
				transparent: true
			} );
			
			earthCloudMesh = new THREE.Mesh( earthGeo, earthClouds );
			earthCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
			earthCloudMesh.rotation.z = tilt;
			
			earthCloudMesh.name = 'EarthClouds';
			
			scene.add( earthCloudMesh );
			
			// Moon
				var materialMoon = new THREE.MeshPhongMaterial( {
					shininess: 0.2,
					map: textureLoader.load( "assets/images/moon.jpg" )
				} );
				
				meshMoon = new THREE.Mesh( geometry, materialMoon );
				meshMoon.position.set( radius * 5, 0, 0 );
				meshMoon.scale.set( moonScale, moonScale, moonScale );
				
				meshMoon.name = 'Moon';
				
				scene.add( meshMoon );		
			/*
		// Mars
			var marsMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/mars.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			marsGeo = new THREE.SphereGeometry( (radius * 1.05), 100, 50 );
			marsMesh = new THREE.Mesh( marsGeo, marsMap );
			marsMesh.rotation.y = 0;
			marsMesh.rotation.z = tilt;
			marsMesh.position.z += 14600;
			marsMesh.position.x -= 9600;
			
			marsMesh.geometry.computeBoundingSphere();
			
			marsMesh.name = 'Mars';

			scene.add( marsMesh );
		
			// Mars Clouds
				var marsClouds = new THREE.MeshLambertMaterial( {
					map: textureLoader.load( "assets/images/earth_clouds_2048.png" ),
					transparent: true
				} );
				
				marsCloudMesh = new THREE.Mesh( marsGeo, marsClouds );
				marsCloudMesh.scale.set( cloudsScale, cloudsScale, cloudsScale );
				marsCloudMesh.rotation.z = tilt;
				marsCloudMesh.position.z += 14600;
				marsCloudMesh.position.x -= 9600;
				
				marsCloudMesh.name = 'MarsClouds';
				
				scene.add( marsCloudMesh );
				
		// Jupiter
			var jupiterMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/jupiter.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			jupiterGeo = new THREE.SphereGeometry( (radius * 22), 100, 50 );
			jupiterMesh = new THREE.Mesh( jupiterGeo, jupiterMap );
			jupiterMesh.rotation.y = 0;
			jupiterMesh.rotation.z = tilt;
			jupiterMesh.position.z += 22229600;
			jupiterMesh.position.x -= 22229600;
			
			jupiterMesh.geometry.computeBoundingSphere();
			
			jupiterMesh.name = 'Jupiter';

			scene.add( jupiterMesh );		
				
		// Saturn
			var saturnMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/saturn.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			saturnGeo = new THREE.SphereGeometry( (radius * 18), 100, 50 );
			saturnMesh = new THREE.Mesh( saturnGeo, saturnMap );
			saturnMesh.rotation.y = 0;
			saturnMesh.rotation.z = tilt;
			saturnMesh.position.z += 538600;
			saturnMesh.position.x -= 238600;
			
			saturnMesh.geometry.computeBoundingSphere();
			
			saturnMesh.name  = 'Saturn';
			saturnMesh.radius = radius * 18;
			saturnMesh.text  = 'This is Saturn. Saturn is a planet. Visit Saturn.<br/>' +
							  'Because Saturn is sometimes nice.';

			scene.add( saturnMesh );	
		
		// Uranus
			var uranusMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/uranus.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			uranusGeo = new THREE.SphereGeometry( (radius * 10), 100, 50 );
			uranusMesh = new THREE.Mesh( uranusGeo, uranusMap );
			uranusMesh.rotation.y = 0;
			uranusMesh.rotation.z = tilt;
			uranusMesh.position.z += 767600;
			uranusMesh.position.x -= 138600;
			
			uranusMesh.geometry.computeBoundingSphere();
			
			uranusMesh.name = 'Uranus';

			scene.add( uranusMesh );	
			
		// Neptune
			var neptuneMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/neptune.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			neptuneGeo = new THREE.SphereGeometry( (radius * 9), 100, 50 );
			neptuneMesh = new THREE.Mesh( neptuneGeo, neptuneMap );
			neptuneMesh.rotation.y = 0;
			neptuneMesh.rotation.z = tilt;
			neptuneMesh.position.z += 1187600;
			neptuneMesh.position.x -= 2238600;
			
			neptuneMesh.geometry.computeBoundingSphere();
			
			neptuneMesh.name = 'Neptune';

			scene.add( neptuneMesh );
				
		// Pluto
			var plutoMap = new THREE.MeshPhongMaterial( {
				specular: 0x333333,
				shininess: 0.5,
				map: textureLoader.load( "assets/images/pluto.jpg" ),
				normalScale: new THREE.Vector2( 0.85, 0.85 )
			} );
			
			plutoGeo = new THREE.SphereGeometry( (radius * .4), 100, 50 );
			plutoMesh = new THREE.Mesh( plutoGeo, plutoMap );
			plutoMesh.rotation.y = 0;
			plutoMesh.rotation.z = tilt;
			plutoMesh.position.z += 1397600;
			plutoMesh.position.x += 1238600;
			
			plutoMesh.geometry.computeBoundingSphere();
			
			plutoMesh.name = 'Pluto';

			scene.add( plutoMesh );
	*/
	}
	
}