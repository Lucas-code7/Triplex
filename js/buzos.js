const buzos_array =[ 
    {id :1,
    nombre : "buzo disturb",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id :2,
    nombre : "buzo 2",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id :3,
    nombre : "buzo 3",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id :4,
    nombre : "buzo 4",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id :5,
    nombre : "buzo 5",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id:6,
    nombre : "buzo 6",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
    {
     id :7,
    nombre : "buzo 7",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },

    {
     id :8,
    nombre : "buzo 8",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },

    {
     id :9,
    nombre : "buzo 9",
    precio: 30.000,
    imagen: "./img/buzo_disturb.png"
    },
]

const buscador = document.getElementById("search_buzos");
const resultadoContainer = document.getElementById("resultado");


let mostrarBuzos = (buzos) => {
  resultado.innerHTML = "";
  buzos.forEach(buzo => {
    const container=document.createElement("div")
    container.className = "card-buzo"
    container.innerHTML += `
                         <a href="./${buzo.nombre}"> <img class="img-buzo" src=".${buzo.imagen}"></a>
                         <h3 class="nombre-buzo">${buzo.nombre}</h3>
                         <p>$${buzo.precio}<button class="add-product" id="${buzo.id}">+</button></p>
                           
                         
    `
    resultadoContainer.appendChild(container)
  });
};
// Busqueda
mostrarBuzos(buzos_array);

function buscar(){
    const texto = buscador.value.toLowerCase()
    const filtrados = buzos_array.filter(buzo =>
        buzo.nombre.includes(texto)
    );
    mostrarBuzos(filtrados);
}

buscador.addEventListener("input", buscar)


// array de productos en el carrito
const carritoProduct =[]

// boton de agregar al carrito
function agregarAlCarrito(){
    const agregar = document.querySelectorAll(".add-product")
    agregar.forEach(boton=>{
        boton.onclick= (e) =>{
            const productoId = e.currentTarget.id
            const confirmProduct = buzos_array.find(buzo => buzo.id == productoId);
            carritoProduct.push(confirmProduct) 
            localStorage.setItem("carritoProduct", JSON.stringify(carritoProduct))
    }}
    )
}

agregarAlCarrito()