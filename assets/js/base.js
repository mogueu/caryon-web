//url for getAllBrands API
const  baseBrandUrl = "http://127.0.0.1:8000/api/brands";
//url for getAllBrands API
const  baseCategoryUrl = "http://127.0.0.1:8000/api/categories";
//url for getAllBrands API
const  baseProductUrl = "http://localhost:8000/api/products";

const isConnected = !!localStorage.getItem('token');

// common buttons
const newButton = document.getElementById('add-button');

const notificationsAdd = document.querySelector('#addModal .notifications');
const tagAdd  = document.querySelector("#addModal .notifications span");
const notificationsEdit = document.querySelector('#editModal .notifications');
const tagEdit  = document.querySelector("#editModal .notifications span");

//display modals and reset form fields
newButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearAddNotifications();
    addForm.reset();
})

function addEditButton(line){
    const actionColumn = document.createElement('td');
    actionColumn.setAttribute("class", "action");
    actionColumn.innerHTML = '<button class="btn btn-transparent text-info edit-button" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>';
    line.appendChild(actionColumn);
}

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

// set an item to localStorage
function setDataToStorage(dataName, data){
    localStorage.setItem(dataName, JSON.stringify(data));
}

//get brands from localStorage
function getLocalStorageBrands(){
    let datas = localStorage.getItem('brands');
    return datas == null ? [] : JSON.parse(datas);
}

//get categories from localStorage
function getLocalStorageCategories(){
    let datas = localStorage.getItem('categories');
    return datas == null ? [] : JSON.parse(datas);
}

//get suppliers from localStorage
function getLocalStorageSuppliers(){
    let datas = localStorage.getItem('suppliers');
    return datas == null ? [] : JSON.parse(datas);
}

//get products from localStorage
function getLocalStorageProducts(){
    let datas = localStorage.getItem('products');
    return datas == null ? [] : JSON.parse(datas);
}

function emptyTable(){
    document.querySelector(".table tbody").innerHTML = "";
}

//get all brands
async function getAllBrands()
{
    const brands = await fetch(baseBrandUrl).then((response) => response.json());
    return brands;
}

async function getOneBrand(id)
{
    const brand = await fetch(baseBrandUrl + "/" + id).then((response) => response.json());
    return brand;
}

//get all categories
async function getAllCategories()
{
    const categories = await fetch(baseCategoryUrl).then((response) => response.json());
    return categories;
}
//get all categories
async function getOneCategory(id)
{
    const category = await fetch(baseCategoryUrl + "/" + id).then((response) => response.json());
    return category;
}
//get all productss
async function getAllProducts()
{
    const products = await fetch(baseProductUrl).then((response) => response.json());
    return products;
}
//get one specific product by id
async function getOneProduct(id)
{
    const product = await fetch(baseProductUrl + "/" + id).then((response) => response.json());
    return product;
}