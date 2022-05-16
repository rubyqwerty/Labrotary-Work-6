<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input") , true);

//////////////////////////////////////////////Верификация
$errors = array();

$status_name = true;
$status_email = true;
$status_age = true;
$status_login = true;
$status_password = true;

if (strlen($data['name']) <= 2) {
    $errors['name-error'] = 'Введите корректное имя';
    $status_name = false;
} else {
    $errors['name-error'] = '';
}

if (strlen($data['email']) <= 5 || strpos($data['email'] , '@') == false){
    $errors['email-error'] = 'Введите корректную почту';
    $status_email = false;
} else {
    $errors['email-error'] = '';
}

if ((int) $data['age'] <= 5 || (int)$data['age'] > 100){
    $errors['age-error'] = 'Вы не сможете зарегистрироваться с таким возрастом';
    $status_age = false;
} else {
    $errors['age-error'] = '';
}

$users = file_get_contents('JSON/Users.json');

$usersJSON = json_decode($users , true);

$errors['login-error'] = '';
foreach ($usersJSON as $num => $user){
        $user_data = $user;
        if ($data['login'] == $user_data['login']) {
            $errors['login-error'] = 'Такой логин занят, придумайте другой';
            $status_login = false;
            break;
        }
}


if ($data['login'] == ''){
    $errors['login-error'] = 'Придумайте логин';
    $status_login = false;
}

if ($data['password'] == ''){
        $errors['password-error'] = "Придумайте пароль";
        $status_password = false;
}
else
    $errors['password-error'] = "";

//////////////////////////////////////////////

echo json_encode($errors);

/////////////////Если верификация пройдена, пользователь добавляется в бд

if ($status_login = true && $status_age = true && $status_email = true && $status_name = true &&  $status_password == true) {

    $filename = "../JSON/Users.json";

    $file = file_get_contents ($filename);

    $tasklist = json_decode($file , true);


    $tasklist[$data['login']] = $data;

    file_put_contents($filename, json_encode($tasklist));

}




