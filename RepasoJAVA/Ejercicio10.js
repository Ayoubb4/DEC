/* Ejercicio 10: Simulación de Combate
Objetivo: Introducir lógica más compleja y combinatoria.
Crea un programa que simule un combate entre dos personajes:
1. Cada personaje tiene estadísticas de Ataque, Defensa y Velocidad.
2. Calcula quién gana basándote en las estadísticas.
3. Permite generar personajes aleatorios para el combate. */

/* let listaPersonajes = [];

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
    listaPersonajes = [];

    for (let i = 0; i < 2; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const ataque = Math.floor(Math.random() * 100) + 1;
        const defensa = Math.floor(Math.random() * 100) + 1;
        const velocidad = Math.floor(Math.random() * 100) + 1;

        const personaje = new Personaje(nombre, ataque, defensa, velocidad);
        listaPersonajes.push(personaje);
    }

    mostrarPersonaje();
}

function mostrarPersonaje() {
    const div = document.getElementById("personajes")
    let textoPersonajes = "";

    listaPersonajes.forEach(personaje => {
        textoPersonajes += "Personaje: " + personaje.nombre + ", con ATAQUE " + personaje.ataque + ", con DEFENSA " + personaje.defensa + "y con velocidad " + personaje.velocidad + "<br>";
    })

    div.innerHTML = textoPersonajes;
}

function iniciarCombate() {
    const divResultado = document.getElementById("resultado");

    if (listaPersonajes.length < 2) {
        divResultado.innerHTML = "Debes generar al menos 2 personajes para iniciar un combate.";
        return;
    }

    const personaje1 = listaPersonajes[0];
    const personaje2 = listaPersonajes[1];

    const poder1 = personaje1.calculoPoder();
    const poder2 = personaje2.calculoPoder();

    let textoResultado = `
        <p><strong>${personaje1.nombre}</strong> tiene un poder total de: ${poder1.toFixed(2)}</p>
        <p><strong>${personaje2.nombre}</strong> tiene un poder total de: ${poder2.toFixed(2)}</p>
    `;

    if (poder1 > poder2) {
        textoResultado += `<p>¡El ganador es: <strong>${personaje1.nombre}</strong>!</p>`;
    } else if (poder2 > poder1) {
        textoResultado += `<p>¡El ganador es: <strong>${personaje2.nombre}</strong>!</p>`;
    } else {
        textoResultado += `<p>¡Es un empate!</p>`;
    }

    divResultado.innerHTML = textoResultado;
} */


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
        return this.ataque + this.defensa + this.velocidad;
    }
}

function generarPersonajes() {
    const nombres = ["Barbaro", "Arquero", "Espadachin", "Mago", "Jinete"];
    listaPersonajes = [];

    for (let i = 0; i < 2; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const ataque = Math.floor(Math.random() * 100) + 1;
        const defensa = Math.floor(Math.random() * 100) + 1;
        const velocidad = Math.floor(Math.random() * 100) + 1;

        let personaje = new Personaje(nombre, ataque, defensa, velocidad);

        listaPersonajes.push(personaje);
    }

    mostrarPersonaje();
}

function iniciarCombate() {
    const divResultado = document.getElementById("resultado");

    const p1 = listaPersonajes[0];
    const p2 = listaPersonajes[1];


    const poder1 = p1.calculoPoder();
    const poder2 = p2.calculoPoder();

    let textoResultado = `
        <p><strong>${p1.nombre}</strong> tiene un poder total de: ${poder1.toFixed(2)}</p>
        <p><strong>${p2.nombre}</strong> tiene un poder total de: ${poder2.toFixed(2)}</p>
    `;

    if (poder1 > poder2) {
        textoResultado += `<p>¡El ganador es: <strong>${p1.nombre}</strong>!</p>`;
    } else if (poder2 > poder1) {
        textoResultado += `<p>¡El ganador es: <strong>${p2.nombre}</strong>!</p>`;
    } else {
        textoResultado += `<p>¡Es un empate!</p>`;
    }

    divResultado.innerHTML = textoResultado;

}

function mostrarPersonaje() {
    const div = document.getElementById("personajes");
    let textoPersonajes = "";

    listaPersonajes.forEach(personaje => {
        textoPersonajes += "Personaje: " + personaje.nombre + ", con ATAQUE " + personaje.ataque + ", con DEFENSA " + personaje.defensa + "y con velocidad " + personaje.velocidad + "<br>";
    });

    div.innerHTML = textoPersonajes;
}