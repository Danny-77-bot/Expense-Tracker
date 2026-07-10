/* =========================
   STEP 5 - DELETE TRANSACTIONS
========================= */

// Form Elements

const form = document.getElementById("transaction-form");

const description = document.getElementById("description");

const amount = document.getElementById("amount");

const type = document.getElementById("type");

const transactionList = document.getElementById("transaction-list");

// Summary Cards

const balance = document.getElementById("balance");

const income = document.getElementById("income");

const expense = document.getElementById("expense");

// Store Transactions

const transactions = [];

// =========================
// Update Summary
// =========================

function updateSummary(){

    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){

            totalIncome += transaction.amount;

        }else{

            totalExpense += transaction.amount;

        }

    });

    balance.textContent = "$" + (totalIncome - totalExpense).toFixed(2);

    income.textContent = "+$" + totalIncome.toFixed(2);

    expense.textContent = "-$" + totalExpense.toFixed(2);

}

// =========================
// Delete Transaction
// =========================

function deleteTransaction(index, listItem){

    transactions.splice(index, 1);

    listItem.remove();

    if(transactions.length === 0){

        transactionList.innerHTML = `
            <li class="empty">
                No transactions available.
            </li>
        `;

    }

    updateSummary();

}

// =========================
// Add Transaction
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

    const empty = document.querySelector(".empty");

    if(empty){

        empty.remove();

    }

    const transaction = {

        description: descriptionValue,

        amount: amountValue,

        type: typeValue

    };

    transactions.push(transaction);

    const index = transactions.length - 1;

    const li = document.createElement("li");

    li.style.display = "flex";

    li.style.justifyContent = "space-between";

    li.style.alignItems = "center";

    li.innerHTML = `
        <div>
            <strong>${descriptionValue}</strong><br>
            <span style="color:${typeValue==="income" ? "green" : "red"}">
                ${typeValue==="income" ? "+" : "-"}$${amountValue.toFixed(2)}
            </span>
        </div>

        <button class="delete-btn">
            Delete
        </button>
    `;

    const deleteButton = li.querySelector(".delete-btn");

    deleteButton.addEventListener("click", function(){

        deleteTransaction(index, li);

    });

    transactionList.appendChild(li);

    updateSummary();

    form.reset();

});