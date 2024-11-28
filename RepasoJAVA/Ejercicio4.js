/* Crea una clase vehiculo, con las siguientes prop y metodos */
/* 
Crea una clase vehiculo, con las siguientes prop y metodos
prop: marca, modelo, y vel max
metodos: mostrar detalles(muestra los detalles del vehiculo), aumentar velocidad(nos sirve para incrementar la velocidad maxima).
creamos lista de vehiculos, esa lista permite agregar y eliminar coches, y en el metodo cambia la vel maxima de un coche  
*/

class Vehiculo {
    constructor(marca, modelo, velocidadMaxima) {
        this.marca = marca;
        this.modelo = modelo;
        this.velocidadMaxima = velocidadMaxima;
    }

    mostrarDetalles() {
        return "Marca: " + this.marca + 
               ", Modelo: " + this.modelo + 
               ", Velocidad Máxima: " + this.velocidadMaxima + " km/h";
    }

    aumentarVelocidad(incremento) {
        this.velocidadMaxima += incremento;
    }
}

let coche;

function crearCoche() {
    coche = new Vehiculo(
        document.getElementById("marca").value,
        document.getElementById("modelo").value,
        parseInt(document.getElementById("velocidad").value, 10)
    );

    document.getElementById('datosContainer').innerHTML = `<p>${coche.mostrarDetalles()}</p>`;
}

function aumentarVelocidad() {
    if (!coche) {
        alert("Primero crea un coche.");
        return;
    }
    const incremento = parseInt(document.getElementById("incremento").value, 10);
    coche.aumentarVelocidad(incremento);

    document.getElementById('datosContainer').innerHTML = `<p>${coche.mostrarDetalles()}</p>`;
}
