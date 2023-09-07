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
const newReasonField = document.getElementById('reasonNew');
const newAuthorField = document.getElementById('authorNew');
const newRecipientField = document.getElementById('recipientNew');
const newAmountField = document.getElementById('amountNew');

//edit form fields
const editReasonField = document.getElementById('reasonEdit');
const editAuthorField = document.getElementById('authorEdit');
const editRecipientField = document.getElementById('recipientEdit');
const editAmountField = document.getElementById('amountEdit');

//get the list of each brand edit's button
const editButtonList = document.querySelectorAll('.edit-button');

displayExpenses();

// listen to save button
saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if(!isValidAddForm()){
        setAddNotifications("please fill the field correctly", "alert-warning");
    }else{
        let data = {
            "reason": newReasonField.value,
            "author": newAuthorField.value,
            "recipient": newRecipientField.value,
            "amount": parseInt(newAmountField.value)
        };
        //send data to api
        const newExpense = await saveExpense(data);

        if (newExpense.status === 400 || newExpense.status === 500) {
            setAddNotifications("An error occured", "alert-warning");
        } else {
            setAddNotifications("Supply updated successfully", "alert-success");
            addForm.reset();
            displayExpenses();
        }
    }
    
})

//handle click event on updateexpense's button
updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    if(!isValidEditForm()){
        setEditNotifications("please fill the field correctly", "alert-warning");
    }else{
        
        
        
    }
});

//handle click event on delete expense's button
deleteButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    let objectId = parseInt(hiddenField.value);
    if(objectId === 0){
        setEditNotifications("No product found");
    }else{
        const isDeleted = await deleteExpense(objectId);
        if(isDeleted){
            editForm.reset();
            displayExpenses();
            document.querySelector("#editModal .close").click();
        }
    }  
})

// check if the add form is valid
function isValidAddForm(){
    if(
        newReasonField.value != ""
        && newAuthorField.value != ""
        && newRecipientField.value != ""
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
        editReasonField.value != ""
        && editAuthorField.value != ""
        && editRecipientField.value != ""
        && editAmountField.value != ""
    ){
        return true;
    }else{
        return false;
    }
}

//display expenses on the page
async function displayExpenses(){

    let expenses = await getAllExpenses();
    emptyTable();
    if(expenses.length == 0){
        const noObjectLine = '<tr><td colspan="6" class="text-center">No expense found</td></tr>';
        document.querySelector(".table tbody").innerHTML = noObjectLine;
    }
    expenses.forEach((expense) => {
        createExpenseRow(expense);
    });
}

//create new rows for expenses items
function createExpenseRow(object){
    //add a row with the category id
    const line = document.createElement('tr');
    //create columns
    const ReasonColumn = document.createElement('td');
    ReasonColumn.innerHTML = object.reason;
    line.appendChild(ReasonColumn);

    const amountColumn = document.createElement('td');
    amountColumn.innerHTML = object.amount;
    line.appendChild(amountColumn);

    const authorColumn = document.createElement('td');
    authorColumn.innerHTML = object.author;
    line.appendChild(authorColumn);

    const recipientColumn = document.createElement('td');
    recipientColumn.innerHTML = object.recipient;
    line.appendChild(recipientColumn);

    const createdColumn = document.createElement('td');
    createdColumn.innerHTML = object.created;
    line.appendChild(createdColumn);

    addEditButton(line, object.id);

    document.querySelector(".table tbody").appendChild(line);
}

async function fillObject(id){
    let object = await getOneExpense(id);
    editReasonField.value = object.reason;
    editAuthorField.value = object.author;
    editRecipientField.value = object.recipient;
    editAmountField.value = object.amount;
    document.getElementById("hideField").value = object.id;
}

//add new expense
async function saveExpense(data){
    // request params
    const requestParams = {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const savedObject = await fetch(baseExpenseUrl, requestParams)
    .then(response => response.json())
    .catch ((error) => {
        console.error(error);
    });
    return savedObject;
}

//edit expense
async function editExpense(data){
    // request params
    const requestParams = {    
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
        
    const editedObject = await fetch(baseExpenseUrl + "/" + data.id, requestParams )
    .then(response => response.json())
    .catch(error => {
        console.log(error);
    });

    return editedObject;
}

//delete expense function
async function deleteExpense(credentials){
    // request params
    const requestParams = {    
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            /*headers: { "Authorization": "Bearer " + credentials.token }*/
        },
    }; 
    const deletedObject = await fetch(baseExpenseUrl + "/" + credentials, requestParams )
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