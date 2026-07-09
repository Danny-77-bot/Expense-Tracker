/* =========================
   STEP 3 - ADD TRANSACTIONS
========================= */

// Get HTML elements

const form = document.getElementById("transaction-form");

const description = document.getElementById("description");

const amount = document.getElementById("amount");

const type = document.getElementById("type");

const transactionList = document.getElementById("transaction-list");

// When the form is submitted

form.addEventListener("submit", function(event){

    // Prevent page refresh

    event.preventDefault();

    // Get values from the form

    const descriptionValue = description.value.trim();

    const amountValue = amount.value;

    const typeValue = type.value;

    // Check if fields are empty

    if(descriptionValue === "" || amountValue === ""){

        alert("Please fill in all fields.");

        return;

    }

    // Remove the "No transactions available" message

    const emptyMessage = document.querySelector(".empty");

    if(emptyMessage){

        emptyMessage.remove();

    }

    // Create a new list item

    const transaction = document.createElement("li");

    // Add transaction content

    if(typeValue === "income"){

        transaction.innerHTML = `
            <strong>${descriptionValue}</strong>
            <span style="float:right; color:green;">
                +$${amountValue}
            </span>
        `;

    }else{

        transaction.innerHTML = `
            <strong>${descriptionValue}</strong>
            <span style="float:right; color:red;">
                -$${amountValue}
            </span>
        `;

    }

    // Add the transaction to the list

    transactionList.appendChild(transaction);

    // Clear the form

    form.reset();

});