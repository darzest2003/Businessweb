let products = [
  {id:1,name:"Rose Perfume",price:20,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:2,name:"Oud Spray",price:25,cat:"body",img:"https://via.placeholder.com/150"},
  {id:3,name:"Fresh Scent",price:18,cat:"scents",img:"https://via.placeholder.com/150"},
  {id:4,name:"Luxury Oud",price:30,cat:"perfume",img:"https://via.placeholder.com/150"},
  {id:5,name:"Night Body Mist",price:22,cat:"body",img:"https://via.placeholder.com/150"},
  {id:6,name:"Amber Scent",price:28,cat:"scents",img:"https://via.placeholder.com/150"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list){
  let grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  list.forEach(p=>{
    grid.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button class="btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts(products);

/* Cart */
function addToCart(id){
  let item = products.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;
}

/* Open Product Page */
function openProduct(id){
  window.open("product.html?id="+id,"_blank");
}

/* Search */
function searchProducts(){
  let val = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(p=>p.name.toLowerCase().includes(val));
  displayProducts(filtered);
}

/* Category */
function filterCategory(cat){
  if(cat==="all") displayProducts(products);
  else displayProducts(products.filter(p=>p.cat===cat));
}

/* Cart Modal */
function openCart(){
  document.getElementById("cartModal").style.display="block";
  let div = document.getElementById("cartItems");
  div.innerHTML = cart.map(c=>`<p>${c.name} - $${c.price}</p>`).join("");
}
function closeCart(){
  document.getElementById("cartModal").style.display="none";
}

/* Checkout */
function openCheckout(){
  document.getElementById("checkoutModal").style.display="block";
}

function closeCheckout(){
  document.getElementById("checkoutModal").style.display="none";
}

/* Submit Order */
function submitOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  let msg = `Order from ${name}%0APhone:${phone}%0AAddress:${address}%0AItems:${cart.map(c=>c.name).join(",")}`;

  window.open(`https://wa.me/923444318078?text=${msg}`,"_blank");

  cart = [];
  localStorage.removeItem("cart");
  updateCart();
  closeCheckout();
}

updateCart();
