// es lo mismo que el index solo que cambia la ruta de las imagenes porque no sabia como hacerlo


const productos = document.getElementById("buzos")
let carritoProduct = JSON.parse(localStorage.getItem("carritoProduct")) || [];

function renderResultados(array){
productos.innerHTML = ""    
array.forEach(buzo => {
    const container = document.createElement("div")
    container.className = "card-buzo"
    container.innerHTML=`
                         <a href="./pages/${buzo.nombre}.html"> <img class="img-buzo" src="${buzo.imagen}"></a>
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
