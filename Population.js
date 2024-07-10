let alreadyShowingSnow = false;



class Population {

    constructor(size) {
        this.popSize = size;
        this.players = [];
        for (let i = 0; i < size; i++) {
            this.players.push(new Player());
        }

        this.showingFail = false;
        this.failPlayerNo = 0;
        this.bestPlayerIndex = 0;
        this.currentHighestPlayerIndex = 0;
        this.fitnessSum = 0;
        this.gen = 1;
        this.bestHeight = 0;
        this.showingLevelNo = 0;
        this.currentBestLevelReached = 0;
        this.purgeTheSlackers = false;
        this.reachedBestLevelAtActionNo = 0;
        this.newLevelReached = false;
        this.cloneOfBestPlayerFromPreviousGeneration = this.players[0].clone();
    }

    VisualizePopulationState() {
        // console.log("Generation:", this.gen);
        // console.log("Best Height:", this.bestHeight);
        // console.log("Best Player Index:", this.bestPlayerIndex);
        // console.log("Current Highest Player Index:", this.currentHighestPlayerIndex);
        // console.log("Current Best Level Reached:", this.currentBestLevelReached);
        // console.log("Clone of the best plater from previus generation:", this.cloneOfBestPlayerFromPreviousGeneration)
    }
    
    Update() {
        this.VisualizePopulationState();
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].Update();
            // if(this.players[i].currentLevelNo >0 && !this.showingFail ) {
            //     this.showingFail= true;
            //     this.failPlayerNo = i;
            //     this.ResetAllPlayers()
            // }
        }

    }

    SetFitnessForAll(){
        for (let i = 0; i < this.players.length; i++){
            this.players[i].CalculateFitness();
        }
    }

    SetBestPlayer() {
        this.bestPlayerIndex = 0;
        this.newLevelReached = false;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].fitness >= this.players[this.bestPlayerIndex].fitness) {
                this.bestPlayerIndex = i;
            }
        }
        console.log('bestplaer level: ' + this.players[this.bestPlayerIndex].bestLevelReached);
        console.log('popu bestlevel: ' + this.currentBestLevelReached)
        if (this.players[this.bestPlayerIndex].bestLevelReached > this.currentBestLevelReached) {
            console.log('population yupdate');
            this.currentBestLevelReached = this.players[this.bestPlayerIndex].bestLevelReached;
            this.newLevelReached = true;
            this.reachedBestLevelAtActionNo = this.players[this.bestPlayerIndex].bestLevelReachedOnActionNo;
            print("NEW LEVEL, action number", this.reachedBestLevelAtActionNo)
        }
        this.bestHeight = this.players[this.bestPlayerIndex].bestHeightReached;
    }

    SetCurrentHighestPlayer() {
        this.currentHighestPlayerIndex = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].GetGlobalHeight() > this.players[this.currentHighestPlayerIndex].GetGlobalHeight()) {
                this.currentHighestPlayerIndex = i;
            }
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

        // this.ShowPopulationInfo();

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

    AllPlayersFinished() {
        for (let i = 0; i < this.players.length; i++) {
            if (!this.players[i].hasFinishedInstructions) {
                return false;
            }
        }
        return true;
    }

    NaturalSelection() {
        console.log('natural selection')
        let nextGen = [];
        this.SetFitnessForAll();
        this.SetBestPlayer();
        this.CalculateFitnessSum();

        this.cloneOfBestPlayerFromPreviousGeneration = this.players[this.bestPlayerIndex].clone();

        nextGen.push(this.players[this.bestPlayerIndex].clone());
        for (let i = 1; i < this.players.length; i++) {
            let parent = this.SelectParent();
            let baby = parent.clone();
            // if the parent fell to the previous level then mutate the baby at the action that caused them to fall
            if(parent.fellToPreviousLevel){
                baby.brain.mutateActionNumber(parent.fellOnActionNo);
            }
            baby.brain.mutate();
            nextGen.push(baby);
        }

        this.players = [];
        for (let i = 0; i < nextGen.length; i++) {
            this.players[i] = nextGen[i];
            // if(!this.newLevelReached && this.currentBestLevelReached !== 0){// && this.currentBestLevelReached !== 37){
            //     this.players[i].loadStartOfBestLevelPlayerState();
            // }<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        }

        this.gen++;
    }

    CalculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].CalculateFitness();
            // if (this.players[i].bestLevelReached < this.players[this.bestPlayerIndex].bestLevelReached) {
            //     this.players[i].fitness = 0;
            // }<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            this.fitnessSum += this.players[i].fitness;
            //console.log("jugador numero", i , ":",  this.players[i]);
            //console.log("fitness acumulado", this.fitnessSum);
        }
    }

    SelectParent() {
        let rand = random(this.fitnessSum);
        let runningSum = 0;
        for (let i = 0; i < this.players.length; i++) {
            runningSum += this.players[i].fitness;
            if (runningSum > rand) {
                return this.players[i];
            }
        }
        return null;
    }
}