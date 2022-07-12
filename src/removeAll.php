<?php

require_once('database.php');

global $connection;

$query = "DELETE FROM tasks";

$result = mysqli_query($connection,$query);

$response = array('status' => true);

exit(json_encode($response));