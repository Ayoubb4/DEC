/* 
Crea una pagina que permita a los usuarios agregar y eliminar tareas en una lista, al agregar una tarea, se debe mostrar en la lista junto a un boton para eliminarla.
Al pulsar el boton de eliminar, se debe eliminar la tarea de la lista.

*/

function agregarTarea() {
    var tareaInput = document.getElementById("tareaInput");
    var tareaTexto = tareaInput.value.trim();

    if (tareaTexto == "") {
        alert("Por favor ingresa una tarea.");
        return;
    }

    var li = document.createElement("li");
    li.textContent = tareaTexto;

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = function() {
        li.remove();
    };

    li.appendChild(botonEliminar);

    document.getElementById("listaTareas").appendChild(li);

}