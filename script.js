let products = [
  {id:1,name:"Rose Perfume",price:20,img:"https://via.placeholder.com/150"},
  {id:2,name:"Oud Spray",price:25,img:"https://via.placeholder.com/150"},
  {id:3,name:"Fresh Scent",price:18,img:"https://via.placeholder.com/150"},
  {id:4,name:"Luxury Oud",price:30,img:"https://via.placeholder.com/150"},
  {id:5,name:"Night Mist",price:22,img:"https://via.placeholder.com/150"},
  {id:6,name:"Amber Scent",price:28,img:"https://via.placeholder.com/150"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* INIT */
renderProducts();
updateCart();

/* PRODUCTS */
function renderProducts(list = products){
  let box = document.getElementById("productContainer");
  if(!box) return;

  box.innerHTML = "";

  list.forEach(p=>{
    box.innerHTML += `
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

/* ADD TO CART */
function addToCart(id){
  let item = products.find(p => p.id === id);

  let existing = cart.find(c => c.id === id);

  if(existing){
    existing.qty++;
  } else {
    cart.push({...item, qty:1});
  }

  save();
  updateCart();
  openCart();
}

/* CART UI */
function updateCart(){
  let box = document.getElementById("cartItems");
  let totalBox = document.getElementById("cartTotal");
  let countBox = document.getElementById("cartCount");

  if(!box) return;

  box.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((c,i)=>{
    total += c.price * c.qty;
    count += c.qty;

    box.innerHTML += `
      <div class="cart-item">
        <p>${c.name}</p>

        <div>
          <button onclick="changeQty(${i},-1)">-</button>
          <span>${c.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>

        <span>$${c.price * c.qty}</span>
      </div>
    `;
  });

  if(totalBox) totalBox.innerText = total.toFixed(2);
  if(countBox) countBox.innerText = count;

  save();
}

/* QTY */
function changeQty(i,val){
  cart[i].qty += val;

  if(cart[i].qty <= 0){
    cart.splice(i,1);
  }

  updateCart();
}

/* STORAGE */
function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CART OPEN/CLOSE */
function openCart(){
  let el = document.getElementById("cartSidebar");
  if(el) el.style.right = "0";
}

function closeCart(){
  let el = document.getElementById("cartSidebar");
  if(el) el.style.right = "-350px";
}

/* PRODUCT PAGE */
function openProduct(id){
  window.location.href = "product.html?id=" + id;
}

/* SEARCH */
function searchProducts(){
  let val = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(val));
  renderProducts(filtered);
}

/* CHECKOUT */
function openCheckoutLoader(){
  document.getElementById("loaderPopup").style.display = "flex";

  setTimeout(()=>{
    document.getElementById("loaderPopup").style.display = "none";
    document.getElementById("checkoutForm").style.display = "flex";
  },1500);
}

/* ORDER */
function submitOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  let items = cart.map(c => `${c.name} x${c.qty}`).join(", ");

  let msg = `Order%0AName:${name}%0APhone:${phone}%0AAddress:${address}%0AItems:${items}`;

  window.open("https://wa.me/923000000000?text=" + msg);

  cart = [];
  save();
  updateCart();

  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("successPopup").style.display = "flex";
}

/* SUCCESS */
function closeSuccess(){
  document.getElementById("successPopup").style.display = "none";
}
