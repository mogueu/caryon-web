let modal = null;

//get table
const expenseTable = document.querySelector('.table');

//forms
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

// buttons
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');

//new form fields
const newProductField = document.getElementById('productNew');
const newSupplierField = document.getElementById('supplierNew');
const newQuantityField = document.getElementById('quantityNew');
const newAmountField = document.getElementById('amountNew');

//edit form fields
const editProductField = document.getElementById('productEdit');
const editSupplierField = document.getElementById('SupplierEdit');
const editQuantityField = document.getElementById('quantityEdit');
const editAmountField = document.getElementById('amountEdit');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

displayEntries();
addProducts();
addSuppliers();

// listen to save button
saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let productId = parseInt(newProductField.value);
        let supplierId = parseInt(newSupplierField.value);

        let data = {
            "productId": productId,
            "supplierId": supplierId,
            "quantity": parseInt(newQuantityField.value),
            "amount": parseInt(newAmountField.value)
        };
        //send data to api
        const newEntry = await saveEntry(data);

        if (newEntry.status === 400 || newEntry.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Entry updated successfully", "alert-success");
            addForm.reset();
            displayEntries();
        }
    }
    
})

updateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let productId = parseInt(editProductField.value);
        let supplierId = parseInt(editSupplierField.value);

        let data = {
            "productId": productId,
            "supplierId": supplierId,
            "quantity": parseInt(editQuantityField.value),
            "amount": parseInt(editAmountField.value)
        };
        console.log(data);
        //send data to api
        const updatedEntry = await editEntry(data);

        if (updatedEntry.status === 400 || updatedEntry.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Product updated successfully", "alert-success");
            addForm.reset();
            displayEntries();
        }
    } 
})

//handle click event on delete entry's button
deleteButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let objectId = parseInt(hiddenField.value);
    if(objectId === 0){
        setEditNotifications("No product found");
    }else{
        const isDeleted = await deleteEntry(objectId);
        if(isDeleted){
            editForm.reset();
            displayEntries();
            document.querySelector("#editModal .close").click();
        }
    }  
})

// check if the add form is valid
function isValidAddForm(){
    if(
        newProductField.value != ""
        && newSupplierField.value != ""
        && newQuantityField.value != ""
        && newAmountField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

// check if the form edit is valid
function isValidEditForm(){
    if(
        editProductField.value != ""
        && editSupplierField.value != ""
        && editQuantityField.value != ""
        && editAmountField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

// add products to the select's form field
async function addProducts(){
    let responses = await getAllProducts();
    const selectAdd = document.querySelector("#productNew");
    const selectEdit = document.querySelector("#productEdit");

    responses.forEach((response) => {
        if(selectAdd != null){
            const optionA = document.createElement("option")
            optionA.value = response.id;
            optionA.textContent = response.code + " " + response.name;
            selectAdd.appendChild(optionA);
        }
        if(selectEdit != null){
            const optionE = document.createElement("option")
            optionE.value = response.id;
            optionE.textContent = response.code + " " + response.name;
            selectEdit.appendChild(optionE);
        }   
    })
}

// add suppliers to the select's form field
async function addSuppliers(){
    let responses = await getAllSuppliers();
    const selectAdd = document.querySelector("#supplierNew");
    const selectEdit = document.querySelector("#supplierEdit");
    console.log(responses)
    responses.forEach((response) => {
        if(selectAdd != null){
            const optionA = document.createElement("option")
            optionA.value = response.id;
            optionA.textContent = response.company;
            selectAdd.appendChild(optionA);
        }
        if(selectEdit != null){
            const optionE = document.createElement("option")
            optionE.value = response.id;
            optionE.textContent = response.company;
            selectEdit.appendChild(optionE);
        }   
    })
}

//display entries on the page
async function displayEntries(){

    let entries = await getAllEntries();
    emptyTable();
    if(entries.length == 0){
        const noObjectLine = '<tr><td colspan="6" class="text-center">No expense found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    entries.forEach((entry) => {
        createEntryRow(entry);
    });
}

//create new rows for expenses items
function createEntryRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    //create columns
    const productColumn = document.createElement('td');
    productColumn.innerHTML = object.product.name;
    line.appendChild(productColumn);

    const quantityColumn = document.createElement('td');
    quantityColumn.innerHTML = object.quantity;
    line.appendChild(quantityColumn);

    const amountColumn = document.createElement('td');
    amountColumn.innerHTML = object.amount;
    line.appendChild(amountColumn);

    const supplierColumn = document.createElement('td');
    supplierColumn.innerHTML = object.supplier.company;
    line.appendChild(supplierColumn);

    const createdColumn = document.createElement('td');
    createdColumn.innerHTML = object.created;
    line.appendChild(createdColumn);

    addEditButton(line, object.id);

    document.querySelector(".table tbody").appendChild(line);
}

async function fillObject(id){
    let object = await getOneEntry(id);
    editProductField.value = object.product.id;
    editProductField.text = object.product.name;
    editSupplierField.value = object.supplier.id;
    editSupplierField.text = object.supplier.company
    editQuantityField.value = object.quantity;
    editAmountField.value = object.amount;
    document.getElementById("hideField").value = object.id;
}

//add new entry
async function saveEntry(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const savedObject = await fetch(baseEntryUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;
}

//edit expense
async function editEntry(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseEntryUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete entry function
async function deleteExpense(credentials){
    // request params
    const requestParams = {    
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        },
    }; 
    const deletedObject = await fetch(baseEntryUrl + "/" + credentials, requestParams )
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