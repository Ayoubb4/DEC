/*Constructor objeto Campeon, tiene un constructor al que le añades nombre, alias, rol habilidadPrincipal y dificultad, 
segun el tipo de rol que tenga tendra unas estadisticas aleatorias o otras*/
class Campeon{
    constructor(nombre,alias,rol,habilidadPrincipal,dificultad){
        this.nombre = nombre;
        this.alias = alias;
        this.rol = rol;
        this.habilidadPrincipal = habilidadPrincipal;
        this.dificultad = dificultad;
        switch (rol) {
            case "Asesino":
                this.daño = Math.floor(Math.random()*(100 - 70 +1))+70;
                this.resistencia = Math.floor(Math.random()*(50 - 30 +1))+30;
                this.velocidad = Math.floor(Math.random()*(100 - 80 +1))+80;
                break;
            case "Tanque":
                this.daño = Math.floor(Math.random()*(60 - 40 +1))+40;
                this.resistencia = Math.floor(Math.random()*(100 - 80 +1))+80;
                this.velocidad = Math.floor(Math.random()*(50 - 30 +1))+30;
                break;
            case "Mago":
                this.daño = Math.floor(Math.random()*(90 - 60 +1))+60;
                this.resistencia = Math.floor(Math.random()*(60 - 40 +1))+40;
                this.velocidad = Math.floor(Math.random()*(70 - 50 +1))+50;
                break;
            case "Soporte":
                this.daño = Math.floor(Math.random()*(50 - 30 +1))+30;
                this.resistencia = Math.floor(Math.random()*(70 - 50 +1))+50;
                this.velocidad = Math.floor(Math.random()*(100 - 80 +1))+80;
                break;
            case "Luchador":
                this.daño = Math.floor(Math.random()*(80 - 50 +1))+50;
                this.resistencia = Math.floor(Math.random()*(70 - 50 +1))+70;
                this.velocidad = Math.floor(Math.random()*(90 - 60 +1))+60;
                break;
            case "Tirador":
                this.daño = Math.floor(Math.random()*(100 - 70 +1))+70;
                this.resistencia = Math.floor(Math.random()*(40 - 20 +1))+20;
                this.velocidad = Math.floor(Math.random()*(90 - 60 +1))+60;
                break;
            default:
                break;
        }
    }
}
/*Clase GestorDeCampeones, esta calse solo tiene un array al que se le iran añadiendo los Campeones que vayamos creando, tiene dos funciones
agregar Campeon, le añades un campeon a la funcion y te lo añade al array de la clase y eliminarCampeon le añades el indice del array y 
y te elimina el Campeon vinculado con la ubicacion de ese indice en el array */
class GestorDeCampeones{
    constructor(arrayCapmeones){
        this.arrayCapmeones = arrayCapmeones;
    }
    aregarCampeon(Campeon){
        if (validarHabilidad() && validarAlias() && validarNombre()) {
            this.arrayCapmeones.push(Campeon);
            return true;
        }
    }
    eliminarCampeon(indice){
        this.arrayCapmeones.splice(indice,1);
    }

}
/*creamos un objeto GestorDeCampeones y le añadimos un array vacio*/
let newGestor = new GestorDeCampeones([]);
/* estas variables las utilizaremos para validar el botón, cuando una validacion sea correcta su valor pasara a true */
let booleanNombre = false;
let booleanAlias = false;
let booleanHabilidad = false;

/* Esta funcion valida si el nombre no esta vacio, si lo esta escribira que no puede estar vacio, ejecutara la funcion habilitarBoton y devolvera 
false y si no lo esta cambiara el valor de su variable boolean y devolvera true*/
function validarNombre(){
    let nombre = document.getElementById('nombre').value;   
    if (!nombre =="") {
        booleanNombre = true;
        habilitarBoton();
        let textoNewCampeon = document.getElementById('errorNombre').innerHTML = "";
        return true;
    }else{
        booleanNombre = false;
        habilitarBoton();
        let textoNewCampeon = document.getElementById('errorNombre').innerHTML = "Nombre no valido, no puede estar vacio<br>";
        return false;
    }
}
/* Esta funcion valida si el alias es solo numeros y letras y no es mas de 15 caracters, si no cumple el requisito,escribira que no cumple con 
los requisitos, ejecutara la funcion habilitarBoton y devolvera false y si no lo esta cambiara el valor de su variable boolean y devolvera true*/
function validarAlias(){
    let alias = document.getElementById('alias').value;
    console.log(alias);
    let regex = /^[a-zA-Z0-9]{0,15}$/;
    if (regex.test(alias)) {
        booleanAlias = true;
        habilitarBoton();
        let textoNewCampeon = document.getElementById('errorAlias').innerHTML = "";
        return true;
    }else{
        booleanAlias = true;
        habilitarBoton();
        let textoNewCampeon = document.getElementById('errorAlias').innerHTML = "Alias no valido, solo puede tener letras y numeros y solo puede ser de 15 caracteres<br>"
        return false;
    }
}
/* Esta funcion valida si la habilidad tiene mas de 100 caracteres, si no cumple el requisito, escribira que no cumple con 
los requisitos, ejecutara la funcion habilitarBoton y devolvera false y si no lo esta cambiara el valor de su variable boolean y devolvera true*/
function validarHabilidad(){
    let habilidadPrincipal = document.getElementById('habilidad').value;
    let regex = /^[a-zA-Z0-9]{1,100}$/;
    if (regex.test(habilidadPrincipal)) {
        booleanHabilidad = true;
        habilitarBoton();
        console.log("alias");
        let textoNewCampeon = document.getElementById('errorHabilidad').innerHTML = ""
        return true;
    }else{
        booleanHabilidad = false;
        habilitarBoton();
        let textoNewCampeon = document.getElementById('errorHabilidad').innerHTML = "Habiliadd no valida, solo puede tener hasta 100 caracteres<br>"

        return false;
    }

}
/*esta funcion valida que todos los boolean sean true, el valor de los boolean se cambia cuando se valida o no el nombre, el alias o la hablidad 
principal y si se cumplen las validaciones activa el boton*/
function habilitarBoton(){
    let boton = document.getElementById('boton');
    if (booleanNombre &&  booleanAlias && booleanHabilidad) {
        boton.disabled = false;
    }else{
        boton.disabled = true;
    }
}
/*Esta funcion obtiene los atributos del html y crea un campeon, si cumple los requisitos se añade el campeon al array del objeto gestor,
 escribe si ha podido añadirlo o no y escribe todos los campeones del array*/
function crearCampeon(){
    let nombre = document.getElementById('nombre').value;
    let alias = document.getElementById('alias').value;
    let rol = document.getElementById('rol').value;
    let habilidadPrincipal = document.getElementById('habilidad').value;
    let dificultad = document.getElementById('dificultad').value;
    let newCampeon = new Campeon(nombre,alias,rol,habilidadPrincipal,dificultad);
    if (newGestor.aregarCampeon(newCampeon)) {
        let textoNewCampeon = document.getElementById('textoNewCampeon').innerHTML = "Has agregado a: "+newCampeon.nombre+" con un rol de: "+newCampeon.rol;
    }else{
        let textoNewCampeon = document.getElementById('textoNewCampeon').innerHTML = "Campeon no agregado";
    }
    console.log(newCampeon);
    escribirCampeones();
}
/* esta funcion obtiene el index del campeon mediante el numero del campeon le resta 1 por que el array empieza por 0, lo elimina 
y escribe todos los campeones del array */
function eliminarCampeon() {
    let numArray = document.getElementById('numArray').textContent -1;
    newGestor.eliminarCampeon(numArray);
    escribirCampeones();
}
/*Esta funcion se encarga de escribir todos los campeones que hay en el array creando divs con toda la información del campeon, 
tambien añade un contador para poder indicar de que campeon se trata y un boton para poder eliminar el campeon*/
function escribirCampeones(){
    let contador = 1;
    let text="";
    newGestor.arrayCapmeones.forEach(campeon => {
        
        text+= `<div id="campeon">
       <div class="text">
        ${campeon.nombre} <samp id="numArray">${contador}</samp><br>
        alias : ${campeon.alias} <br>
        rol: ${campeon.rol}  stats: daño: ${campeon.daño} resistencia: ${campeon.resistencia} velocidad: ${campeon.velocidad}<br>
        dificultad: ${campeon.dificultad} habilidad principal : ${campeon.habilidadPrincipal}
        <button type="button" onclick="eliminarCampeon()">Borrar</button><br>
       </p>
       
    </div>`
        contador++;
    });
    let arrayCampeones = document.getElementById('arrayCampeones').innerHTML = text;
}
/* 9.7 */