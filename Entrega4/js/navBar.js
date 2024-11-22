const btn_menu = document.getElementById('btn_menu');

// Variables para las líneas del menú hamburguesa
let lin1 = document.getElementById('linea1');
let lin2 = document.getElementById('linea2');
let lin3 = document.getElementById('linea3');

// Evento para mostrar/ocultar el menú al hacer clic en el botón
btn_menu.addEventListener('click', () => {
    const nav = document.getElementById('navbar');

    // Alternar las clases para mostrar u ocultar el menú
    if (nav.classList.contains('hidden')) {
        nav.classList.remove('hidden');
        nav.classList.add('visible');
        
        // Activar las animaciones de las líneas del botón hamburguesa
        lin1.classList.add('active');
        lin2.classList.add('active');
        lin3.classList.add('active');
    } else {
        nav.classList.add('hidden');
        nav.classList.remove('visible');
        
        // Desactivar las animaciones de las líneas del botón hamburguesa
        lin1.classList.remove('active');
        lin2.classList.remove('active');
        lin3.classList.remove('active');
    }
});
