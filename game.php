<html lang="en">
	<head>
	
		<title>FIGHTER II</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

		<link rel="stylesheet" type="text/css" href="assets/css/solar.css">
		<link rel="stylesheet" type="text/css" href="assets/css/hud.css">
		
		<!-- Library Loading -->
		<script src="assets/libraries/jquery-1.4.4.min.js"></script>
		<script src="assets/libraries/three.js"></script>
		
		<!-- Three.JS File Loading -->		
		<script src="assets/libraries/three/loaders/AssimpJSONLoader.js"></script>
		<script src="assets/libraries/three/shaders/CopyShader.js"></script>
		<script src="assets/libraries/three/shaders/FilmShader.js"></script>
		<script src="assets/libraries/three/postprocessing/EffectComposer.js"></script>
		<script src="assets/libraries/three/postprocessing/ShaderPass.js"></script>
		<script src="assets/libraries/three/postprocessing/MaskPass.js"></script>
		<script src="assets/libraries/three/postprocessing/RenderPass.js"></script>
		<script src="assets/libraries/three/postprocessing/FilmPass.js"></script>
		<script src="assets/libraries/three/Detector.js"></script>
		<script src="assets/libraries/three/math/Matrix4.js"></script>
		<script src="assets/libraries/three/math/Math.js"></script>
		<script src="assets/libraries/three/math/Quaternion.js"></script>
		<script src="assets/libraries/three/math/Vector3.js"></script>
		<script src="assets/libraries/three/math/Box3.js"></script>
		<script src="assets/libraries/three/math/Sphere.js"></script>
		
		<!-- Custom Utility Loading -->
		<script src="assets/javascript/utilities.js"></script>
		
	</head>
	<body>

		<?php require_once('assets/scripts/hud.php'); ?>
		
		<script>
			var shipId = "<?php echo rand(pow(10, 3-1), pow(10, 3)-1); ?>";
		</script>
	
	</body>
	
	<!-- Game & Animation Engine Loading -->
		
	<!-- Engine Asset Loading -->
	<script src="assets/javascript/engine/flightControls.js"></script>
	<script src="assets/javascript/engine/bulletControls.js"></script>
	<script src="assets/javascript/engine/socketPlayer.js"></script>
	<script src="assets/javascript/engine/threeDee.js"></script>
	<script src="assets/javascript/engine/mainLoop.js"></script>
	
	<!-- Game Asset Loading -->
	<script src="assets/javascript/playerClass.js"></script>
	<script src="assets/javascript/spaceObjects.js"></script>
	<script src="assets/javascript/gameClass.js"></script>
	<script src="assets/javascript/bulletManager.js"></script>
	<script src="assets/javascript/weaponManager.js"></script>
	<script src="assets/javascript/radarSystem.js"></script>
	<script src="assets/javascript/hudSystem.js"></script>
	<script src="assets/javascript/controlSystem.js"></script>
	<script src="assets/javascript/lightTypes.js"></script>
	<script src="assets/javascript/engine/engine.js"></script>
	
	<!-- Run Game Scripts -->
	<script src="assets/javascript/initalize.js"></script>

</html>