<?php

    // Database connection parameters
    $DB_HOST = ''; 
    $DB_USER = '';
    $DB_PASS = '';
    $DB_NAME = '';


    // Used built-in function to connect with DB using parameters
    $connection = mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME);

    // If there's no connection give an error;
    if(!$connection) {
        die('Failed to connect: ' . mysqli_connect_error());
    }
    
