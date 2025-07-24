
// tuve que usar chat gpt, perdon
function ajustarRuta(ruta) {
  const enPages = window.location.pathname.includes("/pages/");
  return enPages ? "../" + ruta : ruta;
}
// esto solo porque no lo entendia muy bien el como construir bien la ruta y que no se mezcle creando un buzo,js

let productos = document.getElementById("buzos")
let carritoProduct = JSON.parse(localStorage.getItem("carritoProduct")) || [];
document.addEventListener("DOMContentLoaded", () => {
  obtenerBuzos();
});


async function obtenerBuzos() {
  try {
    const response = await fetch("../json/buzos.json");
    const data = await response.json();
    renderResultados(data);
    agregarAlCarrito(data);
  } catch (error) {
    console.error("Error al cargar los buzos:", error);
    productos.innerHTML = "<p>No se pudieron cargar los productos, reinice la pagina..disculpe</p>";
  }
}


function renderResultados(array){
productos.innerHTML = ""    
array.forEach(buzo => {
    const container = document.createElement("div")
    container.className = "card-buzo"
    container.innerHTML=`
                         <a href="./pages/${buzo.nombre}.html"> <img class="img-buzo" src="${ajustarRuta(buzo.imagen)}"></a>
                         <h3 class="nombre-buzo">${buzo.nombre}</h3>
                         <p>$${buzo.precio} <button class="add-product" id="${buzo.id}">+</button></p>
                            `
    productos.appendChild(container)
});
}


function agregarAlCarrito(buzosArray){
    const agregar = document.querySelectorAll(".add-product")
    agregar.forEach(boton=>{
        boton.onclick= (e) =>{
            const productoId = e.currentTarget.id
            const confirmProduct = buzos_array.find(buzo => buzo.id == productoId);
            let carritoActual = JSON.parse(localStorage.getItem("carritoProduct")) || [];
            const existeEnCarrito = carritoActual.find(x => x.id == confirmProduct.id);
            if (existeEnCarrito) {
            existeEnCarrito.cantidad += 1;
            } else {
            carritoActual.push({ ...confirmProduct, cantidad: 1 });
            }
            localStorage.setItem("carritoProduct", JSON.stringify(carritoActual));
    }}
    )
}

const agregar = document.querySelectorAll(".add-product");
 

search_buzos.addEventListener("input", () => {
  const termino = search_buzos.value.toLowerCase()
  const filtrados = buzos_array.filter(buzo =>
    buzo.nombre.toLowerCase().includes(termino)
  )
  renderResultados(filtrados)
})

