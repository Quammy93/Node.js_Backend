const fs = require("fs");
const path = "expenses.json";

function loadExpenses() {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path));
}

function saveExpenses(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { loadExpenses, saveExpenses };
