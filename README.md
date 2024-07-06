# JumpKingIA

## Proyecto Semestral IA

Jump King es un juego de plataformas vertical desarrollado por Nexile en el año 2019. El juego consiste en que el jugador principal debe escalar toda una torre para rescatar a la princesa que está en la cima de ella. Para ello, el jugador cuenta con la habilidad de alcanzar grandes distancias saltando.

### Ambiente

Ambiente observable, determinista, estático, continuo, secuencial y agente singular.

Decisiones discretas: izq, der o nada, además de unas cantidades específicas de tiempo para cada salto (cuanto tiempo se mantiene presionado el espacio)

Representación de las decisiones se pueden modelar en una matriz nx3 donde n es el tiempo que mantiene presionado el espacio y las columnas 0, 1 y 2 representan izq, nada o der respectivamente.

### Instrucciones de Uso

Para compilar, jugar y entrenar el modelo; se necesita seguir estos pasos:

1. Clonar repositorio

2. Se debe inicializar index.html desde un servidor local, para ello se pueden utilizar herramientas como "Live Server" de VSCode o `python -m http.server` si tienes Python instalado.

3. Para activar o desactivar el entrenamiento del modelo, simplemente tiene que ir sketch.js del repositorio y cambiar el valor de `let testingSinglePlayer = true;` a `false`, o viceversa.

### Controles

- Espacio: Salto
- Flecha Izquierda: Izquierda
- Flecha Derecha: Derecha
- R: Reiniciar Población
- S: Pausa
- Flecha Arriba: Subir velocidad de juego
- Flecha Abajo: Bajar velocidad de juego
