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
    constructor(size) {
        this.size = size;
        this.instructions = [];
        this.currentInstructionNumber = 0;
        this.model = new NeuralNetwork(2, 3, 3); // aca hay que definir la cantidad de inputs hiden y outputs
        this.getInstruction(size);
    }
    getInstruction(size){
        for (let i = 0; i < size; i++) {
            this.instructions[i] = this.getAction(inputs);
        }
    }

    getAction(inputs){
        const output = this.model.predict(inputs);

        let isJump = outputs.isJump;
        let holdTime = outputs.duration;
        let xDirection = outputs.direction;

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
    increaseMove(increaseMovesBy) {
        for (let i = 0; i < increaseMovesBy; i++) {
            this.instructions.push(this.getAction(inputs));
        }
    }
}