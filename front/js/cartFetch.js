// Selected HTML cart elements
const cartItems = document.getElementById("cart__items");
const cartPrice = document.querySelector(".cart__price");
const cartOrder = document.querySelector(".cart__order");
const host = "http://localhost:3000/";

// Fetching function gets the data from backend
async function fetchIdData() {
  let items = getCart();
  let quantity = 0;
  let price = 0;
  let itemHTML = "";
  
  if (localStorage.getItem("cart") !== null) {
    // Loop through the items in the cart
    for (let i = 0; i < items.length; i++) {
      let id = items[i][0];
      let color = items[i][1];
      let itemsUrl = host + "api/products/" + id;
      
      let response = await fetch(itemsUrl);
      let products = await response.json();

      itemHTML += `
        <article class="cart__item" data-id="${id}" data-color="${color}">
          <div class="cart__item__img">
            <img src="${products.imageUrl}" alt="${products.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${products.name}</h2>
              <p>${color}</p>
              <p class="cart-item-price">${products.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;

      // total price (if qty (items[i][2]))
      price += products.price * items[i][2];

      // total Quantity
      quantity += parseInt(items[i][2]);
    }

    // Update total price and quantity
    updateTotalPrice(price);
    updateTotalQuantity(quantity);
    
    // Set HTML for cart items
    cartItems.innerHTML = itemHTML;
  } else {
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
}

function updateTotalPrice(price) {
  document.getElementById("totalPrice").innerHTML = price;
}

function updateTotalQuantity(quantity) {
  document.getElementById("totalQuantity").innerHTML = quantity;
}

fetchIdData();