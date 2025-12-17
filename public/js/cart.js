// Cart helper functions - stores cart in localStorage
(function () {
  function getCart() {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((s, item) => s + item.qty, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
  }

  async function fetchProducts() {
    const resp = await fetch("/data/products.json");
    return resp.json();
  }

  async function addToCartById(id) {
    const data = await fetchProducts();
    const product = data.products.find((p) => String(p.id) === String(id));
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }
    saveCart(cart);
    alert(`${product.title} added to cart`);
  }

  // Attach listeners on shop page
  function attachShopListeners() {
    const buttons = document.querySelectorAll(".add-to-cart");
    if (!buttons || buttons.length === 0) return;
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.dataset.id;
        addToCartById(id);
      });
    });
  }

  // Render cart page
  function renderCartPage() {
    const container = document.getElementById("cart-container");
    if (!container) return;
    const cart = getCart();
    container.innerHTML = "";
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");
    let total = 0;
    cart.forEach((item, idx) => {
      const tr = document.createElement("tr");
      const subtotal = item.price * item.qty;
      total += subtotal;
      tr.innerHTML = `
        <td class="align-middle"><img src="${
          item.image
        }" style="height:56px;margin-right:12px;"/> ${item.title}</td>
        <td class="align-middle">€${item.price.toFixed(2)}</td>
        <td class="align-middle"><input type="number" min="1" value="${
          item.qty
        }" data-idx="${idx}" class="cart-qty form-control" style="width:80px;"/></td>
        <td class="align-middle">€${subtotal.toFixed(2)}</td>
        <td class="align-middle"><button data-idx="${idx}" class="btn btn-sm btn-danger remove-item">Remove</button></td>
      `;
      tbody.appendChild(tr);
    });

    const footer = document.createElement("div");
    footer.className = "mt-3";
    footer.innerHTML = `
      <h4>Total: €${total.toFixed(2)}</h4>
      <button id="checkout-btn" class="btn btn-success">Checkout</button>
    `;

    container.appendChild(table);
    container.appendChild(footer);

    // listeners for qty change
    container.querySelectorAll(".cart-qty").forEach((input) => {
      input.addEventListener("change", (e) => {
        const idx = Number(e.target.dataset.idx);
        const val = Number(e.target.value) || 1;
        const current = getCart();
        current[idx].qty = val;
        saveCart(current);
        renderCartPage();
      });
    });

    // remove buttons
    container.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(e.target.dataset.idx);
        const current = getCart();
        current.splice(idx, 1);
        saveCart(current);
        renderCartPage();
      });
    });

    // checkout
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", async () => {
        const order = { items: getCart(), total };
        try {
          const resp = await fetch("/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
          });
          const json = await resp.json();
          if (json && json.success) {
            alert("Purchase successful — thank you!");
            localStorage.removeItem("cart");
            updateCartCount();
            renderCartPage();
            // Here is where i will provide code for the movie purchased.
          } else {
            alert("Checkout failed. Please try again.");
          }
        } catch (err) {
          console.error(err);
          alert("Checkout error. See console.");
        }
      });
    }
  }

  // initialize when DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    attachShopListeners();
    renderCartPage();
  });

  // expose for debugging
  window._cart = { getCart, saveCart, addToCartById };
})();
