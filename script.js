/* =========================
   STEP 6 - LOCAL STORAGE
========================= */

// Form Elements

const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");

// Summary Elements

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

// Load saved transactions

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

// =========================
// Save to Local Storage
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
    "$" + (totalIncome-totalExpense).toFixed(2);

    income.textContent =
    "+$" + totalIncome.toFixed(2);

    expense.textContent =
    "-$" + totalExpense.toFixed(2);

}

// =========================
// Display Transactions
// =========================

function displayTransactions(){

    transactionList.innerHTML = "";

    if(transactions.length===0){

        transactionList.innerHTML =
        `<li class="empty">
            No transactions available.
        </li>`;

        updateSummary();

        return;

    }

    transactions.forEach((transaction,index)=>{

        const li =
        document.createElement("li");

        li.style.display="flex";
        li.style.justifyContent="space-between";
        li.style.alignItems="center";

        li.innerHTML=`
            <div>
                <strong>${transaction.description}</strong><br>
                <span style="color:${transaction.type==="income" ? "green":"red"}">
                    ${transaction.type==="income" ? "+" : "-"}$${transaction.amount.toFixed(2)}
                </span>
            </div>

            <button class="delete-btn">
                Delete
            </button>
        `;

        li.querySelector(".delete-btn")
        .addEventListener("click",()=>{

            transactions.splice(index,1);

            saveTransactions();

            displayTransactions();

        });

        transactionList.appendChild(li);

    });

    updateSummary();

}

// =========================
// Add Transaction
// =========================

form.addEventListener("submit",function(event){

    event.preventDefault();

    const descriptionValue =
    description.value.trim();

    const amountValue =
    Number(amount.value);

    if(descriptionValue==="" || amountValue<=0){

        alert("Please enter valid information.");

        return;

    }

    transactions.push({

        description:descriptionValue,

        amount:amountValue,

        type:type.value

    });

    saveTransactions();

    displayTransactions();

    form.reset();

});

// =========================
// Initial Load
// =========================

displayTransactions();