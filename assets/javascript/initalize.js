// Variable Declaration
var gameEngine = {};	// Save our Game Engine Object
var animate    = null;  // Fill this in later

// jQuery Ready Document
$(function() {	

	var gamePads = navigator.getGamepads();
	
	// Verify we meet the minimum system requirements
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	
	// Start a new Game Engine
	gameEngine = new engine();

	// Setup the Three JS Class
	var threeDeeObject = new threeDee();
	// Save it to the Engine
	gameEngine.addSystem( threeDeeObject, 'threejs' );
	
	// Setup the Player Class
	var playerClassObject = new playerClass();
	// Save it to the Engine
	gameEngine.addSystem( playerClassObject, 'player' );
	
	// Setup the Player Class
	var bulletManagerObject = new bulletManager();
	// Save it to the Engine
	gameEngine.addSystem( bulletManagerObject, 'bulletManager' );
	
	// Setup the Player Class
	var weaponManagerObject = new weaponManager();
	// Save it to the Engine
	gameEngine.addSystem( weaponManagerObject, 'weaponManager' );
	
	// Setup the Game Class
	var gameClassObject = new gameClass();
	// Save it to the engine
	gameEngine.addSystem( gameClassObject, 'game' );
	
	// Setup the Game Class
	var spaceObjectClassObject = new spaceObjects();
	// Save it to the engine
	gameEngine.addSystem( spaceObjectClassObject, 'spaceObjects' );
	
	// Setup the Game Class
	var lightObjectClassObject = new lightTypes();
	// Save it to the engine
	gameEngine.addSystem( lightObjectClassObject, 'lightTypes' );
	
	// Setup the Game Class
	var radarClassObject = new radarSystem();
	// Save it to the engine
	gameEngine.addSystem( radarClassObject, 'radar' );
	
	// Setup the Game Class
	var hudClassObject = new hudSystem();
	// Save it to the engine
	gameEngine.addSystem( hudClassObject, 'hud' );
	
	// Setup the Game Class
	var controlClassObject = new controlSystem();
	// Save it to the engine
	gameEngine.addSystem( controlClassObject, 'controls' );
	
	// Setup the Multiplayer Socket 
	var socketClassObject = new socketPlayer();
	// Save it to the Engine
	gameEngine.addSystem( socketClassObject, 'socketPlayer' );

	// Setup the Multiplayer Socket 
	var mainLoopObject = new mainLoop();
	// Save it to the Engine
	gameEngine.addSystem( mainLoopObject, 'mainLoop' );

	// Initalize the Game Systems
	gameEngine.initalizeSystems();
	
});