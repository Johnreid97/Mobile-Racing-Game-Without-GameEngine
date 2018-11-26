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
 if(gameOverScreenScreen)
 {
 return;
 }

 touchXY(evt);
 }

 function touchXY(evt) {
 evt.preventDefault();
 if(lastPt!=null) {
 var touchX = evt.touches[0].pageX - canvas.offsetLeft;
 var touchY = evt.touches[0].pageY - canvas.offsetTop;
 }
 lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
 playerMovement();

 }




 function KeyDown(evt)
 {
     mouseX = evt.clientX;
	 mouseY = evt.clientY;

if (mousedownID == -1)
{
	mousedownID = setInterval(whilemousedown, 100);
}

 }

 function whilemousedown()
 {

     if (mouseX > background.sImage.width/2)
   {
      player.x +=10;
   }
   else if(mouseX < background.sImage.width/2)
   {
      player.x -=10;
   }
 }