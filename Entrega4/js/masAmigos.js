document.addEventListener("DOMContentLoaded", () => {
    const textos = document.querySelectorAll(".scroll-contenedor-textos > div");
    const imagenes = document.querySelectorAll(".scroll-imagenes img");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(textos).indexOf(entry.target);
                    imagenes.forEach((img, i) => {
                        img.classList.toggle("active", i === index);
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    textos.forEach((texto) => observer.observe(texto));
});
