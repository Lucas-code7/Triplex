const btn = document.getElementById("btnSeguir");
if (!btn) return;

const campos = [
    document.getElementById("nombre"),
    document.getElementById("dni"),
    document.getElementById("calle"),
    document.getElementById("localidad"),
    document.getElementById("tel1"),
    document.getElementById("tel2"),
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
            condicion: () => !soloLetras(campos[3].value),
            mensaje: "La localidad solo puede contener letras."
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
        return true; 
    } else {
        erroresDiv.innerHTML = "";
        return false; 
    }
}


campos.forEach(input => {
    input.addEventListener("input", validarFormulario);
});

btn.addEventListener("click", () => { 
    const hayErrores = validarFormulario();
    
    if (!hayErrores) {
        const datosUsuario = {
            nombre: campos[0].value.trim(),
            dni: campos[1].value.trim(),
            calle: campos[2].value.trim(),
            localidad: campos[3].value.trim(),
            tel1: campos[4].value.trim(),
            tel2: campos[5].value.trim(),
            correo: campos[6].value.trim()
        };
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        window.location.href = "metodoDePago.html";
    }
});
