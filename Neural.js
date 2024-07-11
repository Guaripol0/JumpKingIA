class AIAction {
    constructor(isJump, holdTime, xDirection) {
        this.isJump = isJump;
        this.holdTime = holdTime;//number between 0 and 1
        this.xDirection = xDirection;

    }

    clone() {
        return new AIAction(this.isJump, this.holdTime, this.xDirection);
    }

    getAIAction() {
        return {
            isJump: this.isJump,
            holdTime: this.holdTime,
            xDirection: this.xDirection
        };
    }
}

class Neural {
    constructor(size, player) {
        this.player = player;
        this.size = size;
        this.instructions = [];
        this.currentInstructionNumber = 0;
        this.model = new NeuralNetwork(5, 3, 5); // Aca hay que definir la cantidad de inputs hiden y outputs
        this.getInstruction(size);
    }
    getInstruction(size){
        for (let i = 0; i < size; i++) {
            this.instructions[i] = this.getAction();
        }
    }

    getAction(){
        let inputs = [
            this.player.currentPos.x / this.player.width,
            this.player.currentPos.y / this.player.height,
            this.player.currentSpeed.x,
            this.player.currentSpeed.y,
            this.player.isOnGrounf ? 1 : 0,
        ];
        
        const output = this.model.predict(inputs);

        let isJump = output.isJump;
        let holdTime = output.duration;
        let xDirection = output.direction;

        return new AIAction(isJump, holdTime, xDirection);
    }
    getNextAction() {
        if(this.currentInstructionNumber >= this.instructions.length){
            return null;
        }
        this.currentInstructionNumber += 1;
        return this.instructions[this.currentInstructionNumber - 1];
    }

    getNextAction() {
        if (this.currentInstructionNumber < this.instructions.length) {
            const action = this.instructions[this.currentInstructionNumber];
            this.currentInstructionNumber++;
            return action;
        } else {
            return null;
        }
    }

    increaseMoves(increaseMovesBy) {
        for (let i = 0; i < increaseMovesBy; i++) {
            this.instructions.push(this.getAction());
        }
    }
    clone() {
        let clone = new Neural(this.size, this.player);
        clone.instructions = this.instructions.map(instruction => instruction.clone());
        clone.currentInstructionNumber = this.currentInstructionNumber;
        clone.model = this.model.copy();
        return clone;
    }
}