// Lista de imágenes para cada sección
const images = [
    "img/section4/0.svg", // Sumas Mágicas
    "img/section4/1.svg", // Rompecabezas de Restas
    "img/section4/2.svg", // Carrera de Conteo
    "img/section4/3.svg", // Encuentra el Número Oculto
    "img/section4/4.svg", // Desafío de Comparación
    "img/section4/5.svg", // Forma el Número Correcto
    "img/section4/6.svg", // Encuentra el Número Oculto
    "img/section4/7.svg", // Salto de Sumas
    "img/section4/8.svg", // Rompecabezas de Secuencias
    "img/section4/9.svg", // El Desafío del Doble
    "img/section4/10.svg", // Aventura de Divisiones
    "img/section4/11.svg"  // Suma de Amigos
];

const stickyImage = document.querySelector('.scroll-imagenes');
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