"use strict";

const btn_menu = document.getElementById('btn_menu');
window.addEventListener("scroll", getScroll)
window.addEventListener('mousemove', getMouseMove)
// Se encarga de mostrar el menú al clickear el botón de menú hamburguesa
btn_menu.addEventListener('click', () => {
    let nav = document.getElementById('navbar');
    if (nav.classList.contains('hidden')) {
        nav.classList.remove('hidden');
        nav.classList.add('visible');
        lin1.classList.add('active');
        lin2.classList.add('active');
        lin3.classList.add('active');
    } else {
        nav.classList.add('hidden');
        lin1.classList.remove('active');
        lin2.classList.remove('active');
        lin3.classList.remove('active');
        nav.classList.remove('visible');
    }
})

// Función que se llama al mover el mouse, se encarga de llamar a otras funciones
function getMouseMove(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY

    charactersMove(mouseX, mouseY)
    move3dModel(mouseX)
}


// Hace que el logo se haga más chico de acuerdo al scroll
function moveLogo(y) {
    const logo = document.querySelector(".logo-numberBlocks");
    const header = document.querySelector("#header");

    let newWidth = 550 - y * 0.5
    let newTransform = 110 - y * 0.2
    let newGradient = y * 0.1

    if (newWidth > 150) {
        logo.style.width = newWidth + "px"
    } else {
        logo.style.width = "150px"
    }

    if (newTransform > 0) {
        logo.style.transform = "translateY(" + newTransform + "px)"
    } else {
        logo.style.transform = "translateY(0px)"
    }

    if (newGradient < 100) {
        header.style.background = "linear-gradient(180deg, #00D1D5 " + newGradient + "%, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0) 100%)"
    } else {
        header.style.background = "#00D1D5"
    }

}


let interval = setInterval(changeImage, 3000)
let repetition = 1


// Cambia las imágenes de la sección "La app más divertida y educativa y para niños de 
// 3 años" cada 3 segundos
function changeImage() {
    let imgs = document.querySelectorAll(".card-slid")

    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        img.style.transform = "translateX(" + -548.38 * repetition + "px)"
    }

    if (repetition < imgs.length - 1) {
        repetition++
    } else {
        repetition = 0
    }
}

// Mueve los personajes de la sección "Descubre el juego que convierte
// las Matemáticas en diversión" de acuerdo a la posición del mouse
function charactersMove(mouseX, mouseY) {
    const personaje = document.getElementById('number-blocks-personajes');

    // Calcula la dirección opuesta al cursor
    const offsetX = (window.innerWidth / 2 - mouseX) / 10;
    const offsetY = (window.innerWidth / 2 - mouseY) / 10;

    // Aplica el desplazamiento a la imagen
    personaje.style.transform = `translate(${offsetX}px,${offsetY}px)`;
}

// Mueve el modelo 3d de acuerdo a la posición del mouse
function move3dModel(mouseX) {
    const maxY = window.innerWidth
    const angle = Math.max(0, 360 - (Math.min(mouseX, maxY) / maxY) * 360)
    const character3d = document.querySelector("#personaje1_3d")
    character3d.setAttribute("camera-orbit", angle + "deg 80deg")
}
