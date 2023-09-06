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

//url for getAllBrands API
const  baseEntryUrl = "http://127.0.0.1:8000/api/entries";

//displayExpenses();