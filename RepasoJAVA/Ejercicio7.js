/* 
Ejercicio 7: Estadísticas por Categoría
Objetivo: Trabajar con la asignación de valores basados en categorías.
Crea un programa que registre personajes con una profesión (e.g., Guerrero, Mago, Arquero) y
estadísticas automáticas:
1. Estadísticas por Profesión:
- Guerrero: Fuerza alta, Velocidad media.
- Mago: Inteligencia alta, Resistencia media.
- Arquero: Velocidad alta, Precisión media.
Tareas:
1. Genera las estadísticas automáticamente según la profesión.
2. Muestra los personajes registrados en una lista. 
*/

let personajes = [];
class Personaje {
    constructor(profesion){
        this.profesion = profesion;
        switch(this.profesion){
            case "Guerrero":
                this.fuerza = 100;
                this.velocidad = 55;
                this.inteligencia = 20;
                this.resistencia =20;
                this.precision = 15;
                break;
            case "Mago":
                this.fuerza = 20;
                this.velocidad = 15;
                this.inteligencia = 100;
                this.resistencia = 55;
                this.precision = 20;
                break;
            case "Arquero":
                this.fuerza = 30;
                this.velocidad = 90;
                this.inteligencia = 30;
                this.resistencia =15;
                this.precision = 50;
                break;
            default:
                break;  
        }
    }
}

function crearPersonaje(){
    const tipoPersonaje = document.getElementById("tipoPersonaje").value;
    let personaje1 = new Personaje(tipoPersonaje);
    let texto = document.getElementById("");
    
    text.innerHTML = "Has creado un "+ newPersonaje.profesion +"<br>Caracteristicas: Fuerza ->"+ newPersonaje.fuerza +" Velocidad-> "+ newPersonaje.velocidad +" Inteligencia-> "+ newPersonaje.inteligencia +" Resistencia-> "+newPersonaje.resistencia+" Precision-> "+ newPersonaje.precision;
    arrayPersonajes.push(newPersonaje);
}