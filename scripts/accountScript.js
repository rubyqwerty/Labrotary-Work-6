function CurrentUser(){
    let curuser = $('#current-user');
    curuser.text(localStorage['current user']);
}
function ShowFormCreateApplication(){
     window.location.href = 'FormCreateApplication.html';
}

function Exit(){
    window.location.href = 'index.html';
}

function ShowMyApp(){
    window.location.href = 'MyApplication.html';
}