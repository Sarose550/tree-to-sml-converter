function getRoseValue(indexList) {
  return document.getElementById("rose_value" + indexList.join(""));
}

function getRoseChildCountValue(indexList) {
  return document.getElementById("rose_child_count" + indexList.join(""));
}

function getCurrRoseChildCount(indexList) {
  return document.getElementById("rose_children_row" + indexList.join("")).cells
    .length;
}

function getRoseChildRow(indexList) {
  return document.getElementById("rose_children_row" + indexList.join(""));
}

/**
 * Clears the table of all its children.
 */

function createGenerateRoseChildrenFunction(rootIndexList) {
  return generateRoseChildren(rootIndexList);
}

function generateRoseChildren(rootIndexList) {
  console.log(rootIndexList);
  let childCount = getRoseChildCountValue(rootIndexList);
  let childRow = getRoseChildRow(rootIndexList);
  if (childCount < childRow.cells.length) {
    while (childCount < childRow.cells.length) {
      childRow.removeChild(childRow.lastChild);
    }
  } else {
    let i = childRow.cells.length;
    for (; i < childCount; i++) {
      let cell = row.insertCell();
      setAttributes(cell, { colSpan: 1, align: "center" });
      cell.appendChild(newRoseCell([...rootIndexList].push(i)));
    }
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function printHello(indicesStr) {
  console.log(ev);
  console.log("hello" + indicesStr);
}

function createPrintHello(indicesStr) {
    return function () {
        printHello(indicesStr);
    }
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
  childCountValue.type = "number";
  childCountValue.size = 3;
  childCountValue.min = 0;
  childCountValue.max = 5;
  childCountValue.id = "rose_child_count" + indicesStr;
  childCountValue.value = 0;
  childCountValue.placeholder = 0;
  childCountValue.oninput = createPrintHello(indicesStr);
  // childCountValue.oninput = createGenerateRoseChildrenFunction(indexList);
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
  let row = table.insertRow();
  let cell = row.insertCell();
  setAttributes(cell, { colSpan: 1, align: "center" });

  var div = document.createElement("div");
  setAttributes(div, { id: "cell" + indicesStr, align: "left" });
  div.classList.add("left-inner", "rose-div");
  colorCell(div, "base");
  div.innerHTML += "Rose: ";

  div.appendChild(newRoseValueInput(indicesStr));

  div.innerHTML += "<br/>";

  div.appendChild(newRoseChildCountInput(indicesStr));
  div.innerHTML += " children";

  cell.appendChild(div);

  let row2 = table.insertRow();
  setAttributes(row2, {
    id: "rose_children_row" + indicesStr,
  });

  return table;
}

function generateRoseTable() {
  // console.log("generateInputTable for rose");
  let row = table.insertRow();
  let cell = row.insertCell();
  setAttributes(cell, { colSpan: 1, align: "center" });
  cell.appendChild(newRoseCell("0"));
}

/**
 * Called when 'Generate SML Text' button clicked
 */
function generateRoseText() {
  // // reset error text
  // resetWarningText();

  console.log("generate rose text");

  // uncolor all input borders
  //   for (var i = 0; i < depth; i++) {
  //     for (var j = 0; j < Math.pow(2, i); j++) {
  //       uncolorInputBorder(i, j);
  //     }
  //   }

  //   // compute SML text from tree/shrub
  //   var text;
  //   try {
  //     text = treeTextHelper(0, 0);
  //   } catch (e) {
  //     console.log(e);
  //     text = "Node must have 2 valid children.";
  //   }

  //   // set SML output text
  //   setSMLOutputText(text);
}
