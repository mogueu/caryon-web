let modal = null;
const newButton = document.getElementById('add-button');
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

//url for getAllBrands API
const  baseBrandUrl = "http://127.0.0.1:8000/api/brands";

getAllBrands();

//count the rows number of the tbody tag
const tableRows = brandTable.tBodies[0].rows.length;

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
    if(newBrandField.value == ""){
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
    if(editBrandField.value == ""){
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

//get all brands
async function getAllBrands()
{

}

//add new brand
async function saveBrand(brand){
    /*let formData = new formData();
    formData.append('title', newBrandField.value);

    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formData
    };
        
    fetch(`http://localhost:5678/api/brand/`,requestParams )
    .then(response => response.json())
    .then(newProject => {
            
    })
    .catch(error => {
        console.log(error);
    });*/
    
}

//edit brand
async function editBrand(brand){
    /*let formData = new formData();
    formData.append('title', newBrandField.value);

    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formData
    };
        
    fetch(`http://localhost:5678/api/brand/`,requestParams )
    .then(response => response.json())
    .then(newProject => {
            
    })
    .catch(error => {
        console.log(error);
    });*/
}

//delete brand function
async function deleteBrand(brand){

}



