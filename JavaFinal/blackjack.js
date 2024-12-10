// Definimos nuestras variables
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

// Clase Carta: Esta es la plantilla para las cartas. Cada carta tiene un valor y un palo.
class Carta {
    constructor(valor, palo) {
        this.valor = valor;
        this.palo = palo; 
    }

    // Esta funcion calcula la puntuación de la carta. Los valores son:
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

    // Esta funcion genera el nombre del archivo de la carta, con su valor y palo
    obtenerNombreArchivo() {
        return `${this.valor}${{ "♥": "H", "♦": "D", "♣": "C", "♠": "S" }[this.palo]}.png`;
    }
}

// Funcion que genera el mazo de cartas de forma aleatoria
function generarMazo() {
    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const palos = ["♥", "♦", "♣", "♠"];
    let mazo = [];

    // Aqui estamos creando todas las cartas del mazo combinando valores y palos
    for (let i = 0; i < valores.length; i++) {
        for (let j = 0; j < palos.length; j++) {
            mazo.push(new Carta(valores[i], palos[j])); // Añadimos una nueva carta al mazo
        }
    }

    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Elige una posicion aleatoria
        const temp = mazo[i];
        mazo[i] = mazo[j];
        mazo[j] = temp;
    }

    return mazo;
}

// Funcion para repartir una carta, saca la primera carta del mazo
function repartirCarta() {
    if (mazo.length > 0) {
        const carta = mazo[0]; // Sacamos la primera carta
        mazo.splice(0, 1); // Eliminamos la primera carta del mazo
        return carta; // La devolvemos
    }
    return null; // Si el mazo esta vacio, no se reparten
}

// Calcula la puntuacion de las cartas que se tienen
function calcularPuntuacion(mano) {
    let puntuacion = 0;

    // se va sumando los valores de cada carta
    for (let i = 0; i < mano.length; i++) {
        if (mano[i]) {
            puntuacion += mano[i].obtenerPuntuacion();
        }
    }

    // Si la puntuacion supera 21 y hay Ases, los Ases se cuentan como 1 en lugar de 11
    for (let i = 0; i < mano.length; i++) {
        if (mano[i] && mano[i].valor === "A" && puntuacion > 21) {
            puntuacion -= 10; // Restamos 10 para que el as valga 1
        }
    }

    return puntuacion; // Devolvemos la puntuacion final
}

// Muestra las cartas del jugador o del crupier
function mostrarCartas(mano, contenedorId) {
    const contenedor = document.getElementById(contenedorId); // Contenedor donde mostrar las cartas
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    // Por cada carta en la baraja que tenemos, la agregamos al contenedor en formato de imagen
    for (let i = 0; i < mano.length; i++) {
        if (mano[i] !== null) {
            const img = `<img src="cartas/${mano[i].obtenerNombreArchivo()}" alt="${mano[i].valor} de ${mano[i].palo}" />`;
            contenedor.innerHTML += img; // Agregamos la carta al contenedor
        }
    }
}

// Funcion para iniciar una nueva partida
function nuevaPartida() {
    if (saldoActual <= 0) { // Si no tienes saldo suficiente, te lo avisa y te pide ingresar saldo
        alert("No hay dinero, Mete dinero primero.");
        document.getElementById("configSaldo").style.display = "block"; // Mostrar configuración de saldo
        document.getElementById("juego").style.display = "none"; // Ocultar juego
        return;
    }

    // generamos el mazo, repartimos cartas y calculamos las puntuaciones
    mazo = generarMazo();
    jugador = [repartirCarta(), repartirCarta()]; // El jugador recibe dos cartas
    crupier = [repartirCarta()]; // El crupier recibe una carta
    puntuacionJugador = calcularPuntuacion(jugador); // Calculamos la puntuacion del jugador
    puntuacionCrupier = calcularPuntuacion(crupier); // Calculamos la puntuacion del crupier

    // Mostramos las cartas y puntuaciones en la interfaz
    mostrarCartas(jugador, "cartasJugador");
    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;
    document.getElementById("resultado").textContent = ""; // Limpiamos el resultado de la ronda anterior
    puedePlantarse = true; // El jugador puede decidir plantarse
    yaSePlanto = false; // No ha plantado aun
    document.getElementById("apuesta").style.display = "block"; // Mostrar la interfaz de apuesta
    actualizarSaldo(); // Actualizamos el saldo en pantalla
}

// Funcion para pedir una carta nueva para el jugador
function pedirCarta() {
    // Si el jugador o el crupier ya se pasaron de 21, no se puede pedir mas cartas
    if (puntuacionJugador > 21 || puntuacionCrupier > 21) {
        return;
    }

    // Si no se ha pasado de 21, le damos una nueva carta al jugador
    jugador.push(repartirCarta());
    puntuacionJugador = calcularPuntuacion(jugador); // Calculamos de nuevo la puntuacion del jugador
    mostrarCartas(jugador, "cartasJugador");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;

    // Si el jugador supera 21, se termina la partida
    if (puntuacionJugador > 21) {
        finalizarPartida(false); // El jugador pierde si pasa de 21
    }
}

// Funcion para que el jugador se plante
function plantarse() {
    // Si ya se paso de 21, no puede plantarse
    if (puntuacionJugador > 21 || puntuacionCrupier > 21) {
        return;
    }

    yaSePlanto = true; // El jugador se ha plantado, ya no puede pedir mas cartas

    // El crupier sigue pidiendo cartas hasta que tenga al menos 17 puntos
    while (puntuacionCrupier < 17 && mazo.length > 0) {
        crupier.push(repartirCarta()); // El crupier pide una carta
        puntuacionCrupier = calcularPuntuacion(crupier); // Recalculamos la puntuacion del crupier
    }

    // Mostramos las cartas del crupier
    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;

    // Finalizamos la partida y miramos si el jugador ha ganado
    finalizarPartida(puntuacionJugador > puntuacionCrupier || puntuacionCrupier > 21);
}

// Funcion que mira el resultado final de la partida
function finalizarPartida(ganaste) {
    // Si el resultado es empate, no hacemos cambios en el saldo
    if (puntuacionJugador === puntuacionCrupier) {
        document.getElementById("resultado").textContent = "Empate. Que suerte chaval";
        deshabilitarBotones(); // Deshabilitamos los botones porque la partida termino
        return;
    }

    // Si el jugador ha ganado, se le duplica la apuesta
    if (ganaste) {
        saldoActual += apuestaActual * 2;
        document.getElementById("resultado").textContent = "¡Ganaste, que duro que eres!";
        deshabilitarBotones();
    } else {
        // Si pierde, le restamos la apuesta
        saldoActual -= apuestaActual;
        document.getElementById("resultado").textContent = "Perdiste. Metele mas a ver si ganas ;)";
        deshabilitarBotones();
    }

    // Si el jugador se queda sin saldo, se termina el juego
    if (saldoActual <= 0) {
        alert("Te has quedado sin Moula. El juego ha terminado.");
        document.getElementById("configSaldo").style.display = "block"; // Pedimos que recargue saldo
        document.getElementById("juego").style.display = "none"; // Ocultamos el juego
    }

    actualizarSaldo(); // Actualizamos el saldo en pantalla
    deshabilitarBotones(); // Deshabilitamos los botones
}

// Deshabilita los botones de
function deshabilitarBotones() {
    document.getElementById("btnPlantarse").disabled = true;
    document.getElementById("btnPedirCarta").disabled = true;
}

// Actualiza el saldo en la pantalla
function actualizarSaldo() {
    const usuarios = cargarUsuarios();
    if (usuarioActivo) {
        usuarios[usuarioActivo].saldo = saldoActual; // Actualizamos el saldo del usuario
    }
    guardarUsuarios(usuarios); // Guardamos el saldo en el almacenamiento local
    document.getElementById("saldoDisponible").textContent = `Saldo disponible: ${Math.round(saldoActual * 100) / 100} €`;
}

// Cargar los usuarios desde el almacenamiento local
function cargarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || {}; // Si no hay usuarios, devolvemos un objeto vacío
}

// Guardar los usuarios en el almacenamiento local
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardamos los usuarios como un string JSON
}

// Funcion para manejar el inicio de sesion del usuario
function iniciarSesion() {
    gestionarUsuario("iniciar");
}

// Funcion para registrar un nuevo usuario
function registrar() {
    gestionarUsuario("registrar");
}

// Función que maneja tanto el inicio como el registro de usuario
function gestionarUsuario(tipo) {
    const username = document.getElementById("username").value.trim(); // Obtenemos el nombre de usuario
    const telefono = document.getElementById("telefono").value.trim(); // Obtenemos el teléfono
    const edad = document.getElementById("edad").value.trim(); // Obtenemos la edad

    if (!username) return mostrarError("El nombre de usuario es obligatorio."); // Validación de usuario

    let usuarios = cargarUsuarios(); // Cargamos los usuarios existentes

    if (tipo === "registrar") {
        if (usuarios[username]) {
            return mostrarError("El usuario ya existe."); // Si el usuario ya existe, mostramos un error
        }

        // Validaciones adicionales solo para el registro
        if (!validarTelefono(telefono)) return mostrarError("El telefono no es correcto. Debe tener 9 digitos");
        if (!validarEdad(edad)) return mostrarError("Debes ser mayor de edad para registrarte.");

        usuarios[username] = {
            telefono,
            edad: parseInt(edad),
            saldo: 0 // Saldo inicial
        };
    } else if (tipo === "iniciar") {
        if (!usuarios[username]) {
            return mostrarError("Usuario no encontrado."); // Si el usuario no existe, mostramos un error
        }
    }

    // Configuramos el usuario activo y su saldo
    usuarioActivo = username;
    saldoActual = usuarios[username].saldo || 0;

    guardarUsuarios(usuarios); // Guardamos los usuarios en el almacenamiento local
    document.getElementById("auth").style.display = "none"; // Ocultamos la pantalla de autenticación

    // Mostrar el saldo o permitir configurar uno inicial si es un registro
    if (tipo === "registrar") {
        document.getElementById("configSaldo").style.display = "block";
    } else {
        document.getElementById("apuesta").style.display = "block";
        actualizarSaldo(); // Actualizamos el saldo del usuario en pantalla
    }
}


// Funcion para validar el formato del teléfono
function validarTelefono(telefono) {
    const telefonoRegex = /^\d{9}$/; // El teléfono debe tener exactamente 9 dígitos
    return telefonoRegex.test(telefono);
}
function validarEdad(edad) {
    return Number(edad) >= 18; // Convertimos a numero y verificamos si es mayor de edad
}


// Funcion para establecer el saldo inicial del usuario
function setSaldo() {
    const saldoInicial = parseFloat(document.getElementById("saldoInput").value); // Obtenemos el saldo que el usuario desea ingresar
    if (!saldoInicial || saldoInicial <= 0) {
        return alert("No se puede hacer con ese dinero."); // Si el dinero no es valido, mostramos un mensaje de error
    }

    saldoActual = saldoInicial; // Asignamos el saldo inicial

    let usuarios = cargarUsuarios(); // Cargamos los usuarios

    if (usuarioActivo) {
        usuarios[usuarioActivo].saldo = saldoActual; // Si el usuario esta activo, actualizamos su saldo
    } else {
        usuarios[usuarioActivo] = { saldo: saldoActual }; // Si no esta activo, creamos un nuevo registro
    }

    guardarUsuarios(usuarios); // Guardamos los usuarios con el saldo actualizado
    actualizarSaldo(); // Actualizamos el saldo en la pantalla

    document.getElementById("configSaldo").style.display = "none"; // Ocultamos la pantalla de configuracion de saldo
    document.getElementById("apuesta").style.display = "block"; // Mostramos la pantalla de apuestas
}

// Funcion para iniciar la apuesta (verifica que haya suficiente saldo)
function iniciarApuesta() {
    if (saldoActual <= 0) {
        alert("No tienes dinero suficiente. Ingresa un saldo primero.");
        document.getElementById("configSaldo").style.display = "block";
        document.getElementById("apuesta").style.display = "none";
        return;
    }

    // Verificamos que el monto de la apuesta sea válido
    const monto = parseFloat(document.getElementById("monto").value);
    if (!monto || monto <= 0 || monto > saldoActual) {
        return mostrarError("NONONO. Debes tener suficiente saldo.");
    }

    apuestaActual = monto; // Establecemos la apuesta actual
    document.getElementById("apuesta").style.display = "none"; // Ocultamos la pantalla de apuestas
    document.getElementById("juego").style.display = "block"; // Mostramos el juego

    nuevaPartida(); // Iniciamos una nueva partida
}

// Funcion para cambiar la visibilidad de un elemento
function cambiarVisibilidad(id, mostrar) {
    const elemento = document.getElementById(id);
    if (mostrar) {
        elemento.style.display = "block"; // Si se debe mostrar, cambiamos a block
    } else {
        elemento.style.display = "none"; // Si se debe ocultar, cambiamos a none
    }
}

// Funcion para mostrar mensajes de error
function mostrarError(mensaje) {
    document.getElementById("authMessage").textContent = mensaje; // Mostramos el mensaje
}