/* Ejercicio 6: Simulador de Mascotas Virtuales

Objetivo: Trabajar con lógica condicional y actualización del DOM.

Enunciado:

Crea un simulador donde los usuarios puedan cuidar mascotas virtuales. Cada mascota tiene:
    1.    Nombre: Obligatorio.
    2.    Tipo: Lista desplegable (Perro, Gato, Pájaro).
    3.    Nivel de felicidad: Número entre 0 y 100.
    4.    Nivel de hambre: Número entre 0 y 100.

Tareas:
    1.    Permite realizar acciones como “Alimentar”, “Jugar” y “Dormir”, que afecten los niveles de felicidad y hambre.
    2.    Si el nivel de hambre o felicidad llega a 0, muestra un mensaje de advertencia en pantalla. */

let listaAnimales = [];

class Animal {
    constructor(nombre, tipo, felicidad, hambre) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.felicidad = felicidad;
        this.hambre = hambre;
    }

    alimentar() {
        this.hambre += 5;
        this.felicidad += 5;
        this.limite();
    }

    jugar() {
        this.hambre -= 5;
        this.felicidad += 5;
        this.limite();
    }

    dormir() {
        this.hambre -= 3;
        this.limite();
    }

    limite() {
        if (this.felicidad > 100) {
            this.felicidad = 100;
        }
        if (this.hambre > 100) {
            this.hambre = 100;
        }
        if (this.felicidad < 0) {
            this.felicidad = 0;
        }
        if (this.hambre < 0) {
            this.hambre = 0;
        }
    }
}

function crearMascota() {
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("animal").value;
    let felicidad = 0;
    let hambre = 0;

    if (nombre.trim() === "") {
        alert("Ingresa un nombre");
        return;
    }

    const mascota1 = new Animal(nombre, tipo, felicidad, hambre)
    listaAnimales.push(mascota1);

    mostrarMascota();
}

function alimentarMascota(i) {
    listaAnimales[i].alimentar();
    mostrarMascota()
}

function jugarMascota(i) {
    listaAnimales[i].jugar();
    mostrarMascota()
}

function dormirMascota(i) {
    listaAnimales[i].dormir();
    mostrarMascota()
}

function mostrarMascota() {
    const div = document.getElementById("mostrarPersonaje");
    let textoPersonaje = "";
    let alertaMostrada = false;

    listaAnimales.forEach((mascota, index) => {
        let contenido = "";

        if (mascota.felicidad <= 0 || mascota.hambre <= 0) {
            alert("Alimenta o juega con tu creacion " + mascota.nombre + " que no tiene energias");
            contenido = `<button onclick="alimentarMascota(${index})">Alimentar</button>`;
        } else {
            contenido = `
                <button onclick="alimentarMascota(${index})">Alimentar</button>
                <button onclick="jugarMascota(${index})">Jugar</button>
                <button onclick="dormirMascota(${index})">Dormir</button>
            `;
        }

        textoPersonaje += `
            Mascota creada: ${mascota.nombre}, tipo: ${mascota.tipo}, 
            felicidad: ${mascota.felicidad}, hambre: ${mascota.hambre}<br>
            ${contenido}<br><br>
        `;
    });

    div.innerHTML = textoPersonaje;
}