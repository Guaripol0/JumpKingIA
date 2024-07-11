let alreadyShowingSnow = false;

class Generation {
    constructor(size) {
        this.size = size;
        this.players = [];
        for (let i = 0; i < size; i++) {
            this.players.push(new Player());
        }
        this.showingFail = false;
        this.failPlayerNo = 0;
        this.bestPlayerIndex = 0;
        this.bestHeight = 0;
        this.showingLevelNo = 0;
        this.currentBestLevelReached = 0;
        this.reachedBestLevelAtActionNo = 0;
        this.newLevelReached = false;
        this.cloneOfBestPlayerFromPreviousGeneration = this.players[0].clone();
    }
    Update() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].Update();
        }
    }
    Show() {

        // this.SetCurrentHighestPlayer()
        let highestPlayer = this.players[this.currentHighestPlayerIndex];
        let highestLevelNo = this.players[this.currentHighestPlayerIndex].currentLevelNo;

        if(highestPlayer.currentLevelNo > highestPlayer.bestLevelReached && !highestPlayer.progressionCoinPickedUp){
            highestLevelNo -=1;
        }
        showLevel(highestLevelNo);
        alreadyShowingSnow = false;
        this.showingLevelNo = highestLevelNo;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].currentLevelNo >= highestLevelNo - 1 && this.players[i].currentLevelNo <=highestLevelNo ) {
                this.players[i].Show();
            }
        }
    }

    ResetAllPlayers() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].ResetPlayer();
        }
    }

    IncreasePlayerMoves(increaseBy) {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].neural.increaseMoves(increaseBy);
        }
    }

    AllPlayersFinished() {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.players[i].hasFinishedInstructions) {
                return false;
            }
        }
        return true;
    }

    Think(){
        // La idea de esta funcion es que funcione como reemplazo para la funcion de NaturalSelection() de Population.js 
        // para que este metodo pueda ser llamado desde sketch
        // En donde en el codigo de sketch.js si compureba de que todos los jugadors han terminado sus movimientos 
        //  si te fijas funciona asi en sketch.js:
        // else{

        //     if (population.AllPlayersFinished()) {
        //         population.NaturalSelection();
        //         if (population.gen % increaseActionsEveryXGenerations === 0) {
        //             population.IncreasePlayerMoves(increaseActionsByAmount);
        //         }
        //     }
        //     for (let i = 0; i < evolationSpeed; i++)
        //         population.Update()
    
        //     population.Show();
    
        // } 
        // Pero creo que aun no es necesario ya que todavia no me quiero meter con el fitness, aunque eso si tengo que aumentar la canitidad de movimientos por personaje.
        // asi que pondria otro condicional auxilar en caso para que pueda funcionar lo de incrementar movimientos
        //         if (algo) {
        //             population.IncreasePlayerMoves(increaseActionsByAmount);
        //         }
        // Igual me gustaria tenerlo en un futuro ya qe tambien modifica a population.cloneOfBestPlayerFromPreviousGeneration que me sirve para ver el mejor jugador de un Algoritmo Genetico
        // Asi que lo más problable es que este codigo quede como una Neural Evolution Network
    }

    SetBestPlayer(){
        // La misma idea que con lo de NaturalSelection() aqui tengo el codigo de SetBestPlayet de population:
        // SetBestPlayer() {

        //     this.bestPlayerIndex = 0;
        //     this.newLevelReached = false;
        //     for (let i = 0; i < this.players.length; i++) {
        //         if (this.players[i].bestHeightReached > this.players[this.bestPlayerIndex].bestHeightReached) {
        //             this.bestPlayerIndex = i;
        //         }
        //     }
    
        //     if (this.players[this.bestPlayerIndex].bestLevelReached > this.currentBestLevelReached) {
        //         this.currentBestLevelReached = this.players[this.bestPlayerIndex].bestLevelReached;
        //         this.newLevelReached = true;
        //         this.reachedBestLevelAtActionNo = this.players[this.bestPlayerIndex].bestLevelReachedOnActionNo;
        //         print("NEW LEVEL, action number", this.reachedBestLevelAtActionNo)
        //     }
        //     this.bestHeight = this.players[this.bestPlayerIndex].bestHeightReached;
        // }
        // Entonces la idea es que se tienen que replazar esto con los metodos de el nuevo Neural y las cosas nuevas que hace Generation
    }
}