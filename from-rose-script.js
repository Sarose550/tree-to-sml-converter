function createGRCCFunction(i, j) {
    return function () {
      generateRoseChildrenCells(i, j);
    };
  }

  function generateRoseChildrenCells(indexList) {
    let count = document.getElementById("rose_list_length" + indexList.join(''));
    if (count > table.rows[i].cells.length)
      for (var i = 0; i < depth; i++) {
        let row = table.insertRow();
        for (var j = 0; j < Math.pow(2, i); j++) {
          var cell = row.insertCell();
          cell.colSpan = Math.pow(2, depth - 1 - i);
          cell.align = "center";
          switch (activeTab) {
            case "tree":
              cell.appendChild(newTreeCell(i, j));
              break;
            case "shrub":
              cell.appendChild(newShrubCell(i, j));
              if (i < depth - 1) {
                document.getElementById(
                  "node_btn" + i + j
                ).onchange = createUIBFunction(i, j);
                document.getElementById(
                  "node_btn" + i + j
                ).onclick = createDLIFunction(i, j);
                document.getElementById(
                  "leaf_btn" + i + j
                ).onchange = createUIBFunction(i, j);
                document.getElementById(
                  "leaf_btn" + i + j
                ).onclick = createELIFunction(i, j);
              }
              break;
          }
        }
      }
  }

  /**
 * Creates and returns a div element with id "cellij".
 * The div contains a Leaf input element.
 * The div also contains radio button toggles and a Branch option if the cell
 * is not on the last row.
 * @param i The 0-indexed row of the cell
 * @param j The 0-indexed column of the cell
 */
function newRoseCell(indexList) {
    // create div container
    var div = document.createElement("div");
    div.id = "cell" + indexList.join("");
    div.classList.add("left-inner");
    div.classList.add("rose-div");
    div.align = "left";
    colorCell(div, "base");

    div.innerHTML += "Rose: ";
    var roseValue = document.createElement("input");
    roseValue.type = "text";
    roseValue.size = "5";

    roseValue.id = "rose_value" + indexList.join('');
    roseValue.placeholder = "value";
    div.appendChild(roseValue);

    div.innerHTML += "<br/>";

    var listLengthValue = document.createElement("input");
    listLengthValue.type = "number";
    listLengthValue.size = "3";
    listLengthValue.min = "0";
    listLengthValue.max = "5";
    listLengthValue.id = "rose_list_length" + indexList.join('');
    listLengthValue.placeholder = "0";
    listLengthValue.onchange = createGRCCFunction(indexList);

    div.appendChild(listLengthValue);
    div.innerHTML += " children";

    return div;
  }

  function generateRoseTable() {
    if (activeTab === "rose") {
      console.log("generateInputTable for rose");
      let row = table.insertRow();
      let cell = row.insertCell();
      cell.colSpan = 1;
      cell.align = "center";
      cell.appendChild(newRoseCell([0]));
    }
  }