let products = [
  {id:1,name:"Rose Oud",price:20,img:"https://via.placeholder.com/300"},
  {id:2,name:"Amber Gold",price:25,img:"https://via.placeholder.com/300"},
  {id:3,name:"Velvet Musk",price:18,img:"https://via.placeholder.com/300"},
  {id:4,name:"Royal Essence",price:30,img:"https://via.placeholder.com/300"},
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* INIT */
render();
updateCart();

/* PRODUCTS */
function render(list = products){
  let box = document.getElementById("productContainer");
  if(!box) return;

  box.innerHTML = "";

  list.forEach(p=>{
    box.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${p.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

/* CART */
function addToCart(id){
  let item = products.find(p=>p.id==id);
  let ex = cart.find(c=>c.id==id);

  ex ? ex.qty++ : cart.push({...item,qty:1});

  save();
  updateCart();
  toast("Added to cart");
}

/* UPDATE CART */
function updateCart(){
  let box = document.getElementById("cartItems");
  if(!box) return;

  let total = 0;
  let count = 0;

  box.innerHTML = "";

  cart.forEach((c,i)=>{
    total += c.price * c.qty;
    count += c.qty;

    box.innerHTML += `
      <div class="item">
        <span>${c.name}</span>

        <div class="qty">
          <button onclick="change(${i},-1)">-</button>
          <span>${c.qty}</span>
          <button onclick="change(${i},1)">+</button>
        </div>

        <b>$${c.price*c.qty}</b>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = total.toFixed(2);
  document.getElementById("cartCount").innerText = count;

  save();
}

/* QTY */
function change(i,v){
  cart[i].qty += v;
  if(cart[i].qty<=0) cart.splice(i,1);
  updateCart();
}

/* CART */
function openCart(){
  document.getElementById("cartDrawer").style.right="0";
}

function closeCart(){
  document.getElementById("cartDrawer").style.right="-400px";
}

/* PRODUCT */
function openProduct(id){
  location.href="product.html?id="+id;
}

/* SEARCH */
function searchProducts(){
  let v = document.getElementById("searchInput").value.toLowerCase();
  render(products.filter(p=>p.name.toLowerCase().includes(v)));
}

/* CHECKOUT */
function openCheckout(){
  document.getElementById("checkoutModal").style.display="flex";
}

function placeOrder(){
  cart = [];
  save();
  updateCart();

  document.getElementById("checkoutModal").style.display="none";
  toast("Order placed successfully");
}

/* TOAST */
function toast(msg){
  let t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");

  setTimeout(()=>t.classList.remove("show"),2000);
}

/* SAVE */
function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
}
