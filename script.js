document.getElementById('start-btn').addEventListener('click', startGame);

let player;
let villains = [];
let gameInterval;
let villainInterval;
let timeElapsed = 0;
let playerHealth = 100;
let playerGold = 0;

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-ui').style.display = 'block';
    
    player = document.getElementById('player');
    player.style.left = '50%';
    player.style.bottom = '0px';
    
    villains = [];
    timeElapsed = 0;
    playerHealth = 100;
    playerGold = 0;
    
    updateUI();
    
    gameInterval = setInterval(gameLoop, 1000);
    villainInterval = setInterval(spawnVillain, 2000);
}

function gameLoop() {
    timeElapsed++;
    updateUI();

    if (playerHealth <= 0) {
        clearInterval(gameInterval);
        clearInterval(villainInterval);
        alert('Você foi derrotado! O jogo será reiniciado.');
        resetGame();
    }
}

function spawnVillain() {
    const villain = document.createElement('div');
    villain.classList.add('villain');
    villain.style.left = `${Math.random() * 750}px`;
    villain.style.top = '0px';
    
    document.getElementById('villains').appendChild(villain);
    
    villains.push(villain);
    moveVillain(villain);
}

function moveVillain(villain) {
    const villainMoveInterval = setInterval(() => {
        let villainTop = parseInt(villain.style.top);
        if (villainTop >= 600) {
            clearInterval(villainMoveInterval);
            villain.remove();
        } else {
            villain.style.top = `${villainTop + 5}px`;
            if (checkCollision(villain)) {
                clearInterval(villainMoveInterval);
                playerHealth -= 10;
                villain.remove();
            }
        }
    }, 50);
}

function checkCollision(villain) {
    const villainRect = villain.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    
    return !(villainRect.right < playerRect.left || 
             villainRect.left > playerRect.right || 
             villainRect.bottom < playerRect.top || 
             villainRect.top > playerRect.bottom);
}

function updateUI() {
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('player-gold').textContent = playerGold;
    document.getElementById('game-time').textContent = timeElapsed;
}

function resetGame() {
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('game-ui').style.display = 'none';
    document.getElementById('villains').innerHTML = '';
    document.getElementById('game-area').innerHTML = '<div id="player"></div>';
}
