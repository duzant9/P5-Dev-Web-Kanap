// Declare variable for form action url
const postUrl = host + "api/products/order";

// Values for form variables
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");
const form = document.querySelector("form");

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

const orderButton = document.getElementById("order");
//orderButton.addEventListener("click", function(event) {
  //event.preventDefault();
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
orderButton.addEventListener("click", function(event) {
  event.preventDefault();
  // Perform additional logic or send data to the server.
  if (
      validateFirstName(prenom.value) &&
      validateLastName(nom.value) &&
      validateAddress(adresse.value) &&
      validateCity(ville.value) &&
      validateEmail(email.value)
  ) {
    alert("Votre commande à été validez !");

      // Prepare the form data
      const formData = new FormData;
      formData.append("firstName", prenom.value);
      formData.append("lastName", nom.value);
      formData.append("address", adresse.value);
      formData.append("city", ville.value);
      formData.append("email", email.value);

      const options = {
        method: "POST",
        body: formData
    }
    
    fetch("http://localhost:3000/api/products/order", options)
      .then(response => response.json())
      .then(data => {
        // If the server doesn't return an "orderId" property,
        // you can create one on the client side
        if (!data.hasOwnProperty("orderId")) {
          data.orderId = Math.random().toString(36).substring(2, 15);
        }
        const orderId = data.orderId;
        console.log("Order ID: ", orderId);
        localStorage.setItem("orderID", orderId);
        //Redirect to the confirmation page
        window.location.href = "./confirmation.html?id=" + data.orderId;
        localStorage.clear();
      })
      .catch(error => {
        console.error("Error submitting form", error);
      })}
    })

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
      