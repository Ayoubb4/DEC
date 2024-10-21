const enlace = document.getElementById('enlaceOpinion');
const parrafo = document.getElementById('listaOpiniones');


function Ejercicio2(){
    
    const boton = document.getElementById('boton');
    
    const opinionUsuario = prompt('Opinion de la pastica con cafelito');
        parrafo.innerHTML += opinionUsuario + "<br>";
        console.log (opinionUsuario);
        
/*     
        enlace.addEventListener('click', function(event) {
        const opinionUsuario = prompt('Opinion de la pastica con cafelito');
        parrafo.innerHTML += opinionUsuario + "<br>";
        console.log (opinionUsuario)
    }); 
*/
}
