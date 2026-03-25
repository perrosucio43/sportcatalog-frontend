



const params = new URLSearchParams(window.location.search);

const categoryId = params.get("id");
const API_URL = "https://sportcatalogapi-production.up.railway.app";



async function cargarProductos(){

const response = await fetch(
`${API_URL}/api/products/category/${categoryId}`
);

const products = await response.json();

const container = document.getElementById("products");

container.innerHTML = "";

products.forEach(p => {

const div = document.createElement("div");

div.classList.add("product-card");

div.innerHTML = `
<img src="${API_URL}${p.imageUrl}" width="100">
<p>${p.name}</p>
<p class="product-price">$${Number(p.price).toLocaleString("es-AR")}</p>
<button class= "add-cart">Agregar al carrito</button>
`;
const button = div.querySelector(".add-cart");

button.addEventListener("click", ()=>{

addToCart({
id: p.id,
name: p.name,
price: p.price,
image: p.imageUrl
});

});

container.appendChild(div);

});

}


async function cargarCategoria(){

const response = await fetch(
`${API_URL}/api/Category/${categoryId}`
);

const category = await response.json();

document.getElementById("category-title").textContent = category.name;

document.title = category.name;

const body = document.getElementById("page-body");
const slug = category.name
.toLowerCase()
.replace(/\s+/g,"-");

body.classList.add(slug);






}



function filtrarMenuCategoria(){

if(!categoryId) return;

const categories = document.querySelectorAll(".category-item");


categories.forEach(cat => {

   
    
if(cat.dataset.id !== categoryId){

cat.style.display = "none";


}


});


}
document.addEventListener("DOMContentLoaded", () => {
filtrarMenuCategoria();
cargarCategoria();
cargarProductos();


});




