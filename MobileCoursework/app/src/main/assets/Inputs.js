 function touchUp(evt) {
 evt.preventDefault();
 // Terminate touch path
 lastPt=null;
  if (mousedownID!= -1)
  {
	  clearInterval(mousedownID);
	  mousedownID = -1
  }
 }

 function touchDown(evt) {

 evt.preventDefault();
 touchXY(evt);
 }

 function touchXY(evt) {
 evt.preventDefault();
 //gets the touch positions
 if(lastPt!=null) {
 var touchX = evt.touches[0].pageX - canvas.offsetLeft;
 var touchY = evt.touches[0].pageY - canvas.offsetTop;
 }
 lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};

//Checks the gamestate to allow movement
 if (gameState == "game")
 {
 if (mousedownID == -1)
{
	mousedownID = setInterval(whilemousedown, 10);
}
 }

 //checks if the player is not on the game scene
 if (gameState == "intro" || gameState == "end")
 {
    //resets the score, plays the background music, starts the game and spawns the enemies
    score = 0;

    gameState = "game"
    
    enemySpawn = setInterval(spawnenemies, enemyRespawn);
    movementX = setInterval(moveenemyX,6000);
    
    
 }

}


 function KeyDown(evt)
 {
   // does the exact same thing as touchXY but for mouse clicks 
    mouseX = evt.clientX;
	 mouseY = evt.clientY;
    if (gameState == "game")
    {
if (mousedownID == -1)
{
	mousedownID = setInterval(whilemousedown, 10);
}
   }
   if (gameState == "intro" || gameState == "end")
   {

      score = 0;
      gameState = "game"
      
      enemySpawn = setInterval(spawnenemies, enemyRespawn);
     
   }

 }

 function whilemousedown()
 {
// moves the player left or right while the players finger/mouse is held down 
     if (mouseX > canvas.width/2)
   {
      //player.x = player.lerp(player.x, mouseX, 0.01);
      player.x += 5;
   }
    else if(mouseX < canvas.width/2)
      {
         //player.x = player.lerp(player.x, mouseX, 0.01);
         player.x -= 5;
      }

    if (lastPt != null && lastPt.x > canvas.width/2)
      {
         //player.x = player.lerp(player.x, mouseX, 0.01);
         player.x += 5;
      }
       else if(lastPt!= null && lastPt.x < canvas.width/2)
         {
            //player.x = player.lerp(player.x, mouseX, 0.01);
            player.x -= 5;
         }

 }