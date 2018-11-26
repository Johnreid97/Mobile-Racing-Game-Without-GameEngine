
document.write("<script src='Obstacles.js' type='text/javascript'></script>");
document.write("<script src='Inputs.js' type='text/javascript'></script>");

class aSprite {
 constructor(x, y, imageSRC, spType){
 //this.zindex = 0;
 this.x = x;
 this.y = y;
 this.sType = spType;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 }


 // Method
 render()
 {
 canvasContext.drawImage(this.sImage,this.x, this.y);
 }
 // Method
 scrollBK(delta)
 {

 canvasContext.save();
 canvasContext.translate( 0, delta);
 
 canvasContext.drawImage(this.sImage,0, 0);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height *2)
 
 canvasContext.restore();
 }
 // Method
 setPos(newX,newY){
 this.x = newX;
 this.y = newY;
 }

 // Static Method
 static distance(a, b)
 {
 const dx = a.x - b.x;
 const dy = a.y - b.y;

 return Math.hypot(dx, dy);
 }

 // Method
 spriteType(){
 console.log('I am an instance of aSprite!!!');
 }

 }







 var canvas;
 var canvasContext;
 var travel=0;
 var player;
 var enemyRespawn = 400;
 var carSpeed = 2;

 var mouseX;
 var mouseY;
 var mousedownID = -1;




 function resizeCanvas() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function load()
 {
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');
 init();
 }

 function init() {

 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch

 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchDown, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);
 canvas.addEventListener("mousedown", KeyDown, false);
 canvas.addEventListener("mouseup", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 background = new aSprite(0,0,"Road.jpg", "Generic");
 player = new aSprite(0,0,"Audi.png",  "Generic");
 
 player.setPos(0 ,600);
 //enemies[0].setPos(100,400);
 startTimeMS = Date.now();
 gameLoop();
 }
 }

 function gameLoop(){
 console.log("gameLoop");
 var elapsed = (Date.now() - startTimeMS)/1000;
 travel += elapsed * 100;

 if (travel > background.sImage.height)
 {
 travel = 0;
 }

 update(elapsed);
 render(elapsed);
 startTimeMS = Date.now();
 requestAnimationFrame(gameLoop);
 }



 function render(delta) {
 //canvasContext.clearRect(0,0,canvas.width, canvas.height);
 background.scrollBK(travel);

 for (var i = 0; i < enemies.length; i++)
 {
     enemy.setPos(enemies[i].x, enemies[i].y);
     enemy.render();
     enemies[i].y += carSpeed;
    //canvasContext.drawImage(enemy.sImage, enemies[i].x, enemies[i].y);
     if (enemies[i].y == enemyRespawn)
     {
     enemies.push({
       x: 50,
       y: 0
     //x: Math.floor(Math.random * background.width) -background.width,
     //y: 600

     });

     }
     player.render();
 }

 }

 function update(delta)
 {

 }

 function collisionDetection()
 {

 }

 function styleText(txtColour, txtFont, txtAlign, txtBaseline)
 {
 canvasContext.fillStyle = txtColour;
 canvasContext.font = txtFont;
 canvasContext.textAlign = txtAlign;
 canvasContext.textBaseline = txtBaseline;
 }


	 
 
