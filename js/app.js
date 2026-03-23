// ============================================================
//  app.js — Store logic (search, filter, sort, cart)
//  No need to edit this file. Edit products.js instead.
// ============================================================

/* ---- State ---- */
let activeCategory = "All";
let searchQuery    = "";
let sortMode       = "default";

/* ---- Cart (persisted in localStorage) ---- */
function getCart() {
  try { return JSON.parse(localStorage.getItem("store_cart") || "[]"); }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("store_cart", JSON.stringify(cart));
}
function addToCart(id) {
  const cart = getCart();
  if (cart.includes(id)) return;
  cart.push(id);
  saveCart(cart);
  updateCartCount();
  renderGrid();
  showToast("Added to cart!");
}
function removeFromCart(id) {
  const cart = getCart().filter(i => i !== id);
  saveCart(cart);
  updateCartCount();
  if (document.getElementById("cartItemsList")) renderCartPage();
  else renderGrid();
  showToast("Removed from cart.");
}
function clearCart() {
  if (!confirm("Clear your entire cart?")) return;
  saveCart([]);
  updateCartCount();
  if (document.getElementById("cartItemsList")) renderCartPage();
  else renderGrid();
}
function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = count;
    el.style.display = count === 0 ? "none" : "inline-block";
  });
}

/* ---- Toast ---- */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---- Apply store settings ---- */
function applySettings() {
  const s = STORE;
  // Logo & title
  document.querySelectorAll("#store-logo").forEach(el => {
    el.innerHTML = `${s.name.split(" ")[0]} <span>${s.name.split(" ").slice(1).join(" ") || "Store"}</span>`;
  });
  document.querySelectorAll("#hero-title").forEach(el => el.textContent = `Welcome to ${s.name}`);
  document.querySelectorAll("#hero-tagline").forEach(el => el.textContent = s.tagline);
  document.querySelectorAll("#footer-text").forEach(el => el.textContent = `© ${new Date().getFullYear()} ${s.name}. All rights reserved.`);
  const titleEl = document.getElementById("page-title");
  if (titleEl) titleEl.textContent = s.name;
}

/* ---- Categories ---- */
function getCategories() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))].sort();
  return ["All", ...cats];
}
function renderFilterTabs() {
  const el = document.getElementById("filterTabs");
  if (!el) return;
  el.innerHTML = getCategories().map(cat =>
    `<button class="filter-tab ${cat === activeCategory ? "active" : ""}"
      onclick="setCategory('${cat}')">${cat}</button>`
  ).join("");
}
function setCategory(cat) {
  activeCategory = cat;
  renderFilterTabs();
  renderGrid();
}

/* ---- Filtering & sorting ---- */
function getFiltered() {
  const q = searchQuery.toLowerCase().trim();
  let items = PRODUCTS.filter(p => {
    const matchCat  = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (sortMode === "price-asc")  items = [...items].sort((a, b) => a.price - b.price);
  if (sortMode === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sortMode === "name-asc")   items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

/* ---- Render product grid (index.html) ---- */
function renderGrid() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const items = getFiltered();
  const cart  = getCart();

  const countEl = document.getElementById("resultsCount");
  if (countEl) {
    const total = PRODUCTS.length;
    countEl.textContent = items.length === total
      ? `${total} item${total !== 1 ? "s" : ""}`
      : `${items.length} of ${total} items`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3>No products found</h3>
        <p>Try a different search term or category.</p>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(p => {
    const inCart = cart.includes(p.id);
    const imgSrc = p.image || "https://via.placeholder.com/600x450?text=No+Image";

    let actions;
    if (p.sold) {
      actions = `<span class="btn-sold">Sold</span>`;
    } else {
      const cartBtn = inCart
        ? `<button class="btn-add in-cart" disabled>En Carrito ✓</button>`
        : `<button class="btn-add" onclick="addToCart(${p.id})">+ Carrito</button>`;
      actions = `
        <div class="card-actions">
          <button class="btn-buy" onclick="openBuyModal(${p.id})">Comprar</button>
          ${cartBtn}
        </div>`;
    }

    return `
      <div class="card ${p.sold ? "sold-card" : ""}">
        <div class="card-img-wrap">
          <img src="${imgSrc}" alt="${escHtml(p.name)}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x450?text=No+Image'" />
          <span class="condition-tag">${escHtml(p.condition)}</span>
          ${p.sold ? '<div class="sold-badge">SOLD</div>' : ""}
        </div>
        <div class="card-body">
          <span class="card-category">${escHtml(p.category)}</span>
          <h2 class="card-name">${escHtml(p.name)}</h2>
          <p class="card-desc">${escHtml(p.description)}</p>
        </div>
        <div class="card-footer">
          <span class="card-price ${p.sold ? "sold-price" : ""}">$${p.price.toLocaleString()}</span>
          ${actions}
        </div>
      </div>`;
  }).join("");
}

/* ---- Render cart page (cart.html) ---- */
function renderCartPage() {
  const listEl  = document.getElementById("cartItemsList");
  const rowsEl  = document.getElementById("summaryRows");
  const totalEl = document.getElementById("summaryTotal");
  if (!listEl) return;

  const cartIds = getCart();
  const cartItems = cartIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  // Contact info
  document.querySelectorAll("#contactEmail").forEach(el => el.textContent = STORE.contactEmail);
  document.querySelectorAll("#contactPhone").forEach(el => {
    const waNumber = STORE.contactPhone.replace(/\D/g, "");
    const waMsg = encodeURIComponent("Hola! Me interesa un artículo de tu tienda.");
    el.innerHTML = `<a href="https://wa.me/${waNumber}?text=${waMsg}" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600;display:inline-flex;align-items:center;gap:4px"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="14" height="14" style="vertical-align:middle" alt="WhatsApp" /> ${escHtml(STORE.contactPhone)}</a>`;
  });
  document.querySelectorAll("#contactLocation").forEach(el => el.textContent = STORE.location);
  document.querySelectorAll("#shippingNote").forEach(el => el.textContent = STORE.shippingNote);
  const tagsEl = document.getElementById("paymentTags");
  if (tagsEl) tagsEl.innerHTML = STORE.paymentMethods.map(m =>
    `<span class="payment-tag">${m}</span>`).join("");

  if (cartItems.length === 0) {
    listEl.innerHTML = `
      <div class="empty-cart">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto .75rem;opacity:.3">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h3>Your cart is empty</h3>
        <p><a href="index.html" style="color:var(--brand)">Browse products →</a></p>
      </div>`;
    if (rowsEl) rowsEl.innerHTML = "";
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  listEl.innerHTML = cartItems.map(p => `
    <div class="cart-item">
      <img src="${p.image || ''}" alt="${escHtml(p.name)}" onerror="this.src='https://via.placeholder.com/80?text=?'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(p.name)}</div>
        <div class="cart-item-cond">${escHtml(p.condition)} · ${escHtml(p.category)}</div>
      </div>
      <span class="cart-item-price">$${p.price.toLocaleString()}</span>
      <button class="btn-buy" style="font-size:.8rem;padding:.35rem .7rem" onclick="openBuyModal(${p.id})">Comprar</button>
      <button class="btn-remove" onclick="removeFromCart(${p.id})" title="Remove">✕</button>
    </div>`).join("");

  if (rowsEl) rowsEl.innerHTML = cartItems.map(p =>
    `<div class="summary-row"><span>${escHtml(p.name)}</span><span>$${p.price.toLocaleString()}</span></div>`
  ).join("");

  const total = cartItems.reduce((s, p) => s + p.price, 0);
  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

/* ---- Buy Now Modal ---- */
const PAYMENT_ICONS = {
  "Sinpe":                 { code: "sinpe",    label: "SINPE",  icon: "💳" },
  "Transferencia":         { code: "transfer", label: "Trans.", icon: "🏦" },
  "Pago Contra Entrega":  { code: "delivery", label: "COD",   icon: "🚚" },
};

function openBuyModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;

  document.getElementById("modalImg").src   = p.image || "";
  document.getElementById("modalImg").alt   = p.name;
  document.getElementById("modalCat").textContent   = p.category;
  document.getElementById("modalName").textContent  = p.name;
  document.getElementById("modalPrice").textContent = `$${p.price.toLocaleString()}`;

  // Payment options
  document.getElementById("modalPayments").innerHTML = STORE.paymentMethods.map(m => {
    const cfg = PAYMENT_ICONS[m] || { code: "default", label: m.slice(0,4), icon: "💰" };
    return `
      <div class="payment-option">
        <span class="pay-icon ${cfg.code}">${cfg.icon}</span>
        <span>${escHtml(m)}</span>
      </div>`;
  }).join("");

  // Contact — WhatsApp link from phone number
  const waNumber = STORE.contactPhone.replace(/\D/g, "");
  const waMsg = encodeURIComponent(`Hola! Me interesa comprar: ${p.name} ($${p.price})`);
  const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;

  document.getElementById("modalContact").innerHTML = `
    <p><span class="label">Contacto:</span>
      <a href="mailto:${escHtml(STORE.contactEmail)}">${escHtml(STORE.contactEmail)}</a></p>
    <p><span class="label">Teléfono:</span>
      <a href="${waLink}" target="_blank" rel="noopener">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="14" height="14" style="vertical-align:middle;margin-right:4px" alt="WhatsApp" />
        ${escHtml(STORE.contactPhone)}
      </a></p>
    <p><span class="label">Ubicación:</span> ${escHtml(STORE.location)}</p>`;

  document.getElementById("modalShipping").textContent = STORE.shippingNote;

  document.getElementById("buyModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBuyModalDirect() {
  document.getElementById("buyModal").classList.remove("open");
  document.body.style.overflow = "";
}

function closeBuyModal(e) {
  if (e.target === document.getElementById("buyModal")) closeBuyModalDirect();
}

// Close on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeBuyModalDirect();
});

/* ---- Utility ---- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---- Event listeners ---- */
document.addEventListener("DOMContentLoaded", () => {
  applySettings();
  updateCartCount();

  // Index page
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    renderFilterTabs();
    renderGrid();
    searchInput.addEventListener("input", e => {
      searchQuery = e.target.value;
      renderGrid();
    });
  }

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      sortMode = e.target.value;
      renderGrid();
    });
  }

  // Cart page
  if (document.getElementById("cartItemsList")) {
    renderCartPage();
  }
});
