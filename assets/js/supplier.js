let modal = null;

//get table
const supplierTable = document.querySelector('.table');

//forms
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

// buttons
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');

//new form fields
const newCompanyField = document.getElementById('companyNew');
const newLocationField = document.getElementById('locationNew');
const newRepresentativeField = document.getElementById('representativeNew');
const newContactField = document.getElementById('contactNew');

//edit form fields
const editCompanyField = document.getElementById('companyEdit');
const editLocationField = document.getElementById('locationEdit');
const editRepresentativeField = document.getElementById('representativeEdit');
const editContactField = document.getElementById('contactEdit');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

//url for getAllBrands API
const  baseSupplierUrl = "http://127.0.0.1:8000/api/suppliers";

displaySuppliers();

//count the rows number of the tbody tag
const tableRows = supplierTable.tBodies[0].rows.length;

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
        let data = {
            "company": newCompanyField.value,
            "location": newLocationField.value,
            "representative": newRepresentativeField.value,
            "contact": parseInt(newContactField.value)
        };
        console.log(data);
        //send data to api
        const newSupplier = await saveSupplier(data);

        if (newSupplier.status === 400 || newSupplier.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Supply " + newSupplier.company + " updated successfully", "alert-success");
            addForm.reset();
            displaySuppliers();
        }
    }
    
})

//handle click event on update supplier's button
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(!isValidEditForm()){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        //editBrand(brand);
        
        
    }
})

//handle click event on delete supplier's button
deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    //deleteBrand(brand); 
    editForm.reset();
    document.querySelector("#editModal .close").click();
})

// check if the add form is valid
function isValidAddForm(){
    if(
        newCompanyField.value != ""
        && newContactField.value != ""
        && newRepresentativeField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

// check if the form edit is valid
function isValidEditForm(){
    if(
        editCompanyField.value != ""
        && editContactField.value != ""
        && editRepresentativeField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

//get all suppliers
async function getAllSuppliers()
{
    const suppliers = await fetch(baseSupplierUrl).then((response) => response.json());
    return suppliers;
}

//display suppliers on the page
async function displaySuppliers(){

    let suppliers = await getAllSuppliers();
    console.log(suppliers);
    if(suppliers.length == 0){
        const noObjectLine = '<tr><td colspan="5" class="text-center">No supplier found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    emptyTable();
    suppliers.forEach((supplier) => {
        createSupplierRow(supplier);
    });
}

//create new rows for suppliers items
function createSupplierRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    line.setAttribute("id", object.id);
    //create columns
    const companyColumn = document.createElement('td');
    companyColumn.innerHTML = object.company;
    line.appendChild(companyColumn);

    const locationColumn = document.createElement('td');
    locationColumn.innerHTML = object.location
    line.appendChild(locationColumn);

    const representativeColumn = document.createElement('td');
    representativeColumn.innerHTML = object.representative
    line.appendChild(representativeColumn);

    const contactColumn = document.createElement('td');
    contactColumn.innerHTML = object.contact
    line.appendChild(contactColumn);

    addEditButton(line);

    document.querySelector(".table tbody").appendChild(line);
}

//add new supplier
async function saveSupplier(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const savedObject = await fetch(baseSupplierUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;
    
}

//edit supplier
async function editSupplier(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseSupplierUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete supplier function
async function deleteSupplier(credentials){
    try {
        const deleted = await fetch(baseSupplierUrl + "/" + credentials.id, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json"
            }
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        });

        if(deleted.status === 401 || deleted.status === 204) {
            const json = await deleted.json();
            return json;
        } else if (deleted.status === 500) {
            return deleted;
        }
        
    } catch (error) {
        console.error(error);
    }
}