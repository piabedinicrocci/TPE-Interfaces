const carousels = document.querySelectorAll('.carrousel-juegos');

carousels.forEach(carousel => {
    let isDragging = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1;
        carousel.scrollLeft = scrollLeft - walk;
    });

    let file = document.querySelector(.)



});
