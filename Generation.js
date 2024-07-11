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

        this.SetCurrentHighestPlayer()
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
            this.players[i].brain.increaseMoves(increaseBy);
        }
    }

    // AllPlayersFinished() {
    //     for (let i = 0; i < this.players.length; i++) {
    //         if (!this.players[i].hasFinishedInstructions) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
}