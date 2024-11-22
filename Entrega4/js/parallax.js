document.addEventListener("scroll", () => {
    const y = window.pageYOffset;

    //efecto Parallax
    const parallaxItems = document.querySelectorAll(".parallax");
    parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute("data-speed")) || 0;
        const initialTop = parseFloat(item.getAttribute("data-initial-top")) || 0;
        item.style.top = `${initialTop - y * speed}px`;
    });

    //desaparición de sombras
    const shadows = document.querySelectorAll(".shadow");
    const maxY = 600;
    const shadowAlpha = Math.max(0, 0.4 - (Math.min(y, maxY) / maxY) * 0.4);

    shadows.forEach(shadow => {
        shadow.style.background = `rgba(68, 104, 63, ${shadowAlpha})`;
        shadow.style.boxShadow = `0 0 10px 10px rgba(68, 104, 63, ${shadowAlpha})`;
    });

});