async function fetchProducts() {
  const path = "/data/products.json";

  const response = await fetch(path);
  const data = await response.json();

  return data;
}

async function fetchTopSellers() {
  const path = "/data/topSellers.json";

  const response = await fetch(path);
  const data = await response.json();

  console.log("TOP SELLERS DATA", data);

  return data;
}
// Render in all Products using data from JSON file

function renderTopSellers(bestSellersList) {
  // If the page doesn't have the element, exit the function
  const el = document.getElementById("topTitle1");
  if (!el) return;

  // Titles
  document.getElementById("topTitle1").textContent =
    bestSellersList.products[0].title;
  document.getElementById("topTitle2").textContent =
    bestSellersList.products[1].title;
  document.getElementById("topTitle3").textContent =
    bestSellersList.products[2].title;

  // Prices
  document.getElementById("topPrice1").textContent =
    `€` + bestSellersList.products[0].price;
  document.getElementById("topPrice2").textContent =
    `€` + bestSellersList.products[1].price;
  document.getElementById("topPrice3").textContent =
    `€` + bestSellersList.products[2].price;

  // Images
  document.getElementById("topImage1").src = bestSellersList.products[0].image;
  document.getElementById("topImage2").src = bestSellersList.products[1].image;
  document.getElementById("topImage3").src = bestSellersList.products[2].image;

  //Genres
  document.getElementById("topGenre1").textContent =
    bestSellersList.products[0].genre;
  document.getElementById("topGenre2").textContent =
    bestSellersList.products[1].genre;
  document.getElementById("topGenre3").textContent =
    bestSellersList.products[2].genre;

  // Descriptions
  document.getElementById("topDescription1").textContent =
    bestSellersList.products[0].description;
  document.getElementById("topDescription2").textContent =
    bestSellersList.products[1].description;
  document.getElementById("topDescription3").textContent =
    bestSellersList.products[2].description;
}

function renderProducts(productsList) {
  // If the page doesn't have the element, exit the function
  const el = document.getElementById("title1");
  if (!el) return;

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
    `€` + productsList.products[0].price;
  document.getElementById("price2").textContent =
    `€` + productsList.products[1].price;
  document.getElementById("price3").textContent =
    `€` + productsList.products[2].price;
  document.getElementById("price4").textContent =
    `€` + productsList.products[3].price;
  document.getElementById("price5").textContent =
    `€` + productsList.products[4].price;
  document.getElementById("price6").textContent =
    `€` + productsList.products[5].price;

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

  // Images
  document.getElementById("image1").src = productsList.products[0].image;
  document.getElementById("image2").src = productsList.products[1].image;
  document.getElementById("image3").src = productsList.products[2].image;
  document.getElementById("image4").src = productsList.products[3].image;
  document.getElementById("image5").src = productsList.products[4].image;
  document.getElementById("image6").src = productsList.products[5].image;

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
  const topSellers = await fetchTopSellers();
  renderProducts(products);
  renderTopSellers(topSellers);
};
