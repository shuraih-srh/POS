let productDetails = [];
let eachProduct = [];

document.addEventListener("DOMContentLoaded", function () {
  let pName = document.getElementById("p-name");
  let pQty = document.getElementById("p-qty");
  let pPrice = document.getElementById("p-price");
  let dateOutput = document.getElementById("date-time");
  let DataInputFields = document.getElementsByClassName(
    "product-data-input-fields"
  );
  const outputTable = document.getElementById("output-table");
  const tablePlaceholderRow = document.getElementById("table-placeHolder-row");

  function displayProductDetails() {
    let data = productDetails.at(-1);
    tablePlaceholderRow.remove();
    const tRow = document.createElement("tr");
    tRow.innerHTML = `
      <td>${productDetails.indexOf(data) + 1}</td>
      <td>${data[0]}</td>
      <td>${data[1]}</td>
      <td>${data[2]}</td>
      <td>${data[3]}</td>
    `;
    outputTable.appendChild(tRow);
  }

  pName.focus();

  function enterButtonAction(event, element, list) {
    const firstField = pName;
    const activeField = element.parentElement;
    const nextElement = activeField.nextElementSibling;
    if (event.key === "Enter") {
      list.push(element.value.trim());
      if (nextElement) {
        nextElement.lastElementChild.focus();
      } else {
        productDetails.push([...list, (list[1] * list[2])]);
        list.length = 0;
        Array.from(DataInputFields).forEach((inputField) => {
          inputField.value = "";
        });
        firstField.focus();
        displayProductDetails();
      }
    }
  }

  pName.addEventListener("keydown", function (e) {
    enterButtonAction(e, this, eachProduct);
  });

  pQty.addEventListener("keydown", function (e) {
    enterButtonAction(e, this, eachProduct);
  });

  pPrice.addEventListener("keydown", function (e) {
    enterButtonAction(e, this, eachProduct);
  });

  //  Displaying Date & Time
  function displayDateTime() {
    let dateTime = new Date().toLocaleString().split(",");
    dateOutput.innerHTML = `
    <div>
      <p>Date: &nbsp;${dateTime[0]}</p>
      <p>Time:&nbsp;${dateTime[1]}</p>
    </div>
    `;
  }
  displayDateTime();
  setInterval(displayDateTime, 1000);
});
