const userMenuButton = document.querySelector('.user-menu-toggle');
const userMenu = document.querySelector('#menu-usuario-id');

userMenuButton.addEventListener('click', function () {
    if (userMenu.style.maxHeight && userMenu.style.maxHeight !== '0px') {
        userMenu.style.maxHeight = '0';
    } else {
        userMenu.style.maxHeight = '400px';
    }
});

const categoryMenuButton = document.querySelector('.categories-menu-toggle');
const categoryMenu = document.querySelector('#menu-categorias-id');

categoryMenuButton.addEventListener('click', function () {
    if (categoryMenu.style.maxHeight && categoryMenu.style.maxHeight !== '0px') {
        categoryMenu.style.maxHeight = '0';
    } else {
        categoryMenu.style.maxHeight = '400px';
    }
});