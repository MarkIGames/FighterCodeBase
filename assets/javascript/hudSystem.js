function hudSystem() {
	
	var speedState = 1;       // Tracking speed state
	
	this.initalize = function() {
		$('#shipId').html(shipId);
	}
	
	this.update = function() {
		updateFuel();
		updateRadar();
		updateWeapons();
	}
	
	function activateHudElement( element ) {
		$(element).addClass('activeElement');
	}
	
	function deActivateHudElement( element ) {
		$(element).removeClass('activeElement');
	}
	
	function updateRadar() {
		var viewRadar = gameEngine.returnSystem( 'radar' ).getRadarViewRange();
		
		$('#radarViewRange').html(viewRadar);
		
		var radarObjects = gameEngine.returnSystem( 'radar' ).returnRadarObjects();
		
		$( ".radarElement" ).removeClass('updated');
		
		$.each( radarObjects, function( key, object ) {
			if($('#target_' + key + '')[0] == undefined) {
				var newRadarDiv = '<div id="target_' + key + '" class="radarElement">#<span id="target_' + key + '_alt">' + object.z + '</span></div>';
				$('#radarBoxHolder').append(newRadarDiv);
				$( ".radarElement" ).addClass('updated');
			} else {
				console.log('X: ' + object.x + ' Y: ' + object.y);
				$('#target_' + key + '').css({top: object.y, left: object.x, position:'absolute'});
				$('#target_' + key + '_alt').html(object.z);
				$( ".radarElement" ).addClass('updated');
			}
			//$('#target_' + key + '').remove();
			//var newRadarDiv = '<div id="target_' + key + '">' + key + ': ' + object.hull + '</div>';
			//$('#radarBoxHolder').append(newRadarDiv);
		});
		
		$( ".radarElement" ).each(function( index ) {
			if(!($( this ).hasClass('updated'))) {
				$( this ).remove();
			}
		});
	}
	
	function updateFuel() {
		var fuelObject = gameEngine.returnSystem( 'game' ).returnFuelObject();
		
		var newFuel = fuelObject.curFuel / fuelObject.maxFuel;
		
		$('#fuelValue').html(Math.round(newFuel * 100) + '%');
		$('#fuelCount').html(fuelObject.curFuel);
	}
	
	function updateWeapons() {
		var weaponObjects = gameEngine.returnSystem( 'game' ).getWeaponStates();
		
		$('#left_1').html(weaponObjects['left'][1]);
		$('#left_2').html(weaponObjects['left'][2]);
		$('#right_1').html(weaponObjects['right'][1]);
		$('#right_2').html(weaponObjects['right'][2]);
	}
	
	function checkDocking() {
		if(issObject != undefined) {
			var distance1 = distanceVector( camera.position, issObject.position );
		}
		
		if(mirObject != undefined) {
			var distance2 = distanceVector( camera.position, mirObject.position );
		}
	
		$('#dockOptionValue').html('DOCK');
	
		if(distance1 < 1000 || distance2 < 1300) {
			activateHudElement( $('#dockOptionHolder') );
			
			$('#dockOptionValue').html('DOCK');
			$('#dockOptionValue').addClass('dockOptionValue2');
			$('#dockOptionValue').removeClass('dockOptionValue1');
		} else {
			deActivateHudElement( $('#dockOptionHolder') );
	
			$('#dockOptionValue').html('NO-DOCK');
			$('#dockOptionValue').addClass('dockOptionValue1');
			$('#dockOptionValue').removeClass('dockOptionValue2');
		}
	}
	
	function checkProbes() {
		var object = findClosestProbe();
		
		if(object != undefined) {
			var distance = distanceVector( camera.position, object.position );
		
			$('#probeDistanceValue').html(Math.round(distance));
			
			if(distance < 1000) {
				activateHudElement( $('#probeDistanceValueHolder') );
				fuelState = true;
			} else {
				deActivateHudElement( $('#probeDistanceValueHolder') );
				fuelState = false;
			}
			
			if(fuelState == true && curFuel < maxFuel) {
				displayRefueling()
			}
		}
	}
	
	function displayRefueling() {
		$('#probeDistanceValue').html('REFUELING');
	}
	
	function findClosestProbe() {
		var probeArray = {};
		/*
		if(aimObject1 != undefined) {
		    var distance1 = distanceVector( camera.position, aimObject1.position );
		    probeArray[distance1] = aimObject1;
		}
		
		if(aimObject2 != undefined) {
			var distance2 = distanceVector( camera.position, aimObject2.position );
			probeArray[distance2] = aimObject2;
		}
		
		if(aimObject3 != undefined) {
			var distance3 = distanceVector( camera.position, aimObject3.position );
			probeArray[distance3] = aimObject3;
		}
		
		if(aimObject4 != undefined) {
			var distance4 = distanceVector( camera.position, aimObject4.position );
			probeArray[distance4] = aimObject4;
		}
		
		var closest = Math.min(distance1,distance2,distance3,distance4);
		
		return probeArray[closest];*/
		return probeArray;
		
	}
	
	function checkClosestProbe() {
		
	}
	
	function changeSpeedMode( direction ) {
		if(direction == 'up' && speedState != 5) {
			this.moveState.forward
			speedState += 2;
		}
		if(direction == 'down' && speedState != 1) {
			speedState -= 2;
		}
		
		if(speedState == 1) {
			$('#speedOptionValue').html('SLOW');
			$('#speedOptionValue').addClass('speedOptionValue1');
			$('#speedOptionValue').removeClass('speedOptionValue2');
		}
		if(speedState == 3) {
			$('#speedOptionValue').html('MED');
			$('#speedOptionValue').addClass('speedOptionValue2');
			$('#speedOptionValue').removeClass('speedOptionValue1');
		}
		if(speedState == 5) {
			$('#speedOptionValue').html('FAST');
			$('#speedOptionValue').addClass('speedOptionValue1');
			$('#speedOptionValue').removeClass('speedOptionValue2');
		}	
	
	}
	
}