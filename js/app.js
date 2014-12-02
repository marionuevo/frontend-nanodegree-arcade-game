// Constants definition as global scope variables
MINSPEED = 100;
MAXSPEED = 300;
CANVASWIDTH = 505;
CANVASHEIGTH = 606;

// gameState is 0 on GAME OVER, 1 on READY and 2 on running.
var gameState = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
}

// Set initial position values for an enemy
// x is outside the screen, on the left
// y gets a random value from 3 possible rows
// Speed is also variable and random between MINSPEED and MAXSPEED
Enemy.prototype.init = function() {
    this.x = -101;
    this.y = 60 + (Math.round(Math.random() * 2) * 83);
    this.speed = (Math.random() * MAXSPEED) + MINSPEED;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // check if enemy go beyond the canvas right limit
    if (this.x > CANVASWIDTH) {
        this.init();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.init();
}

Player.prototype.update = function() {
    // not used
}

// Gives player initial coordinates
Player.prototype.init = function() {
    this.x = (CANVASWIDTH - 101)/ 2;
    this.y = CANVASHEIGTH - 101 * 2; // 2 cells
}

// Draw player character
Player.prototype.render = function() {
    if (gameState === 2) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Read keystrokes from keyboard
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0)
                this.x = this.x - 101;
            break;
        case 'up':
            if (this.y > -11)
                this.y = this.y - 83;
            break;
        case 'right':
            if (this.x < 404)
                this.x = this.x + 101;
            break;
        case 'down':
            if (this.y < 404)
                this.y = this.y + 83;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (gameState === 2) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
