document.getElementById('start-btn').addEventListener('click', startGame);

let player;
let timeElapsed = 0;
let playerHealth = 100;
let playerHunger = 100;
let inventory = [];
let gameInterval;
let hungerInterval;
let villainInterval;

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-ui').style.display = 'block';

    player = document.getElementById('player');
    player.style.left = '50%';
    player.style.bottom = '10px';

    inventory = [];
    timeElapsed = 0;
    playerHealth = 100;
    playerHunger = 100;

    updateUI();
    gameInterval = setInterval(gameLoop, 1000);
    hungerInterval = setInterval(decreaseHunger, 5000);
}

function gameLoop() {
    timeElapsed++;
    updateUI();

    if (playerHealth <= 0 || playerHunger <= 0) {
        clearInterval(gameInterval);
        clearInterval(hungerInterval);
        alert('Você foi derrotado! O jogo será reiniciado.');
        resetGame();
    }
}

function decreaseHunger() {
    playerHunger -= 5;
    if (playerHunger < 0) playerHunger = 0;
    updateUI();
}

function updateUI() {
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('player-hunger').textContent = playerHunger;
    document.getElementById('game-time').textContent = timeElapsed;

    let itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    inventory.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });
}

function collectResource(resource) {
    inventory.push(resource);
    if (resource === 'Comida') {
        playerHunger += 20;
        if (playerHunger > 100) playerHunger = 100;
    }
    updateUI();
}

function resetGame() {
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('game-ui').style.display = 'none';
    document.getElementById('game-area').innerHTML = '<div id="player"></div>';
}

function movePlayer(direction) {
    const step = 10;
    const playerRect = player.getBoundingClientRect();

    if (direction === 'left' && playerRect.left > 0) {
        player.style.left = `${playerRect.left - step}px`;
    }
    if (direction === 'right' && playerRect.right < 700) {
        player.style.left = `${playerRect.left + step}px`;
    }
    if (direction === 'up' && playerRect.top > 0) {
        player.style.bottom = `${parseInt(player.style.bottom) + step}px`;
    }
    if (direction === 'down' && playerRect.top < 600) {
        player.style.bottom = `${parseInt(player.style.bottom) - step}px`;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === 'ArrowUp') movePlayer('up');
    if (e.key === 'ArrowDown') movePlayer('down');
});

// Funções para coleta de recursos, exemplo:
setInterval(() => {
    if (Math.random() < 0.1) {
        collectResource('Comida');
    }
}, 3000);
