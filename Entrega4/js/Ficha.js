class Ficha extends Figure {
    constructor(posX, posY, radius, fill, context, team, image, draweable = true) {
        super(posX, posY, fill, context);
        this.team = team;
        this.radius = radius;
        this.image = image; // Agregar la imagen
        this.draweable = draweable;
    }

    draw() {
        if (this.image && this.draweable) {
            // Dibuja la imagen en el centro de la ficha
            const imageX = this.posX - this.radius;
            const imageY = this.posY - this.radius;
            this.context.drawImage(this.image, imageX, imageY, this.radius * 2, this.radius * 2);
        } else {
            if (this.draweable) {
                this.context.fillStyle = this.fill;
            } else {
                //Si el personaje ya fue elegido anteriormente, se pinta la imagen de color negro 
                this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
                
            }
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.fill();
            this.context.closePath();
        }
    }
    

    getFill() {
        return this.fill;
    }
    getTeam() {
        return this.team;
    }
    
    getRadius() {
        return this.radius;
    }
    
}


