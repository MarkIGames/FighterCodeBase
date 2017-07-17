function controlSystem() {

	var stick    = {};
	var throttle = {};
	var updateIterator = 0;
	var updateTick     = 2;
	
	this.initalize = function() {
		var list     = navigator.getGamepads();

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
	}
	
	this.update = function() {
		if(updateIterator == updateTick) {
			checkButtons();
			updateIterator = 0;
		} else {
			updateIterator = updateIterator + 1;
		}
	}
	
	var checkButtons = function() {
		if(checkControlSetup()) {
			// Button list and gamepad list are 0 based
			if(stick.buttons[0].pressed) { 
				if(fireGunCount == 0) {
					gameEngine.returnSystem( 'weaponManager' ).fireWeapon(delta);
				}
				
				fireGunCount = fireGunCount + 1;
				
				if(fireGunCount > 18) {
					fireGunCount = 0;
				}
			}
	
			if(throttle.buttons[23].pressed) { 
				gameEngine.returnSystem( 'radar' ).updateRadarRange('up');
				throttle.buttons[23].pressed = false;
				throttle.buttons[23].value   = 0;
			}
			
			if(throttle.buttons[25].pressed) { 
				gameEngine.returnSystem( 'radar' ).updateRadarRange('down');
				throttle.buttons[25].pressed = false;
				throttle.buttons[25].value   = 0;
			}
		}
	}
	
	var checkControlSetup = function() {
		if(stick != null && throttle != null) {
			return true;
		} else {
			return false;
		}
	}

}