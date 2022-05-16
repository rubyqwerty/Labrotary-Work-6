<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input") , true);

$filename = "../JSON/Users.json";

$file = file_get_contents ($filename);

$baseUsers = json_decode($file , true);

$k = 0;

$error_phone = true;
$error_tur = true;
$error_count = true;
$error_mines = true;
$error_date = true;
$error_APPLICATION = true;

$error = array();
$error['countErr'] = '';
$error['phoneErr'] = '';

if (strlen($data['phone']) != 11){
    $error_phone = false;
    $error['phoneErr'] = 'Номер телефона состоит из 11 цифр (без +)';
}
if ($data['phone'] == ''){
    $error_phone = false;
    $error['phoneErr'] = 'Введите номер телефона';
}
if ($data['tur'] == 'Выберите тур')
    $error_tur = false;

if ($data['count'] == '' ){
    $error['countErr'] = 'Введите количество';
    $error_count = false;}

if (strpos($data['count'] , '-') != false || (int)$data['count'] == 0){
    $error['countErr'] = 'Введите положительное число';
    $error_count = false;
}
if ((int)$data['count'] > 20){
    $error['countErr'] = 'Максимальное количество человек: 20';
    $error_count = false;}

if ($data['date'] == '')
    $error_date = false;

$error['turErr'] = $error_tur;
$error['dateErr'] = $error_date;


$number = 0;
//проверка на повторную заявку
foreach ($baseUsers as $USER => $datauserbase){
            if ($data['user'] == $datauserbase['login']){
               $applications = $baseUsers[$USER]['application'];
               if (count($applications)>0){
               foreach ($applications as $num => $app){
                   if ($data['phone'] == $app['phone'] && $data['count']==$app['count'] &&
                           $data['tur'] == $app['tur'] && $data['date']==$app['date'] && $data['comment']==$app['comment']){
                       $error_APPLICATION = false;
                       $number = $num;
                       break;
                   }
               }
               
                           }
            }
 }
    
 $error['appErr'] = $error_APPLICATION;
 $error['numberApp'] =  $number;
    
echo json_encode($error);

if ($error_phone == true && $error_tur == true && $error_count == true && $error_date == true && $error_APPLICATION == true && $error_mines == true){

    
/////////////////////////////////////////////////////   Добавление заявки в базу 
    foreach ($baseUsers as $USER => $datauserbase){
            if ($data['user'] == $datauserbase['login']){
                $baseUsers[$USER]['application'][count($baseUsers[$USER]['application'])+1] = $data;
                break;
            }
        
    }
    

    file_put_contents($filename, json_encode($baseUsers));

}