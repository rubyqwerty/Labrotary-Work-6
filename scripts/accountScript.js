function CurrentUser(){
    let curuser = $('#current-user');
    curuser.text(localStorage['current user']);
}
function ShowFormCreateApplication(){
     location.replace('FormCreateApplication.html');
}

function Exit(){
     location.replace( 'https://lab6/index.html');
  
}

function ShowMyApp(){
   location.replace('MyApplication.html');
}