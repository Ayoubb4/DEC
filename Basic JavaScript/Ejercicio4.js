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
