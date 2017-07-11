function mainLoop() {

	var gameLoop      = null;    // Variable to hold our interval
	var setupGameBool = false;   // Boolean variable for initial setup
	var gameSpeed     = 50;      // Integar for standard game speed
	var updateSpeed   = 50;      // Integar for standard game speed
	var intervalTime  = 0;       // Interval counter for main game loop

	this.initalize = function() {
		this.startGame();
	}

	this.mainGameLoop = function() {
		gameEngine.updateSystems();
	}
	
	this.startGame = function() {
		gameLoop = setInterval(function() {
			gameEngine.returnSystem('mainLoop').mainGameLoop();
		}, updateSpeed);
	}
	
}