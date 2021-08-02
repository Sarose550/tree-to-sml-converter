var depth;
var treeArray;
var table;
var activeTab;

function setDepthErrorText(str) {
  document.getElementById("depth_error_text").innerHTML = str;
}

function setNegativeWarningText(str) {
  document.getElementById("negative_warning_text").innerHTML = str;
}

function setTableWarningText(str) {
  document.getElementById("table_warning_text").innerHTML = str;
}

function resetWarningText() {
  setTableWarningText("");
  setNegativeWarningText("");
  setDepthErrorText("");
}

function setSMLOutputText(str) {
  document.getElementById("sml_output_text").innerHTML = str;
}

function resetDepth() {
  document.getElementById("depth_form").value = "";
  document.getElementById("generate_sml_text_btn").disabled = true;
}

/**
 * Checks for non-negative integer depth < 6.
 * Sets appropriate error text if necessary.
 * @param depth int that specifies depth
 */
function validateDepth(d) {
  if (d == "" || isNaN(d)) {
    setDepthErrorText("Depth must be a non-negative integer.");
    return false;
  }
  if (d < 0) {
    setDepthErrorText("Depth must be a non-negative integer.");
    return false;
  }
  if (d > 6) {
    setDepthErrorText("Depth <=6 pls :(");
    return false;
  }
  return true;
}

/**
 * Called when "Enter depth" is clicked.
 * Sets global depth var.
 * Validates depth.
 * If valid, clears table, error text, and generates input table
 */
function depthEntered() {
  // sets global depth variable
  depth = document.getElementById("depth_form").value;
  if (validateDepth(depth)) {
    // clear table
    clearTable();
    // clear error text
    resetWarningText();
    // generate input table
    generateInputTable();
    // enable generate sml text btn
    document.getElementById("generate_sml_text_btn").disabled = false;
  }
}

/**
 * Generate the input table for a tree or shrub datatype given the depth.
 */
function generateInputTable() {
  if (depth == 0) {
    let row = table.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = "Zero depth";
  } else {
    for (var i = 0; i < depth; i++) {
      let row = table.insertRow();
      for (var j = 0; j < Math.pow(2, i); j++) {
        var cell = row.insertCell();
        cell.colSpan = Math.pow(2, depth - 1 - i);
        cell.align = "center";
        switch (activeTab) {
          case "lazytree":
          case "tree":
            cell.appendChild(newTreeCell(i, j));
            break;
          case "shrub":
            cell.appendChild(newShrubCell(i, j));
            if (i < depth - 1) {
              document.getElementById(
                "branch_btn" + i + j
              ).onchange = createUncolorInputBorderFunction(i, j);
              document.getElementById(
                "branch_btn" + i + j
              ).onclick = createLeafEnableFunction(i, j, false);
              document.getElementById(
                "leaf_btn" + i + j
              ).onchange = createUncolorInputBorderFunction(i, j);
              document.getElementById(
                "leaf_btn" + i + j
              ).onclick = createLeafEnableFunction(i, j, true);
            }
            break;
        }
      }
    }
  }
}

/**
 * Clears the table of all its children.
 */
function clearTable() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

/**
 * Set the global table var.
 * Clears the table.
 * Creates a dummy "Node table will appear here" cell.
 */
function resetTable() {
  switch (activeTab) {
    case "sml":
      table = document.getElementById("output_table");
      break;
    default:
      table = document.getElementById("input_table");
  }
  // clear table
  clearTable();

  // insert initial dummy cell
  let row = table.insertRow();
  let cell = row.insertCell();
  var text = document.createTextNode("Node table will appear here");
  cell.appendChild(text);
}

function isConvertingToSML() {
  return activeTab.localeCompare("sml") != 0;
}

/**
 * Reset the table.
 * Reset the error text.
 * Reset the SML output text.
 */
function resetPage() {
  resetTable();
  if (isConvertingToSML()) {
    resetWarningText();
    setSMLOutputText("~SML Text will appear here~");
  }
}

function colorCell(cell, color) {
  cell.classList.remove("base-cell");
  cell.classList.remove("valid-cell");
  switch (color) {
    case "base":
      cell.classList.add("base-cell");
      break;
    case "valid":
      cell.classList.add("valid-cell");
      break;
  }
}

function getCell(i, j) {
  return document.getElementById("cell" + i + j);
}

function createUncolorInputBorderFunction(i, j) {
  return function () {
    uncolorInputBorder(i, j);
  };
}

function uncolorInputBorder(i, j) {
  colorCell(getCell(i, j), "base");
}

function getLeaf(i, j) {
  return document.getElementById("leaf_value" + i + j);
}

function createLeafEnableFunction(i, j, enable) {
  return function () {
    getLeaf(i, j).disabled = !enable;
  };
}

/**
 * Creates and returns an input element with id "cellij"
 * @param i The 0-indexed row of the cell
 * @param j The 0-indexed column of the cell
 */
function newTreeCell(i, j) {
  var input = document.createElement("input");
  input.type = "text";
  input.size = "5";
  input.id = "cell" + i + j;
  input.placeholder = "value";
  colorCell(input, "base");
  input.onchange = createUncolorInputBorderFunction(i, j);
  return input;
}

/**
 * Creates and returns a div element with id "cellij".
 * The div contains a Leaf input element.
 * The div also contains radio button toggles and a Branch option if the cell
 * is not on the last row.
 * @param i The 0-indexed row of the cell
 * @param j The 0-indexed column of the cell
 */
function newShrubCell(i, j) {
  // create div container
  var div = document.createElement("div");
  div.id = "cell" + i + j;
  div.classList.add("left-inner");
  div.classList.add("shrub-div");
  div.align = "left";
  colorCell(div, "base");

  // if not last level, cell has Branch or Leaf option
  if (i < depth - 1) {
    // create Branch radio button
    var branchBtn = document.createElement("input");
    branchBtn.type = "radio";
    branchBtn.id = "branch_btn" + i + j;
    branchBtn.name = "radio" + i + j;
    div.appendChild(branchBtn);

    div.innerHTML += "Branch<br/>";

    // create Leaf radio button
    var leafBtn = document.createElement("input");
    leafBtn.type = "radio";
    leafBtn.id = "leaf_btn" + i + j;
    leafBtn.name = "radio" + i + j;
    div.appendChild(leafBtn);
  }

  div.innerHTML += "Leaf: ";
  var leafValue = document.createElement("input");
  leafValue.type = "text";
  leafValue.size = "5";
  leafValue.id = "leaf_value" + i + j;
  leafValue.placeholder = "value";

  div.appendChild(leafValue);

  return div;
}

/**
 * Returns the SML version of the tree rooted at cell i, j
 * @param i The 0-indexed row of the cell root
 * @param j The 0-indexed column of the cell root
 */
function treeTextHelper(i, j) {
  if (i == depth) {
    // shouldn't be possible for shrubs
    if(activeTab == "lazytree") return "LazyTree.delay (fn () => LazyTree.LEAF)";
    return "Empty";
  }
  var cellij = getCell(i, j);
  switch (activeTab) {
    case "tree":
      if (cellij.value == "") return "Empty";
      colorCell(cellij, "valid");
      if (cellij.value.includes("-")) {
        setNegativeWarningText("Warning: Negative sign used instead of ~");
      }
      return (
        "Node(" +
        treeTextHelper(i + 1, j * 2) +
        "," +
        cellij.value +
        "," +
        treeTextHelper(i + 1, j * 2 + 1) +
        ")"
      );
      break;
    case "lazytree":
      if (cellij.value == "") return "LazyTree.delay (fn () => LazyTree.LEAF)";
      colorCell(cellij, "valid");
      if (cellij.value.includes("-")) {
        setNegativeWarningText("Warning: Negative sign used instead of ~");
      }
      return (
        "LazyTree.delay (fn () => LazyTree.NODE (" +
        treeTextHelper(i + 1, j * 2) +
        "," +
        cellij.value +
        "," +
        treeTextHelper(i + 1, j * 2 + 1) +
        "))"
      );
      break;
    case "shrub":
      // leaf cell
      if (
        i == depth - 1 ||
        document.getElementById("leaf_btn" + i + j).checked
      ) {
        var leafij = getLeaf(i, j);
        colorCell(cellij, "valid");
        if (leafij.value == "")
          setTableWarningText("Warning: Empty leaf value");
        if (leafij.value.includes("-")) {
          setNegativeWarningText("Warning: Negative sign used instead of ~");
        }
        return "Leaf(" + leafij.value + ")";
      }
      // branch cell
      if (document.getElementById("branch_btn" + i + j).checked) {
        colorCell(cellij, "valid");
        return (
          "Branch(" +
          treeTextHelper(i + 1, j * 2) +
          "," +
          treeTextHelper(i + 1, j * 2 + 1) +
          ")"
        );
      }

      if (i == 0) {
        return "Empty";
      } else {
        throw "Branch without valid children";
      }
      break;
  }
}

/**
 * Called when 'Generate SML Text' button clicked
 */
function generateText() {
  if (activeTab === "rose") {
    generateRoseText();
  } else {
    // reset error text
    resetWarningText();
    // uncolor all input borders
    for (var i = 0; i < depth; i++) {
      for (var j = 0; j < Math.pow(2, i); j++) {
        uncolorInputBorder(i, j);
      }
    }

    // compute SML text from tree/shrub
    var text;
    try {
      text = treeTextHelper(0, 0);
    } catch (e) {
      console.log(e);
      text = "Node must have 2 valid children.";
    }

    // set SML output text
    setSMLOutputText(text);
  }
}

/**
 * Called when the user opens a certain tab.
 */
function openTab(evt, tabName) {
  // Declare all variables
  var tabContent, tabLinks, toSMLContent, fromSMLContent;

  activeTab = tabName;
  depth = null;

  // Get all elements with class="tab-content" and hide them
  tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tab-links" and remove the class "active"
  tabLinks = document.getElementsByClassName("tab-links");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  evt.currentTarget.className += " active";

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";

  toSMLContent = document.getElementById("to_sml_content");
  fromSMLContent = document.getElementById("from_sml_content");
  depthContent = document.getElementById("depth_content");

  if (tabName === "sml") {
    toSMLContent.style.display = "none";
    fromSMLContent.style.display = "block";
  } else {
    toSMLContent.style.display = "block";
    fromSMLContent.style.display = "none";
  }

  resetPage();

  if (tabName === "rose") {
    depthContent.style.display = "none";
    document.getElementById("generate_sml_text_btn").disabled = false;
    generateRoseTable();
  } else {
    depthContent.style.display = "block";
    resetDepth();
  }
}

const depthForm = document.getElementById("depth_form");
depthForm.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.getElementById("enter_depth_btn").onclick();
  }
});

const smlForm = document.getElementById("sml_form");
smlForm.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.getElementById("generate_tree_btn").onclick();
  }
});

document.getElementById("default_open").click();
