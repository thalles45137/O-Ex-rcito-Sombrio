let player;
let obstacles = [];
let keys = [];
let timeElapsed = 0;
let keysCollected = 0;
let gameInterval;
let obstacleInterval;
let keyInterval;

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    // Inicializa variáveis
    player = document.getElementById('player');
    player.style.left = '50%';
    player.style.bottom = '10px';
    
    timeElapsed = 0;
    keysCollected = 0;
    obstacles = [];
    keys = [];
    updateUI();

    // Esconde botão de start e mostra a interface
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-ui').style.display = 'block';

    // Começa os intervalos
    gameInterval = setInterval(gameLoop, 1000);
    obstacleInterval = setInterval(spawnObstacle, 1500);
    keyInterval = setInterval(spawnKey, 3000);
}

function gameLoop() {
    timeElapsed++;
    updateUI();

    // Verifica se o jogador colidiu com um obstáculo
    for (let obstacle of obstacles) {
        if (checkCollision(player, obstacle)) {
            endGame();
            return;
        }
    }

    // Verifica se o jogador coletou uma chave
    for (let key of keys) {
        if (checkCollision(player, key)) {
            keysCollected++;
            key.remove();
            keys = keys.filter(k => k !== key);
        }
    }
}

function updateUI() {
    document.getElementById('game-time').textContent = timeElapsed;
    document.getElementById('keys-collected').textContent = keysCollected;
}

function spawnObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * 370}px`;
    obstacle.style.top = '0px';
    document.getElementById('obstacles').appendChild(obstacle);
    
    obstacles.push(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    const obstacleInterval = setInterval(() => {
        let obstacleTop = parseInt(obstacle.style.top);
        if (obstacleTop >= 400) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            obstacles = obstacles.filter(o => o !== obstacle);
        } else {
            obstacle.style.top = `${obstacleTop + 5}px`;
        }
    }, 50);
}

function spawnKey() {
    const key = document.createElement('div');
    key.classList.add('key');
    key.style.left = `${Math.random() * 370}px`;
    key.style.top = '0px';
    document.getElementById('keys').appendChild(key);
    
    keys.push(key);
    moveKey(key);
}

function moveKey(key) {
    const keyInterval = setInterval(() => {
        let keyTop = parseInt(key.style.top);
        if (keyTop >= 400) {
            clearInterval(keyInterval);
            key.remove();
            keys = keys.filter(k => k !== key);
        } else {
            key.style.top = `${keyTop + 3}px`;
        }
    }, 50);
}

function checkCollision(player, element) {
    const playerRect = player.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    return !(playerRect.right < elementRect.left || 
             playerRect.left > elementRect.right || 
             playerRect.bottom < elementRect.top || 
             playerRect.top > elementRect.bottom);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    clearInterval(keyInterval);
    alert(`Você perdeu! Você coletou ${keysCollected} chave(s) em ${timeElapsed} segundos.`);
    resetGame();
}

function resetGame() {
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('game-ui').style.display = 'none';
    document.getElementById('game-area').innerHTML = '<div id="player"></div>';
}
