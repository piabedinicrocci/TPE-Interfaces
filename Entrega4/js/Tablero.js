class Tablero {
  constructor(context, cantFichas, fill, image, sizeFicha){
      this.fill = fill;
      this.sizeFicha = sizeFicha;
      this.image = image;
      this.context = context;
      this.filas = cantFichas+2;
      this.columnas = cantFichas+3;
      this.casillas = [];
      for (let i = 0; i < this.filas; i++) {
          this.casillas[i] = [];
          for (let j = 0; j < this.columnas; j++) {
              this.casillas[i][j] = new Casilla((j*this.sizeFicha*2.75)+((canvasWidth-this.columnas*this.sizeFicha*2.75)/2), (i*this.sizeFicha*2.75)+this.getSuperior(), this.sizeFicha*2.75, context, this.sizeFicha);
          }
      }
      this.entradaFichas = [];
      for(let i=0; i<this.columnas; i++){
          this.entradaFichas[i] = new Casilla((i*this.sizeFicha*2.75)+((canvasWidth-this.columnas*this.sizeFicha*2.75)/2),this.getSuperior()-this.sizeFicha*2.75,this.sizeFicha*2.75,context, this.sizeFicha, "rgba(0, 0, 255, 0)");
      }
      this.draw();
  }

  getSuperior(){
      return canvasHeight-10-this.filas*this.sizeFicha*2.75;
  }
  getLateral(){
      return (canvasWidth-this.columnas*this.sizeFicha*2.75)/2;
  }

  
  getGradient(){
      // Gradiente para el efecto metálico
      const gradient = context.createLinearGradient(((canvasWidth-this.columnas*this.sizeFicha*2.75)/2)-15, this.getSuperior(), this.columnas*this.sizeFicha*2.75+30, this.filas*this.sizeFicha*2.75);
      gradient.addColorStop(0, "rgba(92, 92, 92, 1)"); // Color más claro en la parte superior
      gradient.addColorStop(0.5, "rgba(128, 128, 128, 1)"); // Color medio en el centro
      gradient.addColorStop(1, "rgba(92, 92, 90, 1)"); // Color más claro en la parte inferior
      return gradient;
  }
  
  drawPosiciones(){
      for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
              if(this.casillas[i][j].getTeam()!=null){
                  this.casillas[i][j].draw();
              }
          }
      }
  }

  drawGlowingCircle(x, y, radius, glowColor, borderColor, glowIntensity, numSteps) {
      // Define el radio del círculo interior
      const innerRadius = radius - glowIntensity;
  
      for (let i = 0; i < numSteps; i++) {
          const currentBlur = glowIntensity / numSteps * (i + 1);
  
          // Configura el sombreado (brillo) alrededor del círculo
          context.shadowBlur = currentBlur; // Aumenta la intensidad del brillo
          context.shadowColor = glowColor; // Color del brillo
  
          // Dibuja el círculo con borde
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.strokeStyle = borderColor; // Color del borde
          context.lineWidth = 2; // Ancho del borde (ajusta según tu preferencia)
          context.stroke();
  
          // Limpia la configuración de sombra para que no afecte a otros elementos
          context.shadowBlur = 0;
          context.shadowColor = 'transparent'; // Puedes cambiarlo al color de fondo del lienzo
  
          // Dibuja el círculo interior
          context.fillStyle = 'transparent'; // Relleno transparente
          context.arc(x, y, innerRadius, 0, 2 * Math.PI);
          context.fill();
          context.closePath();
      }
  }
  
  draw() {
      for (let i = 0; i < this.filas; i++) {
          for (let j = 0; j < this.columnas; j++) {
              if(this.casillas[i][j].getTeam()==null){
                  this.casillas[i][j].draw();
              }
          }
      }
      this.drawPosiciones();
  }
}



