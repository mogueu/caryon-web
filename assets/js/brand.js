let modal = null;
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

//count the rows number of the tbody tag
const tableRows = brandTable.tBodies[0].rows.length;

//add an eventListener to each row of the brand's table
for(var i=0; i < editButtonList.length; i++){

    editButtonList[i].addEventListener("click", (e) => {
        e.preventDefault();
        clearEditNotifications();
    })
}

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
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(editBrandField.value == ""){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        //editBrand(brand);
        
        
    }
})

//handle click event on delete brand's button
deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    //deleteBrand(brand); 
    editForm.reset();
    document.querySelector("#editModal .close").click();
})

//display brands on the page
async function displayBrands(){

    let brands = await getAllBrands();
    console.log(brands);
    if(brands.length == 0){
        const noObjectLine = '<tr><td colspan="3" class="text-center">No brand found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    emptyTable();
    brands.forEach((brand) => {
    createBrandRow(brand);
    });
}

//create new rows for brands items
function createBrandRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    line.setAttribute("id", object.id);
    //create columns
    const nameColumn = document.createElement('td');
    nameColumn.innerHTML = object.name;
    line.appendChild(nameColumn);

    const createdColumn = document.createElement('td');
    createdColumn.innerHTML = object.created
    line.appendChild(createdColumn);

    addEditButton(line);
    document.querySelector(".table tbody").appendChild(line);
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
    try {
        const deleted = await fetch(baseBrandUrl + "/" + credentials.id, {
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



