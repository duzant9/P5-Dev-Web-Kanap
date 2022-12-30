//
const string = window.location;
const url = new URL(string);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;


// Fetching products from backend
let cardsFetch = function () {
  fetch(objectURL) 
    .then((response) => response.json())
    .then((product) => {
    console.log(product);

    //Constructing DOM
    // get product image
    let img = document.querySelector(".item__img");
    img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    // get product name
    let name = document.getElementById("title");
    name.innerHTML = product.name;
    // get product title
    let title = document.querySelector("title");
    title.innerHTML = product.name;
    // get product price
    let price = document.getElementById("price");
    price.innerHTML = `${product.price}`;
    // get product description
    let description = document.getElementById("description");
    description.innerHTML = product.description;
    // get product colors
    let color = document.getElementById("colors");
    for (i = 0; i < product.colors.length; i++) {
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  });
};
cardsFetch();

//Getting HTML values from HTML
// Function that gets quantity value of the form in the markup
function quantityValue() {
  let quantity = document.getElementById("quantity");
  return quantity.value;
}
// Function that get the kanap color value in the markup
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// HTML element : button add to cart
const addToCartBtn = document.getElementById("addToCart");

// To cart Button, function addCart that activates the 2 other function by click
addToCartBtn.addEventListener("click", () => {
  let quantity = parseInt(quantityValue());
  let color = colorValue();
  addToCart(id, color, quantity);
/*if (color == "" || quantity === 0) {
  if (color == "") {
    console.log("Choisissez une couleur !");
    let alertMessage = document.querySelector("article div.item__content__addButton");
  const alert = `
  <div class="alert" id="colorNotValide">Choisissez une couleur !</div>
  `;
  alertMessage.innerHTML += alert;
  // Vérifier si la quantité est valide
  } if (quantity === 0) {
    console.log("Choissisez la quantité !");
    let alertMessage = document.querySelector("article div.item__content__addButton");
    const alert = `
    <div class="alert" id="quantityNotValide">Choisissez la quantité !</div>
    `;
    alertMessage.innerHTML += alert;
  //
  } else if ((color !== "") && (quantity !== 0)) {
    console.log("Panier validez !");
    let alertMessage = document.querySelector("article div.item__content__addButton");
    const alert = `
    <div class="alert" id="Validated">Panier validez !</div>
    `;
    alertMessage.innerHTML += alert;
  }
}
});

// Remove the alert message element when the "Add to Cart" button is clicked
const removeAlertMessageButton = document.querySelector("button");
removeAlertMessageButton.addEventListener("click", () => {
  // Get the alert message element
  const alertMessage = document.getElementsByClassName("alert");
  // Check if the alert message element exists
  if (alertMessage) {
    // Get the parent element of the alert message element
    const parentElement = alertMessage.parentNode;
    // Check if the parent element exists
    if (parentElement) {
      // Remove the alert message element from the page
      parentElement.removeChild(alertMessage);
    }
  }*/
});