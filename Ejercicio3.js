<<<<<<< HEAD
/* Crea un programa que simule la creacion de futbolistas, cada personaje tiene fuerza (entre 50 y 100),  resistencia(30 y 80), velocidad(20 y 70). Habra que mostrar los stats en el DOM cuando se crea el personaje.
Implementar una funcion para dar valores aleatorios dentro de un rango.
Mostrar las estadisticas del personake dentro de una pantalla. */

function generarValorAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let contador = 0;

function crearFutbolista() {

    contador++;
    const futbolista = {
        nombre: "Futbolista " + contador,
        fuerza: generarValorAleatorio(50, 100),
        resitencia: generarValorAleatorio(30, 80),
        velocidad: generarValorAleatorio(20, 70)
    }


    mostrarFutbolista(futbolista);
}

function mostrarFutbolista(futbolista) {
    const div = document.getElementById("listaJugadores");
    let textoFutbol = "";

    textoFutbol += `El ${futbolista.nombre} tiene ${futbolista.fuerza},${futbolista.resitencia},${futbolista.velocidad}.`;

    div.innerHTML = textoFutbol + "<br>";
}
=======
/* 3- Crea una función que, dada una cadena de texto, devuelve una nueva cadena cambiando la primera letra de  cada palabra en mayúsculas. (3 puntos) 
 */
function MayusculaPrimeraLetra() {
    let texto = prompt ("Dame una serie de palabras");
    let nuevaCadena = '';

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        
        if(texto[i] == texto[0]){
        nuevaCadena+= texto[i].toUpperCase();
        
        }else if (char == ' ' || char == '.' || char == '. ') {
            nuevaCadena += char ;
            nuevaCadena += texto[i + 1].toUpperCase();
            i++;
        }/* lse if(char == '. '){
            nuevaCadena += char ;
            nuevaCadena += texto[i + 1].toUpperCase();
            i++;
        } */
        else {
            nuevaCadena += char; 
        }   
    }

    return nuevaCadena;
}

let solucion = MayusculaPrimeraLetra();
console.log(solucion);
>>>>>>> 87aa66a (Fin Ejercicios CASA 29/11/2024)
