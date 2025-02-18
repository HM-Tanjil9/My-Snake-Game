document.addEventListener('DOMContentLoaded', function() {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; //score of the game 
    let gameStarted = false; //game status
    let food = {x: 300, y: 200}; // {x: 15*20, y: 10*20} //cell coordinate -> top & left pixels
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}]; // [head, body, ... , tail]
    let dx = cellSize; // Snake Change direction of X
    let dy = 0; // Snake Change direction of Y
    let intervalId;
    let gameSpeed = 200;

    // Move food
    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * 30) * cellSize;
            newY = Math.floor(Math.random() * 30) * cellSize;
        } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

        food = {x: newX, y: newY};
    }
    // Update snake 
    function updateSnake () {
        // Create new head
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead); // Added new head

        // Check collision with food
        if(newHead.x === food.x && newHead.y === food.y) {
            score += 10; // Update score
            moveFood(); // Move food item
            if(gameSpeed > 50) {
                clearInterval(intervalId);
                gameSpeed -= 10; // change game speeds
                gameLoop();
            }
        } else {
            snake.pop() // Remove tail
        }
    }

    // Snake change direction 
    function changeDirection (e) {
        console.log('key pressed', e);
        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        if(e.key === 'ArrowUp' && !isGoingDown) {
            dx = 0;
            dy = -cellSize;
        } else if(e.key === 'ArrowDown' && !isGoingUp) {
            dx = 0;
            dy = cellSize;
        } else if(e.key === 'ArrowLeft' && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        } else if(e.key === 'ArrowRight' && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        }
        
    }

    // Draw score board
    function drawScoreBoard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`;
    }

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

    // Is game over
    function isGameOver() {
        // Snake collision check
        for(let i=1; i<snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        // Wall collision check
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > arenaSize - cellSize;
        const hitTopWall = snake[0].y < 0;
        const hitDownWall = snake[0].y > arenaSize - cellSize;
        return hitLeftWall || hitRightWall || hitTopWall || hitDownWall;
    }

    // Game loop 
    function gameLoop() {
        intervalId = setInterval(() => {
            
            if(isGameOver()) {
                clearInterval(intervalId);
                gameStarted = false;
                alert("Game is over" + "\n" + "Your score: " + score)
                return;
            }
            updateSnake();
            drawFoodAndSnake();
            drawScoreBoard();
        }, gameSpeed);
    }

    // Run game
    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            drawFoodAndSnake(); // Make food & snake
            document.addEventListener('keydown', changeDirection)
            gameLoop(); // Implement game loop
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

