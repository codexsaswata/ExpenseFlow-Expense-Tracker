const API_URL = "/api/expenses";

let expenses = [];
let editingId = null;


// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadExpenses();

    // Form submit
    document
        .getElementById("expenseForm")
        .addEventListener("submit", saveExpense);

});


// ===============================
// LOAD EXPENSES
// ===============================

async function loadExpenses() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load expenses");
        }

        expenses = await response.json();

        console.log("Expenses loaded:", expenses);

        renderExpenses();
        updateDashboard();
        updateCategoryFilter();
        renderAnalytics();

    } catch (error) {

        console.error(error);

        showToast("Unable to load expenses", "error");

    }
}


// ===============================
// RENDER EXPENSE TABLE
// ===============================

function renderExpenses() {

    const table = document.getElementById("expenseTable");
    const emptyState = document.getElementById("emptyState");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const searchText = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";


    let filteredExpenses = expenses.filter(expense => {

        const title = expense.title
            ? expense.title.toLowerCase()
            : "";

        const description = expense.description
            ? expense.description.toLowerCase()
            : "";

        const category = expense.category
            ? expense.category.toLowerCase()
            : "";


        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            expense.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    table.innerHTML = "";


    if (filteredExpenses.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    filteredExpenses
        .sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate))
        .forEach(expense => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>
                    <strong>${escapeHTML(expense.title)}</strong>

                    <small>
                        ${expense.description
                            ? escapeHTML(expense.description)
                            : ""}
                    </small>
                </td>

                <td>
                    <span class="category-badge">
                        ${escapeHTML(expense.category)}
                    </span>
                </td>

                <td>
                    ${formatDate(expense.expenseDate)}
                </td>

                <td>
                    <strong>
                        ₹${Number(expense.amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2
                        })}
                    </strong>
                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editExpense(${expense.id})"
                        title="Edit">
                        ✎
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteExpense(${expense.id})"
                        title="Delete">
                        🗑
                    </button>

                </td>

            `;

            table.appendChild(row);

        });

}


// ===============================
// DASHBOARD KPIs
// ===============================

function updateDashboard() {

    const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0
    );


    const count = expenses.length;


    const average = count > 0
        ? total / count
        : 0;


    // Total
    document.getElementById("totalExpense").textContent =
        formatCurrency(total);


    // Transactions
    document.getElementById("transactionCount").textContent =
        count;


    // Average
    document.getElementById("averageExpense").textContent =
        formatCurrency(average);


    // Top category
    const categoryTotals = calculateCategoryTotals();


    let topCategory = "-";
    let highestAmount = 0;


    Object.entries(categoryTotals).forEach(([category, amount]) => {

        if (amount > highestAmount) {

            highestAmount = amount;
            topCategory = category;

        }

    });


    document.getElementById("topCategory").textContent =
        topCategory;

}


// ===============================
// ANALYTICS
// ===============================

function renderAnalytics() {

    const chart = document.getElementById("categoryChart");

    if (!chart) {
        console.error("categoryChart element not found");
        return;
    }


    chart.innerHTML = "";


    if (expenses.length === 0) {

        chart.innerHTML = `
            <div class="analytics-empty">
                <div>📊</div>
                <h3>No data available</h3>
                <p>Add some expenses to see your spending analytics.</p>
            </div>
        `;

        return;
    }


    const categoryTotals = calculateCategoryTotals();


    const sortedCategories =
        Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1]);


    const maximum =
        Math.max(...sortedCategories.map(item => item[1]));


    const total =
        expenses.reduce(
            (sum, expense) => sum + Number(expense.amount || 0),
            0
        );


    sortedCategories.forEach(([category, amount]) => {

        const percentage =
            maximum > 0
                ? (amount / maximum) * 100
                : 0;


        const share =
            total > 0
                ? ((amount / total) * 100).toFixed(1)
                : 0;


        const row = document.createElement("div");

        row.className = "analytics-row";


        row.innerHTML = `

            <div class="analytics-info">

                <div>

                    <strong>
                        ${escapeHTML(category)}
                    </strong>

                    <span>
                        ${share}% of total
                    </span>

                </div>

                <strong>
                    ${formatCurrency(amount)}
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: ${percentage}%">
                </div>

            </div>

        `;


        chart.appendChild(row);

    });

}


// ===============================
// CATEGORY CALCULATION
// ===============================

function calculateCategoryTotals() {

    const totals = {};


    expenses.forEach(expense => {

        const category =
            expense.category || "Other";


        const amount =
            Number(expense.amount || 0);


        if (!totals[category]) {
            totals[category] = 0;
        }


        totals[category] += amount;

    });


    return totals;

}


// ===============================
// CATEGORY FILTER
// ===============================

function updateCategoryFilter() {

    const select =
        document.getElementById("categoryFilter");


    if (!select) {
        return;
    }


    const currentValue =
        select.value;


    const categories =
        [...new Set(
            expenses
                .map(expense => expense.category)
                .filter(Boolean)
        )]
        .sort();


    select.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value = category;
        option.textContent = category;


        select.appendChild(option);

    });


    select.value =
        categories.includes(currentValue)
            ? currentValue
            : "all";

}


// ===============================
// ADD / EDIT EXPENSE
// ===============================

async function saveExpense(event) {

    event.preventDefault();


    const id =
        document.getElementById("expenseId").value;


    const expense = {

        title:
            document.getElementById("title").value.trim(),

        amount:
            Number(document.getElementById("amount").value),

        category:
            document.getElementById("category").value,

        expenseDate:
            document.getElementById("expenseDate").value,

        description:
            document.getElementById("description").value.trim()

    };


    try {

        let response;


        if (id) {

            // UPDATE
            response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(expense)
                }
            );

        } else {

            // CREATE
            response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(expense)
                }
            );

        }


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(errorText);

            throw new Error(
                "Could not save expense"
            );

        }


        closeModal();

        await loadExpenses();


        showToast(
            id
                ? "Expense updated successfully!"
                : "Expense added successfully!"
        );


    } catch (error) {

        console.error(error);

        showToast(
            "Failed to save expense",
            "error"
        );

    }

}


// ===============================
// EDIT EXPENSE
// ===============================

function editExpense(id) {

    const expense =
        expenses.find(item => item.id === id);


    if (!expense) {
        return;
    }


    document.getElementById("expenseId").value =
        expense.id;


    document.getElementById("title").value =
        expense.title;


    document.getElementById("amount").value =
        expense.amount;


    document.getElementById("category").value =
        expense.category;


    document.getElementById("expenseDate").value =
        expense.expenseDate;


    document.getElementById("description").value =
        expense.description || "";


    document.getElementById("modalTitle").textContent =
        "Edit Expense";


    document.querySelector(".submit-btn").textContent =
        "Update Expense";


    openModal();

}


// ===============================
// DELETE EXPENSE
// ===============================

async function deleteExpense(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this expense?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete expense"
            );

        }


        await loadExpenses();


        showToast(
            "Expense deleted successfully!"
        );


    } catch (error) {

        console.error(error);

        showToast(
            "Failed to delete expense",
            "error"
        );

    }

}


// ===============================
// MODAL
// ===============================

function openModal() {

    document
        .getElementById("expenseModal")
        .classList.add("show");


    if (!document.getElementById("expenseId").value) {

        document.getElementById("modalTitle").textContent =
            "Add Expense";


        document.querySelector(".submit-btn").textContent =
            "Save Expense";


        document.getElementById("expenseDate").value =
            new Date().toISOString().split("T")[0];

    }

}


function closeModal() {

    document
        .getElementById("expenseModal")
        .classList.remove("show");


    document
        .getElementById("expenseForm")
        .reset();


    document.getElementById("expenseId").value = "";


    document.getElementById("modalTitle").textContent =
        "Add Expense";


    document.querySelector(".submit-btn").textContent =
        "Save Expense";

}


// Close modal when clicking outside

window.addEventListener("click", event => {

    const modal =
        document.getElementById("expenseModal");


    if (event.target === modal) {
        closeModal();
    }

});


// ===============================
// NAVIGATION
// ===============================

document.querySelectorAll(".sidebar nav a").forEach(link => {

    link.addEventListener("click", function () {

        document
            .querySelectorAll(".sidebar nav a")
            .forEach(item =>
                item.classList.remove("active")
            );


        this.classList.add("active");

    });

});


// ===============================
// UTILITY FUNCTIONS
// ===============================

function formatCurrency(amount) {

    return "₹" +
        Number(amount || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


function formatDate(date) {

    if (!date) {
        return "-";
    }


    const d =
        new Date(date);


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ===============================
// TOAST
// ===============================

function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.className =
        `toast show ${type}`;


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}