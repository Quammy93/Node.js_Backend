const fs = require("fs");
const budgetFile = "budget.json";

function loadBudgets() {
  if (!fs.existsSync(budgetFile)) return {};
  return JSON.parse(fs.readFileSync(budgetFile));
}

function saveBudgets(budgets) {
  fs.writeFileSync(budgetFile, JSON.stringify(budgets, null, 2));
}

function getBudget(month) {
  const budgets = loadBudgets();
  return budgets[month] || null;
}

function setBudget(month, amount) {
  const budgets = loadBudgets();
  budgets[month] = amount;
  saveBudgets(budgets);
}

function checkBudget(month, totalSpent) {
  const limit = getBudget(month);
  if (limit && totalSpent > limit) {
    console.log(`\n⚠️  Warning: You have exceeded the budget of $${limit} for month ${month}!\n`);
  }
}

module.exports = { getBudget, setBudget, checkBudget };
