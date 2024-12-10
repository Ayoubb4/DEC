<<<<<<< HEAD
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
=======
/* 4.- Crear una función que calcule el mcm de un número indefinido de números que se pasan como parámetros
de la función. Esta función se puede implementar de varias maneras, pero vamos a ir a una simple a partir de la
siguiente definición:
"el mcm de un conjunto de números es el primer número donde la división entre todos los anteriores es exacta"
(4 puntos) */

function mcm(a, b) {
    const mcd = (x, y) => y == 0 ? x : mcd(y, x % y);
    return (a * b) / mcd(a, b);
}

let entrada = prompt("Introduce nº separados por comas:");
let numeros = entrada.split(",");
//convierte en nº reales de string del array a nº real
for (let i = 0; i < numeros.length; i++) {
    numeros[i] = parseInt(numeros[i]);
}

let resultado = numeros.reduce((acc, num) => mcm(acc, num));

alert("El MCM de los nº es: " + resultado);
>>>>>>> 87aa66a (Fin Ejercicios CASA 29/11/2024)
