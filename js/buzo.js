// chat gpt
function ajustarRuta(ruta) {
  const enSubcarpeta = window.location.pathname.includes("/pages/");
  return enSubcarpeta ? "../" + ruta : ruta;
}
// es lo mismo que main.js pero porque no me cargaba la imagen del producto por la ruta

const productos = document.getElementById("buzos")

let carritoStorage = JSON.parse(localStorage.getItem("carritoProduct")) || [];


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
            const confirmProduct = buzosArray.find(buzo => buzo.id == productoId);
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

const search_buzos = document.getElementById("search_buzos");
if (search_buzos) {
  search_buzos.addEventListener("input", () => {
    const termino = search_buzos.value.toLowerCase()
    const filtrados = buzos_array.filter(buzo =>
      buzo.nombre.toLowerCase().includes(termino)
    )
    renderResultados(filtrados);
    agregarAlCarrito(filtrados);
  });
}
