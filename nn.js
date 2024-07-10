    class NeuralNetwork {
        constructor(inputNodes, hiddenNodes, outputNodes) {
            this.input_nodes = inputNodes;
            this.hidden_nodes = hiddenNodes;
            this.output_nodes = outputNodes;
            this.model = this.createModel();
        }
    
        copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(
            modelCopy,
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
                if (random(1) < rate) {
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
            
            // Separar las salidas
            const direction = ys[0].dataSync(); // Dirección
            const isJump = ys[1].dataSync()[0]; // Saltar
            const duration = ys[2].dataSync()[0]; // Duración de la presión de la tecla
                
            return {
                direction: tf.argMax(direction).dataSync()[0] - 1, // Convertir softmax a -1, 0, 1
                isJump: isJump > 0.5, // Convertir sigmoid a booleano
                duration: (duration + 1) / 2 * 0.9 + 0.1 // Convertir tanh a rango 0.1 a 1
            };
            });
        }
        createModel() {
            const model = tf.sequential();
        
            // Capa oculta
            const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'relu'
            });
            model.add(hidden);
        
            // Capa de salida para la dirección
            const directionOutput = tf.layers.dense({
            units: 3, // Izquierda, nada, derecha
            activation: 'softmax' // Usar softmax para clasificación
            });
            model.add(directionOutput);
        
            // Capa de salida para el salto
            const jumpOutput = tf.layers.dense({
            units: 1, // 0 o 1
            activation: 'sigmoid' // Usar sigmoid para clasificación binaria
            });
            model.add(jumpOutput);
        
            // Capa de salida para la duración de la presión de la tecla
            const durationOutput = tf.layers.dense({
            units: 1, // Valor flotante entre 0.1 y 1
            activation: 'tanh' // Usar tanh para valores en un rango
            });
            model.add(durationOutput);
        
            return model;
        }
    }