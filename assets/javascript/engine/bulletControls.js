/**
 * @author James Baicoianu / http://www.baicoianu.com/
 */

bulletMoveState = { up: 0, down: 0, left: 0, right: 0, forward: 1, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };

THREE.bulletControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;
	if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );

	// API
	this.movementSpeed = 0.00001;
	this.rollSpeed = 0.005;

	this.dragToLook = false;
	this.autoForward = true;
	this.tmpQuaternion = new THREE.Quaternion();
	this.mouseStatus = 0;
	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	this.keydown = function( event ) {
		if ( event.altKey ) {

			return;

		}

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.keyup = function( event ) {

		this.updateMovementVector();
		this.updateRotationVector();

	};

	this.update = function( delta ) {
		if(speedState > 4) {
			var speedModifier = speedState * 5;
		} else {
			var speedModifier = speedState;
		}
		
		var moveMult = delta * this.movementSpeed * speedModifier;
		var rotMult = delta * this.rollSpeed;

		this.object.translateX( this.moveVector.x * moveMult );
		this.object.translateY( this.moveVector.y * moveMult );
		this.object.translateZ( this.moveVector.z * moveMult );

		this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
		this.object.quaternion.multiply( this.tmpQuaternion );

		// expose the rotation vector for convenience
		this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );
		
		if(checkMoveStates( this )) {
			//moveShip();
		}
	};

	this.updateMovementVector = function() {
		var forward = ( bulletMoveState.forward || ( this.autoForward && ! bulletMoveState.back ) ) ? 1 : 0;

		this.moveVector.x = ( - bulletMoveState.left    + bulletMoveState.right );
		this.moveVector.y = ( - bulletMoveState.down    + bulletMoveState.up );
		this.moveVector.z = ( - forward + bulletMoveState.back );
	};

	this.updateRotationVector = function() {
		this.rotationVector.y = ( - bulletMoveState.yawRight  + bulletMoveState.yawLeft );
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

	function checkMoveStates( moveObject ) {
		if(bulletMoveState.forward != 0) {
			return true;
		}
		if(bulletMoveState.back != 0) {
			return true;
		}
		if(bulletMoveState.left != 0) {
			return true;
		}
		if(bulletMoveState.right != 0) {
			return true;
		}
		if(bulletMoveState.yawLeft != 0) {
			return true;
		}
		if(bulletMoveState.yawRight != 0) {
			return true;
		}
		
		return false;
	}
	
	this.dispose = function() {

		window.removeEventListener( 'keydown', _keydown, false );
		window.removeEventListener( 'keyup', _keyup, false );

	};

	var _mousemove = bind( this, this.mousemove );
	var _mousedown = bind( this, this.mousedown );
	var _mouseup = bind( this, this.mouseup );
	var _keydown = bind( this, this.keydown );
	var _keyup = bind( this, this.keyup );

	window.addEventListener( 'keydown', _keydown, false );
	window.addEventListener( 'keyup',   _keyup, false );

	this.updateMovementVector();
	this.updateRotationVector();
};
