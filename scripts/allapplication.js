window.database={};


function giveBase() {
      
    let phone = $('.phone');
    let count = $('.count');
    let tur = $('.tur');
    let date = $('.date');
    let comment = $('.comment');
    
    let xhr = new XMLHttpRequest();     
    let url = "https://lab6/PHP/GetBase.php";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
     console.log(this.responseText);
    
    window.database = JSON.parse(this.responseText)
    phone.val('Телефон: ' + window.database[localStorage['current user']]['application'][window.counter]['phone']);
     count.val('Количество персон: ' + window.database[localStorage['current user']]['application'][window.counter]['count']);
     tur.val('Название тура: ' + window.database[localStorage['current user']]['application'][window.counter]['tur']);
     date.val('Дата: ' + window.database[localStorage['current user']]['application'][window.counter]['date']);
     comment.val('Комментарий: ' +window.database[localStorage['current user']]['application'][window.counter]['comment']);

    };
   
    var data = JSON.stringify({ "user" : localStorage['current user']});
   
    xhr.send(data);
  }
  
  
  window.counter = 1;
  
  function next(){
    
    let phone = $('.phone');
    let count = $('.count');
    let tur = $('.tur');
    let date = $('.date');
    let comment = $('.comment');
    let head = $('#head');
    if (window.counter < Object.keys(window.database[localStorage['current user']]['application']).length){
        window.counter++;
     phone.val('Телефон: ' + window.database[localStorage['current user']]['application'][window.counter]['phone']);
     count.val('Количество персон: ' + window.database[localStorage['current user']]['application'][window.counter]['count']);
     tur.val('Название тура: ' + window.database[localStorage['current user']]['application'][window.counter]['tur']);
     date.val('Дата: ' + window.database[localStorage['current user']]['application'][window.counter]['date']);
     comment.val('Комментарий: ' +window.database[localStorage['current user']]['application'][window.counter]['comment']);
      head.text('Заявка №'+ window.counter);
  }
  }
  
  function back(){
      
    let phone = $('.phone');
    let count = $('.count');
    let tur = $('.tur');
    let date = $('.date');
    let comment = $('.comment');
    let head = $('#head');
    if (window.counter > 1){
        window.counter--;
     phone.val('Телефон: ' + window.database[localStorage['current user']]['application'][window.counter]['phone']);
     count.val('Количество персон: ' + window.database[localStorage['current user']]['application'][window.counter]['count']);
     tur.val('Название тура: ' + window.database[localStorage['current user']]['application'][window.counter]['tur']);
     date.val('Дата: ' + window.database[localStorage['current user']]['application'][window.counter]['date']);
     comment.val('Комментарий: ' +window.database[localStorage['current user']]['application'][window.counter]['comment']);
      head.text('Заявка №'+ window.counter);
  }
  }
  
    function main(){
      window.location.href = 'account.html';
  }