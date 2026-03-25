 cart = JSON.parse(localStorage.getItem("cart")) ||[];

 const API_URL = "https://sportcatalogapi-production.up.railway.app";
const volverBtn = document.getElementById("volver");
 function renderCart(){

const container = document.getElementById("cart-items");

container.innerHTML = "";

cart.forEach(item=>{

const div = document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `

<img src="${API_URL}${item.image}" width="100">

<p>${item.name}</p>

<p>$${item.price.toLocaleString("es-ES")}</p>

<div class="quantity">

<button class="minus">-</button>

<span>${item.quantity}</span>

<button class="plus">+</button>

</div>

<button class="remove">Eliminar</button>

`;

container.appendChild(div);


// BOTON SUMAR

const plus = div.querySelector(".plus");

plus.addEventListener("click",()=>{

item.quantity++;

saveCart();

renderCart();

});


// BOTON RESTAR

const minus = div.querySelector(".minus");

minus.addEventListener("click",()=>{

if(item.quantity > 1){

item.quantity--;
}


saveCart();

renderCart();

});


// BOTON ELIMINAR

const remove = div.querySelector(".remove");

remove.addEventListener("click",()=>{

cart = cart.filter(p => p.id !== item.id);

saveCart();

renderCart();

});


});

updateTotal();

}
function updateTotal(){

const total = cart.reduce((sum,item)=>{

return sum + item.price * item.quantity;

},0);

document.getElementById("cart-total").textContent =
"Total: $" + total.toLocaleString("es-ES");

}

renderCart();

const checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", sendOrderWhatsapp);


function sendOrderWhatsapp(){

// 1️⃣ Mensaje inicial
// %0A representa salto de línea en URL
let message = "Hola! Quiero hacer el siguiente pedido:\n\n";


// 2️⃣ Recorremos todos los productos del carrito
cart.forEach(item => {


// 3️⃣ Calculamos subtotal por producto
const subtotal = item.price * item.quantity;


// 4️⃣ Construimos bloque de texto para cada producto
// += concatena (agrega texto al string existente)
message += ` ${item.name}\n`;
message += `Cantidad: ${item.quantity}\n`;
message += `Precio unitario: $${item.price.toLocaleString("es-ES")}\n`;
message += `Subtotal: $${subtotal.toLocaleString("es-ES")}\n\n`;

});


// 5️⃣ Calculamos el total del carrito
const total = cart.reduce((sum,item)=>{

return sum + item.price * item.quantity;

},0);


// 6️⃣ Agregamos el total al mensaje
message += `TOTAL DEL PEDIDO: $${total.toLocaleString("es-ES")}`;


// 7️⃣ Número de WhatsApp del negocio
const phone = "5493755343427";


// 8️⃣ Construcción de la URL que abre WhatsApp
const encodedMessage = encodeURIComponent(message);

const url = `https://wa.me/${phone}?text=${encodedMessage}`;


// 9️⃣ Abrimos WhatsApp en nueva pestaña
window.open(url, "_blank");

cart = [];

localStorage.removeItem("cart");

updateCartCount();

renderCart();

}


if(volverBtn){
volverBtn.addEventListener("click", volverCatalogo);
}

function volverCatalogo(){
window.location.href = "index.html";
}