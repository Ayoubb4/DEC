/* Ejercicio 3: Calculadora de Costo

Nivel: Intermedio
Objetivo: Introducir cálculos básicos y eventos.

Enunciado:

Crea un programa que calcule el costo de una compra:
   1.    Producto (seleccionable entre varias opciones con precios).
   2.    Cantidad.

Tareas:
   1.    Al seleccionar un producto y la cantidad, muestra el costo total dinámicamente.
   2.    Incluye validaciones para evitar números negativos o campos vacíos. */

function calcularCosto(){
    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById ("cantidad").value;
    const resultado = document.getElementById("resultado");

    if (!producto) {
        resultado.textContent = "Por favor, selecciona un producto.";
        return;
    }

    if (!cantidad || cantidad <= 0) {
        resultado.textContent = "Por favor, ingresa una cantidad valida.";
        return;
    }

    const costoTotal = producto * cantidad;
    document.getElementById("resultado").textContent = "Costo total: " + costoTotal + "€";
}