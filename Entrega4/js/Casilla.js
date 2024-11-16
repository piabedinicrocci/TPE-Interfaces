class Casilla extends Figure {
    constructor(posX, posY, sideLength, context, sizeFicha) {
        super(posX, posY, 'rgba(53, 71, 173,1)', context); // Establece el color de fondo de la celda
        this.sizeFicha = sizeFicha;
        this.sideLength = sideLength;
        this.ficha = null;
        this.drawable = true;
    }

    draw() {
        if(this.drawable){
            const centerX = this.posX + this.sideLength / 2;
            const centerY = this.posY + this.sideLength / 2;

            this.context.lineWidth = 0; // Establece el grosor del borde a cero

            // Dibuja un rectángulo como celda
            this.context.fillStyle = "rgba(53, 71, 173,1)";
            this.context.fillRect(this.posX, this.posY, this.sideLength, this.sideLength);

            // Dibuja un círculo en el centro de la celda
            let radio = Math.min(this.sideLength) / 2;
            let gradient = this.context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radio);
            gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // Claro en el centro
            gradient.addColorStop(1, "rgba(153, 153, 153, 1)"); // Oscuro en los bordes

            this.context.fillStyle = gradient;

            this.context.beginPath();
            this.context.arc(centerX, centerY, radio - 5, 0, Math.PI * 2);
            this.context.fill();

            if(this.ficha){
                this.context.strokeStyle = this.ficha.draw();
            }
        }
    }

    setColorFicha(color){
        if(this.ficha){
            this.ficha.fill = color;
        }
    }
    getColorFicha(){
        if(this.ficha){
            return this.ficha.fill;
        }else{
            return null;
        }
    }
    getTeam(){
        if(this.ficha){
            return this.ficha.getTeam();
        }else{
            return null;
        }
    }
    setFicha(ficha){
        this.ficha = ficha;
    }

    darkness(color, factor) {
        const rgba = color.match(/\d+/g); // Extraer los componentes R, G, B y A
        if (rgba) {
            const r = rgba[0] * factor;
            const g = rgba[1] * factor;
            const b = rgba[2] * factor;
            const a = rgba[3];
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
            return color; // Si el color no es válido, devolverlo sin cambios
        }
    }

    getX(){
        return this.posX;
    }
    
    getY(){
        return this.posY;
    }
}
