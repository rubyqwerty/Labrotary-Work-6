function sendApplication() {
      
    let phone = $(".phone");
    let count = $(".count");
    let tur = $("#tur");
    let date = $('.date');
    let comment = $('.comment');
    
    let phoneError = $("#ph");
    let turError = $("#turerr");
    let counterr = $('#counterr');
    let dateerr = $('#dateerr');
    let apperr = $('#apperr');
    
    let xhr = new XMLHttpRequest();     
    let url = "https://lab6/PHP/AddApplication.php";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
      // если запрос принят и сервер ответил, что всё в порядке
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText);
            var k = 0;
            let errors = JSON.parse(this.responseText);
            if (errors['phoneErr'] !='')k++;
            phoneError.text(errors['phoneErr']);
            
            if (errors['turErr'] == false){
                k++;
                turError.text("Выберите тур");}
             else
                turError.text("");
            
            if (errors['countErr'] != '')k++;
             counterr.text(errors['countErr']);
            
             
             
             
             if (errors['dateErr'] == false){
                k++;
                dateerr.text('Введите дату');}
             else
                 dateerr.text('');
             
             if (errors['appErr'] == false){
                 k++;
                 apperr.text('Вы уже отправляли такую заявку под номером ' + errors['numberApp']);}
             else
                 apperr.text('');
             if (k == 0)
                 location.replace('account.html');
             
        }
    };
   
    var data = JSON.stringify({ "user" : localStorage['current user'], "phone" : phone.val() , "count": count.val() , "tur": tur.val(), "date": date.val() , "comment": comment.val()});
   
    xhr.send(data);
  }
  
  function back(){
      window.location.href = 'account.html';
  }