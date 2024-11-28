/* Ejercicio 5:

Objetivo: Trabajar con la lógica de filtros y manipulación de arrays.
Crea una página que permita registrar películas con los siguientes datos:

1. Título.
2. Género: Acción, Drama, Comedia, Ciencia Ficción.
3. Año de lanzamiento.
Tareas:
1. Implementa un formulario para agregar películas a una lista.
2. Agrega un campo de búsqueda para filtrar las películas por género o por año. */

let arrayPeliculas = [];
class Pelicula{
    constructor(titulo,genero,año){
        this.titulo = titulo;
        this.genero = genero;
        this.año = año;
    }

}

function crearPelicula(){
    const titulo = document.getElementById('titulo').value;
    const genero  = document.getElementById('genero').value;
    const año = document.getElementById('año').value;
    const newPelicula = new Pelicula(titulo,genero,año);

    arrayPeliculas.push(newPelicula);
}

function filtrarAño(){
    console.log("ha entrado");
    const filtroAño = document.getElementById('filtroAño').value;
    document.getElementById('caja').innerHTML ="";
    let textCaja="";

    arrayPeliculas.forEach(element => {
        if (element.año> filtroAño) {
            textCaja +=  "Titulo: "+element.titulo+" genero: "+element.genero+" año: "+element.año+"<br>";
        }
    });
    document.getElementById('caja').innerHTML += textCaja;
    

}