/* 
Crea un programa que simule la creacion de futbolistas, cada personaje tiene fuerza (entre 50 y 100),  resistencia(30 y 80), velocidad(20 y 70). Habra que mostrar los stats en el DOM cuando se crea el personaje.
Implementar una funcion para dar valores aleatorios dentro de un rango.
Mostrar las estadisticas del personake dentro de una pantalla.
*/

function generarValorAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function crearFutbolista() {
    const futbolista = {
        nombre: `Futbolista #${document.querySelectorAll('div').length}`,
        fuerza: generarValorAleatorio(50, 100),
        resistencia: generarValorAleatorio(30, 80),
        velocidad: generarValorAleatorio(20, 70)
    };

    const futbolistaHTML =
        `
        <div>
            <h3>${futbolista.nombre}</h3>
            <p><strong>Fuerza:</strong> ${futbolista.fuerza}</p>
            <p><strong>Resistencia:</strong> ${futbolista.resistencia}</p>
            <p><strong>Velocidad:</strong> ${futbolista.velocidad}</p>
        </div>
    `;

    document.getElementById('futbolistasContainer').innerHTML += futbolistaHTML;
}