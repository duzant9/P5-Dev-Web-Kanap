// Declaring server side URLs.
const host = "http://localhost:3000/";
const allProductsUrl = host + "api/products/";

// Fetching data from backend, displaying kanaps on home page.
let allProductsCardsFetch = function () {
  fetch(allProductsUrl)
    .then((response) => response.json())
    .then((products) => {
      console.log(products);

      let allProductsCards = document.getElementById("items");

      for (i = 0; i < products.length; i++) {
        const productCard = `
          <a href="./product.html?id=${products[i]._id}">
            <article>
              <img
                src="${products[i].imageUrl}"
                alt="${products[i].altTxt}"
              />
              <h3 class="productName">${products[i].name}</h3>
              <p class="productDescription">
                ${products[i].description}
              </p>
            </article>
          </a>
        `;
        allProductsCards.innerHTML += productCard;
      }
    });
  };
  allProductsCardsFetch();
