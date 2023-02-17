// Declaring server side URLs.
const host = "http://localhost:3000/";
const productsUrl = host + "api/products/";

// Getting id of current URL of the web page.
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search);

let id = null;
if (search_params.has('id')) {
    id = search_params.get('id');
    console.log(id)
}

const singleProductUrl = productsUrl + id;

// Fetching data from backend.
async function fetchProductData() {
    const response = await fetch(singleProductUrl);
    const product = await response.json();
        console.log(product);
        // Get product image
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        //Get product title.
        let title = document.getElementById("title");
        title.innerHTML = product.name;
        // Get product price.
        let price = document.getElementById("price");
        price.innerHTML = `${product.price}`;
        // Get product description.
        let description = document.getElementById("description");
        description.innerHTML = product.description;
        // Get product colors.
        let color = document.getElementById("colors");
        for (i = 0; i < product.colors.length; i++) {
            color.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        }
        return product;
    }

const productData = fetchProductData();

//
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}
//
function quantityValue() {
    let quantity = document.getElementById("quantity");
    return parseInt (quantity.value);
}

function addToCart(id, color, quantity) {
    if (quantity <= 0 || color === "") {
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = [id, color, quantity];
    let exists = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === id && cart[i][1] === color) {
            cart[i][2] += quantity;
            exists = true;
            break;
        } 
    }
    if (!exists && color && quantity) {
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", () => {
    const color = colorValue();
    const quantity = quantityValue();
    //Verify is the color has been chosen.
    if (color === "") {
        alert ("Choisissez une couleur !")
    // Verify if the quantity has been chosen.
    } else if (quantity <= 0) {
        alert ("Choissisez la quantité !")
    // Else product is valide and can be added to cart.
    } else {
        addToCart(id, color, quantity);
        alert ("Vous venez d'ajoutez des produits à votre panier !")
        window.location.href = "cart.html";
    }
});