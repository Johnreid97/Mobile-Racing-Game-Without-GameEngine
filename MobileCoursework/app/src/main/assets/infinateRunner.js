
document.write("<script src='Obstacles.js' type='text/javascript'></script>");
document.write("<script src='Inputs.js' type='text/javascript'></script>");


// base classed used as a base for other classes
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

 //Method
 render()
 {
// renders and rescales the image
 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.drawImage(this.sImage,this.x, this.y, this.sImage.width,this.sImage.height);
 canvasContext.restore();
 }



 
 // Getter
//  get xPos()
// {
//   return this.x;
// }

// get yPos(){
//   return this.y;
// }



 // Method
 setPos(newX,newY)
 {
 // Sets the X and Y position
 this.x = newX;
 this.y = newY;
 }

 //Method
 drawCollider()
 {
   //Draws the a box that shows the collider
  canvasContext.strokeRect(this.x + 73, this.y+ 10, (this.sImage.width/2)-20 ,this.sImage.height-30 );
 }


//  // Method
//  spriteType()
//  {
//  console.log('I am an instance of aSprite!!!');
//  }

 collisionDetection(target)
 {
   //Checks if there is a collision between the player and enemy and changes the game state
  if ( this.x +70 < ((target.x+73) + ((target.sImage.width/2 -20))) && ((this.x +70) + ((this.sImage.width/2)-20)) > target.x + 73 && this.y +25 < ((target.y+10) + (target.sImage.height-30)) && ((this.y +25) + (this.sImage.height-30)) > target.y +10)
  {
   gameState = "end";
   //plays a sound
   if(soundMgr != null) soundMgr.playSound(0);
  }  
 }

 }

 class bkrnd extends aSprite
 {
 // Method
 scrollBK(delta)
 {
//Draws 3 images and moves them and restores them to give the illusion of movement
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

 // Canvas variables
 var canvas;
 var canvasContext;

 
 //Player variable
 var player;
 var score  = 0;
 

 
 //Misc Variables 
 var elapsed;
 var travel = 0;
 var gameState;
 

 //Mouse variables
 var mouseX;
 var mouseY;
 var mousedownID = -1;

 //Sound variable 
 var soundMgr;


 function resizeCanvas() 
 {
 // #Resizes the canvas
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function load()
 {
  //Loads the game canvas and sets it to 2d
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');
 init();
 }


 function init() 
 {



 if (canvas.getContext) {
 
 //Sets event listeners for touch and mouse clicks
 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchXY, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);
 canvas.addEventListener("mousedown", KeyDown, false);
 canvas.addEventListener("mouseup", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 //Sets the game state 
 gameState = "intro";

 //sets variables to inherit from the respected classes
 background = new bkrnd(0,0,4,4,"Road.jpg", "Generic");
 player = new aSprite(0,0,1,1,"Audi.png",  "Generic",);
 
 //Sets the position of the player 
 player.setPos((canvas.width - player.sImage.width)/2, ( canvas.height - player.sImage.height )/1.3);
 
 startTimeMS = Date.now();


 gameLoop();
 }
 }

 function gameLoop()
 {
  
 console.log("gameLoop");

 //Resets the backround image if it goes past a certain point
 elapsed = (Date.now() - startTimeMS)/1000;
 travel += elapsed * 100;
 if (travel > background.sImage.height)
 {
 travel = 0;
 }

 //switches the game state depending on the situation 
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
    endrender(elapsed);
    break;
 }
 
 startTimeMS = Date.now();
 
 

 //player.drawCollider();
 requestAnimationFrame(gameLoop);
 }
  


function introrender(delta)
{
  //reders text, background for the intro section of the screen
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  background.scrollBK(travel * 2);
  canvasContext.fillStyle = "blue";
  canvasContext.font = "bold 50px Comic Sans";
  canvasContext.fillText("Tap the Screen to Begin!", canvas.width/2 - 200, 100);
  canvasContext.fillText("Tap and Hold Either Side of the Screen to Move", canvas.width/2 - 350, canvas.height/2, 1000)

}

 function gamerender(delta) 
 {
 //renders everything in for the actual gameplay
 canvasContext.clearRect(0,0,canvas.width, canvas.height);
 
 background.scrollBK(travel * 2);
 
 // loops through the enemies array, renders the enemy, moves it and checks for collisions
 for (var i = 0; i < enemies.length; i++)
 {     
     enemies[i].render();
     enemies[i].y += carSpeed; 
     enemies[i].collisionDetection(player); 
     //if (enemies[i].x == movementX)
     //{
      // enemies[i].x += 2;
     //} 
     //worldWrap(enemies[i]); 
     
 }
 //renders the player
  player.render();
 }

 function endrender(delta)
 {
   //renders stops the enemies spawning,moves the background and displays the score etc.
  clearInterval(enemySpawn);  
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  background.scrollBK(travel * 2);
  canvasContext.fillStyle = "blue";
  canvasContext.font = "bold 50px Comic Sans";
  canvasContext.fillText("Tap the Screen to Retry!", canvas.width/2 - 200, 100);
  canvasContext.fillText("Your Score was: " + score.toString().substr(0,4), canvas.width/2, canvas.height/2, 300);
  Reset();
 }

 function update(delta)
 {
  
  worldWrap(player);
  scoreCount();
  //MoveEnemy();


  
 }



//  function styleText(txtColour, txtFont, txtAlign, txtBaseline)
//  {
//  canvasContext.fillStyle = txtColour;
//  canvasContext.font = txtFont;
//  canvasContext.textAlign = txtAlign;
//  canvasContext.textBaseline = txtBaseline;
//  }

 function scoreCount()
 {
   //adds to the score
   score += elapsed * 10;

   if (score > 100)
   {
    
   }
   //displays the score
   canvasContext.fillStyle = "blue";
   canvasContext.font = "bold 50px Comic Sans";
   canvasContext.fillText("Score : " + score.toString().substr(0,4), background.x + 200, 100);
 }
 

 function worldWrap(object)
 {
   //checks if the player is going off the screen and moves them to the other side of the screen
  if (object.x > canvas.width)
  {
    object.setPos(object.x - object.x,object.y);
  }
  if (player.x < 0)
  {
    object.setPos(canvas.width,object.y);
  }
 }

 
// function MoveEnemy()
// {
//   movementX += 2;
// }

 

function Reset()
{
  //resets the player and deletes all the enemies that were on the screen
  //used when the player restarts from the end screen
  player.setPos((canvas.width - player.sImage.width)/2, ( canvas.height - player.sImage.height )/1.3);

  for (var i = 0; i < enemies.length; i++)
 {    
     delete enemies[i].x;   
     delete enemies[i].y;  
     enemies[i].clearRect;
 }

}


 



	 
 
