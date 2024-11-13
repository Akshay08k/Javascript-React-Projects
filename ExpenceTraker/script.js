document.addEventListener("DOMContentLoaded", () => {
    const expenceForm = document.getElementById("expense-form");
    const expenceNameInput = document.getElementById("expense-name");
    const expenceAmoutInput = document.getElementById("expense-amount");
    const expenceList = document.getElementById("expense-list");
    const totalAmoutDisplay = document.getElementById("total-amount");

    let expences = JSON.parse(localStorage.getItem("expences")) || []
    let totalAmout = calculateTotal()
    renderExpenses()

    expenceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenceNameInput.value.trim();
        const amount = parseInt(expenceAmoutInput.value.trim());
        if (name != "" && !isNaN(amount) && amount > 0) {
            const newExpence = {
                id: Date.now(),
                name: name,
                amount: amount,
            }
            expences.push(newExpence);
            saveExpencesTolocal();
            updateTotal();

            expenceNameInput.value = "";
            expenceAmoutInput.value = "";

        }

    })

    function renderExpenses() {
        expenceList.innerHTML = "";
        expences.forEach(expence => {
            const item = document.createElement("li");
            item.innerHTML = `<p>${expence.name}: $${expence.amount}</p>
            <button class="btn" data-id="${expence.id}">Delete</button>`;
            expenceList.appendChild(item);
        })
    }


    function calculateTotal() {
        return expences.reduce((sum, expense) => sum + expense.amount, 0)
    }
    function updateTotal() {
        totalAmout = calculateTotal();
        totalAmoutDisplay.textContent = totalAmout;
    }
    function saveExpencesTolocal() {
        localStorage.setItem("expences", JSON.stringify(expences));
        renderExpenses()
    }

    expenceList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = parseInt(e.target.getAttribute("data-id"));
            expences = expences.filter(expence => expence.id !== id);
            saveExpencesTolocal();
            updateTotal();
        }
    })
})