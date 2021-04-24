function getRoseValue(indicesStr) {
  return document.getElementById("rose_value" + indicesStr).value;
}

function getRoseChildCountValue(indicesStr) {
  return document.getElementById("rose_child_count" + indicesStr).value;
}

function getRoseChildRow(indicesStr) {
  return document.getElementById("rose_children_row" + indicesStr);
}

function getRoseCell(indicesStr) {
  return document.getElementById("cell" + indicesStr);
}

/**
 * Clears the table of all its children.
 */

function createGenerateRoseChildrenFunction(rootIndicesStr) {
  return function () {
    generateRoseChildren(rootIndicesStr);
  };
}

function generateRoseChildren(rootIndicesStr) {
  // console.log("rootIndicesStr", rootIndicesStr);
  var childCount = getRoseChildCountValue(rootIndicesStr);
  document.getElementById("rose_root" + rootIndicesStr).colSpan =
    childCount > 0 ? childCount : 1;
  // console.log("childCount", childCount);
  var childRow = getRoseChildRow(rootIndicesStr);
  // console.log("childRow count", childRow.cells.length);
  if (childCount < childRow.cells.length) {
    // console.log("remove children");
    while (childCount < childRow.cells.length) {
      // console.log("removed a child");
      childRow.removeChild(childRow.lastChild);
    }
  } else if (childCount > childRow.cells.length) {
    // console.log("add children");
    var i = childRow.cells.length;
    for (; i < childCount; i++) {
      // console.log("added a child");
      var cell = childRow.insertCell();
      setAttributes(cell, { colSpan: 1, align: "center" });
      addRoseToCell(cell, newRoseCell(rootIndicesStr + i), rootIndicesStr + i);
    }
  } else {
    // console.log("correct");
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function printHello(indicesStr) {
  console.log("hello" + indicesStr);
}

function createPrintHello(indicesStr) {
  return function () {
    printHello(indicesStr);
  };
}

function newRoseValueInput(indicesStr) {
  var roseValue = document.createElement("input");
  setAttributes(roseValue, {
    type: "text",
    size: "6",
    id: "rose_value" + indicesStr,
    placeholder: "value",
  });
  return roseValue;
}

function newRoseChildCountInput(indicesStr) {
  var childCountValue = document.createElement("input");
  setAttributes(childCountValue, {
    type: "number",
    size: 3,
    min: 0,
    max: 5,
    id: "rose_child_count" + indicesStr,
    value: 0,
    placeholder: 0,
  });
  // childCountValue.oninput = createGenerateRoseChildrenFunction(indicesStr);
  return childCountValue;
}

/**
 * Creates and returns a table element with id "cellij".
 * The div contains a Rose Value input element and a numeric input for children
 * count/list length
 * @param L The list of indices you traverse from the root to reach the cell
 */
function newRoseCell(indicesStr) {
  // create table container
  var table = document.createElement("table");
  var row1 = table.insertRow();
  var cell = row1.insertCell();
  setAttributes(cell, {
    colSpan: 1,
    align: "center",
    id: "rose_root" + indicesStr,
  });

  var div = document.createElement("div");
  setAttributes(div, { id: "cell" + indicesStr, align: "left" });
  div.classList.add("left-inner", "rose-div");
  colorCell(div, "base");
  div.innerHTML += "Rose: ";

  var roseValueInput = newRoseValueInput(indicesStr);
  div.appendChild(roseValueInput);

  div.innerHTML += "<br/>";

  var roseChildCountInput = newRoseChildCountInput(indicesStr);
  div.appendChild(roseChildCountInput);
  div.innerHTML += " children";

  cell.appendChild(div);

  var row2 = table.insertRow();
  setAttributes(row2, {
    id: "rose_children_row" + indicesStr,
    valign: "top",
  });

  return table;
}

function addRoseToCell(cell, roseCell, indicesStr) {
  cell.appendChild(roseCell);
  document.getElementById(
    "rose_child_count" + indicesStr
  ).oninput = createGenerateRoseChildrenFunction(indicesStr);
}

function generateRoseTable() {
  // console.log("generateInputTable for rose");
  clearTable();
  var row = table.insertRow();
  var cell = row.insertCell();
  setAttributes(cell, { colSpan: 1, align: "center" });
  addRoseToCell(cell, newRoseCell("0"), indicesStr);
}

/**
 * Returns the SML version of the rose rooted at cell indicesStr
 * @param indicesStr The string of concatenated indices
 */
function roseTextHelper(indicesStr) {
  var roseCellValue = getRoseValue(indicesStr);
  colorCell(getRoseCell(indicesStr), "valid");
  var text = "Rose(" + roseCellValue + ",[";
  if (roseCellValue.includes("-"))
    setNegativeWarningText("Warning: Negative sign used instead of ~");
  if (roseCellValue === "")
    setTableWarningText("Warning: Empty rose value");
  for (var i = 0; i < getRoseChildCountValue(indicesStr); i++) {
    text += roseTextHelper(indicesStr + i);
    if (i < getRoseChildCountValue(indicesStr) - 1) {
      text += ",";
    }
  }
  text += "])";
  return text;
}

/**
 * Called when 'Generate SML Text' button clicked for "rose" tab
 */
function generateRoseText() {
  // // reset error text
  resetWarningText();

  // compute SML text from tree/shrub
  var text;
  try {
    text = roseTextHelper("0");
  } catch (e) {
    console.log(e);
    text = "Something went wrong...";
  }

  // set SML output text
  setSMLOutputText(text);
}
