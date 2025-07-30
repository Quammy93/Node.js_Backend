# Expense Tracker CLI

A simple command-line **Expense Tracker** built with **Node.js**. This tool allows you to manage your personal finances with ease by tracking expenses, categorizing them, setting monthly budgets, and exporting reports.

---

## Features

* Add, update, and delete expenses
* View all expenses in a table
* View overall and monthly summaries
* Filter expenses by category
* Set monthly budgets with warnings
* Export expenses to CSV

---

## Installation

```bash
git clone <repo-url>
cd expense-tracker-cli
npm install
```

---

## Usage

```bash
node index.js
```

### Actions Available:

* **Add Expense**: Add a new expense with description, amount, category, and date.
* **Update Expense**: Modify an existing expense using its ID.
* **Delete Expense**: Remove an expense by ID.
* **View All Expenses**: Display a table of all expenses.
* **View Summary**: Shows the total sum of all expenses.
* **View Monthly Summary**: Shows a summary for a selected month of the current year.
* **Filter by Category**: Shows expenses for a specific category.
* **Set Monthly Budget**: Define and manage budgets.
* **Export to CSV**: Creates a `expenses.csv` file with all expenses.

---

## Data Format

Expenses are stored in `expenses.json` like:

```json
[
  {
    "id": "1692122341200",
    "description": "Groceries",
    "amount": 45.5,
    "category": "Food",
    "date": "2025-07-29T12:00:00.000Z"
  }
]
```

---

## Optional Features Details

### 1. Filter Expenses by Category

Filter and view expenses that belong to a selected category (e.g., Food, Travel).

### 2. Monthly Budget

Allows you to:

* Set a budget for any month of the year
* Get warnings when the total expenses exceed the set limit

### 3. CSV Export

Generate a `expenses.csv` with headers:

```
ID,Description,Amount,Category,Date
```

---

## Dependencies

* [inquirer](https://www.npmjs.com/package/inquirer)
* [chalk](https://www.npmjs.com/package/chalk)
* [dayjs](https://www.npmjs.com/package/dayjs)
* [json2csv](https://www.npmjs.com/package/json2csv)
* [fs](https://nodejs.org/api/fs.html)

---

## License

MIT License

---

## Author

Maxwell Ahorlu

Feel free to contribute or raise issues to improve this tool!
