<<<<<<< HEAD
/*
1- Formulario que permita registrar jugadores para un torneo de petanca, con los siguientes campos:
Nombre de jugador obligatorio *
Edad obligatorio * (número entre 12 y 40)
Alias obligatorio * (solo letras y números, máximo 12 carácteres)
*/

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const alias = document.getElementById("alias")
const aliasPattern = /^[a-zA-Z0-9]{1,12}$/;

function validarEdad(){
    if(edad => 12 && edad <= 40){
        alert("Edad Validada");
    }else{
        alert("Entre 12 y 40");
    }
}

function validarAlias(){
    if(!aliasPattern.test(alias)){
        alert("Condiciones incorrectas");
    }else{
        alert("Condiciones correctas");
    }
}
=======
/* 1. Crea una función que devuelve el resultado del lanzamiento de un dado, es decir, un número natural aleatorio  entre 1 y 6. (1 punto)  */
function lanzarDado() {
    return Math.floor(Math.random() * 6) + 1;
}
const resultado = lanzarDado();
console.log("El resultado es: " + resultado);
>>>>>>> 87aa66a (Fin Ejercicios CASA 29/11/2024)
