//canvas setup
const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=800;
canvas.height=600;
let score=0;
let gameFrame=0;
ctx.font="32px Georgia";
let gameOver=false;
let nrMaxEnemys=250;
const arrayEnemys=[];