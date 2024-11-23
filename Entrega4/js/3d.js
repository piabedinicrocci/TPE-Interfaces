function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Movimiento del elemento 2D (characters)
    const characters = document.getElementById('personaje1_3d');
    if (characters) {
        const offsetX = (window.innerWidth / 2 - mouseX) / 10;
        const offsetY = (window.innerHeight / 2 - mouseY) / 10;
        characters.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    // Movimiento del modelo 3D (character1_3d)
    const character3d = document.querySelector("#personaje1_3d");
    if (character3d) {
        const maxY = window.innerWidth;
        const angle = Math.max(0, 360 - (Math.min(mouseX, maxY) / maxY) * 360);
        character3d.setAttribute("camera-orbit", `${angle}deg 80deg`);
    }
}

// Registrar el evento para movimiento del mouse
window.addEventListener('mousemove', handleMouseMove);