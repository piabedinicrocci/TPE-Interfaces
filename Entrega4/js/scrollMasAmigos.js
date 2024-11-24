document.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y >= 4103 && y < 10144) {
        let n = Math.floor((y - 3783) / 600);

        let images = document.querySelectorAll('.amigos-diversion-image');

        for (let index = 0; index < images.length; index++) {
            if (index !== n) {
                // Ocultar imágenes fuera del índice actual
                images[index].classList.remove('active');
                images[index].style.transform = "translateX(-200%)";
            } else {
                // Mostrar la imagen activa con animación de rebote
                images[index].classList.add('active');
                images[index].style.transform = "unset";
                images[index].style.top = y - 4150 + "px";
            }
        }
    }

});