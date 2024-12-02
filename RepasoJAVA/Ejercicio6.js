/* Ejercicio 6: 
Relación entre Clases
Objetivo: Entender cómo se relacionan diferentes clases y su interacción.
Crea un programa para gestionar equipos de fútbol con las siguientes clases:
1. Clase Jugador:
Nombre, posición, número de goles.
2. Clase Equipo:
Nombre del equipo, lista de jugadores.
Tareas:
1. Permite agregar jugadores a un equipo.
2. Muestra la lista de jugadores de un equipo en pantalla. */

class Jugador {
    constructor(nombre, posicion, numGoles) {
        this.nombre = nombre;
        this.posicion = posicion;
        this.numGoles = numGoles;
    }
}

class Equipo {
    constructor(nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
        this.jugadores = [];
    }
    agregarJugador(jugador) {
        this.jugadores.push(jugador);
    }
}

function crearJugador() {
    const nombreJugador = document.getElementById('nombreJugador').value;
    const posicion = document.getElementById('posicion').value;
    const numGoles = document.getElementById('numGoles').value;
    
    const goles = parseInt(numGoles, 10);
    
    if (goles <= 0 || numGoles === "") {
        alert("Ingresa un número válido y positivo para los goles.");
        return;
    }

    let newJugador = new Jugador(nombreJugador, posicion, goles);

    const equipo = document.getElementById('equipo').value;

    switch (equipo) {
        case 'madrid':
            madrid.agregarJugador(newJugador);
            break;
        case 'calatayud':
            calatayud.agregarJugador(newJugador);
            break;
        case 'betis':
            betis.agregarJugador(newJugador);
            break;
        case 'malaga':
            malaga.agregarJugador(newJugador);
            break;
        default:
            break;
    }
}

function escribirEquipos() {
    let div = document.getElementById('div1');
    let textDiv = "";
    arrayEquipos.forEach(equipo => {
        if (equipo.jugadores.length > 0) {
            textDiv += "Equipo: " + equipo.nombreEquipo + " : <br>";
            equipo.jugadores.forEach(jugador => {
                textDiv += "Nombre Jugador: " + jugador.nombre + " | Posición Jugador: " + jugador.posicion + " | Goles: " + jugador.numGoles + "<br>";
            });
        } else {
            textDiv += "Equipo: " + equipo.nombreEquipo + " no tiene jugadores aún.<br>";
        }
    });
    div.innerHTML = textDiv;
}

let madrid = new Equipo('Real Madrid');
let calatayud = new Equipo('Real Calatayud');
let betis = new Equipo('Real Betis Balonpie');
let malaga = new Equipo('Malaga FC');

let arrayEquipos = [madrid, calatayud, betis, malaga];
