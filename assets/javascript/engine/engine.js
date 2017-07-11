// Function for operating game systems
function engine() {	

	
	var gameSystems   = {};      // Array of game systems to operate
	var setupGameBool = false;   // Boolean variable for initial setup
	var gameSpeed     = 50;      // Integar for standard game speed
	var updateSpeed   = 50;      // Integar for standard game speed
	var intervalTime  = 0;       // Interval counter for main game loop
	
	// Initalize Main Game Systems
	this.initalizeSystems = function() {
		// Iterate over each system...
		$.each( gameSystems, function( key, value ) {
			if((gameSystems[key].initalize != undefined) && ((typeof gameSystems[key].initalize) === 'function')) {
				// Run it's initalization process
				gameSystems[key].initalize();
			}
		});
	}
	
	// Upodate each game system with the current game tick
	this.updateSystems = function ( gameTick ) {
		// Iterate over each system...
		$.each( gameSystems, function( key, value ) {
			if((gameSystems[key].update != undefined) && ((typeof gameSystems[key].update) === 'function')) {
				// Run it's update process, and give it the game tick
				gameSystems[key].update( gameTick );
			}
		});
	}
	
	// Add a game system to the game system array
	this.addSystem = function ( systemObject, name ) {
		// Set the key and give it the value of the system object
		gameSystems[name] = systemObject;
	}
	
	// Remove a game system (don't know why we need this?)
	this.removeSystem = function ( name ) {
		// Remove the game system
		delete gameSystems[name];
	}
	
	// Return a game system for another object to manipulate
	this.returnSystem = function( name ) {
		// Return the game system by name key
		return gameSystems[name];
	}
	
	// Update a game system in the engine object
	this.updateSystem = function( name, object ) {
		// Save the new object 
		gameSystems[name] = object;
	}
}