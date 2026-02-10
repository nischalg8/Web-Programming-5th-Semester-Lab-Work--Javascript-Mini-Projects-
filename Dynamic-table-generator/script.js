const table = document.getElementById("dynamicTable");
const generateBtn = document.getElementById("generateBtn");
const addRowBtn = document.getElementById("addRowBtn");
const deleteRowBtn = document.getElementById("deleteRowBtn");
const highlightBtn = document.getElementById("highlightBtn");

// Event listeners
generateBtn.addEventListener("click", generateTable);
addRowBtn.addEventListener("click", addRow);
deleteRowBtn.addEventListener("click", deleteRow);
highlightBtn.addEventListener("click", highlightEven);

function generateTable() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);

  table.innerHTML = ""; // Clear existing table

  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const td = document.createElement("td");
      td.textContent = `Row ${i + 1} Col ${j + 1}`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function addRow() {
  const cols = table.rows[0] ? table.rows[0].cells.length : 1;
  const tr = document.createElement("tr");
  const rowIndex = table.rows.length + 1;
  for (let i = 0; i < cols; i++) {
    const td = document.createElement("td");
    td.textContent = `Row ${rowIndex} Col ${i + 1}`;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

function deleteRow() {
  if (table.rows.length > 0) {
    table.deleteRow(-1);
  }
}

function highlightEven() {
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].classList.remove("even");
    if ((i + 1) % 2 === 0) {
      table.rows[i].classList.add("even");
    }
  }
}

// Generate initial table
generateTable();
