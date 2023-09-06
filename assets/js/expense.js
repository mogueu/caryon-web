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

//url for getAllBrands API
const  baseExpenseUrl = "http://127.0.0.1:8000/api/expenses";

//displayExpenses();