const carousel = document.querySelector('.carrousel-juegos'); // Selecciona el contenedor de las tarjetas
let isDragging = false; // Bandera para indicar si se está arrastrando
let startX; // Posición inicial del mouse
let scrollLeft; // Posición de desplazamiento inicial

// Evento mousedown
carousel.addEventListener('mousedown', (e) => {
    isDragging = true; // Cambia la bandera a true
    startX = e.pageX - carousel.offsetLeft; // Captura la posición inicial del mouse
    scrollLeft = carousel.scrollLeft; // Captura la posición actual del scroll
    carousel.style.cursor = 'grabbing'; // Cambia el cursor a 'grabbing'
});

// Evento mouseleave
carousel.addEventListener('mouseleave', () => {
    isDragging = false; // Cambia la bandera a false al salir del área
    carousel.style.cursor = 'grab'; // Cambia el cursor de vuelta
});

// Evento mouseup
carousel.addEventListener('mouseup', () => {
    isDragging = false; // Cambia la bandera a false al soltar el botón del mouse
    carousel.style.cursor = 'grab'; // Cambia el cursor de vuelta
});

// Evento mousemove
carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Si no se está arrastrando, sale de la función
    e.preventDefault(); // Previene la selección de texto
    const x = e.pageX - carousel.offsetLeft; // Posición actual del mouse
    const walk = (x - startX) * 1; // Determina cuánto se ha movido el mouse
    carousel.scrollLeft = scrollLeft - walk; // Actualiza la posición del scroll
});