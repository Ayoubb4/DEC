let listaPersonajes = [];

// Función para generar números aleatorios dentro de un rango
function generarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Clase Campeon
class Campeon {
    constructor(nombre, alias, rol, habilidadPrincipal, dificultad) {
        this.nombre = nombre;
        this.alias = alias;
        this.rol = rol;
        this.habilidadPrincipal = habilidadPrincipal;
        this.dificultad = dificultad;
        this.campeones = [];
        switch (this.rol) {
            case "asesino":
                this.daño = generarAleatorio(70, 100);
                this.resistencia = generarAleatorio(30, 50);
                this.velocidad = generarAleatorio(80, 100);
                break;

            case "tanque":
                this.daño = generarAleatorio(40, 60);
                this.resistencia = generarAleatorio(80, 100);
                this.velocidad = generarAleatorio(30, 50);
                break;

            case "mago":
                this.daño = generarAleatorio(60, 90);
                this.resistencia = generarAleatorio(40, 60);
                this.velocidad = generarAleatorio(50, 70);
                break;

            case "soporte":
                this.daño = generarAleatorio(20, 40);
                this.resistencia = generarAleatorio(60, 80);
                this.velocidad = generarAleatorio(60, 70);
                break;

            case "luchador":
                this.daño = generarAleatorio(60, 70);
                this.resistencia = generarAleatorio(50, 60);
                this.velocidad = generarAleatorio(30, 50);
                break;

            case "tirador":
                this.daño = generarAleatorio(50, 80);
                this.resistencia = generarAleatorio(30, 50);
                this.velocidad = generarAleatorio(20, 40);
                break;
            default:
                break;
        }
    }
}

// Clase GestorDeCampeones
class GestorDeCampeones {
    constructor() {
        this.campeones = [];
    }

    agregarCampeon(campeon) {
        this.campeones.push(campeon);
        this.mostrarCampeonesDOM(); // Llamamos a mostrarCampeonesDOM después de agregar el campeón
    }

    eliminarCampeon(posicion) {
        // Eliminar el campeón del array
        this.campeones.splice(posicion, 1);
        this.mostrarCampeonesDOM(); // Actualizar la vista después de eliminar el campeón
    }

    mostrarCampeonesDOM() {
        const ul = document.getElementById("listaCampeones");
        const div = document.getElementById("presentaciones");

        ul.innerHTML = ''; // Limpiar la lista antes de mostrar los campeones actualizados

        let presentaciones = "";

        // Recorrer el array de campeones para mostrar todos los campeones actuales
        this.campeones.forEach((campeon, posicion) => {
            presentaciones += `¡${campeon.nombre} agregado como ${campeon.rol}!` + "<br>";

            let textoCampeones = ` 
                Campeón ${campeon.nombre} con el alias ${campeon.alias}, con su rol ${campeon.rol}, 
                habilidad seleccionada ${campeon.habilidadPrincipal}, ha escogido la dificultad ${campeon.dificultad},
                y con estadísticas ${campeon.daño} de daño, ${campeon.resistencia} de resistencia, ${campeon.velocidad} de velocidad
            `;

            let li = document.createElement("li");
            li.textContent = textoCampeones;

            // Crear un botón de eliminación para cada campeón
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = () => {
                this.eliminarCampeon(posicion); // Eliminar el campeón al hacer clic en el botón
            };

            li.appendChild(botonEliminar);
            ul.appendChild(li);
        });

        div.innerHTML = presentaciones;
    }
}

const gestor = new GestorDeCampeones();

function crearCampeon() {
    const nombre = document.getElementById("nombre").value;
    const alias = document.getElementById("alias").value;
    const rol = document.getElementById("rol").value;
    const habilidadPrincipal = document.getElementById("habilidad").value;
    const dificultad = document.getElementById("dificultad").value;

    const campeon = new Campeon(nombre, alias, rol, habilidadPrincipal, dificultad);
    gestor.agregarCampeon(campeon); // Usamos la función del gestor
}

// Funciones de validación de campos
function validarHabilidad() {
    const habilidadPrincipal = document.getElementById("habilidad").value;
    const habilidadesPattern = /^[a-zA-Z0-9]{1,100}$/;

    if (!habilidadesPattern.test(habilidadPrincipal)) {
        document.getElementById("errorHabilidad").textContent = "Solo números, letras y máximo 100 caracteres";
        return false;
    } else {
        document.getElementById("errorHabilidad").textContent = "";
        return true;
    }
}

function validarAlias() {
    const alias = document.getElementById("alias").value;
    const aliasPattern = /^[a-zA-Z0-9]{0,15}$/;

    if (!aliasPattern.test(alias)) {
        document.getElementById("errorAlias").textContent = "Solo números, letras y máximo 15 caracteres";
        return false;
    } else {
        document.getElementById("errorAlias").textContent = "";
        return true;
    }
}

function validarNombre() {
    const nombre = document.getElementById("nombre").value;
    if (nombre.trim() == "") {
        document.getElementById("errorNombre").textContent = "Este campo no puede estar vacío";
        return false;
    } else {
        document.getElementById("errorNombre").textContent = "";
        return true;
    }
}

// Función para validar todos los campos antes de habilitar el botón
function validarCampos() {
    if (validarNombre() && validarAlias() && validarHabilidad()) {
        document.getElementById("botonDisabled").disabled = false;
    } else {
        document.getElementById("botonDisabled").disabled = true;
    }
}
