<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input") , true);

$filename = "../JSON/Users.json";

$file = file_get_contents ($filename);

$baseUsers = json_decode($file , true);

echo json_encode($baseUsers);