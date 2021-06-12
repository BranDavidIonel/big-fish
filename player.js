class Player{
    constructor(){
        this.x=0;
        this.y=canvas.height/4;
        this.size=Math.floor(Math.random()*10*5+12)
        this.radius=(55*4)/this.size;
        this.angle=0;
        this.frame=0;
        this.frameX=0;
        this.frameY=0;
        this.spriteW=498;
        this.spriteH=327;
    }
    setRadius(){
        this.radius=(55*4)/this.size;
    }
    initPosition(){
        this.angle=0;
        this.frame=0;
        this.frameX=0;
        this.frameY=0;
    }
    update(){
        const dx=this.x-mouse.x;
        const dy=this.y-mouse.y;
        let theta=Math.atan2(dy,dx);
        this.angle=theta;
        if(Math.abs(mouse.x-this.x)>1){
            this.x-=dx/30;
        }
        if(Math.abs(mouse.y-this.y)>1){
            this.y-=dy/30;
        }
    }
    animatePlayer(){
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
    draw(){
         if(mouse.click){
             ctx.lineWidth=0.3;
             ctx.beginPath();
             ctx.moveTo(this.x,this.y);
             ctx.lineTo(mouse.x,mouse.y);
             ctx.stroke();
         }
         /*
         ctx.fillStyle='blue';
         ctx.beginPath();
         ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
         ctx.fill();
         ctx.closePath();
         */
         //ctx.fillRect(this.x,this.y,this.radius,10);
         ctx.save();
         ctx.translate(this.x,this.y);
         ctx.rotate(this.angle);
         if(this.x>mouse.x && Math.abs(this.x-mouse.x)>1){
         ctx.drawImage(playerLeft,this.frameX*this.spriteW,this.frameY*this.spriteH,
            this.spriteW,this.spriteH,-210/this.size,-145/this.size,this.spriteW/this.size,this.spriteH/this.size);
            this.animatePlayer();
         }else if(this.x>mouse.x && Math.abs(this.x-mouse.x)<=1){
            //this.initPosition();
            ctx.drawImage(playerLeft,this.frameX*this.spriteW,this.frameY*this.spriteH,
                this.spriteW,this.spriteH,-210/this.size,-145/this.size,this.spriteW/this.size,this.spriteH/this.size);
                
         } 
         
         if(this.x<mouse.x && Math.abs(this.x-mouse.x)>1){
            ctx.drawImage(playerRight,this.frameX*this.spriteW,this.frameY*this.spriteH,
                this.spriteW,this.spriteH,-210/this.size,-145/this.size,this.spriteW/this.size,this.spriteH/this.size);
                this.animatePlayer();
         }else if(this.x<mouse.x && Math.abs(this.x-mouse.x)<=1){
            //this.initPosition();
            ctx.drawImage(playerRight,this.frameX*this.spriteW,this.frameY*this.spriteH,
                this.spriteW,this.spriteH,-210/this.size,-145/this.size,this.spriteW/this.size,this.spriteH/this.size);
               
         }

         ctx.restore();
    }

}