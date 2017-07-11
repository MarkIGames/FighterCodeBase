function bulletManager() {

	this.update = function( delta ) {
		var delta       = gameEngine.returnSystem( 'threejs' ).getDelta();
		var bulletArray = gameEngine.returnSystem( 'game' ).getBulletArray();
		
		$.each( bulletArray, function( key, object ) {
			//object.translateZ( delta * -10128 );
		});	
	}
	
	this.removeBullet = function( id ) {
		var bulletArray = gameEngine.returnSystem( 'game' ).getBulletArray();
		
		object = bulletArray[id];
		
		var scene = gameEngine.returnSystem( 'threejs' ).getScene();
		
		scene.remove( object );
		
		delete bulletArray[id];
	}

}