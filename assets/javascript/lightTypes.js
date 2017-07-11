function lightTypes() {
	
	var blueSmallLight = {};
	var redSmallLight = {};
	var greenSmallLight = {};
	
	
	this.initalize = function() {
		this.createBlueSmallLight();
		this.createGreenSmallLight();
		this.createRedSmallLight();
	}
	
	this.createBlueSmallLight = function() {
		var bulbGeometry = new THREE.SphereGeometry( 0.08, 16, 8 );
		var bulbLight = new THREE.PointLight( 0x66CCFF, 10, 800);
		var bulbMat = new THREE.MeshStandardMaterial( {
			emissive: 0x66CCFF,
			emissiveIntensity: 1,
			color: 0x000000
		});
		bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		bulbLight.position.set( 0, 0, 0 );
		bulbLight.castShadow = true;
		
		this.setBlueSmallLight(bulbLight);
	}
	
	this.createGreenSmallLight = function() {
		var bulbGeometry = new THREE.SphereGeometry( 0.08, 16, 8 );
		var bulbLight = new THREE.PointLight( 0x00ff00, 10, 800);
		var bulbMat = new THREE.MeshStandardMaterial( {
			emissive: 0x00ff00,
			emissiveIntensity: 1,
			color: 0x000000
		});
		bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		bulbLight.position.set( 0, 0, 0 );
		bulbLight.castShadow = true;
		
		this.setGreenSmallLight(bulbLight);
	}
	
	this.createRedSmallLight = function() {
		var bulbGeometry = new THREE.SphereGeometry( 0.08, 16, 8 );
		var bulbLight = new THREE.PointLight( 0xff0000, 10, 800);
		var bulbMat = new THREE.MeshStandardMaterial( {
			emissive: 0xff0000,
			emissiveIntensity: 1,
			color: 0x000000
		});
		bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
		bulbLight.position.set( 0, 0, 0 );
		bulbLight.castShadow = true;
		
		this.setRedSmallLight(bulbLight);
	}

	this.setBlueSmallLight = function(object) {
		this.blueSmallLight = object;
	}
	
	this.setGreenSmallLight = function(object) {
		this.greenSmallLight = object;
	}
	
	this.setRedSmallLight = function(object) {
		this.redSmallLight = object;
	}
	
	this.getBlueSmallLight = function() {
		return this.blueSmallLight;
	}
	
	this.getGreenSmallLight = function() {
		return this.greenSmallLight;
	}
	
	this.getRedSmallLight = function() {
		return this.redSmallLight;
	}
	
}