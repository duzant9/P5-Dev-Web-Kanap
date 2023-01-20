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

const postUrl = host + "api/products/order";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", function(event) {
  event.preventDefault();
  if (!validateFirstName(prenom.value)) {
      firstNameErrorMsg.style.display = "block";
      firstNameErrorMsg.innerHTML = "Veuillez saisir un prénom valide.";
  } else if (!validateLastName(nom.value)) {
      lastNameErrorMsg.style.display = "block";
      lastNameErrorMsg.innerHTML = "Veuillez saisir un nom valide.";
  } else if (!validateAddress(adresse.value)) {
      addressErrorMsg.style.display = "block";
      addressErrorMsg.innerHTML = "Veuillez saisir une adresse valide.";
  } else if (!validateCity(ville.value)) {
      cityErrorMsg.style.display = "block";
      cityErrorMsg.innerHTML = "Veuillez saisir une ville valide.";
  } else if (!validateEmail(email.value)) {
      emailErrorMsg.style.display = "block";
      emailErrorMsg.innerHTML = "Veuillez saisir un email valide.";
  } else {
      // Hide all error messages
      firstNameErrorMsg.style.display = "none";
      firstNameErrorMsg.innerHTML = "";
      lastNameErrorMsg.style.display = "none";
      addressErrorMsg.style.display = "none";
      cityErrorMsg.style.display = "none";
      emailErrorMsg.style.display = "none";

      // Prepare the form data
      const formData = new FormData();
      formData.append("firstName", prenom.value);
      formData.append("lastName", nom.value);
      formData.append("address", adresse.value);
      formData.append("city", ville.value);
      formData.append("email", email.value);

      // Send the form data to the server
      fetch(postUrl, {
          method: "POST",
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log("Success:", data);
      })
      .catch(error => {
          console.error("Error:", error);
      });
  }
});



function makeJsonData() {
  // Create a contact object.
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: email.value
  };

  // Get the items from the cart
  let items = getCart();
  let products = [];

  // Add the unique items to the products array.
  for (i = 0; i < items.length; i++) {
      if (products.find((e) => e == items[i][0])) {
        console.log("not found");
      } else {
        products.push(items[i][0]);
      }
    }
    // Create the jsonData object.
    let jsonData = JSON.stringify({ contact, products });
    console.log(jsonData);
    return jsonData;
  };

  const orderId = document.getElementById("order");

  function validateOrderId(orderId) {
     // Define a regex or any other method to validate the order id
     const orderIdRegex = /^[0-9]{16}$/;

     if (!orderIdRegex.test(orderId) || orderId.trim().length === 0) {
         return false;
     }
     return true;
 }
 // Create the new element
const orderIdErrorMsg = document.createElement("div");

// Set the id and content of the element
orderIdErrorMsg.id = "orderIdErrorMsg";
orderIdErrorMsg.innerHTML = "Une erreur est survenue, merci de revenir plus tard.";

// Append the element to a parent element on the page
const parentElement = document.getElementById("limitedWidthBlock");
parentElement.appendChild(orderIdErrorMsg);

  // Order button event listener
orderButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Validate first name
    // ...
    // Validate last name
    // ...
    // Validate address
    // ...
    // Validate city
    // ...
    // Validate email
    // ...
    if (!validateOrderId(orderId.value)) {
      orderIdErrorMsg.style.display = "block";
      orderIdErrorMsg.innerHTML = "Une erreur est survenue, merci de revenir plus tard.";
    } else {
      orderIdErrorMsg.style.display = "none";
      orderIdErrorMsg.innerHTML = "";
    }
  });