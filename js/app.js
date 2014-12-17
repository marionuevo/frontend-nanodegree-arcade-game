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
// Speed increases with player score :) by a factor of 10
Enemy.prototype.init = function() {
    this.x = -101;
    this.posy = Math.round(Math.random() * 2 + 2);
    this.y = this.posy * 83 - 106;
    this.speed = (Math.random() * MAXSPEED) + MINSPEED + (Math.floor (player.score/10) * 10);
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

// Converts player discrete grid position to 
// screen coordinates "analog" position
Player.prototype.update = function() {
    this.x = this.posx * 101 - 101;
    this.y = this.posy * 83 - 92;
}

// Gives player initial coordinates and score
Player.prototype.init = function() {
    this.posx = 3;
    this.posy = 6;
    this.score = 0;
}

// Draw player character
Player.prototype.render = function() {
    if (gameState === 2) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Process keystrokes
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.posx > 1)
                this.posx--;
            break;
        case 'up':
            if (this.posy > 1)
                this.posy--;
            break;
        case 'right':
            if (this.posx < 5)
                this.posx++;
            break;
        case 'down':
            if (this.posy < 6)
                this.posy++;
            break;
    }
}

// Gem is the object that store gems position. Player must recollect them
// to get more points.
var Gem = function ()  {
    this.sprite = 'images/star.png';
    this.init();
}

// Give gems inital position plus a random offset in x
// This offset allow to see where there are two or more gems
Gem.prototype.init = function() {
    this.posx = Math.round(Math.random() * 4 + 1);
    this.posy = Math.round(Math.random() * 2 + 2);
    this.x = this.posx * 101 - 101 + Math.random() * 5;
    this.y = this.posy * 83 - 90;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var allGems = [new Gem(), new Gem(), new Gem()];

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
