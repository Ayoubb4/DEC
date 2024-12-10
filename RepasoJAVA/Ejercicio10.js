/* Ejercicio 10: Simulación de Combate
Objetivo: Introducir lógica más compleja y combinatoria.
Crea un programa que simule un combate entre dos personajes:
1. Cada personaje tiene estadísticas de Ataque, Defensa y Velocidad.
2. Calcula quién gana basándote en las estadísticas.
3. Permite generar personajes aleatorios para el combate. */

let listaPersonajes = [];

class Personaje {
    constructor(nombre, ataque, defensa, velocidad) {
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
    }

    calculoPoder() {
        return this.ataque * this.velocidad * this.defensa;
    }
}

function generarPersonajes() {

    const nombres = ["Barbaro", "Arquero", "Espadachin", "Mago", "Jinete"];

    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const ataque = Math.floor(Math.random() * 100) + 1;
    const defensa = Math.floor(Math.random() * 100) + 1;
    const velocidad = Math.floor(Math.random() * 100) + 1;


    
    if (listaPersonajes.length < 2) {
        const personaje1 = new Personaje(nombre, ataque, defensa, velocidad);
        listaPersonajes.push(personaje1);
    }else{
        alert("No puedes crear 2 jugadores")
    }
    mostrarPersonaje();
}

function mostrarPersonaje() {
    const div = document.getElementById("personajes")
    let textoPersonajes = "";

    listaPersonajes.forEach(personaje => {
        textoPersonajes = "Personaje: " + personaje.nombre + ", con ATAQUE " + personaje.ataque + ", con DEFENSA " + personaje.defensa + " y con velocidad " + personaje.velocidad + "<br>";
    })

    div.innerHTML = textoPersonajes;
}

function iniciarCombate() {

    const personaje1 = listaPersonajes[0];
    const personaje2 = listaPersonajes[1];

    const poder1 = personaje1.calculoPoder();
    const poder2 = personaje2.calculoPoder();



    const divResultado = document.getElementById("resultado");

    let textoResultado = "El Personaje 1: " + personaje1.nombre + " tiene: " + poder1 + " de poder." + "<br>" + "El Personaje 2: " + personaje2.nombre + " tiene: " + poder2 + " de poder." + "<br>";

    if (poder1 > poder2) {
        textoResultado += "Ganador :) " + personaje1.nombre;
    } else if (poder2 > poder1) {
        textoResultado += "Ganador :) " + personaje2.nombre;
    } else {
        textoResultado += "Es un empate";
    }

    divResultado.innerHTML = textoResultado;
}