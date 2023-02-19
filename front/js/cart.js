///////////////////////////////////////
// Cart Products //
///////////////////////////////////////

// Declaring server side URLs as objects.
const host = "http://localhost:3000/";
const productsUrl = host + "api/products/";

// HTML cart elements.
const cartItems = document.getElementById("cart__items");
const cartPrice = document.querySelector(".cart__price");
const cartOrder = document.querySelector(".cart__order");

// Get the current cart from local storage.
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
// Declaring cart for functions 
let cart = getCart();
// Add an item to the cart.
// If the item is already in the cart, updates the quantity.
// If the item is not in the cart, adds it with the specified quantity.
function addToCart(id, color, quantity) {
    // Return if the quantity is invalid or the color is not specified.
    if (quantity <= 0 || color === "");

    // Get the current cart items.
    let cart = getCart();
    let item = { id, color, quantity };
    let itemIndex = cart.findIndex(i => i.id === id && i.color === color);

    if (itemIndex === -1) {
        cart.push(item);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
}
    
// Change items quantity in car and also local storage.
function changeQuantity(id, color, newQuantity) {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
      if (id === cart[i][0] && color === cart[i][1]) {
        cart[i][2] = newQuantity;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    fetchAndDisplayProducts();
}

// Delete items in cart and in local storage.
function deleteItem(id, color) {
    let cart = getCart();
  
    for (let i = 0; i < cart.length; i++) {
      if (id === cart[i][0] && color === cart[i][1]) {
        cart.splice(i, 1);
        break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
    //fetchAndDisplayProducts();
}

// Fetching products and displaying them on page.
async function fetchAndDisplayProducts() {
    let cart = getCart();
    let totalPrice = 0;
    let totalQuantity = 0;
    cartItems.innerHTML = "";
    
    if (localStorage.getItem("cart") !== null) {
    for (let i = 0; i < cart.length; i++) {
    let id = cart[i][0];
    let color = cart[i][1];
    let singleProductUrl = productsUrl + id;

    await fetch(singleProductUrl)
        .then((response) => response.json())
        .then((product) => {
        cartItems.innerHTML += 
            `<article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${color}</p>
                        <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value, event)" min="1" max="100" value="${cart[i][2]}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;

        // Calculate and display total price.
        totalPrice += product.price * cart[i][2];
        displayTotalPrice(totalPrice);
        // Calculate and display total quantity.
        totalQuantity += parseInt(cart[i][2]);
        displayTotalQuantity(totalQuantity);
    
    })
    }
    } else {
        cartOrder[0].innerHTML = "";
        cartPrice[0].innerHTML = "";
    }
}

// Display total price function.
function displayTotalPrice(totalPrice) {
    document.getElementById("totalPrice").innerHTML = totalPrice;
}
  // Displaytotal quantity function.
function displayTotalQuantity(totalQuantity) {
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}
fetchAndDisplayProducts();


///////////////////////////////////////
// Cart Form//
///////////////////////////////////////

// Declare variable for form action url
const postUrl = host + "api/products/order";
const form = document.querySelector("form");
const orderButton = document.getElementById("order");

// If cart is empty do not allow submission.
function checkCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
        alert('Your cart is empty!');
        return false;
    }
    return true;
}

// Values for form variables
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

// First name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(prenom) || prenom.trim().length === 0) {
        return false;
    }
    return true;
}
// Last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
    const lastNameRegex = /^[a-zA-Z]+$/;
    if (!lastNameRegex.test(nom) || nom.trim().length === 0) {
        return false;
    }
    return true;
}
// Address
const addressErrorMsg = document.getElementById("addressErrorMsg");
function validateAddress(adresse) {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    if (!addressRegex.test(adresse) || adresse.trim().length === 0) {
        return false;
    }
    return true;
}
// City
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
    const cityRegex = /^[a-zA-Z\s]*$/;
    if (!cityRegex.test(ville) || ville.trim().length === 0) {
        return false;
    }
    return true;
}
// Email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email) || email.trim().length === 0) {
        return false;
    }
    return true;
}

prenom.addEventListener("input", function() {
    if (!validateFirstName(prenom.value)) {
        firstNameErrorMsg.style.display = "block";
        firstNameErrorMsg.innerHTML = "Veuillez saisir un prénom valide.";
    } else {
        firstNameErrorMsg.style.display = "none";
        firstNameErrorMsg.innerHTML = "";
    }
});
nom.addEventListener("input", function() {
    if (!validateLastName(nom.value)) {
        lastNameErrorMsg.style.display = "block";
        lastNameErrorMsg.innerHTML = "Veuillez saisir un nom valide.";
    } else {
        lastNameErrorMsg.style.display = "none";
        lastNameErrorMsg.innerHTML = "";
    }
});
adresse.addEventListener("input", function() {
    if (!validateAddress(adresse.value)) {
        addressErrorMsg.style.display = "block";
        addressErrorMsg.innerHTML = "Veuillez saisir une adresse valide.";
    } else {
        addressErrorMsg.style.display = "none";
        addressErrorMsg.innerHTML = "";
    }
});
ville.addEventListener("input", function() {
    if (!validateCity(ville.value)) {
        cityErrorMsg.style.display = "block";
        cityErrorMsg.innerHTML = "Veuillez saisir une ville valide.";
    } else {
        cityErrorMsg.style.display = "none";
        cityErrorMsg.innerHTML = "";
    }
});
email.addEventListener("input", function() {
    if (!validateEmail(email.value)) {
        emailErrorMsg.style.display = "block";
        emailErrorMsg.innerHTML = "Veuillez saisir une adresse email valide.";
    } else {
        emailErrorMsg.style.display = "none";
        emailErrorMsg.innerHTML = "";
    }
});

// Retreive contact info entered in form and products for cart on submit form.
async function postRequestOrder() {
    let contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
    };
    let products = cart.map(item => item[0]);
    let postData = {contact, products};
    ;

    fetch("http://localhost:3000/api/products/order/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postData)
    }) 
    .then((response) => response.json())
    .then((postData) => {
        const orderId = postData.orderId;
        localStorage.clear();
        window.location.href = `confirmation.html?confirmationId=${orderId}`;
    })
    .catch(error => console.log(error));
}

orderButton.addEventListener("click", async event => {
    event.preventDefault();
    if (!cart || cart.length === 0) {
        alert('Your cart is empty!');
        return false;
    }
    //return true;
    
    // Perform additional logic or send data to the server.
    if (validateFirstName(prenom.value) &&
    validateLastName(nom.value) &&
    validateAddress(adresse.value) &&
    validateCity(ville.value) &&
    validateEmail(email.value)) {
      await postRequestOrder();
      console.log(orderId);
    } else {
      alert("Vérifier les informations de votre formulaire")
    }

});