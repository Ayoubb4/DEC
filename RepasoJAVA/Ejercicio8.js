/* Ejercicio 8: Persistencia con localStorage
Objetivo: Aprender a usar localStorage para guardar datos.
Crea un programa que permita registrar libros en una biblioteca virtual con los siguientes datos:
1. Título.
2. Autor.
3. Año de publicación.
Tareas:
1. Guarda los libros registrados en localStorage.
2. Carga automáticamente la lista de libros cuando se recarga la página. */

let libros = [];

class Libro{
    constructor(titulo,autor,añoPublicacion){
        this.titulo = titulo;
        this.autor = autor;
        this.añoPublicacion = añoPublicacion;
    }

}

function crearLibro(){
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const añoPublicacion = document.getElementById('añoPublicacion').value;

    let Libro1 = new Libro(titulo,autor,añoPublicacion);
    libros.push(Libro1);

    localStorage.setItem('libros', JSON.stringify(libros));
}
