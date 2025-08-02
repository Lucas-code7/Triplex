function ajustarRuta(ruta) {
  const enSubcarpeta = window.location.pathname.includes("/pages/");
  return enSubcarpeta ? "../" + ruta : ruta;
}

let carritoContainer = document.getElementById("productosPagar")
let carritoStorage = JSON.parse(localStorage.getItem("carritoProduct")) || [];


const datos = JSON.parse(localStorage.getItem("datosUsuario"));

    if (datos) {
        const info = document.createElement("div");
        info.className = "info-cliente";
        info.innerHTML = `
            <p>Nombre: ${datos.nombre}</p>
            <p>Dirección: ${datos.calle} - ${datos.localidad}</p>
            <p>Correo: ${datos.correo}</p>
            <p>DNI: ${datos.dni}</p>
            <p>Teléfono 1: ${datos.tel1}</p>
            <p>Teléfono 2: ${datos.tel2}</p>
            <h4>Cualquier inconveniente mandar mail a "errores.triplex@gmail.com"</h4>
        `;
        carritoContainer.appendChild(info);
    }

function carrito(products){
    carritoContainer.innerHTML = "";
    let total= 0;
    products.forEach (product => { 
        const item = document.createElement("div")
        item.className="div-carrito"
        const subtotal = product.cantidad * product.precio
        total += subtotal
        item.innerHTML= `
                        
                         <a href="${product.nombre}.html"> <img class="img-buzo-pago" src="${ajustarRuta(product.imagen)}"></a>
                         <h3 class="nombre-buzo">${product.nombre}</h3>
                         <span class"cantidad" id="cantidad" >cantidad: ${product.cantidad} </span>
                         <span class"subtotal">$${subtotal}</span>
                            `
        carritoContainer.appendChild(item)
    });

    const totalDiv = document.createElement("div");
      totalDiv.className = "total-carrito";
      totalDiv.innerHTML = `<h2>Total: $${total}</h2>`;
      carritoContainer.appendChild(totalDiv);

}

carrito(carritoStorage)


const btnCancelar = document.getElementById("btnclear");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            Swal.fire({
                title: "¿Guardaste tu factura?",
                text: "Se eliminará tu carrito y volverás al inicio.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("carritoProduct");
                    window.location.href = "../index.html";
                }
            });
        });
    }
