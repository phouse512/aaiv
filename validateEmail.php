<?php
	$userEmail = $_POST['email'];

	$connection = mysqli_connect('localhost', 'nuaaivco_event', 'pmh518', 'nuaaivco_events');

	$sql = "SELECT * FROM users WHERE email = '" . $userEmail . "' LIMIT 1";
	$res = mysqli_query($connection, $sql);

	if(mysqli_num_rows($res) > 0){
		echo "exists";
	}else{
		echo "none";
	}
	
?>