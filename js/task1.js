const MAX_HP = 100;
const MIN_DAMAGE = 10;
const MAX_DAMAGE = 20;

let danteHP = MAX_HP;
let demonHP = MAX_HP;
let gameOver = false;

const danteText = document.getElementById("danteHP");
const demonText = document.getElementById("demonHP");
const message = document.getElementById("message");
const attackButton = document.getElementById("attack");

function updateScreen() {
    danteText.textContent = danteHP;
    demonText.textContent = demonHP;
}

function finishGame() {
    gameOver = true;
    attackButton.disabled = true;
}

attackButton.addEventListener("click", function() {
    if (gameOver === true || danteHP === 0 || demonHP === 0) {
        message.textContent = "The game is over! Press Restart to play again.";
        return;
    }

    const damage = Math.floor(Math.random() * (MAX_DAMAGE - MIN_DAMAGE + 1)) + MIN_DAMAGE;
    demonHP = Math.max(0, demonHP - damage);

    if (demonHP === 0 && danteHP > 0) {
        message.textContent = "Dante wins!";
        finishGame();
    } else {
        const demonDamage = Math.floor(Math.random() * (MAX_DAMAGE - MIN_DAMAGE + 1)) + MIN_DAMAGE;
        danteHP = Math.max(0, danteHP - demonDamage);

        if (danteHP === 0 && demonHP === 0) {
            message.textContent = "It's a draw!";
            finishGame();
        } else if (danteHP === 0 || demonHP === 0) {
            message.textContent = "Dante is defeated!";
            finishGame();
        } else if (danteHP > 0 && demonHP > 0) {
            message.textContent = "Dante dealt " + damage + " damage. Demon dealt " + demonDamage + " damage.";
        }
    }

    updateScreen();
});

document.getElementById("restart").addEventListener("click", function() {
    danteHP = MAX_HP;
    demonHP = MAX_HP;
    gameOver = false;
    attackButton.disabled = false;
    message.textContent = "The battle begins!";
    updateScreen();
});