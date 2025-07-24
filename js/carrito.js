let carritoContainer = document.getElementById("carrito-container")
let carritoStorage = localStorage.getItem("carritoProduct")
let TotalCompra = localStorage.getItem("total")
carritoStorage = JSON.parse(carritoStorage)

function carrito(products){
    carritoContainer.innerHTML = "";
    let total= 0;
    products.forEach (product => { 
        const item = document.createElement("div")
        item.className="div-carrito"
        const subtotal = product.cantidad * product.precio
        total += subtotal
        item.innerHTML= `
                         <a href="${product.nombre}.html"> <img class="img-buzo" src=".${product.imagen}"></a>
                         <h3 class="nombre-buzo">${product.nombre}</h3>
                         <button class="restar-boton" id="${product.id}">-</button>
                         <span class"cantidad" id="cantidad" >${product.cantidad} </span>
                         <button class="sumar-boton" id="${product.id}">+</button>
                         <button class="eliminar" id="${product.id}">Eliminar</button>
                         <span class"subtotal">$${subtotal}</span>
                            `
        carritoContainer.appendChild(item)
        
        const botonEliminar = document.querySelectorAll(".eliminar")
        botonEliminar.forEach(boton => {
        boton.onclick = (e) => {
            const productId = e.currentTarget.id
            eliminar(productId)
        };
    });
        
    });
    
    const botonesSumar = document.querySelectorAll(".sumar-boton");
    const botonesRestar = document.querySelectorAll(".restar-boton");

    botonesRestar.forEach(boton => {
    boton.onclick = () => cambiarCantidad(parseInt(boton.id),-1);
        
    });
    
    botonesSumar.forEach(boton => {
    boton.onclick = () => cambiarCantidad(parseInt(boton.id), +1);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "total-carrito";
    totalDiv.innerHTML = `<h2>Total: $${total}</h2>`;
    carritoContainer.appendChild(totalDiv);

}
    

function eliminar(productId){
    carritoStorage = carritoStorage.filter(product => product.id != productId)
    console.log(carritoStorage)
    localStorage.setItem("carritoProduct", JSON.stringify(carritoStorage))
    agregarAlCarrito(carritoStorage)
}

function cambiarCantidad(productId,cambio){
  carritoStorage = carritoStorage.map(product => {
    if (product.id == productId) {
      const nuevaCantidad = product.cantidad + cambio;
      if (nuevaCantidad <= 0) {
        eliminar(productId); 
        return null;
      }
      return { ...product, cantidad: nuevaCantidad }
    }
    return product;
  }).filter(product => product !== null);

   localStorage.setItem("carritoProduct", JSON.stringify(carritoStorage));
   agregarAlCarrito(carritoStorage)

}


carrito(carritoStorage)



