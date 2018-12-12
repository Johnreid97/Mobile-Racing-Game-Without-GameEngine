
document.write("<script src='Obstacles.js' type='text/javascript'></script>");
document.write("<script src='Inputs.js' type='text/javascript'></script>");
document.write("<script src='storage.js' type='text/javascript'></script>");


// base classed used for the player and as a base for other classes
class thePlayer 
{
 constructor(x, y, ScaleX, ScaleY, imageSRC){
 //this.zindex = 0;
 this.x = x;
 this.y = y;
 this.sizeX = ScaleX;
 this.sizeY = ScaleY;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 }

 //Method
 render()
 {
// renders and rescales the image
 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.drawImage(this.sImage,this.x, this.y,this.sImage.height,this.sImage.width);
 //canvasContext.drawImage(this.sImage,this.x, this.y);
 canvasContext.restore();
 }

 // Method
 setPos(newX,newY)
 {
 // Sets the X and Y position
 this.x = newX;
 this.y = newY;
 }

 collisionDetection(target)
 {
   //Checks if there is a collision between the player and enemy and changes the game state
  if ( this.x +70 < ((target.x+73) + ((target.sImage.width/2 -20))) && 
  ((this.x +70) + ((this.sImage.width/2)-20)) > target.x + 73 && 
  this.y +25 < ((target.y+10) + (target.sImage.height-30)) && ((this.y +25) + (this.sImage.height-30)) > target.y +10)
  {
   gameState = "end";
   //plays a sound
   if(soundMgr != null) 
   {
   soundMgr.playSound(0);
   }
   SetHighScore();
  }  
 }

 }

 class bkrnd extends thePlayer
 {
 // Method
 scrollBK(delta)
 {
//Draws 3 images and moves them and restores them to give the illusion of movement
 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.translate(0, delta);
 


 canvasContext.drawImage(this.sImage, 0, -this.sImage.height, canvas.width, canvas.height);
 canvasContext.drawImage(this.sImage,0, 0, canvas.width, canvas.height);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height,canvas.width, canvas.height);
 canvasContext.drawImage(this.sImage, 0, -this.sImage.height*2 ,canvas.width, canvas.height)
 
 canvasContext.restore();
 }
 }

 // Canvas variables
 var canvas;
 var canvasContext;

 
 //Player variable
 var player;
 var score  = 0;
 var highScore = 0;
 

 
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

 if (StorageAvailable('localStorage'))
 {
   if (localStorage.getItem('HighScore'))
   {
     SavedScores();
   }
   console.log("Local Storage Available");
   
 }
 else 
 {
   console.log("Local Storage Not Available");
 }
 Initialise();
 }


 function Initialise() 
 {
 if (canvas.getContext) {
 
 //Sets event listeners for touch and mouse clicks
 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchXY, false);
 canvas.addEventListener("touchend", touchUp, false);
 canvas.addEventListener("mousedown", KeyDown, false);
 canvas.addEventListener("mouseup", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();
 if(soundMgr != null) soundMgr.playMusic(0);
 //Sets the game state 
 gameState = "intro";

 //sets variables to inherit from the respected classes
 background = new bkrnd(0,0,1,4,"Road.jpg");
 player = new thePlayer(0,0,1,1,"Audi.png");
 
 //Sets the position of the player 
 player.setPos((canvas.width - player.sImage.width)/2, ( canvas.height - player.sImage.height )/1.3);
 
 startTimeMS = Date.now();

 gameLoop();
 }
 }

 function gameLoop()
 {
  
 console.log("gameLoop");
 //Resets the background image if it goes past a certain point
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
 
 requestAnimationFrame(gameLoop);
 }
  


function introrender(delta)
{
  //renders text, background for the intro section of the screen
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  background.scrollBK(travel * 2);
  canvasContext.fillStyle = "blue";
  canvasContext.textAlign = "center";
  canvasContext.font = "bold 50px Comic Sans";
  canvasContext.fillText("Tap the Screen to Begin!", canvas.width/2, canvas.height/6, canvas.width);
  canvasContext.fillText("Tap and Hold Either Side of the Screen to Move", canvas.width/2, canvas.height/2, canvas.width/1.5)

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
     enemies[i].Movement();
     enemies[i].collisionDetection(player); 
     worldWrap(enemies[i]);
      
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
  canvasContext.textAlign = "center";
  canvasContext.font = "bold 50px Comic Sans";
  canvasContext.fillText("Game Over! Tap the Screen to Retry!", canvas.width/2, 100, canvas.width);
  canvasContext.fillText("Your Score was: " + score.toString().substr(0,4), canvas.width/2, canvas.height/2, canvas.width);
  Reset();
  
  canvasContext.fillText("HighScore:" + highScore.toString().substr(0,4), canvas.width/2, canvas.height/4, canvas.width);

 }

 function update(delta)
 {
  worldWrap(player);
  scoreCount();
 }


 function scoreCount()
 {
   //adds to the score
   score += elapsed * 10;

   //displays the score
   canvasContext.fillStyle = "blue";
   canvasContext.textAlign = "center";
   canvasContext.font = "bold 50px Comic Sans";
   canvasContext.fillText("Score : " + score.toString().substr(0,4), canvas.width/8 ,  canvas.height/12, canvas.width);
 }
 

 function worldWrap(object)
 {
   //checks if the player is going off the screen and moves them to the other side of the screen
  if (object.x > canvas.width)
  {
    object.setPos(object.x - object.x,object.y);
    if(soundMgr != null) soundMgr.playSound(1);
  }
  if (player.x < 0)
  {
    object.setPos(canvas.width,object.y);
    if(soundMgr != null) soundMgr.playSound(1);

  }
 }
 

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

function SetHighScore()
{
  if (score > highScore)
  {
    localStorage.setItem('HighScore', score);
    highScore = score;
  }
}


 



	 
 
