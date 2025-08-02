(() => {
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

    const toast = document.getElementById("erroresFormulario");

    function soloLetras(valor) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim());
    }

    function validarFormulario() {
        let mensajeError = "";

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
            if (!mensajeError && regla.condicion()) {
                mensajeError = `❌ ${regla.mensaje}`;
            }
        });

        if (toast) {
            if (mensajeError) {
                toast.textContent = mensajeError;
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
                return true; 
            } else {
                toast.classList.remove("show");
                return false; 
            }
        }

        return !!mensajeError;
    }


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
})();
