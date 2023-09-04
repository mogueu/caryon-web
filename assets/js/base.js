
const isConnected = !!localStorage.getItem('token');

const notificationsAdd = document.querySelector('#addModal .notifications');
const tagAdd  = document.querySelector("#addModal .notifications span");
const notificationsEdit = document.querySelector('#editModal .notifications');
const tagEdit  = document.querySelector("#editModal .notifications span");

//set notifications with two args. one for the message and another wit a bootstrap class
function setAddNotifications(message, type){
    clearAddNotifications();
    notificationsAdd.className = "alert " + type;
    tagAdd.innerHTML = message;
}

//clear all notifications on page
function clearAddNotifications(){
    notificationsAdd.removeAttribute("class");
    notificationsAdd.setAttribute("class", "notifications");
    tagAdd.innerHTML = "";
}

//set notifications with two args for Edit form. one for the message and another wit a bootstrap class
function setEditNotifications(message, type){
    clearEditNotifications();
    notificationsEdit.className = "alert " + type;
    tagEdit.innerHTML = message;
}

//clear all Edit notifications on page
function clearEditNotifications(){
    notificationsEdit.removeAttribute("class");
    notificationsEdit.setAttribute("class", "notifications");
    tagEdit.innerHTML = "";
}

// logout
function logout() {
    const logOut = document.querySelector("#logout");
    logOut.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.assign("login.html");
    });
};

