"use strict";

document.addEventListener("DOMContentLoaded",()=>{

    function preloader() {
        let porcentaje = 0;
        const textPorcentaje = document.querySelector("#porcentaje-carga");
        if (textPorcentaje) {
            const contenedorCarga = document.querySelector("#contenedor-carga");
            const intervalo = setInterval(() => {
                if (porcentaje < 100) {
                    porcentaje = porcentaje + 1;
                    textPorcentaje.innerHTML = `${porcentaje}%`;
                }
            }, 50);
            setTimeout(() => {
                clearInterval(intervalo);
                contenedorCarga.classList.toggle("contenedor-carga-hidden");
            }, 5000);
        }
    }


    preloader();


})