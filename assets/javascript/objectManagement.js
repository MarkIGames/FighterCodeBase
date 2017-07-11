var worldObjects = {};
var radarObjects = {};
var activeNote   = '';

function addWorldObject( name, object ) {
	worldObjects[name] = object;
}

function removeWorldObject( object ) {
	delete worldObjects[object.name];
}

function addRadar( name, distance, object ) {
	radarObjects[name] = {};
	radarObjects[name].name         = name;
	radarObjects[name].distance     = distance;
	radarObjects[name].noteDistance = object.radius + 2500;
	radarObjects[name].note         = object.text;
}

function removeRadar( name ) {
	delete radarObjects[name];
}

function updateObject( object ) {
	object.updateMatrix(); 
	object.updateMatrixWorld();
}

function checkObject( object, frustum, name ) {
	if(frustum.intersectsObject( object )) {
		var distance = distanceVector( camera.position, object.position );
		addRadar( name, distance, object );
	}
}

function updateRadarbox() {
	var radarArray = [];
	
	$.each(radarObjects, function( key, value ) {
		radarArray[parseInt(value.distance)] = value.name;
		var htmlString = $('#radarBoxHolder').html() + value.name + '&nbsp;' + parseInt(value.distance) + '<br/>';
		$('#radarBoxHolder').html( htmlString );
		
		if(value.distance < value.noteDistance ) {
			// Kill the Player
		}
	});
}

function runAllObjects( frustum ) {
	/*
	$.each(worldObjects, function( key, value ) {
		updateObject( value );
		checkObject( value, frustum, key );
	});
	*/
}

function runRadarDetection() {
	radarObjects = {};
	$('#radarBoxHolder').html('');
	camera.updateMatrix(); // make sure camera's local matrix is updated
	camera.updateMatrixWorld(); // make sure camera's world matrix is updated
	camera.matrixWorldInverse.getInverse( camera.matrixWorld );
	
	var frustum = new THREE.Frustum();
	frustum.setFromMatrix( new THREE.Matrix4().multiply( camera.projectionMatrix, camera.matrixWorldInverse ) );
	
	runAllObjects( frustum );
	
	updateRadarbox();
}