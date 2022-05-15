


function giveBase() {
      
    let xhr = new XMLHttpRequest();     
    let url = "https://lab6/PHP/GetBase.php";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
    console.log(this.responseText);
    
    let database = JSON.parse(this.responseText)
    createtable(database);
    };
   
    var data = JSON.stringify({ "user" : localStorage['current user']});
   
    xhr.send(data);
  }
  
function createtable(database){
    
    let tableblock = $("#table");
    var table = '<table class="table_dark"><tr> <td>Номер</td> <td>Телефон</td> <td>Количество персон</td> <td>Название тура</td> <td>Дата</td> <td>Комментарий</td>';
    for (var counter = 1; counter <= Object.keys(database[localStorage['current user']]['application']).length; counter++){
    
        var phone = database[localStorage['current user']]['application'][counter]['phone'];
        var count =  database[localStorage['current user']]['application'][counter]['count'];
        var tur =  database[localStorage['current user']]['application'][counter]['tur'];
        var date =  database[localStorage['current user']]['application'][counter]['date'];
        var comment =  database[localStorage['current user']]['application'][counter]['comment'];
        table += '<tr>';
        table += '<td>№'+counter + '</td>';
        table += '<td>'+phone + '</td>';
        table += '<td>'+count + '</td>';
        table += '<td>'+tur + '</td>';
        table += '<td>'+date + '</td>';
        table += '<td>'+comment + '</td>';
        table += '</tr>';
    }
    table += '</table>'
    tableblock.html(table);
  }
  
function main(){
       location.replace('account.html');
  }