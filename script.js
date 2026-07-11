
// HTML Elements
// =========================

const form = document.getElementById("transaction-form");

const description = document.getElementById("description");

const amount = document.getElementById("amount");

const type = document.getElementById("type");

const search = document.getElementById("search");

const filterButtons = document.querySelectorAll(".filter-btn");

const transactionList = document.getElementById("transaction-list");

const balance = document.getElementById("balance");

const income = document.getElementById("income");

const expense = document.getElementById("expense");

// =========================
// Variables
// =========================

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let editingTransactionId = null;

// =========================
// Save Transactions
// =========================

function saveTransactions(){

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}

// =========================
// Update Summary
// =========================

function updateSummary(){

    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach(transaction=>{

        if(transaction.type==="income"){

            totalIncome += transaction.amount;

        }else{

            totalExpense += transaction.amount;

        }

    });

    balance.textContent =
    "$"+(totalIncome-totalExpense).toFixed(2);

    income.textContent =
    "+$"+totalIncome.toFixed(2);

    expense.textContent =
    "-$"+totalExpense.toFixed(2);

}

// =========================
// Delete Transaction
// =========================

function deleteTransaction(id){

    transactions =
    transactions.filter(function(transaction){

        return transaction.id !== id;

    });

    saveTransactions();

    displayTransactions(transactions);

    updateSummary();

}

// =========================
// Display Transactions
// =========================

function displayTransactions(list){

    transactionList.innerHTML = "";

    if(list.length === 0){

        transactionList.innerHTML = `

        <li class="empty">

            No transactions found.

        </li>

        `;

        return;

    }

    list.forEach(transaction=>{

        const li =
        document.createElement("li");

        li.style.display = "flex";

        li.style.justifyContent = "space-between";

        li.style.alignItems = "center";

        li.innerHTML = `

        <div>

            <strong>

                ${transaction.description}

            </strong>

            <br>

            <span style="color:${transaction.type==="income" ? "green":"red"}">

                ${transaction.type==="income" ? "+" : "-"}$${transaction.amount.toFixed(2)}

            </span>

        </div>

        <div>

            <button
                class="edit-btn">

                Edit

            </button>

            <button
                class="delete-btn">

                Delete

            </button>

        </div>

        `;

        const editButton =
        li.querySelector(".edit-btn");

        editButton.addEventListener("click",function(){

            description.value =
            transaction.description;

            amount.value =
            transaction.amount;

            type.value =
            transaction.type;

            editingTransactionId =
            transaction.id;

            form.querySelector("button").textContent =
            "Update Transaction";

        });

        const deleteButton =
        li.querySelector(".delete-btn");

        deleteButton.addEventListener("click",function(){

            deleteTransaction(transaction.id);

        });

        transactionList.appendChild(li);

    });

}

// =========================
// Add / Update Transaction
// =========================

form.addEventListener("submit", function(event){

    event.preventDefault();

    const descriptionValue = description.value.trim();

    const amountValue = Number(amount.value);

    const typeValue = type.value;

    if(descriptionValue === "" || amountValue <= 0){

        alert("Please enter valid information.");

        return;

    }

    // =====================
    // Update Existing Transaction
    // =====================

    if(editingTransactionId !== null){

        const transaction = transactions.find(function(item){

            return item.id === editingTransactionId;

        });

        if(transaction){

            transaction.description = descriptionValue;

            transaction.amount = amountValue;

            transaction.type = typeValue;

        }

        editingTransactionId = null;

        form.querySelector("button").textContent =
        "Add Transaction";

    }

    // =====================
    // Add New Transaction
    // =====================

    else{

        transactions.push({

            id: Date.now(),

            description: descriptionValue,

            amount: amountValue,

            type: typeValue

        });

    }

    saveTransactions();

    displayTransactions(transactions);

    updateSummary();

    form.reset();

});

// =========================
// Search Transactions
// =========================

search.addEventListener("input", function(){

    const keyword = search.value
        .toLowerCase()
        .trim();

    const filtered = transactions.filter(function(transaction){

        return transaction.description
            .toLowerCase()
            .includes(keyword);

    });

    displayTransactions(filtered);

});

// =========================
// Filter Buttons
// =========================

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Remove active class

        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        // Add active class

        this.classList.add("active");

        const filter = this.dataset.filter;

        if(filter === "all"){

            displayTransactions(transactions);

            return;

        }

        const filtered = transactions.filter(function(transaction){

            return transaction.type === filter;

        });

        displayTransactions(filtered);

    });

});

// =========================
// Initial Page Load
// =========================

displayTransactions(transactions);

updateSummary();