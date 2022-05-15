
function OpenSignUp(){
    
    window.location = "signup.html";
   
}

function enter(){
    
    let login = $('#LOGIN');
    let password = $('#PASSWORD');
    let status = $('#error-enter');
    
    let xhr = new XMLHttpRequest();     
    let url = "https://lab6/PHP/entrance.php";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
      // если запрос принят и сервер ответил, что всё в порядке
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText);
            let output = JSON.parse(this.responseText);
            if (output['status'] == false){
                status.text(output['empty']);
            } else{
                localStorage['current user'] = output['current user'];
                location.replace('account.html');
                
            }
        }
    };
   
    var data = JSON.stringify({ "login" : login.val() , "password": password.val() });
    
    xhr.send(data);
    
}
