/*  Ejercicio 9: Proyecto Mini-Tienda
Objetivo: Combinar validaciones, manipulación del DOM y POO.
Crea un sistema para gestionar una mini-tienda:
1. Permite agregar productos con los siguientes datos:
- Nombre.
- Precio.
- Categoría (e.g., Electrónica, Ropa, Comida).
2. Muestra los productos registrados en pantalla.
3. Agrega un filtro dinámico para buscar productos por categoría.*/

let listaProductos = [];

class Producto{
    constructor(nombre, precio, categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

function creaProducto(){
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    
    let producto = new Producto(nombre,precio,categoria);

    listaProductos.push(producto);
}

function mostrarProducto(){
    
    let texto = "";
    let div = document.getElementById("divProductos");

    listaProductos.forEach(producto => {
            texto += "Producto: " + producto.nombre + ", precio: " + producto.precio + ", categoria: " + producto.categoria + "<br>"; 
        
    });

    div.innerHTML = texto;
}
function filtroProducto(){
    const filtro = document.getElementById("filtro").value;

    let textoFiltro = "";

    let div = document.getElementById("divProductos");

    listaProductos.forEach(producto =>{
            if(producto.categoria == filtro){
            textoFiltro += "El Producto encontrado es: " + producto.nombre + ", precio: " + producto.precio + ", categoria: " + producto.categoria + "<br>";
            }
        
    });

    div.innerHTML= textoFiltro;

}
