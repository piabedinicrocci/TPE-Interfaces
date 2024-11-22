// Lista de imágenes para cada sección
const images = [
    "img/section4/10.svg", // Sumas Mágicas
    "img/section4/11.svg", // Rompecabezas de Restas
    "img/section4/12.svg", // Carrera de Conteo
    "img/section4/13.svg", // Encuentra el Número Oculto
    "img/section4/14.svg", // Desafío de Comparación
    "img/section4/15.svg", // Forma el Número Correcto
    "img/section4/16.svg", // Encuentra el Número Oculto
    "img/section4/17.svg", // Salto de Sumas
    "img/section4/18.svg", // Rompecabezas de Secuencias
    "img/section4/19.svg", // El Desafío del Doble
    "img/section4/20.svg", // Aventura de Divisiones
    "img/section4/21.svg"  // Suma de Amigos
];

const stickyImage = document.getElementById("sticky-image");
const textSections = document.querySelectorAll(".scroll-contenedor-textos div");

// Función para manejar el cambio de imagen
const handleScroll = () => {
    let currentIndex = 0;

    // Verificar qué sección está en el viewport
    textSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            currentIndex = index;
        }
    });

    // Cambiar imagen si es necesario
    if (images[currentIndex] && stickyImage.src !== images[currentIndex]) {
        stickyImage.style.opacity = 0; // Transición de salida
        setTimeout(() => {
            stickyImage.src = images[currentIndex];
            stickyImage.style.transform = "scale(1.1)"; // Zoom suave
            stickyImage.style.opacity = 1; // Transición de entrada
        }, 500);
    }
};

// Escuchar evento de scroll
window.addEventListener("scroll", handleScroll);