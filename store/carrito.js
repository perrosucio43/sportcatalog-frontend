let cart = JSON.parse(localStorage.getItem("cart")) ||[];

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));



}
 function addToCart(product){

      // 1. Obtener referencias a los elementos para animar
      const logoImg = document.querySelector('.logo img');
      const cartIcon = document.querySelector('.cart-icon');

      // 2. Añadir clase para animación
      if (logoImg) logoImg.classList.add('shake-logo');
      if (cartIcon) cartIcon.classList.add('bounce-cart');

      const existing = cart.find(p => p.id === product.id);

      if(existing){
          existing.quantity += 1;
      } else {
          cart.push({
              ...product,
              quantity: 1
          });
      }

      saveCart();
      updateCartCount();

      
      console.log(cart);

      // 3. Eliminar la clase después de que termine la animación
      setTimeout(() => {
          if (logoImg) logoImg.classList.remove('shake-logo');
          if (cartIcon) cartIcon.classList.remove('bounce-cart');
      }, 600); // Esperamos a que termine la animación (0.6s)

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