document.addEventListener('DOMContentLoaded', function() {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; //score of the game 
    let gameStarted = false; //game status
    let food = {x: 300, y: 200}; // {x: 15*20, y: 10*20} //cell coordinate -> top & left pixels
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];

    // Draw Div function
    function drawDiv(x, y, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${y}px`;
        divElement.style.left = `${x}px`;
        return divElement;
    }

    // Draw food & snake
    function drawFoodAndSnake() {
        gameArena.innerHTML = ''; // clear the game arena

        // Snake element
        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(snakeElement);
        })

        // Food element
        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);

    }

    // Run game
    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            drawFoodAndSnake(); // Make food & snake
            // gameLoop(); TODO: Implement game loop
        }
    }

    // Initiate the game
    function initiateGame() {
        // Score board 
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArena);

        // Start button
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

        startButton.addEventListener('click', function startGame(){
            startButton.style.display = 'none'; // Hide start button
            runGame();
        })
    }
    initiateGame();
})

