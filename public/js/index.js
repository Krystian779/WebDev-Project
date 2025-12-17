async function fetchProducts() {
  const path = "products.json";

  const response = await fetch(path);
  const data = await response.json();

  return data;
}
// Render in all Products using data from JSON file
function renderProducts(productsList) {
  // Titles
  document.getElementById("title1").textContent =
    productsList.products[0].title;
  document.getElementById("title2").textContent =
    productsList.products[1].title;
  document.getElementById("title3").textContent =
    productsList.products[2].title;
  document.getElementById("title4").textContent =
    productsList.products[3].title;
  document.getElementById("title5").textContent =
    productsList.products[4].title;
  document.getElementById("title6").textContent =
    productsList.products[5].title;

  // Genres
  document.getElementById("genre1").textContent =
    productsList.products[0].genre;
  document.getElementById("genre2").textContent =
    productsList.products[1].genre;
  document.getElementById("genre3").textContent =
    productsList.products[2].genre;
  document.getElementById("genre4").textContent =
    productsList.products[3].genre;
  document.getElementById("genre5").textContent =
    productsList.products[4].genre;
  document.getElementById("genre6").textContent =
    productsList.products[5].genre;

  // Prices
  document.getElementById("price1").textContent =
    productsList.products[0].price;
  document.getElementById("price2").textContent =
    productsList.products[1].price;
  document.getElementById("price3").textContent =
    productsList.products[2].price;
  document.getElementById("price4").textContent =
    productsList.products[3].price;
  document.getElementById("price5").textContent =
    productsList.products[4].price;
  document.getElementById("price6").textContent =
    productsList.products[5].price;

  // Descriptions
  document.getElementById("description1").textContent =
    productsList.products[0].description;
  document.getElementById("description2").textContent =
    productsList.products[1].description;
  document.getElementById("description3").textContent =
    productsList.products[2].description;
  document.getElementById("description4").textContent =
    productsList.products[3].description;
  document.getElementById("description5").textContent =
    productsList.products[4].description;
  document.getElementById("description6").textContent =
    productsList.products[5].description;

  /*
  productList.forEach((product) => {
    const image = "images/images/gangsInAmerica.jpg";
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img style = "height: 100%"src ="${product.image}">
        <h3>${product.title}</h3>
        <p><strong>Genre:<strong> ${product.genre}</p>
        <span><strong>Price:<strong> ${product.price}</span>
        <button class="buyNowbtn">Buy Now</button>

        `;
    container.appendChild(card);
  });
  */
}

window.onload = async function () {
  const products = await fetchProducts();
  renderProducts(products);
};
