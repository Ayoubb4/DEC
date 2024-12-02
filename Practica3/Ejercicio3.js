let posInicial = null;
let posFinal = null;
const icono = document.getElementById('icono');

document.addEventListener('click', (event) => {
  if (!posInicial) {
    posInicial = { x: event.clientX, y: event.clientY };
    console.log("Posición Inicial:", posInicial);
  } else if (!posFinal) {
    posFinal = { x: event.clientX, y: event.clientY };
    console.log("Posición Final:", posFinal);
  }
});

icono.addEventListener('click', () => {
  if (posInicial && posFinal) {
    let x = posInicial.x;
    let y = posInicial.y;

    const deltaX = (posFinal.x - x) / 100;
    const deltaY = (posFinal.y - y) / 100;

    const movimiento = setInterval(() => {
      x += deltaX;
      y += deltaY;
      icono.style.left = `${x}px`;
      icono.style.top = `${y}px`;

      if (
        (deltaX >= 0 && x >= posFinal.x || deltaX < 0 && x <= posFinal.x) &&
        (deltaY >= 0 && y >= posFinal.y || deltaY < 0 && y <= posFinal.y)
      ) {
        clearInterval(movimiento);
        icono.style.left = `${posFinal.x}px`;
        icono.style.top = `${posFinal.y}px`;

        posInicial = null;
        posFinal = null;
      }
    }, 5);
  }
});
