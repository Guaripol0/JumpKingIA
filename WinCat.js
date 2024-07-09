class WinCat{
    constructor(x, y, type = "win") {
        this.levelNo = 0;
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = catWinImage.width; // Usar el ancho de la imagen original
        this.height = catWinImage.height; // Usar la altura de la imagen original
    }

    collidesWithPlayerWin(playerToCheck){
        // Obtener los límites del jugador
        let playerLeft = playerToCheck.currentPos.x;
        let playerRight = playerLeft + playerToCheck.width;
        let playerTop = playerToCheck.currentPos.y;
        let playerBottom = playerTop + playerToCheck.height;

        // Obtener los límites del gato
        let catLeft = this.x;
        let catRight = catLeft + this.width;
        let catTop = this.y;
        let catBottom = catTop + this.height;
        // Verificar colisión
        if (playerRight > catLeft && playerLeft < catRight &&
            playerBottom > catTop && playerTop < catBottom) {
            return true;
        }
        return false;
    }
    Show() {
        push();
        image(catWinImage, this.x, this.y);
        pop();
    }
}