let modal = null;
// get the table
const productTable = document.querySelector('.table');

//New product form fields
//const newImageField = document.getElementById('newImage');
const newCodeField = document.getElementById('newCode');
const newNameField = document.getElementById('newName');
const newCategoryField = document.getElementById('newCategory');
const newBrandField = document.getElementById('newBrand');
const newPackagingField = document.getElementById('newPackaging');
const newTresholdField = document.getElementById('newTreshold');
const newPriceField = document.getElementById('newPrice');

//Edit product form fields
//const editImageField = document.getElementById('editImage');
const editCodeField = document.getElementById('editCode');
const editNameField = document.getElementById('editName');
const editCategoryField = document.getElementById('editCategory');
const editBrandField = document.getElementById('editBrand');
const editPackagingField = document.getElementById('editPackaging');
const editTresholdField = document.getElementById('editTreshold');
const editPriceField = document.getElementById('editPrice');

//buttons
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');

//forms
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

displayProducts();
addCategories();
addBrands();

//count the rows number of the tbody tag
const tableRows = productTable.tBodies[0].rows.length;

// listen to save button
saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let brandId = parseInt(newBrandField.value);
        let categoryId = parseInt(newCategoryField.value);

        let data = {
            "code": newCodeField.value,
            "name": newNameField.value,
            "categoryId": categoryId,
            "brandId": brandId,
            "packaging": newPackagingField.value,
            "supplyTreshold": parseInt(newTresholdField.value),
            "price": parseInt(newPriceField.value)
        };
        //send data to api
        const newProduct = await saveProduct(data);

        if (newProduct.status === 400 || newProduct.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Product " + newProduct.name + " updated successfully", "alert-success");
            addForm.reset();
            displayProducts();
        }
    }
})

updateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let brandId = parseInt(editBrandField.value);
        let categoryId = parseInt(editCategoryField.value);

        let data = {
            "code": editCodeField.value,
            "name": editNameField.value,
            "categoryId": categoryId,
            "brandId": brandId,
            "packaging": editPackagingField.value,
            "supplyTreshold": parseInt(editTresholdField.value),
            "price": parseInt(editPriceField.value)
        };
        console.log(data);
        //send data to api
        const updatedProduct = await editProduct(data);

        if (updatedProduct.status === 400 || updatedProduct.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Product " + updatedProduct.name + " updated successfully", "alert-success");
            addForm.reset();
            displayProducts();
        }
    }
    
})

//handle click event on delete product's button
deleteButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let objectId = parseInt(hiddenField.value);
    if(objectId === 0){
        setEditNotifications("No product found");
    }else{
        const isDeleted = await deleteProduct(objectId);
        if(isDeleted){
            editForm.reset();
            displayProducts();
            document.querySelector("#editModal .close").click();
        }
    }  
})

function isValidAddForm(){
    if(
        newCodeField.value != ""
        && newNameField.value != ""
        && newPackagingField.value != ""
        && newPriceField.value != ""
        && newTresholdField.value != ""
        && newCategoryField.value != ""
        && newBrandField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

function isValidEditForm(){
    if(
        editCodeField.value != ""
        && editNameField.value != ""
        && editPackagingField.value != ""
        && editPriceField.value != ""
        && editTresholdField.value != ""
        && editCategoryField.value != ""
        && editBrandField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

//add brands to the select's form field
async function addBrands(){
    let responses = await getAllBrands();
    const selectAdd = document.querySelector("#newBrand");
    const selectEdit = document.querySelector("#editBrand");

    responses.forEach((response) => {
        if(selectAdd != null){
            const optionA = document.createElement("option")
            optionA.value = response.id;
            optionA.textContent = response.name;
            selectAdd.appendChild(optionA);
        }
        if(selectEdit != null){
            const optionE = document.createElement("option")
            optionE.value = response.id;
            optionE.textContent = response.name;
            selectEdit.appendChild(optionE);
        }   
    })
}

// add categories to the select's form field
async function addCategories(){
    let responses = await getAllCategories();
    const selectAdd = document.querySelector("#newCategory");
    const selectEdit = document.querySelector("#editCategory");
    
    responses.forEach((response) => {
        if(selectAdd != null){
            const optionA = document.createElement("option")
            optionA.value = response.id;
            optionA.textContent = response.name;
            selectAdd.appendChild(optionA);
        }
        if(selectEdit != null){
            const optionE = document.createElement("option")
            optionE.value = response.id;
            optionE.textContent = response.name;
            selectEdit.appendChild(optionE);
        }   
    })
}

//display suppliers on the page
async function displayProducts(){

    let products = await getAllProducts();
    emptyTable();
    if(products.length == 0){
        const noObjectLine = '<tr><td colspan="9" class="text-center">No product found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    products.forEach((product) => {
        createProductRow(product);
    });
}

//create new rows for suppliers items
function createProductRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    //create columns
    const codeColumn = document.createElement('td');
    codeColumn.innerHTML = object.code;
    line.appendChild(codeColumn);

    const nameColumn = document.createElement('td');
    nameColumn.innerHTML = object.name;
    line.appendChild(nameColumn);

    const categoryColumn = document.createElement('td');
    categoryColumn.innerHTML = object.category.name;
    line.appendChild(categoryColumn);

    const brandColumn = document.createElement('td');
    brandColumn.innerHTML = object.brand.name;
    line.appendChild(brandColumn);

    const packagingColumn = document.createElement('td');
    packagingColumn.innerHTML = object.packaging;
    line.appendChild(packagingColumn);

    const supplyTresholdColumn = document.createElement('td');
    supplyTresholdColumn.innerHTML = object.supplyTreshold;
    line.appendChild(supplyTresholdColumn);

    const priceColumn = document.createElement('td');
    priceColumn.innerHTML = object.price;
    line.appendChild(priceColumn);

    const quantityColumn = document.createElement('td');
    quantityColumn.innerHTML = object.quantity;
    line.appendChild(quantityColumn);

    addEditButton(line, object.id);

    document.querySelector(".table tbody").appendChild(line);
}

async function fillObject(id){
    let object = await getOneProduct(id);
    editCodeField.value = object.code;
    editNameField.value = object.name;
    editBrandField.value = object.brand.id;
    editBrandField.text = object.brand.name;
    editCategoryField.value = object.category.id;
    editCategoryField.text = object.category.name;
    editPackagingField.value = object.packaging;
    editTresholdField.value = object.supplyTreshold;
    editPriceField.value = object.price;
    document.getElementById("hideField").value = object.id;
}

//add new product
async function saveProduct(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    console.log(JSON.stringify(data));
    const savedObject = await fetch(baseProductUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;
    
}

//edit product
async function editProduct(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseProductUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete expense function
async function deleteProduct(credentials){
    // request params
    const requestParams = {    
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        },
    }; 
    const deletedObject = await fetch(baseProductUrl + "/" + credentials, requestParams )
    .then(response => {
        if(response.ok){
            return true;
        }
        return false;
    })
    .catch(error => {
        console.log(error);
    });
    return deletedObject
    
}