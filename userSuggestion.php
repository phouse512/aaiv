<?php
    $fields = array('first_name', 'last_name', 'year', 'email');
    $conditions = array();

    // loop through the defined fields
    foreach($fields as $field){
        // if the field is set and not empty
        if(isset($_POST[$field]) && $_POST[$field] != '') {
            // create a new condition while escaping the value inputed by the user (SQL Injection)
            $conditions[] = "`$field` LIKE '" . $_POST[$field] . "%'";
        }
    }

    // builds the query
    $query = "SELECT * FROM users ";
    // if there are conditions defined
    if(count($conditions) > 0) {
        // append the conditions
        $query .= "WHERE " . implode (' AND ', $conditions); // you can change to 'OR', but I suggest to apply the filters cumulative
    }

	$connection = mysqli_connect('localhost', 'nuaaivco_event', 'pmh518', 'nuaaivco_events');

	$res = mysqli_query($connection, $query);

	$xml = new XMLWriter();

	$xml->openURI("php://output");
	$xml->startDocument();
	$xml->setIndent(true);

	$xml->startElement('users');

	while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
	  $xml->startElement("user");

	  $xml->startElement("user_id");
	  $xml->writeRaw($row['user_id']);
	  $xml->endElement();

	  $xml->startElement("first_name");
	  $xml->writeRaw($row['first_name']);
	  $xml->endElement();

	  $xml->startElement("last_name");
	  $xml->writeRaw($row['last_name']);
	  $xml->endElement();

	  $xml->startElement("year");
	  $xml->writeRaw($row['year']);
	  $xml->endElement();

	  $xml->startElement("email");
	  $xml->writeRaw($row['email']);
	  $xml->endElement();

	  $xml->endElement();
	}
	$xml->endElement();
	header('Content-type: text/xml');
	$xml->flush();
?>