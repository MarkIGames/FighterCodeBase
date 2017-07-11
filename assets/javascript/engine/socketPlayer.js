// Object for Socket.IO multiplayer operation
function socketPlayer() {	

	var socket                = {};             // Empty socket object, to be filled later
	var server                = "192.168.1.83"; // Node Socket Server IP
	var connectionAttempts    = -1;             // How many connection attempts we've made
	var maxConnectionAttempts = 5;              // Connection variable, number of attempts to make
	var connectionSleepTimer  = 30;             // Connection variable for time to wait 
	var alertSent             = false;          // Tracking if alert has been set to abandon connection attempt
	
	// Array of game systems to operate
	var gameSystems = {};
	
	// Initalize Main Game Systems
	this.initalize = function() {
		setupSockets();
	}
	
	// Upodate each game system with the current game tick
	this.update = function ( gameTick ) {
		if(socket == undefined) {
			setupSockets();
		}
		/* This should move to the game class */
			/*
			// Get the game class object
			game = gameEngine.returnSystem( 'game' );
			// Run the updatePlayer Details function
			game.updatePlayerDetails();
			*/
	}
	
	// Setup our initial socket connection
	function setupSockets() {
		game = gameEngine.returnSystem( 'game' );
		
		playerShip = game.returnShip( shipId );
		
		token = {};
		token.name = playerShip['displayName'];
		token.game = 0;
		token.ship = playerShip['id'];
		
		socket = connectToServer();
		
		if(socket !== undefined) {
			setTimeout(function() {
				setupSocketTransfers();			
			}, 1500);
		} else {
			setTimeout(function() {
				socket = finishConnection();
				setupSocketTransfers();
			}, 1500);
		}
	}	
	
	var setupSocketTransfers = function() {
		// Create a new socket connection
		socket.on('connect', function() {
			socket.emit('set token', token);
		});	
		
		socket.on('disconnect', function(){
			alert('Server Disconnected!');
			location.href='index.php';
		});
		
		socket.on('alert_message', function( message ){
			alert( message );
		});

		game.addSocketFunctions( socket );
	}
	
	// Emit any call anywhere
	this.emitForGame = function( type, sendData, callback) {
		// If we have no callback...
		if(callback == null) {
			if(socket !== undefined) {
				// Send the emit and do nothing with any return
				socket.emit(type, sendData, function(data) {
					// Do nothing!
				});
			}
		}
	}
	
	var connectToServer = function() {
		socket = loadSocketFiles();
		
		return socket;
	}

	var loadSocketFiles = function() {
		try {
			var imported = document.createElement('script');
			imported.src = 'http://' + server + ':8000/socket.io/lib/socket.io.js';
			document.head.addEventListener('error', function( e ){
				if(alertSent == false) {
					alertSent = true;
					alert('Server is unavailable at this time. Returning to the login page.');
				}
				location.href='index.php';
			}, true);
			
			document.head.appendChild(imported);
		} catch (err) {

		}

		socket = finishConnection();
		
		return socket;
	}

	var finishConnection = function() {
		if(typeof io == "undefined") {

		} else {
			var conn_options = {
			  'sync disconnect on unload':false
			};
		
			socket = io.connect('http://' + server + ':8000', conn_options);
			
			socket.on('connect_error', function(err) {
				  alert('Failed');
			});
			return socket;
		}
	}

	var dieNow = function() {
		// Do nothing.
	}

	var returnAndDie = function() {
	    location.href='../';
	    return false;
	}
	
}