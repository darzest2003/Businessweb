let products = [
  {id:1,name:"Rose Perfume",price:20,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:2,name:"Oud Spray",price:25,cat:"body",img:"https://via.placeholder.com/150"},
  {id:3,name:"Fresh Scent",price:18,cat:"scents",img:"https://via.placeholder.com/150"},
  {id:4,name:"Luxury Oud",price:30,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:5,name:"Night Body Mist",price:22,cat:"body",img:"https://via.placeholder.com/150"},
  {id:6,name:"Amber Scent",price:28,cat:"scents",img:"https://via.placeholder.com/150"}
];

/* ================= CART ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE */
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ADD */
function addToCart(id){
  let item = products.find(p => p.id === id);

  let existing = cart.find(c => c.id === id);

  if(existing){
    existing.qty++;
  } else {
    cart.push({...item, qty:1});
  }

  saveCart();
  updateCartUI();
}

/* CART UI */
function updateCartUI(){

  let itemsBox = document.getElementById("cartItems");
  let countBox = document.getElementById("cartCount");
  let totalBox = document.getElementById("cartTotal");

  if(!itemsBox) return;

  itemsBox.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, i)=>{
    total += item.price * item.qty;
    count += item.qty;

    itemsBox.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>

        <div>
          <button onclick="changeQty(${i},-1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>

        <span>$${item.price * item.qty}</span>
      </div>
    `;
  });

  if(countBox) countBox.innerText = count;
  if(totalBox) totalBox.innerText = total.toFixed(2);

  saveCart();
}

/* QTY */
function changeQty(i,val){
  cart[i].qty += val;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  updateCartUI();
}

/* CART OPEN/CLOSE */
function openCart(){
  document.getElementById("cartSidebar").style.right = "0";
}

function closeCart(){
  document.getElementById("cartSidebar").style.right = "-350px";
}

/* PRODUCT PAGE */
function openProduct(id){
  window.location.href = "product.html?id=" + id;
}

/* SEARCH */
function searchProducts(){
  let val = document.getElementById("searchInput").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(val)
  );

  renderProducts(filtered);
}

/* RENDER */
function renderProducts(list){
  let grid = document.getElementById("productContainer");

  grid.innerHTML = "";

  list.forEach(p=>{
    grid.innerHTML += `
      <div class="product-card" onclick="openProduct(${p.id})">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${p.id})">
          Add To Cart
        </button>
      </div>
    `;
  });
}

/* INIT */
if(document.getElementById("productContainer")){
  renderProducts(products);
}

updateCartUI();
