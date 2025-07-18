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
  const totalAmount = document.getElementById("toal-amount");
  const totalQuantity = document.getElementById("toal-quantity");
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
        let subTotal = list[1] * list[2];
        productDetails.push([...list, subTotal]);
        totalAmount.innerText = Number(totalAmount.innerText) + subTotal;
        totalQuantity.innerText = Number(totalQuantity.innerText) + 1;
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
    const date = new Date();
    const padMethod = (n) => n.toString().padStart(2, "0");

    const yyyy = padMethod(date.getFullYear());
    const mm = padMethod(date.getMonth() + 1);
    const dd = padMethod(date.getDate());
    const HH = padMethod(date.getHours());
    const MM = padMethod(date.getMinutes());
    const SS = padMethod(date.getSeconds());

    dateOutput.innerHTML = `
    <div>
      <p>Date: &nbsp;${yyyy}-${mm}-${dd}</p>
      <p>Time:&nbsp; ${HH}:${MM}:${SS}</p>
    </div>
    `;
  }

  displayDateTime();
  setInterval(displayDateTime, 1000);
});
