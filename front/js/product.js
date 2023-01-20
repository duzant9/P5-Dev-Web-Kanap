// Fetch the product ID from the URL.
const string = window.location;
const url = new URL(string);
const id = url.searchParams.get("id");
// Set the host URL for the API.
const host = "http://localhost:3000/";
// Construct the API endpoint for fetching a single product by ID.
const objectURL = host + "api/products/" + id;


// Fetching products from backend
const fetchProduct = () => {
  fetch(objectURL) 
    .then((response) => response.json())
    .then((product) => {

    //Constructing DOM.
    // Set product image.
    let img = document.querySelector(".item__img");
    img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    // Set product name.
    let name = document.getElementById("title");
    name.innerHTML = product.name;
    // Set product title
    let title = document.querySelector("title");
    title.innerHTML = product.name;
    // Set product price
    let price = document.getElementById("price");
    price.innerHTML = `${product.price}`;
    // Set product description
    let description = document.getElementById("description");
    description.innerHTML = product.description;
    // Set product colors
    let color = document.getElementById("colors");
    for (i = 0; i < product.colors.length; i++) {
        color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
  });
};
fetchProduct();

// Functions that gets quantity and color form elements.
function getQuantity() {
  let quantity = document.getElementById("quantity");
  return parseInt(quantity.value);
}
function getColor() {
  let color = document.getElementById("colors");
  return color.value;
}

// Set up an event listener for the "Add to Cart" button.
const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", () => {
  const color = getColor();
  const quantity = getQuantity();
  // Call the add To Cart function with the product ID, selected color, and selected quantity.
  addToCart(id, color, quantity);
  //Verify is the color has been chosen.
  if (color === "") {
    alert ("Choisissez une couleur !")
  // Verify if the quantity has been chosen.
  } else if (quantity <= 0) {
    alert ("Choissisez la quantité !")
  // Else product is valide and can be added to cart.
  } else {
    alert ("Vous venez d'ajoutez des produits à votre panier !")
  }
});