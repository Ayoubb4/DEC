/*
1- Formulario que permita registrar jugadores para un torneo de petanca, con los siguientes campos:
Nombre de jugador obligatorio *
Edad obligatorio * (número entre 12 y 40)
Alias obligatorio * (solo letras y números, máximo 12 carácteres)
*/

const nombre = document.getElementById('nombre');
const edad = document.getElementById('edad');
const alias = document.getElementById('alias');
const aliasPattern = /^[a-zA-Z0-9]{1,12}$/;

function validarFormulario() {
    if(edad >= 12 && edad <= 40) {
        alert("Numero Correcto");
    }else{
        alert ("Numero Incorrecto");
    }
}

function validarAlias() {
    if(!aliasPattern.test(alias)){
        alert("Alias Incorrecto");
    }else{
        alert("Alias Correcto");
    }
}