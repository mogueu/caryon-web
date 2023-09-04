let modal = null;
const newButton = document.getElementById('add-button');
const productTable = document.querySelector('.table');

//New product form fields
const newImageField = document.getElementById('categoryNew');
const newCodeField = document.getElementById('newCode');
const newNameField = document.getElementById('newName');
const newCategoryField = document.getElementById('newCategory');
const newBrandField = document.getElementById('newBrand');
const newPackagingField = document.getElementById('newPackaging');
const newTresholdField = document.getElementById('newTreshold');
const newPriceField = document.getElementById('newprice');

//Edit product form fields
const editImageField = document.getElementById('categoryEdit');
const editCodeField = document.getElementById('editCode');
const editNameField = document.getElementById('editName');
const editCategoryField = document.getElementById('editCategory');
const editBrandField = document.getElementById('editBrand');
const editPackagingField = document.getElementById('editPackaging');
const editTresholdField = document.getElementById('editTreshold');
const editPriceField = document.getElementById('editprice');

//buttons
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');

//forms
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

//url for getAllBrands API
const  getAllProductsUrl = "http://localhost:5678/api/brands";

//url to add new brand
const addNewProductUrl = "http://localhost:5678/api/brands/new";

//url to edit a brand
const editProductUrl = "http://localhost:5678/api/brands/edit";

const deleteProductUrl = "http://localhost:5678/api/brands/edit";

getAllProducts();

newButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearAddNotifications();
    addForm.reset();
})

//add an eventListener to each row of the brand's table
for(var i=0; i < editButtonList.length; i++){

    editButtonList[i].addEventListener("click", (e) => {
        e.preventDefault();
        clearEditNotifications();
    })
}

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(isAddFormValid){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        //saveBrand(brand);
        setAddNotifications("Brand created successfully", "alert-success");
        addForm.reset();
    } 
})

//handle click event on update brand's button
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(isEditFormValid){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        //editBrand(brand);
        setEditNotifications("Brand updated successfully", "alert-success");
        
    }
})

//handle click event on delete brand's button
deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    //deleteBrand(brand); 
    editForm.reset();
    document.querySelector("#editModal .close").click();
})

//check if all the required fields are filled
function isAddFormValid(){
    if(
        newCodeField.value != ""
        && newNameField.value != ""
        && newBrandField.seleted != ""
        && newCategoryField != ""
        && newPriceField == ""
        && newTresholdField == ""
    ){
         m
    }
}

//get all brands
async function getAllProducts()
{

}

//add new brand
async function saveProduct(product){
    
    
}

//edit brand
async function editProduct(product){
    
}

//delete brand function
async function deleteProduct(product){

}