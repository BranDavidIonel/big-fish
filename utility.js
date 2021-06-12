//canvas setup
const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=800;
canvas.height=600;
let score=0;
let gameFrame=0;
ctx.font="19px Georgia";
let gameOver=false;
const arrayEnemys=[];

//reset game
function resetGame(){
    console.log('reset');
    gameOver=false;
     player=new Player();
     enemy1=new Enemy();
     score=0;
     //generateEnemys();
    animate();
}
//mouse interactivity
let canvasPosition=canvas.getBoundingClientRect();
const mouse={
    x:canvas.width/2,
    y:canvas.height/2,
    click:false
}
canvas.addEventListener('mousedown',function(event){
    mouse.click=true;
    mouse.x=event.x-canvasPosition.left;
    mouse.y=event.y-canvasPosition.top;
    //console.log(mouse.x,mouse.y);
   
});
canvas.addEventListener('mouseup',function(event){
    mouse.click=false;
});
//player
const playerLeft=new Image();
playerLeft.src="fish_swim_left.png";
const playerRight=new Image();
playerRight.src="fish_swim_right.png";

//const player=new Player();
 player=new Player();
//bubble
const bubblesArray=[];
const bubblePop1=document.createElement('audio');
bubblePop1.src="sound\\plop.ogg";
const bubblePop2=document.createElement('audio');
bubblePop2.src="sound\\plop2.wav";
const bubbleImage=new Image();
bubbleImage.src="bubble-64px.png";

//Repeating backgrounds
const background=new Image();
background.src='background1.png';
function handleBackground(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height/3);
}
//enemies
const enemyImage=new Image();
enemyImage.src='fish_enemy_swim.png';

//const enemy1=new Enemy();
enemy1=new Enemy();
function handleEnemies(){
    enemy1.draw();
    enemy1.update();
   

}
function handleGameOver(){
    ctx.fillStyle="black";
    ctx.fillText('GAME OVER, you reached score '+score+'!',10,140);
    gameOver=true;

}
//draw enemys
function generateEnemys(){
    for(let i=0;i<5;i++){
        arrayEnemys.push(new Enemy());
    }
   
}
function drawEnemys(){
    for(let i=0;i<arrayEnemys.length;i++){
        console.log(arrayEnemys[i]);
        arrayEnemys[i].draw();
        arrayEnemys[i].update();
      

    }
}
generateEnemys();
//animation loop
function animate(){
   
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBackground();
    drawEnemys();
    //handleEnemies();
  
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle='black';
    ctx.fillText('score:'+score,10,30);
    gameFrame++;
   
    if(!gameOver) requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',function(){
    canvasPosition=canvas.getBoundingClientRect();
});
