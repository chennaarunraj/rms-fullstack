
protectDashboard();
// -------------------- GLOBAL STATE --------------------
let cart = [];
let menuItems = [];

// -------------------- SOCKET.IO --------------------
const socket = io("http://localhost:5000");


function protectDashboard() {
  const isDashboard =
    document.title.includes("Admin Dashboard") ||
    window.location.href.includes("dashboard.html");

  if (isDashboard) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
      window.location.replace("login.html");
    }
  }
}

// Listen for real-time updates
socket.on("new-order", (orders) => {
  renderDashboardFromAPI(orders);
});

// -------------------- LOCAL STORAGE --------------------
function saveCart() {
  localStorage.setItem("orders", JSON.stringify(cart));
}

function loadCart() {
  const data = localStorage.getItem("orders");
  if (data) {
    cart = JSON.parse(data);
  }
}

// -------------------- MENU --------------------
async function fetchMenu() {
  const response = await fetch("http://localhost:5000/api/menu");
  menuItems = await response.json();
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = "";

  menuItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <h2 class="font-semibold text-xl">${item.name}</h2>
      <p class="text-gray-500">₹${item.price}</p>
      <button
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onclick="addToCart(${item.id})">
        Add to Order
      </button>
    `;

    container.appendChild(card);
  });
}

function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  cart.push(item);
  saveCart();
  alert(`${item.name} added to order`);
}

// -------------------- PLACE ORDER --------------------
async function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderPayload = {
    items: cart,
    status: "Placed",
    createdAt: new Date().toISOString()
  };

  await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderPayload)
  });

  cart = [];
  saveCart();
  alert("Order placed successfully!");
}

// -------------------- DASHBOARD --------------------
async function fetchOrders() {
  const response = await fetch("http://localhost:5000/api/orders");
  const orders = await response.json();
  renderDashboardFromAPI(orders);
}

function renderDashboardFromAPI(orders) {
  const table = document.getElementById("orderTable");
  if (!table) return;

  table.innerHTML = "";

  orders.forEach((order, index) => {
    order.items.forEach(item => {
      const row = document.createElement("tr");
      row.className = "text-center border-t";

      row.innerHTML = `
        <td class="p-3">${index + 1}</td>
        <td class="p-3">${item.name}</td>
        <td class="p-3 text-green-600">${order.status}</td>
      `;

      table.appendChild(row);
    });
  });
}

function login() {
  const username = document.getElementById("username")?.value;
  const password = document.getElementById("password")?.value;
  const error = document.getElementById("error");

  if (username === "admin" && password === "admin123") {
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    error.innerText = "Invalid credentials";
  }
}



// -------------------- INIT --------------------
protectDashboard();
loadCart();
fetchMenu();
fetchOrders();
