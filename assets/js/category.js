let modal = null;
const categoryTable = document.querySelector('.table');
const newCategoryField = document.getElementById('categoryNew');
const editCategoryField = document.getElementById('categoryEdit');
const saveButton = document.getElementById('save');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const addForm = document.querySelector('#addModal .form');
const editForm = document.querySelector('#editModal .form');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

displayCategories();

//count the rows number of the tbody tag
const tableRows = categoryTable.tBodies[0].rows.length;

//add an eventListener to each row of the brand's table
for(var i=0; i < editButtonList.length; i++){

    editButtonList[i].addEventListener("click", (e) => {
        e.preventDefault();
        clearEditNotifications();
    })
}

saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(newCategoryField.value == ""){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let data = {
            "name": newCategoryField.value
        };
        console.log(data);
        //send data to api
        const newCategory = await saveCategory(data);

        if (newCategory.status === 400 || newCategory.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Brand " + newCategory.name + " updated successfully", "alert-success");
            addForm.reset();
            displayCategories();
        }
    }
    
})

//handle click event on update brand's button
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(editCategoryField.value == ""){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        //editBrand(brand);
        setEditNotifications("Brand updated successfully", "alert-success");
        
    }
})

//handle click event on delete brand's button
deleteButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let objectId = parseInt(hiddenField.value);
    if(objectId === 0){
        setEditNotifications("No product found");
    }else{
        const isDeleted = await deleteCategory(objectId);
        if(isDeleted){
            editForm.reset();
            displayCategories();
            document.querySelector("#editModal .close").click();
        }
    }  
})

//display categories on the page
async function displayCategories(){

    let categories = await getAllCategories();
    emptyTable();
    if(categories.length == 0){
        const noObjectLine = '<tr><td colspan="3" class="text-center">No category found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    categories.forEach((category) => {
        createCategoryRow(category);
    });
}

// create new rows for categories
function createCategoryRow(object){
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
    let object = await getOneCategory(id);
    editCategoryField.value = object.name;
    document.getElementById("hideField").value = object.id;
}

//add new category
async function saveCategory(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const savedObject = await fetch(baseCategoryUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;
}

//edit category
async function editCategory(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseCategoryUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete category function
async function deleteCategory(credentials){
    // request params
    const requestParams = {    
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        },
    }; 
    const deletedObject = await fetch(baseCategoryUrl + "/" + credentials, requestParams )
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