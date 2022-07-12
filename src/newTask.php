
<?php

require_once('database.php');

global $connection;

// Got input value passed through POST AJAX request
$inputValue = file_get_contents("php://input");

// Transforrmed received json data to php associative array
$_arr = json_decode($inputValue, true);

// Assigned value of key task_name from array to variable $taskName;
$taskName = $_arr["task_name"];

$query = "INSERT INTO tasks (task_name) VALUES ('$taskName')";

$result = mysqli_query($connection,$query);

// If everything 've gone right with query set response status to true, else - to false
if ($result) {
    $response = array('status' => true);
} else {
    $response = array('status' => false);
}

exit(json_encode($response));
