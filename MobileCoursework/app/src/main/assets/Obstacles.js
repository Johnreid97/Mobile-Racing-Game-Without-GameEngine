class obstacles extends aSprite
{
    speedUp()
    {
        carspeed++;
    }

}


//Enemy Variables
var enemies = [];
var enemyRespawn = 2000;
var carSpeed = 5;
var obstacleX = 0;
var movementX = 0
var obstacleY = 0; 
var bkgrndOffset = 50;
    

function getRandom(min, max)
{
	//gets the enemies random X-position 
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

function spawnenemies()
{
   // var randomNum = Math.floor(Math.random() * (60 - 0) + 0);
   // gets random x-position between each side of the cavas 
    getRandom(0, canvas.width);
    

   // if (score > 100 && randomNum > 30)
    //{
        
       // enemies.push(new aSprite (movementX,obstacleY,1,1,"Police.png", "Generic"))
        //console.log(1);
   //}
    //else
    //{

    // adds a new enemy to the array
    enemies.push(new aSprite (obstacleX,obstacleY,1,1,"Police.png", "Generic"))
    
    //}
    
    
}





