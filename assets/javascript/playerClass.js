// Function for operating game systems
function playerClass() {	

	// Final Player Object
	var playerObject = {};
	
	// Initalize Main Game System
	this.initalize = function() {
		// Get the game class object
		var threejsClass = gameEngine.returnSystem( 'threejs' );
		var threejsCamera = threejsClass.getCamera();
		
		playerObject['id']             = shipId;       // Ship ID
		playerObject['displayName']    = 'Blue ' + shipId;     // Ship Name
		playerObject['name']           = 'playerShip'; // Object Name
		playerObject['type']           = 'Pegasus';     // Object Type
		playerObject['otype']          = 'ship';		// Object Type
		playerObject['hull']           = 100;          // Ship Health (100)
		playerObject['heading']        = 0;	    // Object Heading
		playerObject['rawheading']     = 0;	    // Object Heading
		playerObject['speed']          = 0;            // Object Speed
		playerObject['x']              = threejsCamera.position.x;	    // Object X Location
		playerObject['y']              = threejsCamera.position.y;        // Object Y Location
		playerObject['z']              = threejsCamera.position.z;        // Object Y Location
		
		playerObject['rotx']           = threejsCamera.position.rotx;	    // Object X Location
		playerObject['roty']           = threejsCamera.position.roty;        // Object Y Location
		playerObject['rotz']           = threejsCamera.position.rotz;        // Object Y Location
		
		playerObject['origin']         = 'ship1';      // Object Creator
		playerObject['checked']        = false;        // Object Collision Checking Flag
	
		playerObject['shipid']         = shipId;       // Set the Width
		playerObject['fuel']		   = 4400000;     // Ships fuel
		playerObject['faction']		   = 0;            // Ships faction
		
		// Radar Settings
		playerObject['sweep']          = null;        // Radar Sweep Arc
		playerObject['range']          = null;        // Radar Range
		playerObject['mode']           = null;         // Radar Mode
		
		playerObject['type']           = 'humanFighter';         // Radar Mode
		
		playerObject['weapons']          = {};
		playerObject['weapons']['left']  = {};
		playerObject['weapons']['right'] = {};
		
		playerObject['weapons']['left'][1] = 100;
		playerObject['weapons']['left'][2] = 100;
		
		playerObject['weapons']['right'][1] = 100;
		playerObject['weapons']['right'][2] = 100;
	
		// Get the game class object
		var gameClass = gameEngine.returnSystem( 'game' );
		// Add ship1 to the ship list
		gameClass.addExistingShip( shipId, playerObject );
	}
	
	this.update = function() {
		this.updatePlayerDetails();
	}
	
	this.updatePlayerDetails = function() {
		var shipList = gameEngine.returnSystem( 'game' ).returnShipList();
		var camera   = gameEngine.returnSystem( 'threejs' ).getCamera();
		
		shipList['' + shipId + ''].x = camera.position.x;
		shipList['' + shipId + ''].y = camera.position.y;
		shipList['' + shipId + ''].z = camera.position.z;
		
		shipList['' + shipId + ''].rotx = camera.rotation.x;
		shipList['' + shipId + ''].roty = camera.rotation.y;
		shipList['' + shipId + ''].rotz = camera.rotation.z;	
		
		var data = shipList['' + shipId + ''];

		// Run the updatePlayer Details function
		gameEngine.returnSystem( 'socketPlayer' ).emitForGame( 'emit_player_data', data, null );
	}

}