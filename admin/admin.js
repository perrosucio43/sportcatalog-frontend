const token = localStorage.getItem("token");
const logoutBtn = document.getElementById("logout");
document.addEventListener("DOMContentLoaded", () => {

loadCategories();
loadProducts();
initDragDrop();
initForm();

});
const API_BASE = "https://sportcatalogapi-production.up.railway.app";
const API_URL = "https://sportcatalogapi-production.up.railway.app/api";

function initDragDrop(){

const dropZone = document.getElementById("drop-zone");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

if(!dropZone) return;

dropZone.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", showPreview);

dropZone.addEventListener("dragover", (e) => {
e.preventDefault();
});

dropZone.addEventListener("drop", (e) => {

e.preventDefault();

imageInput.files = e.dataTransfer.files;

showPreview();

});

function showPreview(){

const file = imageInput.files[0];

if(!file) return;

preview.src = URL.createObjectURL(file);
preview.style.display = "block";

}

}

function initForm(){

const form = document.getElementById("product-form");
const imageInput = document.getElementById("imageInput");

form.addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData();

formData.append("name", document.getElementById("name").value);
formData.append("price", document.getElementById("price").value);
formData.append("description", document.getElementById("description").value);
formData.append("categoryId", document.getElementById("category").value);

const file = imageInput.files[0];

if(file){
formData.append("image", file);
}

await fetch(`${API_URL}/products`,{
method:"POST",
headers:{
Authorization:`Bearer ${token}`
},
body: formData
});

loadProducts();

});

}

async function loadCategories(){

const response = await fetch(`${API_URL}/Category`);

const categories = await response.json();

const select = document.getElementById("category");

select.innerHTML = "";

categories.forEach(c => {

const option = document.createElement("option");

option.value = c.id;
option.textContent = c.name;

select.appendChild(option);

});

}

async function loadProducts(){

const response = await fetch(`${API_URL}/products/all`);

const products = await response.json();

renderProducts(products);

}

function renderProducts(products){

const container = document.getElementById("admin-products");

container.innerHTML = "";

products.forEach(p=>{

const div = document.createElement("div");

div.innerHTML = `
<img src="${p.ImageUrl}" width="100">
<p>${p.name}</p>
<p>$${p.price}</p>
<button onclick="deleteProduct('${p.id}')">Eliminar</button>
`;

container.appendChild(div);

});

}

async function deleteProduct(id){

await fetch(`${API_URL}/products/${id}`,{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
});

loadProducts();

}

function logout(){
localStorage.removeItem("token");
window.location.href = "index.html";
}
if(logoutBtn){
logoutBtn.addEventListener("click", logout);
}

