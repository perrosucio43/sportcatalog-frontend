let cart = JSON.parse(localStorage.getItem("cart")) ||[];

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));



}
function addToCart(product){

const existing =cart.find(p=> p.id === product.id);

if(existing){
    existing.quantity+= 1;
}
else{
    cart.push({
    ...product,
    quantity: 1
});
}

saveCart();
updateCartCount();
alert("Producto añadido al carrito");

console.log(cart);
}

function updateCartCount(){

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const count = cart.reduce((total,item)=>{

return total + item.quantity;

},0);

const cartCount = document.getElementById("cart-count");

if(cartCount){

cartCount.textContent = count;

}

}
updateCartCount();