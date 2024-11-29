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