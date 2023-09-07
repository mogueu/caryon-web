let modal = null;
let rowNumber = 0;
const brandTable = document.querySelector('.table');
const newBrandField = document.getElementById('brandNew');
const editBrandField = document.getElementById('brandEdit');
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

displayBrands();

saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(newBrandField.value == ""){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let data = {
            "name": newBrandField.value
        };
        console.log(data);
        //send data to api
        const newBrand = await saveBrand(data);

        if (newBrand.status === 400 || newBrand.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Brand " + newBrand.name + " updated successfully", "alert-success");
            addForm.reset();
            displayBrands();
        }
    }
})

//handle click event on update brand's button
updateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(editBrandField.value == ""){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        //editBrand(brand);
        let data = {
            "name": editBrandField.value
        };
        console.log(data);
        //send data to api
        const updatedBrand = await editBrand(data);

        if (updatedBrand.status === 400 || updatedBrand.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Brand " + updatedBrand.name + " updated successfully", "alert-success");
            addForm.reset();
            displayBrands();
        }  
    }
})

//handle click event on delete brand's button
deleteButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let objectId = parseInt(hiddenField.value);
    if(objectId === 0){
        setEditNotifications("No product found");
    }else{
        const isDeleted = await deleteBrand(objectId);
        if(isDeleted){
            editForm.reset();
            displayBrands();
            document.querySelector("#editModal .close").click();
        }
    }  
})

//display brands on the page
async function displayBrands(){

    let brands = await getAllBrands();
    emptyTable();
    if(brands.length == 0){
        const noObjectLine = '<tr><td colspan="3" class="text-center">No brand found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    brands.forEach((brand) => {
    createBrandRow(brand);
    });
}

//count the rows number of the tbody tag
let tableRows = brandTable.tBodies[0].rows.length;

//create new rows for brands items
function createBrandRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    //create columns
    const nameColumn = document.createElement('td');
    nameColumn.innerHTML = object.name;
    line.appendChild(nameColumn);

    const createdColumn = document.createElement('td');
    createdColumn.innerHTML = object.created
    line.appendChild(createdColumn);

    addEditButton(line, object.id);
    document.querySelector(".table tbody").appendChild(line);
}

async function fillObject(id){
    let object = await getOneBrand(id);
    editBrandField.value = object.name;
    document.getElementById("hideField").value = object.id;
}

//add new brand
async function saveBrand(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const savedObject = await fetch(baseBrandUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;  
}

//edit brand
async function editBrand(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseBrandUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete brand function
async function deleteBrand(credentials){
    // request params
    const requestParams = {    
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        },
    }; 
    const deletedObject = await fetch(baseBrandUrl + "/" + credentials, requestParams )
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



