
document.write("<script src='Obstacles.js' type='text/javascript'></script>");
document.write("<script src='Inputs.js' type='text/javascript'></script>");

class aSprite 
{
 constructor(x, y, ScaleX, ScaleY, imageSRC, spType){
 //this.zindex = 0;
 this.x = x;
 this.y = y;
 this.sizeX = ScaleX;
 this.sizeY = ScaleY;
 this.sType = spType;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 
 
 }


 // Method
 render()
 {
 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.drawImage(this.sImage,this.x, this.y, this.sImage.width,this.sImage.height);
 canvasContext.restore();
 }



 
 // Getter
 get xPos()
{
  return this.x;
}

get yPos(){
  return this.y;
}



 // Method
 setPos(newX,newY)
 {
 this.x = newX;
 this.y = newY;
 }

 drawCollider()
 {
  canvasContext.strokeRect(this.x + 73, this.y+ 10, (this.sImage.width/2)-20 ,this.sImage.height-30 );
 }


 // Method
 spriteType()
 {
 console.log('I am an instance of aSprite!!!');
 }

 collisionDetection(target)
 {
  if ( this.x +70 < ((target.x+73) + ((target.sImage.width/2 -20))) && ((this.x +70) + ((this.sImage.width/2)-20)) > target.x + 73 && this.y +25 < ((target.y+10) + (target.sImage.height-30)) && ((this.y +25) + (this.sImage.height-30)) > target.y +10)
  {
   //location.reload();
  }  
 }

 }

 class bkrnd extends aSprite
 {
  // Method
 scrollBK(delta)
 {

 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.translate( 0, delta);
 
 canvasContext.drawImage(this.sImage, 0, -this.sImage.height, canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage,0, 0, canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height,canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, -this.sImage.height*2 ,canvas.width/4, this.sImage.height)
 
 canvasContext.restore();
 }


 }

 var canvas;
 var canvasContext;
 var travel = 0;
 var player;
 var enemySpawn;
 var score  = 0;
 var elapsed;

 var mouseX;
 var mouseY;
 var mousedownID = -1;

 var soundMgr;

 var gameState;


 function resizeCanvas() 
 {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function load()
 {
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');
 init();
 }


 function init() 
 {



 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch
 
 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchXY, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);
 canvas.addEventListener("mousedown", KeyDown, false);
 canvas.addEventListener("mouseup", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 gameState = "intro";

 background = new bkrnd(0,0,4,4,"Road.jpg", "Generic");
 player = new aSprite(0,0,1,1,"Audi.png",  "Generic",);
 
 player.setPos((canvas.width - player.sImage.width)/2, ( canvas.height - player.sImage.height )/1.3);
 
 startTimeMS = Date.now();

 enemySpawn = setInterval(spawnenemies, enemyRespawn);
 gameLoop();
 }
 }

 function gameLoop()
 {
  
 console.log("gameLoop");

 elapsed = (Date.now() - startTimeMS)/1000;
 travel += elapsed * 100;
 if (travel > background.sImage.height)
 {
 travel = 0;
 }

 switch (gameState)
 {
    case "intro":
    introrender(elapsed);
    break;

    case "game":
    gamerender(elapsed);
    update(elapsed);
    break;

    case "end":
    endrender(elaspsed)
    break;
 }
 
 startTimeMS = Date.now();
 
 

 //player.drawCollider();
 requestAnimationFrame(gameLoop);
 }
  


function introrender(delta)
{
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  background.scrollBK(travel * 2);
  canvasContext.fillStyle = "blue";
  canvasContext.font = "bold 50px Comic Sans";
  canvasContext.fillText("Tap the Screen to Begin!", canvas.width/2 - 200, 100);
  canvasContext.fillText("Tap and Hold Either Side of the Screen to Move", canvas.width/2 - 350, canvas.height/2, 1000)

}

 function gamerender(delta) 
 {
 canvasContext.clearRect(0,0,canvas.width, canvas.height);
 
 background.scrollBK(travel * 2);
 
 for (var i = 0; i < enemies.length; i++)
 {
    
    // enemies[i].render(); 
     enemies[i].y += carSpeed; 
     enemies[i].collisionDetection(player);   
 }
  player.render();
 }

 function endrender(delta)
 {

 }

 function update(delta)
 {
  worldWrap();
  scoreCount();
  //if(soundMgr != null) soundMgr.playSound(0);
 }



 function styleText(txtColour, txtFont, txtAlign, txtBaseline)
 {
 canvasContext.fillStyle = txtColour;
 canvasContext.font = txtFont;
 canvasContext.textAlign = txtAlign;
 canvasContext.textBaseline = txtBaseline;
 }

 function scoreCount()
 {
   score += elapsed * 10;

   if (score > 100)
   {

   }
   canvasContext.fillStyle = "blue";
   canvasContext.font = "bold 50px Comic Sans";
   canvasContext.fillText("Score : " + score.toString().substr(0,4), background.x + 200, 100);
 }
 

 function worldWrap()
 {
  if (player.x > canvas.width)
  {
    player.setPos(0,player.y);
  }
  if (player.x < 0)
  {
    player.setPos(canvas.width,player.y);
  }


 }



	 
 
