#!/usr/bin/env node

// Build a simple expense tracker application to manage your finances. The application should allow users to add, delete, and view their expenses. The application should also provide a summary of the expenses.

// Users can add an expense with a description and amount.
// Users can update an expense.
// Users can delete an expense.
// Users can view all expenses.
// Users can view a summary of all expenses.
// Users can view a summary of expenses for a specific month (of current year).


const inquirer = require("inquirer");
const chalk = require("chalk");
const { loadExpenses, saveExpenses } = require("./utils/file");
const { showSummary, showMonthlySummary } = require("./utils/summary");
const { setBudget, checkBudget } = require("./utils/budget");
const { Parser } = require("json2csv");
const fs = require("fs");

async function main() {
  const actions = [
    "Add Expense",
    "Update Expense",
    "Delete Expense",
    "View All Expenses",
    "View Summary",
    "View Monthly Summary",
    "Filter by Category",
    "Set Monthly Budget",
    "Export to CSV",
    "Exit"
  ];

  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Choose an action:",
    choices: actions,
  });

  let expenses = loadExpenses();

  switch (action) {
    case "Add Expense":
      const add = await inquirer.prompt([
        { name: "description", message: "Description:" },
        { name: "amount", message: "Amount:", validate: val => !isNaN(val) },
        { name: "category", message: "Category (optional):", default: "General" },
      ]);
      expenses.push({
        id: Date.now().toString(),
        description: add.description,
        amount: parseFloat(add.amount),
        category: add.category,
        date: new Date().toISOString(),
      });
      saveExpenses(expenses);
      console.log(chalk.green("✅ Expense added."));
      break;

    case "View All Expenses":
      console.table(expenses);
      break;

    case "Update Expense":
      const { idToUpdate } = await inquirer.prompt({
        name: "idToUpdate",
        message: "Enter ID of the expense to update:",
      });
      const existing = expenses.find(e => e.id === idToUpdate);
      if (!existing) return console.log(chalk.red("Expense not found."));
      const updated = await inquirer.prompt([
        { name: "description", message: "Description:", default: existing.description },
        { name: "amount", message: "Amount:", default: existing.amount },
      ]);
      existing.description = updated.description;
      existing.amount = parseFloat(updated.amount);
      saveExpenses(expenses);
      console.log(chalk.green("✅ Expense updated."));
      break;

    case "Delete Expense":
      const { idToDelete } = await inquirer.prompt({
        name: "idToDelete",
        message: "Enter ID of the expense to delete:",
      });
      expenses = expenses.filter(e => e.id !== idToDelete);
      saveExpenses(expenses);
      console.log(chalk.green("🗑️ Expense deleted."));
      break;

    case "View Summary":
      showSummary(expenses);
      break;

    case "View Monthly Summary":
      const { month } = await inquirer.prompt({
        name: "month",
        message: "Enter month number (1-12):",
        validate: val => val >= 1 && val <= 12,
      });
      const filtered = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() + 1 === parseInt(month) && d.getFullYear() === new Date().getFullYear();
      });
      const total = filtered.reduce((sum, e) => sum + e.amount, 0);
      console.table(filtered);
      console.log(chalk.yellow(`Total: $${total.toFixed(2)}`));
      checkBudget(month, total);
      break;

    case "Filter by Category":
      const { category } = await inquirer.prompt({
        name: "category",
        message: "Enter category to filter by:",
      });
      const filteredByCategory = expenses.filter(e => e.category.toLowerCase() === category.toLowerCase());
      console.table(filteredByCategory);
      break;

    case "Set Monthly Budget":
      const budgetInput = await inquirer.prompt([
        { name: "month", message: "Enter month number (1-12):", validate: val => val >= 1 && val <= 12 },
        { name: "amount", message: "Enter budget amount:", validate: val => !isNaN(val) },
      ]);
      setBudget(budgetInput.month, parseFloat(budgetInput.amount));
      console.log(chalk.green(`✅ Budget for month ${budgetInput.month} set.`));
      break;

    case "Export to CSV":
      const parser = new Parser({ fields: ["id", "description", "amount", "category", "date"] });
      const csv = parser.parse(expenses);
      fs.writeFileSync("expenses.csv", csv);
      console.log(chalk.green("✅ Exported to expenses.csv"));
      break;

    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }

  main(); // Run again
}

main();
