
const productos = document.getElementById("buzos")
let carritoProduct = JSON.parse(localStorage.getItem("carritoProduct")) || [];

let buzos_array = [];

fetch("/Triplex/json/buzos.json")
  .then(res => res.json())
  .then(data => {
    console.log("BUZOS CARGADOS:", data); 
    buzos_array = data;
    renderResultados(data);
    agregarAlCarrito(data)
  })
  .catch(err =>{ 
    console.error("Error al cargar los buzos:", err);
    productos.innerHTML = "<p>Error al cargar los productos...disculpe las molestias, vuelva pronto.</p>";
  });


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
           
            mostrarToast(`Se añadió correctamente al carrito "${confirmProduct.nombre}"`);
    }
  })
}

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); 
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

