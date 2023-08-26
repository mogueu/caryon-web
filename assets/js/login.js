//get the login button
const loginButton = document.getElementById('log-in'); 

//check if the form is valid (no empty field)
function isValidForm(){
    let username = document.getElementById('username');
    let pwd = document.getElementById('password');
    let isValid = false;

    if(username != "" && pwd != ""){
        isValid = true;
    }

    return isValid;
}

function login(){
    const notification = document.getElementById('notifications-message');
    if(isValidForm() == false){
        
        notification.innerText = "invalid credential! please fill the form correctly";
    }else{
        window.location.assign("index.html");
    }
}

loginButton.addEventListener("click", login)
