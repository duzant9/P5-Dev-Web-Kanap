// Get cart function gets the cart from localStorage ; used multiple times
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
      items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
  }
  
  // Add to cart function: adds the selected kanap to the localStorage, depending on if it's already here or not in the localStorage
  function addToCart(id, color, quantity) {
    if (quantity <= 0 || color == "") {
      return;
    }
    let items = getCart();
    if (items.length == 0) {
      items = [[id, color, quantity]];
    } else {
      let found = false;
      for (let i = 0; i < items.length; i++) {
        if (id === items[i][0] && color === items[i][1]) {
          found = true;
          items[i][2] += quantity;
        }
      }
      if (found == false) {
        let item = [id, color, quantity];
        items.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }
  
  // Delete item function: deletes a selected entry from the localStorage
  function deleteItem(id, color) {
    let items = getCart();
    for (i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(items));
        window.location.reload();
      }
    }
  }

  // Change quantity function: makes the localStorage quantity reflect whats the user chooses on the HTML page
  function changeQuantity(id, color, quantity) {
    let items = getCart();
    for (let i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items[i][2] = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(items));
      window.location.reload();
    }
  };


// HTML cart elements
const cartItems = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const host = "http://localhost:3000/";
// Fetching function gets the data from backend
function fetchIdData() {
  let items = getCart();
  let quantity = 0;
  let price = 0;
  if (localStorage.getItem("cart") != null) {
    for (let i = 0; i < items.length; i++) {
      let id = items[i][0];
      let color = items[i][1];
      let url = "http://localhost:3000/api/products/" + id;
      fetch(url)
        .then((response) => response.json())
        .then((product) => {
          cartItems.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${color}</p>
                    <p>${product.price} €</p>
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
              </article>`;
          // total price (if qty (items[i][2]))
          price += product.price * items[i][2];
          document.getElementById("totalPrice").innerHTML = price;
          // total Quantity
          quantity += parseInt(items[i][2]);
          document.getElementById("totalQuantity").innerHTML = quantity;
        })
    }
  } else {
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
}
