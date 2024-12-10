// Definimos nuestras variables globales, como el mazo de cartas, las manos del jugador y el crupier, 
// puntuaciones y otras variables para controlar el flujo del juego
let mazo = [],
    jugador = [],
    crupier = [],
    puntuacionJugador = 0,
    puntuacionCrupier = 0;
let usuarioActivo = null,
    saldoActual = 0,
    apuestaActual = 0,
    puedePlantarse = false,
    yaSePlanto = false;

// Clase Carta: Esta es la "plantilla" para las cartas. Cada carta tiene un valor y un palo.
class Carta {
    constructor(valor, palo) {
        this.valor = valor; // El valor de la carta (A, 2, 3... K)
        this.palo = palo; // El palo de la carta (♥, ♦, ♣, ♠)
    }

    // Esta función calcula la puntuación de la carta. Los valores son:
    // A = 11, J, Q, K = 10, y el resto de cartas son su valor numérico.
    obtenerPuntuacion() {
        if (this.valor === "A") {
            return 11; // El As vale 11
        } else if (this.valor === "J" || this.valor === "Q" || this.valor === "K") {
            return 10; // Las figuras valen 10
        } else {
            return parseInt(this.valor); // Los números se devuelven tal cual
        }
    }

    // Esta función genera el nombre del archivo de la carta, dependiendo de su valor y palo
    obtenerNombreArchivo() {
        return `${this.valor}${{ "♥": "H", "♦": "D", "♣": "C", "♠": "S" }[this.palo]}.png`;
    }
}

// Función que genera el mazo de cartas. Mezcla las cartas para que el juego sea aleatorio.
function generarMazo() {
    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const palos = ["♥", "♦", "♣", "♠"];
    let mazo = [];

    // Aquí estamos creando todas las cartas del mazo combinando valores y palos
    for (let i = 0; i < valores.length; i++) {
        for (let j = 0; j < palos.length; j++) {
            mazo.push(new Carta(valores[i], palos[j])); // Añadimos una nueva carta al mazo
        }
    }

    // Mezclamos el mazo con el algoritmo de Fisher-Yates (de forma sencilla)
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Elige una posición aleatoria
        const temp = mazo[i]; // Intercambia las cartas
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }

    return mazo;
}

// Función para repartir una carta. Simplemente saca la primera carta del mazo
function repartirCarta() {
    if (mazo.length > 0) {
        const carta = mazo[0]; // Sacamos la primera carta
        mazo.splice(0, 1); // Eliminamos la primera carta del mazo
        return carta; // La devolvemos
    }
    return null; // Si el mazo está vacío, no se puede repartir más cartas
}

// Calcula la puntuación de una mano (el conjunto de cartas que tiene el jugador o el crupier).
function calcularPuntuacion(mano) {
    let puntuacion = 0;

    // Vamos sumando los valores de cada carta
    for (let i = 0; i < mano.length; i++) {
        if (mano[i]) {
            puntuacion += mano[i].obtenerPuntuacion();
        }
    }

    // Si la puntuación supera 21 y hay Ases, los Ases se cuentan como 1 en lugar de 11
    for (let i = 0; i < mano.length; i++) {
        if (mano[i] && mano[i].valor === "A" && puntuacion > 21) {
            puntuacion -= 10; // Restamos 10 para que el As valga 1 en vez de 11
        }
    }

    return puntuacion; // Devolvemos la puntuación final
}

// Muestra las cartas del jugador o del crupier en la interfaz
function mostrarCartas(mano, contenedorId) {
    const contenedor = document.getElementById(contenedorId); // Obtenemos el contenedor donde mostrar las cartas
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de mostrar las cartas

    // Por cada carta en la mano, la agregamos al contenedor en formato de imagen
    for (let i = 0; i < mano.length; i++) {
        if (mano[i] !== null) {
            const img = `<img src="cartas/${mano[i].obtenerNombreArchivo()}" alt="${mano[i].valor} de ${mano[i].palo}" />`;
            contenedor.innerHTML += img; // Agregamos la carta al contenedor
        }
    }
}

// Función para iniciar una nueva partida
function nuevaPartida() {
    if (saldoActual <= 0) { // Si no tienes saldo suficiente, te lo avisa y te pide ingresar saldo
        alert("No tienes saldo suficiente. Ingresa un saldo primero.");
        document.getElementById("configSaldo").style.display = "block"; // Mostrar configuración de saldo
        document.getElementById("juego").style.display = "none"; // Ocultar juego
        return;
    }

    // Regeneramos el mazo, repartimos cartas y calculamos las puntuaciones
    mazo = generarMazo();
    jugador = [repartirCarta(), repartirCarta()]; // El jugador recibe dos cartas
    crupier = [repartirCarta()]; // El crupier recibe una carta
    puntuacionJugador = calcularPuntuacion(jugador); // Calculamos la puntuación del jugador
    puntuacionCrupier = calcularPuntuacion(crupier); // Calculamos la puntuación del crupier

    // Mostramos las cartas y puntuaciones en la interfaz
    mostrarCartas(jugador, "cartasJugador");
    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;
    document.getElementById("resultado").textContent = ""; // Limpiamos el resultado de la ronda anterior
    puedePlantarse = true; // El jugador puede decidir plantarse
    yaSePlanto = false; // No ha plantado aún
    document.getElementById("apuesta").style.display = "block"; // Mostrar la interfaz de apuesta
    actualizarSaldo(); // Actualizamos el saldo en pantalla
}

// Función para pedir una carta nueva para el jugador
function pedirCarta() {
    // Si el jugador o el crupier ya se pasaron de 21, no se puede pedir más cartas
    if (puntuacionJugador > 21 || puntuacionCrupier > 21) {
        return;
    }

    // Si no se ha pasado de 21, le damos una nueva carta al jugador
    jugador.push(repartirCarta());
    puntuacionJugador = calcularPuntuacion(jugador); // Recalculamos la puntuación del jugador
    mostrarCartas(jugador, "cartasJugador");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;

    // Si el jugador supera 21, se termina la partida
    if (puntuacionJugador > 21) {
        finalizarPartida(false); // El jugador pierde si pasa de 21
    }
}

// Función para que el jugador se plante
function plantarse() {
    // Si ya se pasó de 21, no puede plantarse
    if (puntuacionJugador > 21 || puntuacionCrupier > 21) {
        return;
    }

    yaSePlanto = true; // El jugador se ha plantado, ya no puede pedir más cartas

    // El crupier sigue pidiendo cartas hasta que tenga al menos 17 puntos
    while (puntuacionCrupier < 17 && mazo.length > 0) {
        crupier.push(repartirCarta()); // El crupier pide una carta
        puntuacionCrupier = calcularPuntuacion(crupier); // Recalculamos la puntuación del crupier
    }

    // Mostramos las cartas del crupier
    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;

    // Finalizamos la partida y evaluamos si el jugador ha ganado
    finalizarPartida(puntuacionJugador > puntuacionCrupier || puntuacionCrupier > 21);
}

// Función que evalúa el resultado final de la partida
function finalizarPartida(ganaste) {
    // Si el resultado es empate, no hacemos cambios en el saldo
    if (puntuacionJugador === puntuacionCrupier) {
        document.getElementById("resultado").textContent = "Empate. No se ha perdido saldo.";
        deshabilitarBotones(); // Deshabilitamos los botones porque la partida terminó
        return;
    }

    // Si el jugador ha ganado, se le duplica la apuesta
    if (ganaste) {
        saldoActual += apuestaActual * 2;
        document.getElementById("resultado").textContent = "¡Ganaste!";
    } else {
        // Si pierde, le restamos la apuesta
        saldoActual -= apuestaActual;
        document.getElementById("resultado").textContent = "Perdiste.";
    }

    // Si el jugador se queda sin saldo, se termina el juego
    if (saldoActual <= 0) {
        alert("Has quedado sin saldo. El juego ha terminado.");
        document.getElementById("configSaldo").style.display = "block"; // Pedimos que recargue saldo
        document.getElementById("juego").style.display = "none"; // Ocultamos el juego
    }

    actualizarSaldo(); // Actualizamos el saldo en pantalla
    deshabilitarBotones(); // Deshabilitamos los botones
}

// Deshabilita los botones de "plantarse" y "pedir carta" al final de la partida
function deshabilitarBotones() {
    document.getElementById("btnPlantarse").disabled = true;
    document.getElementById("btnPedirCarta").disabled = true;
}

// Actualiza el saldo en la pantalla
function actualizarSaldo() {
    const usuarios = cargarUsuarios();
    if (usuarioActivo) {
        usuarios[usuarioActivo].saldo = saldoActual; // Actualizamos el saldo del usuario activo
    }
    guardarUsuarios(usuarios); // Guardamos el saldo en el almacenamiento local
    document.getElementById("saldoDisponible").textContent = `Saldo disponible: ${Math.round(saldoActual * 100) / 100} €`; // Mostramos el saldo
}

// Cargar los usuarios desde el almacenamiento local
function cargarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || {}; // Si no hay usuarios, devolvemos un objeto vacío
}

// Guardar los usuarios en el almacenamiento local
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardamos los usuarios como un string JSON
}

// Función para manejar el inicio de sesión del usuario
function iniciarSesion() {
    gestionarUsuario("iniciar");
}

// Función para registrar un nuevo usuario
function registrar() {
    gestionarUsuario("registrar");
}

// Función que maneja tanto el inicio como el registro de usuario
function gestionarUsuario(tipo) {
    const username = document.getElementById("username").value.trim(); // Obtenemos el nombre de usuario
    if (!username) return mostrarError("El nombre de usuario es obligatorio."); // Si no hay nombre, mostramos un error

    let usuarios = cargarUsuarios(); // Cargamos los usuarios existentes

    if (tipo === "registrar") {
        if (usuarios[username]) {
            return mostrarError("El usuario ya existe."); // Si el usuario ya existe, mostramos un error
        }
    } else if (tipo === "iniciar") {
        if (!usuarios[username]) {
            return mostrarError("Usuario no encontrado."); // Si el usuario no existe, mostramos un error
        }
    }

    usuarioActivo = username; // Guardamos el usuario activo

    if (usuarios[username]) {
        saldoActual = usuarios[username].saldo || 0; // Si el usuario tiene saldo, lo asignamos
    } else {
        saldoActual = 0; // Si no tiene saldo, inicializamos en 0
    }

    usuarios[username] = { saldo: saldoActual }; // Si es un nuevo usuario, lo añadimos con su saldo
    guardarUsuarios(usuarios); // Guardamos los usuarios en el almacenamiento local

    document.getElementById("auth").style.display = "none"; // Ocultamos la pantalla de autenticación

    if (tipo === "registrar") {
        document.getElementById("configSaldo").style.display = "block"; // Si es registro, mostramos la pantalla de saldo
    } else {
        document.getElementById("apuesta").style.display = "block"; // Si es inicio de sesión, mostramos la pantalla de apuestas
        actualizarSaldo(); // Actualizamos el saldo del usuario
    }
}

// Función para establecer el saldo inicial del usuario
function setSaldo() {
    const saldoInicial = parseFloat(document.getElementById("saldoInput").value); // Obtenemos el saldo que el usuario desea ingresar
    if (!saldoInicial || saldoInicial <= 0) {
        return alert("Saldo inválido."); // Si el saldo no es válido, mostramos un mensaje de error
    }

    saldoActual = saldoInicial; // Asignamos el saldo inicial

    let usuarios = cargarUsuarios(); // Cargamos los usuarios

    if (usuarioActivo) {
        usuarios[usuarioActivo].saldo = saldoActual; // Si el usuario está activo, actualizamos su saldo
    } else {
        usuarios[usuarioActivo] = { saldo: saldoActual }; // Si no está activo, creamos un nuevo registro
    }

    guardarUsuarios(usuarios); // Guardamos los usuarios con el saldo actualizado
    actualizarSaldo(); // Actualizamos el saldo en la pantalla

    document.getElementById("configSaldo").style.display = "none"; // Ocultamos la pantalla de configuración de saldo
    document.getElementById("apuesta").style.display = "block"; // Mostramos la pantalla de apuestas
}

// Función para iniciar la apuesta (verifica que haya suficiente saldo)
function iniciarApuesta() {
    if (saldoActual <= 0) {
        alert("No tienes saldo suficiente. Ingresa un saldo primero.");
        document.getElementById("configSaldo").style.display = "block";
        document.getElementById("apuesta").style.display = "none";
        return;
    }

    // Verificamos que el monto de la apuesta sea válido
    const monto = parseFloat(document.getElementById("monto").value);
    if (!monto || monto <= 0 || monto > saldoActual) {
        return mostrarError("Apuesta inválida. Debes tener suficiente saldo.");
    }

    apuestaActual = monto; // Establecemos la apuesta actual
    document.getElementById("apuesta").style.display = "none"; // Ocultamos la pantalla de apuestas
    document.getElementById("juego").style.display = "block"; // Mostramos el juego

    nuevaPartida(); // Iniciamos una nueva partida
}

// Función para cambiar la visibilidad de un elemento
function cambiarVisibilidad(id, mostrar) {
    const elemento = document.getElementById(id);
    if (mostrar) {
        elemento.style.display = "block"; // Si se debe mostrar, cambiamos a block
    } else {
        elemento.style.display = "none"; // Si se debe ocultar, cambiamos a none
    }
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    document.getElementById("authMessage").textContent = mensaje; // Mostramos el mensaje en la interfaz
}