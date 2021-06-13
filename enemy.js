class Enemy{
    constructor(){
        this.x=canvas.width+200;
        this.y=Math.random()*(canvas.height-150)+90;
        this.speed=Math.random()*0.5+0.4;
        this.size=Math.floor(Math.random()*10*7+8)
        this.radius=55*3/this.size;
        this.frame=0;
        this.frameX=0;
        this.frameY=0;
        this.spriteW=418;
        this.spriteH=397;
    }
    draw(){
        /*
        ctx.fillStyle="red";
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        */
        ctx.drawImage(enemyImage,this.frameX*this.spriteW,this.frameY*this.spriteH,this.spriteW,this.spriteH,this.x-180/this.size,this.y-210/this.size,this.spriteW/this.size,this.spriteH/this.size);
    }
    update(){
        this.x-=this.speed;
        if(this.x<0-this.radius*2){
            this.x=canvas.width+200;
            this.y=Math.random()*(canvas.height-150)+90;
            this.speed=Math.random()*1.2+1;
        }
        if(gameFrame%5==0){
            this.frame++;
            if(this.frame>=12) this.frame=0;
            if(this.frame==3|| this.frame==7||this.frame==11){
                this.frameX=0;
            }else{
                this.frameX++;
            }
            if(this.frame<3) this.frameY=0;
            else if(this.frameY<7) this.frameY=1;
            else if(this.frameY<11) this.frameY=2;
            else this.frameY=0;
        }
      

    }
}