function weaponManager() {

	var bulletCounter = 0;
	
	this.fireWeapon = function() {
		if(gameEngine.returnSystem( 'game' ).fireWeaponStates()) {
			gameEngine.returnSystem( 'socketPlayer' ).emitForGame( 'create_bullet', gameEngine.returnSystem( 'game' ).returnPlayerShip(), null );
		}
	}
	
	this.createWeapon = function( object ) {
		var weaponMesh = gameEngine.returnSystem( 'spaceObjects' ).returnBulletObject();
		
		var newWeaponMesh = weaponMesh.clone();
	
		newWeaponMesh.position.x = object.position.x;
		newWeaponMesh.position.y = object.position.y;
		newWeaponMesh.position.z = object.position.z;
		
		newWeaponMesh.rotation.x = object.rotation.x;
		newWeaponMesh.rotation.y = object.rotation.y;
		newWeaponMesh.rotation.z = object.rotation.z;
	
		newWeaponMesh.lifeTime = 200;
		newWeaponMesh.bulletid = object.id;
		
		newWeaponMesh.geometry.computeBoundingSphere();
		
		var randomName = 'value' + bulletCounter;
		
		bulletCounter = bulletCounter + 1;
		
		newWeaponMesh.name = randomName;
				
		var scene = gameEngine.returnSystem( 'threejs' ).getScene();

		scene.add( newWeaponMesh );
		
		gameEngine.returnSystem( 'game' ).addBullet(newWeaponMesh.bulletid, newWeaponMesh);
	}

}