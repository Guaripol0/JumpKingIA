class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.input_nodes = inputNodes;
        this.hidden_nodes = hiddenNodes;
        this.output_nodes = outputNodes;
        this.model = this.createModel();
    }

    copy() {
        return tf.tidy(() => {
            //console.log("funciona");
            //const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            //modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(
                //modelCopy,
                this.input_nodes,
                this.hidden_nodes,
                this.output_nodes
            );
        });
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (Math.random() < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    dispose() {
        this.model.dispose();
    }

    predict(inputs) {
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            
            //console.log("ys es: ", ys);

            const direction = ys[0].arraySync()[0];
            const isJump = ys[1].arraySync()[0];
            const duration = ys[2].arraySync()[0];
    
            return {
                direction: direction.indexOf(Math.max(...direction)), // Tomar la dirección con la mayor probabilidad
                isJump: isJump > 0.5 ? 1 : 0, // Convertir salida de sigmoid a binario
                duration: duration // Salida de tanh
            };
        });
    }

    createModel() {
        const input = tf.input({ shape: [this.input_nodes] });
    
        // Capa oculta
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            activation: 'relu'
        }).apply(input);
    
        // Capa de salida para la dirección
        const directionOutput = tf.layers.dense({
            units: 3, // Izquierda, nada, derecha
            activation: 'softmax',
            name: 'directionOutput'
        }).apply(hidden);
    
        // Capa de salida para el salto
        const jumpOutput = tf.layers.dense({
            units: 1, // 0 o 1
            activation: 'sigmoid',
            name: 'jumpOutput'
        }).apply(hidden);
    
        // Capa de salida para la duración de la presión de la tecla
        const durationOutput = tf.layers.dense({
            units: 1, // Valor flotante entre 0.1 y 1
            activation: 'tanh',
            name: 'durationOutput'
        }).apply(hidden);
    
        // Creando el modelo con múltiples salidas
        const model = tf.model({
            inputs: input,
            outputs: [directionOutput, jumpOutput, durationOutput]
        });
    
        return model;
    }
}
