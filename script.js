let products = [
  {id:1,name:"Rose Perfume",price:20,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:2,name:"Oud Spray",price:25,cat:"body",img:"https://via.placeholder.com/150"},
  {id:3,name:"Fresh Scent",price:18,cat:"scents",img:"https://via.placeholder.com/150"},
  {id:4,name:"Luxury Oud",price:30,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:5,name:"Night Body Mist",price:22,cat:"body",img:"https://via.placeholder.com/150"},
  {id:6,name:"Amber Scent",price:28,cat:"scents",img:"https://via.placeholder.com/150"}
];

/* ===================== CART STATE ===================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===================== PRODUCTS ===================== */
function displayProducts(list){
  let grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  list.forEach(p=>{
    grid.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${p.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

displayProducts(products);

/* ===================== ADD TO CART ===================== */
function addToCart(id){
  let item = products.find(p => p.id === id);

  let existing = cart.find(c => c.id === id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({...item, qty:1});
  }

  saveCart();
  updateCartUI();
  openCart();
}

/* ===================== CART UI ===================== */
function updateCartUI(){
  let container = document.getElementById("cartItems");
  let count = document.getElementById("cartCount");

  container.innerHTML = "";
  let total = 0;
  let qtyTotal = 0;

  cart.forEach((item, index)=>{
    total += item.price * item.qty;
    qtyTotal += item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>

        <div>
          <button onclick="changeQty(${index},-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index},1)">+</button>
        </div>

        <span>$${item.price * item.qty}</span>
      </div>
    `;
  });

  if(count) count.innerText = qtyTotal;
  document.getElementById("cartTotal").innerText = total.toFixed(2);

  saveCart();
}

/* ===================== QUANTITY ===================== */
function changeQty(index, val){
  cart[index].qty += val;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  updateCartUI();
}

/* ===================== STORAGE ===================== */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===================== CART OPEN/CLOSE ===================== */
function openCart(){
  document.getElementById("cartSidebar").style.right = "0";
}

function closeCart(){
  document.getElementById("cartSidebar").style.right = "-350px";
}

/* ===================== PRODUCT PAGE ===================== */
function openProduct(id){
  window.open("product.html?id=" + id, "_blank");
}

/* ===================== SEARCH ===================== */
function searchProducts(){
  let val = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(val)
  );
  displayProducts(filtered);
}

/* ===================== CATEGORY ===================== */
function filterCategory(cat){
  if(cat === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.cat === cat));
}

/* ===================== CHECKOUT (WHATSAPP) ===================== */
function submitOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  let items = cart.map(c => `${c.name} x${c.qty}`).join(", ");

  let msg = `Order from ${name}%0APhone: ${phone}%0AAddress: ${address}%0AItems: ${items}`;

  window.open(`https://wa.me/923444318078?text=${msg}`, "_blank");

  cart = [];
  saveCart();
  updateCartUI();

  closeCheckout();
}

/* ===================== INIT ===================== */
updateCartUI();
