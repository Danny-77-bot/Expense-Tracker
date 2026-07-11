/* =========================
   STEP 7 - SEARCH TRANSACTIONS
========================= */

const form = document.getElementById("transaction-form");

const description = document.getElementById("description");

const amount = document.getElementById("amount");

const type = document.getElementById("type");

const search = document.getElementById("search");
const filterButtons =document.querySelectorAll(".filter-btn");

const transactionList = document.getElementById("transaction-list");

const balance = document.getElementById("balance");

const income = document.getElementById("income");

const expense = document.getElementById("expense");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

// =========================

function saveTransactions(){

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

}

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
function deleteTransaction(id){

    transactions = transactions.filter(function(transaction){

        return transaction.id !== id;

    });

    saveTransactions();

    displayTransactions(transactions);
    filterButtons.forEach(button=>{

    button.addEventListener("click",function(){

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const filter = this.dataset.filter;

        if(filter==="all"){

            displayTransactions(transactions);

        }

        else{

            const filtered =
            transactions.filter(transaction=>{

                return transaction.type===filter;

            });

            displayTransactions(filtered);

        }

    });

});

    updateSummary();

}

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

    list.forEach(transaction => {

        const li = document.createElement("li");

        li.style.display = "flex";

        li.style.justifyContent = "space-between";

        li.style.alignItems = "center";

        li.innerHTML = `
            <div>

                <strong>${transaction.description}</strong><br>

                <span style="color:${transaction.type==="income"?"green":"red"}">

                    ${transaction.type==="income"?"+":"-"}$${transaction.amount.toFixed(2)}

                </span>

            </div>

            <button
                class="delete-btn"
                data-id="${transaction.id}">

                Delete

            </button>
        `;

        const button = li.querySelector(".delete-btn");

        button.addEventListener("click", function(){

            deleteTransaction(transaction.id);

        });

        transactionList.appendChild(li);

    });

}

// =========================

form.addEventListener("submit",function(event){

    event.preventDefault();

    const descriptionValue=
    description.value.trim();

    const amountValue=
    Number(amount.value);

    if(descriptionValue===""||amountValue<=0){

        alert("Please enter valid information.");

        return;

    }

    
transactions.push({

    id:Date.now(),

    description:descriptionValue,

    amount:amountValue,

    type:type.value

});
    saveTransactions();

    displayTransactions(transactions);

    updateSummary();

    form.reset();

});

// =========================

search.addEventListener("input",function(){

    const keyword=
    search.value.toLowerCase();

    const filtered=
    transactions.filter(transaction=>

        transaction.description
        .toLowerCase()
        .includes(keyword)

    );

    displayTransactions(filtered);

});

// =========================

displayTransactions(transactions);

updateSummary();