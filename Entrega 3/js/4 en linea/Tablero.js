"use strict";

class Tablero {

    constructor(ctx, widthCanvas, heightCanvas, filas, columnas, fill, tamFicha) {
        this.ctx = ctx;
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = this.iniciarMatriz();
        this.widthCanvas = widthCanvas;
        this.heightCanvas = heightCanvas;
        this.fill = fill;
        this.area = [];
        this.image = new Image();
        this.image.src = './img/4 en linea/casilla.svg';
        this.tableroDibujado = false;
        this.tamFicha = tamFicha;
        this.conjuntoGanador = [];
    }

    //Inicialización de la matriz, la cual va a ir llenandose a medida que las fichas caen dentro del tablero
    iniciarMatriz(){
        let matriz = new Array(this.filas);
        for(let i = 0; i< this.filas; i++){
            matriz[i] = new Array(this.columnas);
        }
        return matriz;
    }

    //Punto de partida de creación del tablero, el cual chequea la carpa previa de las imágenes
    draw(){
        if(!this.image.complete){
            this.image.onload = () => {
                this.drawPasamanos();
            };
        }else{
            this.drawPasamanos();
        }
    }

    //Helper para coordinar la creación
    drawPasamanos(){
        if (!this.tableroDibujado) {
            this.drawTable();
            this.tableroDibujado = true;
          }
    }

    //Permite dibujar la tabla: Dada la cantidad de filas y columnas, crea N*M cantidad de casilleros, que representan el tablero final
    drawTable(){

        let x = this.widthCanvas/2;
        let y = this.heightCanvas/2;

        let widthTotal = this.tamFicha*this.columnas;
        let heightTotal = this.tamFicha * this.filas;

        let movX = widthTotal/2;
        let movY = heightTotal/2 - (this.tamFicha/2);

        let posX = x-movX;
        let posY = y-movY;

        for(let f=0; f<this.filas; f++){

            let auxX = posX;

            for(let c = 0; c<this.columnas; c++){

                if(this.area.length<this.columnas+1){
                    if(this.area.length === 0){
                        this.area[c]=posX;
                        this.area[c+1]=posX+this.tamFicha;
                    }else{
                        this.area[c+1]=posX+this.tamFicha;
                    }
                }

                this.ctx.drawImage(this.image, posX, posY, this.tamFicha, this.tamFicha);

                posX=posX+this.tamFicha;
            }

            posX = auxX;

            posY = posY + this.tamFicha;
        }

    }

    //Dada una posicion en fila, columna, el modo de juego escogido, y el jugador, busca si es una jugada ganadora
    isWinner(posX, posY, jugador, modo){
        return (this.checkHorizontal(posX, modo, jugador) ||
                this.checkVertical(posY, modo, jugador) ||
                this.checkDiagonalUno(posX, posY, modo, jugador) ||
                this.checkDiagonalDos(posX, posY, modo, jugador));
    }

    /*
        Chequea la fila: Partiendo de la posicion en fila y columna de donde cayó la ficha, buscamos el inicio de la columna, para recorrerla toda
        Retorna true, cuando encontró un conjunto continuo de fichas, del mismo jugador, que responden al modo de juego 
        (Si es 4 en linea, buscará 4 fichas continuas del mismo tipo)
    */
    checkHorizontal(fila, modo, jugador){
        let hayGanador = false
        let col = 0;
        let cant = 0;
        while (col < this.columnas && hayGanador == false) {
            if((this.matriz[fila][col])!==undefined 
                && (this.matriz[fila][col].getJugador() === jugador) 
                && cant < modo) {
                    this.conjuntoGanador.push(this.matriz[fila][col]);
                    cant++;
            }else{
                this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
                cant = 0;
            }
            if (cant === modo) {
                hayGanador = true;
            }
            col++;
      
        }
        if(!hayGanador){
            this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
        }
        return hayGanador;
    }

    /*
        Chequea la columna: Partiendo de la posicion en fila y columna de donde cayó la ficha, buscamos la parte superior de la columna, para recorrerla toda
        Retorna true, cuando encontró un conjunto continuo de fichas, del mismo jugador, que responden al modo de juego
    */
    checkVertical(col,modo, jugador){
        let hayGanador = false
        let fila = 0;
        let cant = 0;
        while (fila < this.filas && hayGanador == false) {
            if((this.matriz[fila][col])!==undefined 
                && (this.matriz[fila][col].getJugador() === jugador) 
                && cant < modo) {
                    this.conjuntoGanador.push(this.matriz[fila][col]);
                    cant++;
            }else{
                this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
                cant = 0;
            }
            if (cant === modo) {
                hayGanador = true;
            }
            fila++;
        }
        if(!hayGanador){
            this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
        }
        return hayGanador;
    }

    /*
        Chequea la primer diagonal: Partiendo de la posicion en fila y columna de donde cayó la ficha, buscamos la esquina superior de la diagonal, para recorrerla toda
        Retorna true, cuando encontró un conjunto continuo de fichas, del mismo jugador, que responden al modo de juego
    */
    checkDiagonalUno(fila,col,modo,jugador){
        let hayGanador = false;
        let cant=0;
        while (fila>0 && col>0){//llevo fila y columna a la primer posición de la diagonal (arriba a la izquierda)
            fila--;
            col--;
        }
        while (fila < this.filas && col <this.columnas && hayGanador == false) {
            if((this.matriz[fila][col])!==undefined 
                && (this.matriz[fila][col].getJugador() === jugador) 
                && cant < modo) {
                    this.conjuntoGanador.push(this.matriz[fila][col]);
                    cant++;
            }else{
                this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
                cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            fila++;
            col++;
        }
        if(!hayGanador){
            this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
        }
        return hayGanador;
    }

    /*
        Chequea la segunda diagonal: Partiendo de la posicion en fila y columna de donde cayó la ficha, buscamos la esquina superior de la diagonal, para recorrerla toda
        Retorna true, cuando encontró un conjunto continuo de fichas, del mismo jugador, que responden al modo de juego
    */
    checkDiagonalDos(fila,col,modo,jugador){
        let hayGanador = false;
        let cant=0;
        while (fila>0 && col<columnas-1){//llevo fila y columna a la primer posición de la diagonal (arriba a la derecha)
            fila--;
            col++;
        }
        while (fila < this.filas && col >=0 && hayGanador == false) {
            if((this.matriz[fila][col])!==undefined 
                && (this.matriz[fila][col].getJugador() === jugador) 
                && cant < modo) {
                    this.conjuntoGanador.push(this.matriz[fila][col]);
                    cant++;
            }else{
                this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
                cant = 0;
            }
            if (cant == modo) {
                hayGanador = true;
            }
            
            fila++;
            col--;
        }
        if(!hayGanador){
            this.conjuntoGanador.splice(0, this.conjuntoGanador.length);
        }
        return hayGanador;
    }

    //Dada la posición de la columna, obtiene la posicion exacta en la cual va a arrancar a caer la ficha (el medio entre el limite de una columna y otra)
    getColumnPos(pos){
        return this.area[pos] + ((this.area[pos+1] - this.area[pos])/2);
    }

    //Dada la ficha lanzada, y su posicion, obtiene la columna en la que debería caer
    getColumn(ficha){
        let posX = ficha.getPosX();

        for(let i = 0; i< this.area.length; i++){
            if(i===0){
                if(posX>=this.area[i]&&posX<=this.area[i+1]){
                    return i;
                }
            }else{
                if(posX>this.area[i]&&posX<=this.area[i+1]){
                    return i;
                }
            }
        }

        return -1;

    }

    //Dada una ficha lanzada en una columna determinada, rellena el espacio de la matriz de objetos tipo Ficha
    fillSpace(figure, col){
        for(let i=this.filas-1; i>=0; i--){
            if(this.matriz[i][col]===null||this.matriz[i][col]===undefined){
                this.matriz[i][col] = figure;
                return i;
            }
        }
        return -1;
    }

    //Getters y setters del objeto Tablero
    getMatriz(){
        return this.matriz;
    }

    getPosY(){
        let y = this.heightCanvas/2;

        let heightTotal = this.tamFicha * this.filas;

        let movY = heightTotal/2 - (this.tamFicha/2);

        return (y-movY-(this.tamFicha/2));
    }

    //Dada la columna seleccionada para caida de la ficha, obtiene la cantidad de pixeles que va a caer
    getHeight(col){
        let fila = this.filas;
        for(let i=this.filas-1; i>=0; i--){
            if(this.matriz[i][col]===null||this.matriz[i][col]===undefined){
                break;
            }else{
                fila = fila - 1;
            }
        }
        return this.tamFicha * fila;
    }

    getImagen(){
        return this.image;
    }
    
    setTableroDibujado(bool){
        this.tableroDibujado = bool;
    }

    getConjuntoGanador(){
        return this.conjuntoGanador;
    }

}