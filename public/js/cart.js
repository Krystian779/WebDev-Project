// Simple cart with localStorage
function getCart() {
  const raw = localStorage.getItem("cart");
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

async function addToCart(productId) {
  const resp = await fetch("/data/products.json");
  const data = await resp.json();
  const product = data.products.find((p) => p.id == productId);

  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  alert(`${product.title} added to cart`);
}

function showCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html =
    '<table class="table table-striped"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead><tbody>';
  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    html += `<tr>
      <td>${item.title}</td>
      <td>€${item.price}</td>
      <td>${item.qty}</td>
      <td>€${subtotal.toFixed(2)}</td>
    </tr>`;
  });

  html += `</tbody></table>
    <div class="mt-3">
      <h3>Total: €${total.toFixed(2)}</h3>
      <button onclick="checkout()" class="btn btn-success">Purchase</button>
    </div>`;

  container.innerHTML = html;
}

async function checkout() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  try {
    const resp = await fetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total }),
    });
    const result = await resp.json();

    if (result.success) {
      alert("Purchase successful!");
      localStorage.removeItem("cart");
      updateCartDisplay();
      showCart();
    } else {
      alert("Checkout failed.");
    }
  } catch (err) {
    alert("Error during checkout.");
  }
}

// Setup
document.addEventListener("DOMContentLoaded", () => {
  // Add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.onclick = () => addToCart(btn.dataset.id);
  });

  // Show cart if on cart page
  showCart();
  updateCartDisplay();
});
