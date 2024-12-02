let mazo = [];
let jugador = [];
let crupier = [];
let puntuacionJugador = 0;
let puntuacionCrupier = 0;

let usuarioActivo = null;
let saldoActual = 0;
let apuestaActual = 0;
let puedePlantarse = false;

// Clase Carta
class Carta {
    constructor(valor, palo) {
        this.valor = valor;
        this.palo = palo;
    }

    obtenerPuntuacion() {
        if (this.valor === "J" || this.valor === "Q" || this.valor === "K") return 10;
        if (this.valor === "A") return 11;
        return parseInt(this.valor);
    }

    obtenerNombreArchivo() {
        const palosMap = { "♥": "H", "♦": "D", "♣": "C", "♠": "S" };
        return `${this.valor}${palosMap[this.palo]}.png`;
    }
}

function generarMazo() {
    const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const palos = ["♥", "♦", "♣", "♠"];
    mazo = [];

    palos.forEach(palo => {
        valores.forEach(valor => {
            mazo.push(new Carta(valor, palo));
        });
    });

    mazo.sort(() => Math.random() - 0.5);
}

function repartirCarta() {
    return mazo.pop();
}

function calcularPuntuacion(mano) {
    let puntuacion = 0;
    let ases = 0;

    mano.forEach(carta => {
        puntuacion += carta.obtenerPuntuacion();
        if (carta.valor === "A") ases++;
    });

    while (puntuacion > 21 && ases > 0) {
        puntuacion -= 10;
        ases--;
    }

    return puntuacion;
}

function mostrarCartas(mano, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    mano.forEach(carta => {
        const img = document.createElement("img");
        img.src = `cartas/${carta.obtenerNombreArchivo()}`;
        img.alt = `${carta.valor} de ${carta.palo}`;
        contenedor.appendChild(img);
    });
}

function nuevaPartida() {
    generarMazo();
    jugador = [repartirCarta(), repartirCarta()];
    crupier = [repartirCarta()];

    puntuacionJugador = calcularPuntuacion(jugador);
    puntuacionCrupier = calcularPuntuacion(crupier);

    mostrarCartas(jugador, "cartasJugador");
    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;

    document.getElementById("resultado").textContent = "";

    puedePlantarse = true;
    document.getElementById("apuesta").style.display = "block";
}

function pedirCarta() {
    if (puntuacionJugador >= 21) {
        document.getElementById("resultado").textContent = "No puedes pedir más cartas, te pasaste de 21.";
        return;
    }

    jugador.push(repartirCarta());
    puntuacionJugador = calcularPuntuacion(jugador);
    mostrarCartas(jugador, "cartasJugador");
    document.getElementById("puntuacionJugador").textContent = puntuacionJugador;

    if (puntuacionJugador > 21) {
        finalizarPartida(false);
    }
}

function plantarse() {
    if (!puedePlantarse) return;

    while (puntuacionCrupier < 17) {
        crupier.push(repartirCarta());
        puntuacionCrupier = calcularPuntuacion(crupier);
    }

    mostrarCartas(crupier, "cartasCrupier");
    document.getElementById("puntuacionCrupier").textContent = puntuacionCrupier;

    if (puntuacionCrupier > 21 || puntuacionJugador > puntuacionCrupier) {
        finalizarPartida(true);
    } else if (puntuacionJugador === puntuacionCrupier) {
        document.getElementById("resultado").textContent = "Empate.";
    } else {
        finalizarPartida(false);
    }

    puedePlantarse = false;
}
  
function finalizarPartida(ganaste) {
    if (ganaste) {
        saldoActual += apuestaActual * 2;
        document.getElementById("resultado").textContent = "¡Ganaste!";
    } else {
        saldoActual -= apuestaActual;
        document.getElementById("resultado").textContent = "Perdiste.";
    }

    document.getElementById("saldoDisponible").textContent = `Saldo disponible: $${saldoActual.toFixed(2)}`;

    actualizarSaldo();

    if (saldoActual <= 0) {
        document.getElementById("configSaldo").style.display = "block";
        document.getElementById("apuesta").style.display = "none";
    }
}

function actualizarSaldo() {
    const usuarios = cargarUsuarios();
    if (usuarioActivo) {
        usuarios[usuarioActivo].saldo = saldoActual;
        guardarUsuarios(usuarios);
    }
}

function cargarUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || {};
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
function iniciarSesion() {
    const username = document.getElementById("username").value.trim();

    if (!username) {
        document.getElementById("authMessage").textContent = "El nombre de usuario es obligatorio.";
        return;
    }

    let usuarios = cargarUsuarios();
    if (!usuarios[username]) {
        document.getElementById("authMessage").textContent = "Usuario no encontrado.";
        return;
    }

    usuarioActivo = username;
    saldoActual = usuarios[username].saldo;

    document.getElementById("saldoDisponible").textContent = `Saldo disponible: $${saldoActual.toFixed(2)}`;
    document.getElementById("auth").style.display = "none";
    document.getElementById("apuesta").style.display = "block";
    nuevaPartida();
}

function registrar() {
    const username = document.getElementById("username").value.trim();

    if (!username) {
        document.getElementById("authMessage").textContent = "El nombre de usuario es obligatorio.";
        return;
    }

    let usuarios = cargarUsuarios();
    if (usuarios[username]) {
        document.getElementById("authMessage").textContent = "El usuario ya existe. Por favor, inicia sesión.";
        return;
    }

    usuarios[username] = { saldo: 0 };
    guardarUsuarios(usuarios);

    usuarioActivo = username;

    document.getElementById("authMessage").textContent = "Registro completo. Ahora puedes añadir tu saldo inicial.";
    document.getElementById("auth").style.display = "none";    
    document.getElementById("configSaldo").style.display = "block"; 
}

function setSaldo() {
    const saldoInicial = document.getElementById("saldoInput").value.trim();


    if (saldoInicial === "" || saldoInicial <= 0 || saldoInicial != parseFloat(saldoInicial)) {
        alert("Por favor, ingresa un saldo válido.");
        return;
    }

    saldoActual = parseFloat(saldoInicial); 
    const usuarios = cargarUsuarios();
    usuarios[usuarioActivo].saldo = saldoActual;
    guardarUsuarios(usuarios);

    document.getElementById("configSaldo").style.display = "none"; 
    document.getElementById("apuesta").style.display = "block";
    document.getElementById("saldoDisponible").textContent = `Saldo disponible: $${saldoActual}`; 
}


function iniciarApuesta() {
    const montoApuesta = document.getElementById("monto").value;

    if (montoApuesta === "" || montoApuesta <= 0 || montoApuesta > saldoActual) {
        document.getElementById("errorApuesta").textContent = "Apuesta inválida. Debes apostar una cantidad válida y menor o igual a tu saldo.";
        return;
    }

    apuestaActual = parseFloat(montoApuesta);  

    // Ocultar el panel de apuesta y comenzar el juego
    document.getElementById("apuesta").style.display = "none";
    document.getElementById("juego").style.display = "block";  
    nuevaPartida();  // Iniciar la partida
}
