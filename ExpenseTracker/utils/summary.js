const chalk = require("chalk");

function showSummary(expenses) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(chalk.yellow(`\nTotal Expenses: $${total.toFixed(2)}\n`));
}

function showMonthlySummary(expenses, month) {
  const currentYear = new Date().getFullYear();
  const filtered = expenses.filter(e => {
    const date = new Date(e.date);
    return date.getFullYear() === currentYear && date.getMonth() + 1 === month;
  });

  showSummary(filtered);
  console.table(filtered);
}

module.exports = { showSummary, showMonthlySummary };
