document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const registrarBoton = document.getElementById("registrarBoton");
    const modal = document.getElementById("modal");
    const mensaje = document.getElementById("mensaje");
    const cierre = document.getElementById("cierre");

    const validaciones = {
        nombre: /^[A-Za-záéíóúñÑ\s]{1,50}$/,
        apellido: /^[A-Za-záéíóúñÑ\s]{1,50}$/,
        fecha: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
        telefono: /^\d{9}$/
    };

    function mostrarModal(texto) {
        mensaje.textContent = texto;
        modal.style.display = "block";
    }

    function validarCampo(campo) {
        const valor = campo.value.trim();

        switch (campo.id) {
            case "nombre":
                if (valor === "") return "El nombre no va vacio nen";
                if (!validaciones.nombre.test(valor)) return "El nombre solo tiene letras bro";
                break;

            case "apellido1":
                if (valor === "") return "El primer apellido no va vacio tio";
                if (!validaciones.apellido.test(valor)) return "El primer apellido solo tiene letras boy";
                break;

            case "apellido2":
                if (!validaciones.apellido.test(valor)) return "El segundo apellido solo solo tiene letras boy";
                break;

            case "fecha":
                if (!validaciones.fecha.test(valor)) return "Fecha mala. Formato: dd/mm/aaaa, entre 1900 y 2099";
                const [dia, mes, año] = valor.split('/').map(Number);
                
                const fechaNacimiento = new Date(año, mes - 1, dia);
                const fechaActual = new Date();
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                
                if (fechaNacimiento > fechaActual) return "La fecha no puede ser en el futuro";
                if (edad < 18 || (edad === 18 && fechaActual < new Date(año + 18, mes - 1, dia))) {
                    return "Debes ser mayor de edad";
                }
                break;

            case "estudios":
                if (campo.value === "") return "Que estudios tienes tio";
                break;

            case "curso":
                if (campo.value === "") return "Que curso eliges";
                break;

            case "telefono":
                if (!validaciones.telefono.test(valor)) return "El telefono tiene 9 digitos";
                break;

            default:
                break;
        }
        return null;
    }


    function todosLosCamposValidos() {
        return Array.from(form.querySelectorAll("input, select")).every(campo => {
            return !validarCampo(campo);
        });
    }

    form.querySelectorAll("input, select").forEach(campo => {
        campo.addEventListener("blur", () => {
            const error = validarCampo(campo);
            if (error) {
                mostrarModal(error);
                campo.focus();
            }
            registrarBoton.disabled = !todosLosCamposValidos();
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (todosLosCamposValidos()) {
            mostrarModal("Muy bien tio, se ha enviado todo bene");
            form.reset(); 
            registrarBoton.disabled = true;
        }
    });

    cierre.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
});

