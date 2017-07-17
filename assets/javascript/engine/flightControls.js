/**
 * @author James Baicoianu / http://www.baicoianu.com/
 */

THREE.flightControls = function ( object, domElement ) {

	var moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
	var moveVector = new THREE.Vector3( 0, 0, 0 );
	var rotationVector = new THREE.Vector3( 0, 0, 0 );

	var speedThreshold = -0.9;
	var filterThresh = 0.15;
	
	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;
	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );

	// API

	this.movementSpeed = 750;
	this.rollSpeed = 0.5;

	this.dragToLook = false;
	this.autoForward = false;

	// disable default target object behavior

	// internals

	this.tmpQuaternion = new THREE.Quaternion();

	this.mouseStatus = 0;



	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	this.keydown = function( event ) {

		if ( event.altKey ) {

			return;

		}

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ moveState.forward = 1; break;
			case 83: /*S*/ moveState.back = 1; break;

			case 65: /*A*/ moveState.left = 1; break;
			case 68: /*D*/ moveState.right = 1; break;

			case 82: /*R*/ moveState.up = 1; break;
			case 70: /*F*/ moveState.down = 1; break;

			case 38: /*up*/ moveState.pitchUp = 1; break;
			case 40: /*down*/ moveState.pitchDown = 1; break;

			case 37: /*left*/ moveState.yawLeft = 1; break;
			case 39: /*right*/ moveState.yawRight = 1; break;

			case 81: /*Q*/ moveState.rollLeft = 1; break;
			case 69: /*E*/ moveState.rollRight = 1; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.keyup = function( event ) {

		switch ( event.keyCode ) {

			case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

			case 87: /*W*/ moveState.forward = 0; break;
			case 83: /*S*/ moveState.back = 0; break;

			case 65: /*A*/ moveState.left = 0; break;
			case 68: /*D*/ moveState.right = 0; break;

			case 82: /*R*/ moveState.up = 0; break;
			case 70: /*F*/ moveState.down = 0; break;

			case 38: /*up*/ moveState.pitchUp = 0; break;
			case 40: /*down*/ moveState.pitchDown = 0; break;

			case 37: /*left*/ moveState.yawLeft = 0; break;
			case 39: /*right*/ moveState.yawRight = 0; break;

			case 81: /*Q*/ moveState.rollLeft = 0; break;
			case 69: /*E*/ moveState.rollRight = 0; break;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.update = function( delta ) {

		var moveMult = delta * this.movementSpeed;
		var rotMult = delta * this.rollSpeed;

		this.object.translateX( moveVector.x * moveMult );
		this.object.translateY( moveVector.y * moveMult );
		this.object.translateZ( moveVector.z * moveMult );

		this.tmpQuaternion.set( rotationVector.x * rotMult, rotationVector.y * rotMult, rotationVector.z * rotMult, 1 ).normalize();
		this.object.quaternion.multiply( this.tmpQuaternion );

		// expose the rotation vector for convenience
		this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );


	};

	this.updateMovementVector = function() {

		//var forward = ( moveState.forward || ( this.autoForward && ! moveState.back ) ) ? 1 : 0;

		moveVector.x = ( - moveState.left    + moveState.right );
		moveVector.y = ( - moveState.down    + moveState.up );
		moveVector.z = ( - moveState.forward + moveState.back );

		//console.log( 'move:', [ moveVector.x, moveVector.y, moveVector.z ] );

	};

	this.updateRotationVector = function() {

		rotationVector.x = ( - this.filterB(moveState.pitchDown) + this.filterB(moveState.pitchUp) );
		rotationVector.y = ( - this.filter(moveState.yawRight)   + this.filter(moveState.yawLeft) );
		rotationVector.z = ( - this.filter(moveState.rollRight)  + this.filter(moveState.rollLeft) );

		//console.log( 'rotate:', [ rotationVector.x, rotationVector.y, rotationVector.z ] );

	};

	this.getContainerDimensions = function() {

		if ( this.domElement != document ) {

			return {
				size	: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
				offset	: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]
			};

		} else {

			return {
				size	: [ window.innerWidth, window.innerHeight ],
				offset	: [ 0, 0 ]
			};

		}

	};

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {


		window.removeEventListener( 'keydown', _keydown, false );
		window.removeEventListener( 'keyup', _keyup, false );

	};

	this.filter = function( v ) {
		return ( Math.abs( v ) > filterThresh ) ? v : 0;
	}

	this.filterB = function( v ) {
		return ( Math.abs( v ) > -1.1 ) ? v : 0;
	}

	this.filterT = function( v ) {
		return ( v > speedThreshold ) ? v : 0;
	}

	this.checkMoveStates = function( moveObject ) {
		if(moveState.forward != 0) {
			return true;
		}
		if(moveState.back != 0) {
			return true;
		}
		if(moveState.left != 0) {
			return true;
		}
		if(moveState.right != 0) {
			return true;
		}
		if(moveState.yawLeft != 0) {
			return true;
		}
		if(moveState.yawRight != 0) {
			return true;
		}
		
		if(moveState.rollLeft != 0) {
			return true;
		}
		if(moveState.rollRight != 0) {
			return true;
		}
		
		if(moveState.pitchUp != 0) {
			return true;
		}
		if(moveState.pitchDown != 0) {
			return true;
		}
		
		return false;
	}

	var fireGunCount = 0;
	
	this.pollControls = function( delta ) {
		var list     = navigator.getGamepads();
		
		var stick    = null;
		var throttle = null;
		
		$.each( list, function( key, object ) {
			if(list[key] != undefined) {
				if(list[key].id.includes("stick") || list[key].id.includes("Stick") || list[key].id.includes("STICK")) {
					stick    = list[key];
				}
				
				if(list[key].id.includes("throttle") || list[key].id.includes("Throttle") || list[key].id.includes("THROTTLE")) {
					throttle    = list[key];
				}
			}
		});
		
		if(stick != null && throttle != null) {
						
			var sax1 = this.filter( stick.axes[ 1 ] );
			var sax5 = this.filter( stick.axes[ 5 ] );
			var sax0 = this.filter( stick.axes[ 0 ] );
			
			var tax0 = this.filterT( (throttle.axes[ 0 ] * -1) );
			
			if(sax1 != 0) { 
				moveState.pitchUp = sax1;  
			} else { 
				moveState.pitchUp  = 0;  
			}
			
			if(sax5 != 0) { 
				moveState.rollLeft = sax5 * -1;  
			} else { 
				moveState.rollLeft = 0;  
			}
			
			if(sax0 != 0) { 
				moveState.yawLeft = sax0 * -1;  
			} else { 
				moveState.yawLeft = 0;  
			}
	
			if(tax0 != 0) {
				if(moveState.forward < 0) {
					moveState.forward = tax0 * -1;
				} else {
					moveState.forward = tax0 + 1;
				}
				
				if(moveState.forward === 2) {
					moveState.forward = 20;
				}
				
				//console.log(moveState.forward);
			} else { 
				moveState.forward = 0;  
			}
			
			this.updateMovementVector();
			this.updateRotationVector();
			
			if(this.checkMoveStates( this )) {
				gameEngine.returnSystem( 'game' ).moveShip();
			}
		}
	}
	
	var _keydown = bind( this, this.keydown );
	var _keyup = bind( this, this.keyup );

	window.addEventListener( 'keydown', _keydown, false );
	window.addEventListener( 'keyup',   _keyup, false );

	this.updateMovementVector();
	this.updateRotationVector();

};