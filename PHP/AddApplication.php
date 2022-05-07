<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input") , true);

$filename = "JSON/Users.json";

$file = file_get_contents ($filename);

$baseUsers = json_decode($file , true);

$k = 0;

$error_phone = true;
$error_tur = true;
$error_count = true;
$error_date = true;
$error_APPLICATION = true;

$error = array();

if (strlen($data['phone']) != 11)
    $error_phone = false;

if ($data['tur'] == 'Выберите тур')
    $error_tur = false;

if ($data['count'] == '')
    $error_count = false;

if ($data['date'] == '')
    $error_date = false;

$error['phoneErr'] = $error_phone;
$error['turErr'] = $error_tur;
$error['countErr'] = $error_count;
$error['dateErr'] = $error_date;

//проверка на повторную заявку
foreach ($baseUsers as $USER => $datauserbase){
            if ($data['user'] == $datauserbase['login']){
               $applications = $baseUsers[$USER]['application'];
               if (count($applications)>0){
               foreach ($applications as $num => $app){
                   if ($data['phone'] == $app['phone'] && $data['count']==$app['count'] &&
                           $data['tur'] == $app['tur'] && $data['date']==$app['date'] && $data['comment']==$app['comment']){
                       $error_APPLICATION = false;
                       break;
                   }
               }
               
                           }
            }
 }
    
 $error['appErr'] = $error_APPLICATION;
    
echo json_encode($error);

if ($error_phone == true && $error_tur == true && $error_count == true && $error_date == true && $error_APPLICATION == true){

    
/////////////////////////////////////////////////////   Добавление заявки в базу 
    foreach ($baseUsers as $USER => $datauserbase){
            if ($data['user'] == $datauserbase['login']){
                $baseUsers[$USER]['application'][count($baseUsers[$USER]['application'])+1] = $data;
                break;
            }
        
    }
    

    file_put_contents($filename, json_encode($baseUsers));

}