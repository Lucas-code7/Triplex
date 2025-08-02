
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnPagar");
    if (!btn) return;

    const campos = [
        document.getElementById("nombre"),
        document.getElementById("dni"),
        document.getElementById("tarjeta"),
        document.getElementById("cod"),
        document.getElementById("fecha"),
        document.getElementById("tel"),
        document.getElementById("correo"),
        document.getElementById("correo2"),
    ];

    function soloLetras(valor) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim());
    }

    function validarFormulario() {
        let completo = campos.every(input => input && input.value.trim() !== "");
        const letrasOk = soloLetras(campos[0].value);
        const correosIguales = campos[6].value === campos[7].value;

        btn.disabled = !(completo && letrasOk && correosIguales);
    }

    campos.forEach(input => {
        input.addEventListener("input", validarFormulario);
    });

     btn.addEventListener("click", () => {   
        Swal.fire({
        title: "Gracias por la compra",
        text: "Aguarde 5 segundos y se le va a derijir a su factura",
        icon: "success",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false
        }).then(() => { 
            setTimeout(() => {
             window.location.href = "factura.html"; 
            }, 3000); 
         });
    });

    validarFormulario();
});

let carritoContainer = document.getElementById("productosPagar")
let carritoStorage = JSON.parse(localStorage.getItem("carritoProduct")) || [];

function carrito(products){
    carritoContainer.innerHTML = "";
    let total= 0;
    products.forEach (product => { 
        const item = document.createElement("div")
        item.className="div-pago"
        const subtotal = product.cantidad * product.precio
        total += subtotal
        item.innerHTML= `
                        
                         <a href="${product.nombre}.html"> <img class="img-buzo-pago" src="../${product.imagen}"></a>
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