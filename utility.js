

//reset game
function resetGame() {
    arrayEnemys.length=0;
    generateEnemys(); 
    gameOver = false;
    player = new Player();
    score = 0;
    //generateEnemys();
    animate();
}
//mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener('mousedown', function (event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    //console.log(mouse.x,mouse.y);

});
canvas.addEventListener('mouseup', function (event) {
    mouse.click = false;
});
//player
const playerLeft = new Image();
playerLeft.src = "fish_swim_left.png";
const playerRight = new Image();
playerRight.src = "fish_swim_right.png";

//const player=new Player();
player = new Player();
//bubble
const bubblesArray = [];
const bubblePop1 = document.createElement('audio');
bubblePop1.src = "sound\\plop.ogg";
const bubblePop2 = document.createElement('audio');
bubblePop2.src = "sound\\plop2.wav";
const bubbleImage = new Image();
bubbleImage.src = "bubble-64px.png";

//Repeating backgrounds
const background = new Image();
background.src = 'background1.png';
function handleBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height / 3);
}
//enemies
const enemyImage = new Image();
enemyImage.src = 'fish_enemy_swim.png';

//const enemy1=new Enemy();
enemy1 = new Enemy();
function handleEnemies() {
    enemy1.draw();
    enemy1.update();


}
function handleGameOver() {
    ctx.fillStyle = "red";
    ctx.fillText('GAME OVER, you reached score ' + score + '!', 70, 140);
    gameOver = true;

}
function handleGameWin(message='!!!') {
    ctx.fillStyle = "blue";
    ctx.fillText('Congrulation!'+message, 70, 140);
    gameOver = true;
}

//draw enemys
function generateEnemys(nr) {
    for (let i = 0; i < nr; i++) {
        arrayEnemys.push(new Enemy());
    }

}
function drawEnemys() {
    for (let i = 0; i < arrayEnemys.length; i++) {
        console.log(arrayEnemys[i]);
        arrayEnemys[i].draw();
        arrayEnemys[i].update();
        //collision with player
        const dx = arrayEnemys[i].x - player.x;
        const dy = arrayEnemys[i].y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < arrayEnemys[i].radius + player.radius) {
            //I eat enemy
            if (arrayEnemys[i].radius < player.radius) {
                arrayEnemys.splice(i,1);
                i--;
                player.size /= 1.03;
                if(player.radius>200){
                    handleGameWin('You ruined the ecosystem.');
                }
                generateEnemys(Math.floor(Math.random()*2+1));
                player.setRadius();
            } else {
                handleGameOver();
            }
        }

    }
}
generateEnemys(25);
//animation loop
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();

    //handleEnemies();

    handleBubbles();
    player.update();
    player.draw();
    drawEnemys();
    //checkCollision();
    ctx.fillStyle = 'black';
    ctx.fillText('score:' + score, 10, 30);
    gameFrame++;

    if (!gameOver) requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', function () {
    canvasPosition = canvas.getBoundingClientRect();
});
