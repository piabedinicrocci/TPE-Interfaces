// Función para manejar el movimiento del cursor y aplicar efectos
function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Movimiento de la imagen "characters" en dirección opuesta al cursor
    const characters = document.getElementById('number-blocks-personajes');
    if (characters) {
        const offsetX = (window.innerWidth / 2 - mouseX) / 10;
        const offsetY = (window.innerHeight / 2 - mouseY) / 10;
        characters.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }


}
// Asignar el evento de movimiento del mouse
window.addEventListener('mousemove', handleMouseMove);
