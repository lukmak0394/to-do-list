<?php

require_once('database.php');

global $connection;

// Get all tasks from table - ordered DESC because we want to display newest at the top
$query = "SELECT * FROM tasks ORDER BY task_id DESC";

$result = mysqli_query($connection,$query);

$data = array();

/* While there are rows with data - assign task_id and task_name from each to variables and then push them to associative array $data */
while($row = mysqli_fetch_array($result)) {
    $taskId = $row['task_id'];
    $taskContent = $row['task_name'];

    $data[] = array(
        'task_id' => $taskId, 
        'task_name' => $taskContent
    );
}

exit(json_encode($data));