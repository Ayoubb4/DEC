function validarFormulario() {
    const dni = document.getElementById("dni").value.trim();
    const letraDNI = document.getElementById("letraDNI").value.trim().toUpperCase();
    const email = document.getElementById("email").value.trim();
    const erroresDiv = document.getElementById("errores");
    
    let errores = [];

    const formatoDNI = /^\d+$/;
    const formatoEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (dni === "") {
        errores.push("Completa el DNI MACHOOO");
    }

    if (dni !== "" && !formatoDNI.test(dni)) {
        errores.push("Teclea el DNI no letras solico numeros");
    }

    if (dni !== "" && formatoDNI.test(dni)) {
        const letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
        const indice = parseInt(dni) % 23;
        console.log(indice);

        if (letraDNI === "") {
            errores.push("Pon la letra del documento");
        } else if (letraDNI !== letras[indice]) {
            errores.push("La letra es incorrecta");
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (email === "") {
        errores.push("Completa el correo chaval");
    } else if (!formatoEmail.test(email)) {
        errores.push("Teclea un correo electronico bueno anda");
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    if (errores.length > 0) {
        erroresDiv.innerHTML = errores.join("<br>");
    } else {
        erroresDiv.innerHTML = "Formulario enviado GG";
    }


}
validarFormulario();