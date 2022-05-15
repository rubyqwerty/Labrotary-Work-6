
  function sendJSON() {
      
    let name = $(".Name");
    let age = $(".Age");
    let mail = $(".Email");
    let login = $('.Login');
    let password = $('.Password');
    
    let nameError = $("#mas1");
    let ageError = $("#mas2");
    let emailError = $("#mas3");
    let loginError = $('#logerr');
    let passwordError = $('#passerr');
    
    let xhr = new XMLHttpRequest();     
    let url = "https://lab6/PHP/DoSignUp.php";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
      // если запрос принят и сервер ответил, что всё в порядке
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(this.responseText);
            let errors = JSON.parse(this.responseText);
            nameError.text(errors['name-error']);
            ageError.text(errors['age-error']);
            emailError.text(errors['email-error']);
            loginError.text(errors['login-error']);
            passwordError.text(errors['password-error']);
            if (errors['name-error'] == '' && errors['age-error']== '' && errors['email-error']=='' && errors['login-error']=='' && errors['password-error']==''){
              location.replace('index.html');
            }
        }
    };
   
    var data = JSON.stringify({ "login" : login.val() , "password": password.val() , "name": name.val(), "age": age.val() , "email": mail.val()});
    console.log(data);
    xhr.send(data);
  }
  
  function back1(){
       window.location.href = 'index.html';
  }