
<?php
//Variables for connecting to your database.
//These variable values come from your hosting account.
$hostname = "igamesmaster.db.4895258.hostedresource.com";
$username = "igamesmaster";
$dbname = "igamesmaster";

//These variable values need to be changed by you before deploying
$password = "ssr3SSR6yr!2";
$usertable = "igames_settings";
$yourfield = "";

//Connecting to your database
mysql_connect($hostname, $username, $password) OR DIE ("Unable to
connect to database! Please try again later.");
mysql_select_db($dbname);

//Fetching from your database table.
$query = "SELECT * FROM $usertable";
$result = mysql_query($query);

if ($result) {
	while($row = mysql_fetch_array($result)) {
		echo '<pre>';
			print_r($row);
		echo '</pre>';
	}
	}
	?>