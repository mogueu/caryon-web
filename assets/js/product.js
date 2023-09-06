let modal = null;
// get the table
const productTable = document.querySelector('.table');

//New product form fields
const newImageField = document.getElementById('newImage');
const newCodeField = document.getElementById('newCode');
const newNameField = document.getElementById('newName');
const newCategoryField = document.getElementById('newCategory');
const newBrandField = document.getElementById('newBrand');
const newPackagingField = document.getElementById('newPackaging');
const newTresholdField = document.getElementById('newTreshold');
const newPriceField = document.getElementById('newPrice');

//Edit product form fields
const editImageField = document.getElementById('editImage');
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

displayProducts();
addCategories();
addBrands();

//count the rows number of the tbody tag
const tableRows = productTable.tBodies[0].rows.length;

//add an eventListener to each row of the brand's table
for(var i=0; i < editButtonList.length; i++){

    editButtonList[i].addEventListener("click", (e) => {
        e.preventDefault();
        clearEditNotifications();
    })
}

// listen to save button
saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        const brandId = parseInt(newBrandField.value);
        const categoryId = parseInt(newCategoryField.value);
        const categoryItem = await getOneCategory(categoryId);
        const brandItem = await getOneBrand(brandId);

        let data = {
            "code": newCodeField.value,
            "name": newNameField.value,
            "categoryId": categoryId,
            "brandId": brandId,
            "packaging": newPackagingField.value,
            "supplyTreshold": parseInt(newTresholdField.value),
            "price": parseInt(newPriceField.value)
        };
        console.log(data);
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
        const brandId = parseInt(editBrandField.value);
        const categoryId = parseInt(editCategoryField.value);
        const categoryItem = await getOneCategory(categoryId);
        const brandItem = await getOneBrand(brandId);

        let data = {
            "code": newCodeField.value,
            "name": newNameField.value,
            "categoryId": categoryId,
            "brandId": brandId,
            "packaging": newPackagingField.value,
            "supplyTreshold": parseInt(newTresholdField.value),
            "price": parseInt(newPriceField.value)
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
    let brands = await getAllBrands();
    const select = document.querySelector("#newBrand");
    if (select != null) {
        brands.forEach((brand) => {
            const option = document.createElement("option")
            option.value = brand.id;
            option.textContent = brand.name;
            select.appendChild(option);
        })
    }
}

// add categories to the select's form field
async function addCategories(){
    let categories = await getAllCategories();
    const select = document.querySelector("#newCategory");
    if (select != null) {
        categories.forEach((category) => {
            const option = document.createElement("option")
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        })
    }
}

//display suppliers on the page
async function displayProducts(){

    let products = await getAllProducts();
    if(products.length == 0){
        const noObjectLine = '<tr><td colspan="9" class="text-center">No product found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    emptyTable();
    products.forEach((product) => {
        createProductRow(product);
    });
}

//create new rows for suppliers items
function createProductRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    line.setAttribute("id", object.id);
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

    addEditButton(line);

    document.querySelector(".table tbody").appendChild(line);
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