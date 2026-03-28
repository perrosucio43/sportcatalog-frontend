



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

<img src="${p.imageUrl}" width="100">
<h3><strong>${p.name} </strong></h3> 
<p class="product-price">$${Number(p.price).toLocaleString("es-AR")}</p>
<p>${p.description}</p>
<button class="add-cart">Agregar al carrito</button>

`
;
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


async function cargarCategoria() {
    const response = await fetch(`${API_URL}/api/Category/${categoryId}`);
    const category = await response.json();

    document.getElementById("category-title").textContent = category.name;
    document.title = category.name;

    // Definir slug al inicio
    const slug = category.name.toLowerCase().replace(/\s+/g, "-");

    const transitionScreen = document.getElementById("page-transition");
    const leaves = document.querySelectorAll('.transition-leaf');

    if (transitionScreen) {
        // Aplicar colores a hojas
        updateLeafColorsForCategory(slug, leaves);

        // Activar overlay
        transitionScreen.classList.add('active');

        // Si hay productos, animar sus cards
        const productsContainer = document.getElementById("products");
        if (productsContainer && productsContainer.children.length > 0) {
            const cards = Array.from(productsContainer.children);
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.05}s`;
            });
        }

        // Mostrar hojas aunque no haya productos
        leaves.forEach(leaf => leaf.style.display = 'block');

        // Ocultar overlay después de la animación (ej: 1s)
        setTimeout(() => {
            transitionScreen.classList.remove('active');
        }, 1000);
    }

    // Colores de hojas
    function updateLeafColorsForCategory(categorySlug, leafElements) {
        leafElements.forEach(leaf => {
            leaf.classList.remove('leaf-verde','leaf-naranja','leaf-rojo','leaf-amarillo');
        });

        switch (categorySlug) {
            case 'calza-larga':
            case 'calzas-largas':
                leafElements[0]?.classList.add('leaf-verde');
                leafElements[3]?.classList.add('leaf-amarillo');
                break;
            case 'calza-corta':
            case 'calzas-cortas':
                leafElements[1]?.classList.add('leaf-naranja');
                leafElements[3]?.classList.add('leaf-amarillo');
                break;
            case 'remera':
            case 'remeras':
                leafElements[2]?.classList.add('leaf-rojo');
                leafElements[3]?.classList.add('leaf-amarillo');
                break;
            case 'combo':
            case 'combos':
                leafElements[2]?.classList.add('leaf-rojo');
                leafElements[1]?.classList.add('leaf-naranja');
                break;
            default:
                leafElements.forEach(leaf => leaf.classList.add('leaf-verde','leaf-naranja','leaf-rojo'));
                break;
        }
    }

    const body = document.getElementById("page-body");
    body.classList.add(slug); // Ahora slug siempre existe
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




