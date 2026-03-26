const API_URL = "https://sportcatalogapi-production.up.railway.app";


async function cargarProductosInicio(){

const response = await fetch(
`${API_URL}/api/products/category/f0afa498-9e9c-4e24-935b-02eca2816eb1`
);

const products = await response.json();

const container = document.getElementById("productos");

container.innerHTML = "";

products.forEach(p => {

const div = document.createElement("div");

div.classList.add("product-card");

div.innerHTML = `

<img src="${p.ImageUrl}" width="100">
<p>${p.name}</p>
<p class="product-price">$${Number(p.price).toLocaleString("es-AR")}</p>
<button class="add-cart">Agregar al carrito</button>

`
;
const button = div.querySelector(".add-cart");

button.addEventListener("click", ()=>{

addToCart({
id: p.id,
name: p.name,
price: p.price,
image: p.ImageUrl
});

});

container.appendChild(div);

});

}
document.addEventListener("DOMContentLoaded", cargarProductosInicio);












