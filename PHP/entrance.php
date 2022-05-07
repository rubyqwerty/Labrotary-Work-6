<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input") , true);

$output = array();

$filename = "JSON/Users.json";

$file = file_get_contents ($filename);

$baseUsers = json_decode($file , true);

$output['status'] = false;

foreach ($baseUsers as $USER => $userdata){  
        if ($userdata['login'] == $data['login'] && $userdata['password'] == $data['password']){
            $output['status'] = true;
            $output['current user'] =  $data['login'];
            break;
        }
}


if ($output['status'] == false)
    $output['empty'] = 'Неправильный логин или пароль';

if ($data['login'] == '' || $data['password'] == '')
    $output['empty'] = 'Введите логин/пароль';

echo json_encode($output);

