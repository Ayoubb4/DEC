const coordenadas = document.getElementById("coordenadas") ;

function cogeCoordenadas(event){
    const x = event.clientX;
    const y = event.clientY;
    coordenadas.textContent = `X: ${x}, Y: ${y}`;
};
    document.addEventListener("mousemove", cogeCoordenadas);
