window.addEventListener("scroll", () => {
    const y = window.pageYOffset;
    //activa las animaciones cuando se llega a una posición específica
    if (y >= 9000) { 
        document.querySelector(".contenedor-video").style.animation = "moveVideo 2s ease-in-out both";
        document.querySelector(".personaje3").style.animation = "moveCharacter 1.5s ease-in-out both";
    }
});
