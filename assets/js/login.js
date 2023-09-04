//set the api url
/*let backendUrl = "http://localhost:3000/api/auth";

//get the login button
const loginButton = document.getElementById('log-in'); 

//get the notifications field
const notificationMessage = document.getElementById('notifications-message');

//get login's form fields
let username = document.getElementById('username');
let pwd = document.getElementById('password');

//check if the form is valid (no empty field)
function isValidForm(username, password){
    let isValid = false;

    if(username != "" && password != ""){
        isValid = true;
    }

    return isValid;
}

// login function call to login api and return a token if the user exists or an error if not
async function login(user){

    //set the request parameters
    const requestParam = {    
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: user
        };

    //call to the login api to connect the user with the credentials filled in the form
    const response = await fetch("http://localhost:5678/api/security/login", requestParam)
        if (response.ok){
            return response.json();
        } else {
            notificationMessage.innerText = "invalid credentials! the user account is not recognized";
            document.getElementById('notifications').className = "alert alert-warning";
        };
}

loginButton.addEventListener("click", function(e){
    e.preventDefault;

    if(isValidForm == false){
        notificationMessage.innerText = "invalid credentials! please fill the form correctly";
        document.getElementById('notifications').className = "alert alert-warning";
    }else{
        const logger = {
            username: username.value,
            password: pwd.value
        };

        const user = JSON.stringify(logger);
        
        const loginData = await login(user);
        const accessToken = loginData.token;             
        window.localStorage.setItem("token", accessToken);
        window.location.assign("index.html");

    }
})*/
