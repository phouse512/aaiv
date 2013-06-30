<?php 
	$connection = mysql_connect('server', 'user', 'password');
	$db = mysql_select_deb('db_name', $connection);

	if($connection & $db){
		$arr = array();
		$results = mysql_query("SELECT * FROM events_table")

		while($object = mysql_fetch_array($results)){
			$arr[] = $object;
		}

		$json = '{"sample":' . json_encode($arr) . '}';
		echo $json;
	}else{
		echo 'Error connecting';

	}



?>