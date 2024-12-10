/* Ejercicio 2: Manipulación Básica del DOM

Nivel: Fácil
Objetivo: Familiarizarse con la creación y eliminación de elementos en el DOM.

Enunciado:

Crea una página que permita a los usuarios agregar y eliminar elementos de una lista de tareas.

Tareas:
   1.    Agrega un campo de texto y un botón “Agregar tarea”.
   2.    Cada tarea agregada debe mostrarse en una lista con un botón “Eliminar” al lado.
   3.    Permite eliminar tareas al hacer clic en el botón correspondiente. */
let listaTareas = [];

function agregarTarea(){
    const tarea = document.getElementById("tareaInput").value;
    listaTareas.push(tarea);
    mostrarTareas();
}

function borrarTareas(posicion){
    listaTareas.splice(posicion,1);
    mostrarTareas();
}

function mostrarTareas(){
    const ulTareas = document.getElementById("listaTareas");
    let textoTareas = "";
    ulTareas.innerHTML = "";

    listaTareas.forEach((tarea, posicion) => {
        const divTarea = document.createElement("div");
        divTarea.textContent = tarea;
        

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = function() {
            borrarTareas(posicion);
        }

        divTarea.appendChild(botonEliminar);
        ulTareas.appendChild(divTarea);
        
    });
}
