/* 
Crea una pagina que permita a los usuarios agregar y eliminar tareas en una lista, al agregar una tarea, se debe mostrar en la lista junto a un boton para eliminarla.
Al pulsar el boton de eliminar, se debe eliminar la tarea de la lista.

*/

let arrayTareas =[];

function  creaTarea(){
    const tituloTarea = document.getElementById('tituloTarea').value;
    const descTarea = document.getElementById('descTarea').value;
    arrayTareas.push(tituloTarea+"<br>"+descTarea);
    escribeTareas();
}
function escribeTareas(){
    let cuadroTareas = document.getElementById('cuadroTareas');
    cuadroTareas.innerHTML="";
    let contador = 1;
    arrayTareas.forEach(element => {
        cuadroTareas.innerHTML += "Tarea"+contador+" - "+element+"<br>";
        contador ++;

    });
}
function borrarTarea(){
    const numTarea= document.getElementById('numTarea').value;
    arrayTareas.splice(numTarea-1, 1);
    escribeTareas();
}