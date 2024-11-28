let jugador = null;
let mazo = [];
let puntosJugador = 0;
let puntosComputadora = 0;
let saldoJugador = 0;
let saldoComputadora = 1000;
let apuesta = 0;

const formLogin = document.getElementById('formLogin');
const nombreJugadorInput = document.getElementById('nombreJugador');
const saldoJugadorInput = document.getElementById('saldoJugador');
const zonaJuego = document.getElementById('zonaJuego');
const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');
const resultado = document.getElementById('resultado');
const mensajeResultado = document.getElementById('mensajeResultado');
const jugadorPuntos = document.getElementById('jugadorPuntos');
const computadoraPuntos = document.getElementById('maquinaPuntos');
const jugadorCartas = document.getElementById('jugadorCartas');
const computadoraCartas = document.getElementById('computadoraCartas');
const saldoJugadorDisplay = document.getElementById('saldoJugadorDisplay');
const mensajeSaldo = document.getElementById('mensajeSaldo');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    jugador = nombreJugadorInput.value.trim();
    saldoJugador = parseFloat(saldoJugadorInput.value);

    if (!jugador || saldoJugador <= 0) {
        alert('Por favor, ingresa un nombre valido y un saldo mayor a 0.');
        return;
    }

    document.getElementById('formularioSesion').style.display = 'none';
    zonaJuego.style.display = 'block';

    actualizarSaldo();
});