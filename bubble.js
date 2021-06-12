class Bubble{
    constructor(){
        this.x=Math.random()*canvas.width;
        this.y=canvas.height+100;
        this.radius=10;
        this.speed=Math.random()*5+1;
        this.distance;
        this.counted=false;
        this.sound=Math.random()<=0.5 ? 'sound1':'sound2';
    }
    update(){
        this.y-=this.speed;
        const dx=this.x-player.x;
        const dy=this.y-player.y;
        this.distance=Math.sqrt(dx*dx+dy*dy);
    }
    draw(){
        /*
        ctx.fillStyle="aqua";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        */
        ctx.drawImage(bubbleImage,this.x-10,this.y-10,this.radius*2.0,this.radius*2.0);
    }
    
}
function handleBubbles(){
    if(gameFrame%50==0){
        bubblesArray.push(new Bubble());
        //console.log(bubblesArray.length);
    }
    for(let i=0;i<bubblesArray.length;i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        if(bubblesArray[i].y<0-bubblesArray[i].radius*2){
            bubblesArray.splice(i,1);
            i--
        }else if(bubblesArray[i]){
            //collision
            if(bubblesArray[i].distance<bubblesArray[i].radius+player.radius){
                if(!bubblesArray[i].counted){
                    if(bubblesArray[i].sound=='sound1'){
                        bubblePop1.play();
                    }else{
                        bubblePop2.play();
                    }
                    score++;
                    checkScore();
                    player.size/=1.01;
                    player.setRadius();
                    bubblesArray[i].counted=true;
                    bubblesArray.splice(i,1);
                    i--;
                }
            }
        }
       
       
    }
  

    
}
function checkScore(){
    if(score>=25){
        handleGameWin();
    }
}