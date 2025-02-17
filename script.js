document.addEventListener('DOMContentLoaded', function() {
    const gameArena = document.getElementById('game-arena');
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0; //score of the game 
    let gameStarted = false; //game status
    let food = {x: 300, y: 200}; // {x: 15*20, y: 10*20} //cell coordinate -> pixels
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];

    // Run game
    function runGame() {
        
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

