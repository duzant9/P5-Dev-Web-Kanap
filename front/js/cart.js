// Get the cart from local storage.
// Returns an empty array if the cart is not found in local storage.
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") !== null) {
      items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
  }
  
// Add an item to the cart.
// If the item is already in the cart, updates the quantity.
// If the item is not in the cart, adds it with the specified quantity.
function addToCart(id, color, quantity) {
  // Return if the quantity is invalid or the color is not specified.
  if (quantity <= 0 || color === "") {
    return;
    //updateCart();
  }

  // Get the current cart items.
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
// Change items quantity in car and also local storage.
function changeQuantity(id, color, newQuantity) {
  let items = getCart();

  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && color === items[i][1]) {
      items[i][2] = newQuantity;
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(items));
  fetchIdData();
}
// Delete items in cart and in local storage.
function deleteItem(id, color) {
  let items = getCart();

  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && color === items[i][1]) {
      items.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cart", JSON.stringify(items));
  //location.reload();
  fetchIdData()
}
