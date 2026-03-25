const form = document.getElementById("login-form");

form.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("https://sportcatalogapi-production.up.railway.app/apiAuth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
email: email,
password: password
})
});

if(!response.ok){
const text = await response.text();
console.error(text);
alert("Credenciales incorrectas");
return;
}

const data = await response.json();

localStorage.setItem("token", data.token);

window.location.href = "admin.html";

}catch(error){

console.error(error);
alert("No se pudo conectar con el servidor");

}

});

