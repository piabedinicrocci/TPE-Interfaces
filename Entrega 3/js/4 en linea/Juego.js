"use strict"

let canvas = document.querySelector('canvas-4-in-line');

canvas.width = 1370;
canvas.height = 600;

let ctx = canvas.getContext('2d');

let ct = document.getElementById("ct");
let tt =  document.getElementById("tt");
let timeOut = document.getElementById("time-out");
let timer = document.querySelector(".timer");

let flechaIzq = document.getElementById("flecha-izq");
let flechaDer = document.getElementById("flecha-der");

let mjeOk = document.getElementById("mje-ok");

let play = document.getElementById('jugar-btn');


let imgCostadoJ1 = new Image();

let imgCostadoJ2 = new Image();



imgInicio.onload = function() {
    drawInicio();
}

//Inicialización de variables
let imgFondo = new Image();
let width = canvas.width;
let height = canvas.height;
let turno = 1;
let isMouseDown = false;
let lastClickedFigure = null;
let firstTimeCharging = true;
let smtDropping = false;
let juegoFinalizado = false;
let filas = 0;
let columnas = 0;
let tam_ficha = 0;
let num_ganador = 0;
let radi
let posicionYFichasJ1 = 0;
let posicionYFichasJ2 = 0;
let line = 0;
let fichasJ1 = [];
let fichasJ2 = [];
let fichas = [];

//Dibuja la imagen de inicio del canvas
function drawInicio(){
    ctx.drawImage(imgInicio, 0, 0, canvas.width, canvas.height);
}

//Dibuja el mapa de fondo
function drawFondo(){
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(imgCostadoJ1, posicionYFichasJ1 - tam_ficha/4, canvas.height/3);

    ctx.drawImage(imgCostadoJ2, canvas.width/3*2.5, canvas.height/3);
}

//Crea el resto de figuras
function drawFigure(){
    clearCanvas();
    tablero.setTableroDibujado(false);

    //Chequeo si es la primera vez que carga la pantalla
    if(firstTimeCharging){
        imgFondo.onload = function(){
            setTimeout(() => {
                drawFondo();
                drawFichas();
                drawTablero();
            },100*3);
        }
    }else{
        drawFondo();
        drawFichas();
        drawTablero();
    }

    firstTimeCharging = false;
}

//Dibuja el tablero
function drawTablero(){
    if(firstTimeCharging){
        setTimeout(() => {
            tablero.draw();
        },100*3);
    }else{
        tablero.draw();
    }
}

//Dibuja las fichas, guardadas en el arreglo
function drawFichas(){
    if(firstTimeCharging){
        for(let i = 0; i<fichas.length; i++){
            setTimeout(() => {
                fichas[i].draw();
            },1500);
        }
    }else{
        for(let i = 0; i<fichas.length; i++){
            fichas[i].draw();
        }
    }
}

//Borra la totalidad del canvas
function clearCanvas(){
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, width, height);
}

//Permite instanciar las fichas, antes de dibujarlas
function crearFichas(){

    let cant_fichas = filas * columnas / 2;

    let posInicial = width/2 + (columnas/2*tam_ficha) + tam_ficha*1.5;

    for(let i = 0; i<cant_fichas; i++){
        let ficha = new Ficha(canvas.width-posInicial, posicionYFichasJ1, "white", ctx, radio, 1, fichaJ1, line);
        posicionYFichasJ1 = posicionYFichasJ1 - difPosicion;
        fichas.push(ficha);
        fichasJ1.push(ficha);
    }

    for(let i = 0; i<cant_fichas; i++){
        let ficha = new Ficha(posInicial, posicionYFichasJ2, "black", ctx, radio, 2, fichaJ2, line);
        posicionYFichasJ2 = posicionYFichasJ2 - difPosicion;
        fichas.push(ficha);
        fichasJ2.push(ficha);
    }
}

//Permite cambiar el turno del jugador
function cambiarTurno(){
    if(turno == 1){
        turno = 2;
        flechaIzq.classList.toggle("none");
        flechaDer.classList.toggle("none");
    }else{
        turno = 1;
        flechaIzq.classList.toggle("none");
        flechaDer.classList.toggle("none");
    }
}

//Al presionar el boton 'Jugar' inicializa el juego
play.addEventListener('click', function(e){
    let menu = document.querySelector(".game-menu");
    menu.classList.toggle("none");
    canvas.classList.toggle("pointer-events");
    let btns = document.querySelector(".game-playing");
    btns.classList.toggle("none");
    timer.classList.toggle("none");
    setTimeout(function(){
    }, 800)
    inicializar();
});

//Primer metodo para inicializar el juego, modularizado en varias funciones
function inicializar(){
    asignarTurno();
    configurarJuego();
    configurarJugadores();
    crearFichas();
    crearTablero();
    drawFigure();
    setTimeout(function(){
        iniciarTimer();
    }, 800);
}

//Dibuja la flecha, en base al turno
function asignarTurno(){
    let clasesFlechaIzq = Array.from(flechaIzq.classList);
    let clasesFlechaDer = Array.from(flechaDer.classList);
    if(turno==1){
        if(clasesFlechaIzq.includes("none")){
            flechaIzq.classList.toggle("none");
        }
    }else{
        if(clasesFlechaDer.includes("none")){
            flechaDer.classList.toggle("none");
        }
    }
}

//Saca las flechas, si ya termino el juego
function quitarFlechas(){
    let clasesFlechaIzq = Array.from(flechaIzq.classList);
    let clasesFlechaDer = Array.from(flechaDer.classList);
    if(!clasesFlechaIzq.includes("none")){
        flechaIzq.classList.toggle("none");
    }
    if(!clasesFlechaDer.includes("none")){
        flechaDer.classList.toggle("none");
    }
}

//Inicializa el timer, y genera una resta por segundo transcurrido
function iniciarTimer(){
    let time = timer.children[1];
    interval = setInterval(() => {
        
        time.innerHTML = `&nbsp;&nbsp;&nbsp;${timing}`;
        if(timing > 0){
            timing -= 1;
        }else{
            clearInterval(interval);
            mjeTimeOut();
        }
        if(timing<30){
            audioBomb.play();
        }
        if(timing<10){
            if (!playedAudio) {
                audioBlow.play();
                playedAudio = true;
              }
        }
    }, 1000);
}

//Limpia el intervalo del timer
function detenerTimer() {
    clearInterval(interval);
}

document.getElementById('restart').addEventListener('click', restart);

document.getElementById('return').addEventListener('click', refresh);

//Refresca la página, al volver atrás desde el juego
function refresh(){
    window.location.replace("gameView.html");
}

//Botón 'Reiniciar Juego'
function restart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    detenerTimer();
    reiniciarVariables();
    clearMensajes();
    clearCanvas();
    inicializar();
}

//Limpia los pop-up, si existen, de juego finalizado
function clearMensajes(){
    let clasesArrayCt = Array.from(ct.classList);
    let clasesArrayTt = Array.from(tt.classList);
    let clasesArrayTimer = Array.from(timeOut.classList);
    if(!clasesArrayCt.includes("none")){
        ct.classList.toggle("none");
    }
    if(!clasesArrayTt.includes("none")){
        tt.classList.toggle("none");
    }
    if(!clasesArrayTimer.includes("none")){
        timeOut.classList.toggle("none");
    }
}

//Reinicio variables, para el restart
function reiniciarVariables(){
    isMouseDown = false;
    lastClickedFigure = null;
    firstTimeCharging = true;
    filas = 0;
    columnas = 0;
    tam_ficha = 0;
    num_ganador = 0;
    radio = 0;
    tablero = null;
    fichaJ1 = "";
    fichaJ2 = "";
    posicionYFichasJ1 = 0;
    posicionYFichasJ2 = 0;
    difPosicion = 0;
    juegoFinalizado = false;
    smtDropping = false;
    timing = 0;
    fichasJ1 = [];
    fichasJ2 = [];
    fichas = [];
}

//Inicializacion del personaje elegido para la ficha de cada jugador
function configurarJugadores(){
    fichaJ1 = document.getElementById("fichaJ1").value;
    fichaJ2 = document.getElementById("fichaJ2").value;

    let P1 = fichaJ1.split("/");
    let P2 = fichaJ2.split("/");

    imgCostadoJ1.src = 'media/imagenes/4-en-linea/pj_'+P1[P1.length-1];
    imgCostadoJ2.src = 'media/imagenes/4-en-linea/pj_'+P2[P2.length-1];
}



//Configurarmos las variables del juego
function configurarJuego() {
    let select = elegirModo();
    filas = select[0];
    columnas = select[1];
    num_ganador = select[2];
    tam_ficha = select[3];
    radio = select[4];
    difPosicion = select[5];
    timing = select[6];
    line = select[7];
    let margen_tablero = height - filas*tam_ficha;
    posicionYFichasJ1 = (filas-1/2)*tam_ficha + margen_tablero;
    posicionYFichasJ2 = (filas-1/2)*tam_ficha + margen_tablero;

    if(num_ganador==5 || num_ganador==6){
        posicionYFichasJ1 = posicionYFichasJ1;
        posicionYFichasJ2 = posicionYFichasJ2;
    }

}

//Inicializacion de variables para el juego
function elegirModo(){
    let modo = document.getElementById("game-mode").value;
    let var_tablero = [];
    let filas, columnas, numero_ganador;
    
    //Variables para 4 en linea
    if (modo == 4) {
        filas = 6;
        var_tablero.push(filas);
        columnas = 7;
        var_tablero.push(columnas);
        numero_ganador = 4;
        var_tablero.push(numero_ganador);
        tam_ficha = 80;
        var_tablero.push(tam_ficha);
        radio = 33;
        var_tablero.push(radio);
        difPosicion = (radio/4*3);
        var_tablero.push(difPosicion);
        timing = 150;
        var_tablero.push(timing);
        line = 14;
        var_tablero.push(line);

    //Variables para 5 en linea
    } else if (modo == 5) {
        filas = 7;
        var_tablero.push(filas);
        columnas = 8;
        var_tablero.push(columnas);
        numero_ganador = 5;
        var_tablero.push(numero_ganador);
        tam_ficha = 72;
        var_tablero.push(tam_ficha);
        radio = 28;
        var_tablero.push(radio);
        difPosicion = (radio/4*2.5);
        var_tablero.push(difPosicion);
        timing = 200;
        var_tablero.push(timing);
        line = 14;
        var_tablero.push(line);

    //Variables para 6 en linea
    } else if (modo == 6) {
        filas = 8;
        var_tablero.push(filas);
        columnas = 9;
        var_tablero.push(columnas);
        numero_ganador = 6;
        var_tablero.push(numero_ganador);
        tam_ficha = 66;
        var_tablero.push(tam_ficha);
        radio = 27.5;
        var_tablero.push(radio);
        difPosicion = (radio/4*2);
        var_tablero.push(difPosicion);
        timing = 250;
        var_tablero.push(timing);
        line = 11;
        var_tablero.push(line);

    //Variables para 7 en linea
    } else if (modo == 7) {
        filas = 9;
        var_tablero.push(filas);
        columnas = 10;
        var_tablero.push(columnas);
        numero_ganador = 7;
        var_tablero.push(numero_ganador);
        tam_ficha = 58;
        var_tablero.push(tam_ficha);
        radio = 24;
        var_tablero.push(radio);
        difPosicion = (radio/4*2);
        var_tablero.push(difPosicion);
        timing = 300;
        var_tablero.push(timing);
        line = 9;
        var_tablero.push(line);
    } 

    return var_tablero;
}

//Instanciar tablero
function crearTablero(){
    tablero = new Tablero(ctx, width, height, filas, columnas, "green", tam_ficha);
}

//Se ejecuta cuando el mouse esté presionado
function onMouseDown(e){

    isMouseDown = true;

    if(lastClickedFigure != null){
        lastClickedFigure = null;
    }

    let ClientRect = canvas.getBoundingClientRect();

    var scaleX = canvas.width / ClientRect.width;
    var scaleY = canvas.height / ClientRect.height;

    let x =  (e.clientX - ClientRect.left) * scaleX;
    let y = (e.clientY - ClientRect.top) * scaleY;

    let clickFig = findClickedFigure(x , y ); //coordenadas x e y dentro del canvas

    if(clickFig!=null){
        lastClickedFigure = clickFig;
    }
    drawFigure();
}

//Se ejecuta cuando se levanta el mouse
function onMouseUp(e){
    isMouseDown = false;
    if(lastClickedFigure!=null){
        if(!isOnArea(lastClickedFigure)){
            lastClickedFigure.setOrigenPosition();
            drawFigure();
        }else{
            let posColumn = tablero.getColumn(lastClickedFigure);
            let movimiento = tablero.getHeight(posColumn);
            lastClickedFigure.setResaltado(false);
            let posRow = tablero.fillSpace(lastClickedFigure, posColumn);
            if(posRow>=0){
                lastClickedFigure.setDisable(true);
                lastClickedFigure.setPosX(tablero.getColumnPos(posColumn));
                lastClickedFigure.setPosY(tablero.getPosY());
                drawFigure();
                lastClickedFigure.setIsDropped(true);
                smtDropping = true;
                dropFigure(lastClickedFigure, (lastClickedFigure.getPosY() + movimiento), posRow, posColumn);
            }else{
                lastClickedFigure.setOrigenPosition();
                drawFigure();
            }
        }
    } 
}

//Permite identificar, en cada click, si se selecciono una ficha
function findClickedFigure(x, y){
    if(!smtDropping && !juegoFinalizado){
        let aux = [];
        if(turno == 1){
            aux = fichasJ1;
        }else{
            aux = fichasJ2;
        }
        for(let i = aux.length-1; i >= 0; i--){
            const element = aux[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }
}

//Pop-up de tiempo finalizado(bomb explosion)
function mjeTimeOut(){
    quitarFlechas();
    audioExplode.play();
    mjeOk.classList.toggle("none");
    timeOut.classList.toggle("none");
    juegoFinalizado = true;
}

//Al clickear 'OK', borra los pop ups de ganador/empate
mjeOk.addEventListener('click', function(){
    clearMensajes();
    mjeOk.classList.toggle('none');
});

//Pop-up de ganador
function mjeGanador(jugador){
    quitarFlechas();
    mjeOk.classList.toggle("none");
    if(jugador==1){
        ct.classList.toggle("none");
    }else{
        tt.classList.toggle("none");
    }
    juegoFinalizado=true;
    detenerTimer();
}

//Permite trazar un recorrido de caída de la ficha, cuando se la suelta en un área permitida
function dropFigure(figure, height, posRow, posColumn){
    setTimeout(() => {
        if(figure.getPosY()<height){
            let y = figure.getPosY();
            figure.setPosY(y+4);
            drawFigure();
            dropFigure(figure, height, posRow, posColumn);
        }else{
            smtDropping = false;
            cambiarTurno();
            if(tablero.isWinner(posRow, posColumn, figure.getJugador(), num_ganador)){
                let aux = tablero.getConjuntoGanador();
                aux.forEach(f => {
                    f.setResaltado(true);
                });
                drawFigure();
                mjeGanador(figure.getJugador());
            }
        }
    },1);
}

//Chequea si la ficha se encuentra en un área permitida para su dropeo
function isOnArea(figure){
    let x = width/2;
    let y = height/2;

    let widthTotal = tam_ficha*columnas;
    let heightTotal = tam_ficha * filas;

    let movX = widthTotal/2;
    let movY = heightTotal/2 - (tam_ficha/2);

    let posXIzq = x-movX;
    let posXDer = posXIzq + (columnas*tam_ficha);
    let posYAbajo = y-movY;

    return (figure.getPosX() > posXIzq && 
            figure.getPosX() < posXDer)
            && figure.getPosY() < posYAbajo;
}

//Se ejecuta cuando el mouse se mueve: Si tenemos seleccionada una ficha, seteamos nueva posición, y dibujamos el canvas entero
function onMouseMove(e){

    let ClientRect = canvas.getBoundingClientRect();

    var scaleX = canvas.width / ClientRect.width;
    var scaleY = canvas.height / ClientRect.height;

    let x = (e.clientX - ClientRect.left) * scaleX;
    let y = (e.clientY - ClientRect.top) * scaleY;
    
    if(isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(x, y);
        drawFigure();
    }
}

//Se ejecuta cuando el mouse se posiciona fuera del canvas; permite soltar una ficha, si aun seguía presionada
function onMouseLeave(e){
    if(lastClickedFigure != null && lastClickedFigure.getIsDropped() === false){
        lastClickedFigure.setOrigenPosition();
        clearCanvas();
        drawFigure();
    }
}

//Se ejecuta cuando el mouse vuelve a entrar al canvas; permite colocar la ficha en su posición original, en caso de haberla soltado
function onMouseEnter(e){
    if(lastClickedFigure != null && lastClickedFigure.getIsDropped() === false){
        onMouseUp();
    }
}

//Serie de eventos dentro del elemento canvas
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseleave', onMouseLeave);
canvas.addEventListener('mouseenter', onMouseEnter);

//Se ejecuta cuando se presiona el primer play de la pantalla, para visualizar el menu configurable del juego
btn_play.addEventListener('click', showMenu);

//Muestra el menu de configuración de juego
function showMenu(){
    btn_play.classList.toggle("none");
    let menu = document.querySelector(".game-menu");
    menu.classList.toggle("none");
}
