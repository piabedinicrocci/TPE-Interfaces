// Función que se llama al scrollear, se encarga de llamar a otras funciones
function getScroll() {
    const y = this.pageYOffset

    checkScrollForCardsAnimation(y)

    moveLogo(y)

    parallaxEffect(y)

    disappearShadows(y)

    moveImages(y)

    if (y >= 10800) {
        document.querySelector(".contenedor-video").style.animation = "transformUnset 2s ease-in-out both"
        document.querySelector(".personaje3").style.animation = "transformUnset 1s ease-in-out both"
    }
}