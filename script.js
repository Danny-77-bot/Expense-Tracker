/* =========================
   STEP 4 - EXPENSE TRACKER
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

// Store all transactions

const transactions = [];

// Update Summary

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

    const totalBalance = totalIncome - totalExpense;

    income.textContent = "+$" + totalIncome.toFixed(2);

    expense.textContent = "-$" + totalExpense.toFixed(2);

    balance.textContent = "$" + totalBalance.toFixed(2);

}

// Add Transaction

form.addEventListener("submit",function(event){

    event.preventDefault();

    const descriptionValue = description.value.trim();

    const amountValue = Number(amount.value);

    const typeValue = type.value;

    if(descriptionValue==="" || amountValue<=0){

        alert("Please enter valid information.");

        return;

    }

    const empty = document.querySelector(".empty");

    if(empty){

        empty.remove();

    }

    // Save transaction

    transactions.push({

        description:descriptionValue,

        amount:amountValue,

        type:typeValue

    });

    const li = document.createElement("li");

    if(typeValue==="income"){

        li.innerHTML = `
            <strong>${descriptionValue}</strong>
            <span style="float:right;color:green;">
                +$${amountValue.toFixed(2)}
            </span>
        `;

    }else{

        li.innerHTML = `
            <strong>${descriptionValue}</strong>
            <span style="float:right;color:red;">
                -$${amountValue.toFixed(2)}
            </span>
        `;

    }

    transactionList.appendChild(li);

    updateSummary();

    form.reset();

});