/* <!-- Ejercicio 1: Validaciones Básicas

Nivel: Fácil
Objetivo: Practicar validaciones dinámicas en formularios.

Enunciado:

Crea un formulario que permita ingresar:
   1.    Nombre (obligatorio, máximo 20 caracteres).
   2.    Edad (obligatoria, número entre 1 y 120).

Tareas:
   1.    Valida los datos dinámicamente y muestra mensajes de error debajo de los campos incorrectos.
   2.    Desactiva el botón “Enviar” hasta que los campos sean válidos. --> */

function validarFormulario(){

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const nombreError = document.getElementById("nombreError");
    const edadError = document.getElementById("edadError");
    const boton = document.getElementById("enviar");

    //validanombre

    if(nombre.trim() === ""){
        nombreError.textContent = "El nombre no puede ir vacio";
    }else if (nombre.length > 20) {
        nombreError.textContent = "El nombre no puede tener mas de 20 caracteres";
    }else{
        nombreError.textContent = "";
    }

    //validaedad

    if(edad.trim() === ""){
        edadError.textContent = "No puede estar vacio";
    }else if (edad < 1 || edad > 120){
        edadError.textContent = " número entre 1 y 120";
    }else{
        edadError.textContent = "";
    }

    //botondisabled

    if(edadError.textContent === "" && nombreError.textContent === ""){
        boton.disabled = false;
    }else{
        boton.disbled = true;
    }
}