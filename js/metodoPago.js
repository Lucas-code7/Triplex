
const btn = document.getElementById("btnPagar");
if (!btn){
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

const erroresDiv = document.getElementById("erroresFormulario");

function soloLetras(valor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim());
}

function validarFormulario() {
    const mensajesError = [];

    const reglas = [
        {
            condicion: () => campos.some(c => !c || c.value.trim() === ""),
            mensaje: "Todos los campos deben estar completos."
        },
        {
            condicion: () => !soloLetras(campos[0].value),
            mensaje: "El nombre solo puede contener letras."
        },
        {
            condicion: () => campos[6].value !== campos[7].value,
            mensaje: "Los correos no coinciden."
        }
    ];

    reglas.forEach(regla => {
        if (regla.condicion()) {
            mensajesError.push(`❌ ${regla.mensaje}`);
        }
    });

    if (mensajesError[0]) {
        erroresDiv.innerHTML = mensajesError.map(msg => `<p>${msg}</p>`).join("");
        return true; // hay errores
    } else {
        erroresDiv.innerHTML = "";
        return false; // formulario válido
    }
}

// Validación en vivo
campos.forEach(input => {
    input.addEventListener("input", validarFormulario);
});

// Acción al hacer clic en "Pagar"
btn.addEventListener("click", () => {   
    const hayErrores = validarFormulario();

    if (!hayErrores) {
        Swal.fire({
            title: "Gracias por la compra",
            text: "Aguarde 5 segundos y se le va a dirigir a su factura",
            icon: "success",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false
        }).then(() => { 
            setTimeout(() => {
                window.location.href = "factura.html"; 
            }, 3000); 
        });
    }
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
}
