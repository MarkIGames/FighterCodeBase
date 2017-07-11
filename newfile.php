<?php

	$yourFirstName = 'Mark';
	
	if($yourFirstName == 'Joshua' || $yourFirstName == 'James') {
		$access = true;
	} else {
		$access = false;
	}
	
	if($access) {
		echo 'THIS IS TRUE!';
	} else {
		echo 'THIS IS FALSE!';
	}