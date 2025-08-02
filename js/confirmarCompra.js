
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

    function soloLetras(valor) {
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim());
    }

    function validarFormulario() {
        let completo = campos.every(input => input && input.value.trim() !== "");
        const letrasOk = soloLetras(campos[0].value) && soloLetras(campos[3].value);
        const correosIguales = campos[6].value === campos[7].value;

        btn.disabled = !(completo && letrasOk && correosIguales);
    }

    campos.forEach(input => {
        input.addEventListener("input", validarFormulario);
    });

    btn.addEventListener("click", () => { 
        if (!btn.disabled) {
            const datosUsuario = {
            nombre: document.getElementById("nombre").value.trim(),
            dni: document.getElementById("dni").value.trim(),
            calle: document.getElementById("calle").value.trim(),
            localidad: document.getElementById("localidad").value.trim(),
            tel1: document.getElementById("tel1").value.trim(),
            tel2: document.getElementById("tel2").value.trim(),
            correo: document.getElementById("correo").value.trim()
        };
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        
            window.location.href = "metodoDePago.html";
        }
    });

    validarFormulario();



