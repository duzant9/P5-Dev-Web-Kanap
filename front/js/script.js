// Fetching data from backend, displaying kanaps on front page
let cardsFetch = function () {
  fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())
    .then((products) => {
      console.log(products);

      let productList = document.getElementById("items");

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
        productList.innerHTML += productCard;
      }
    });
  };
  cardsFetch();
