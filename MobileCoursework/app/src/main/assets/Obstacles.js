class obstacles extends aSprite
{
    speedUp()
    {
        carspeed++;
    }

}



var enemies = [];

//var debug = [];

var enemyRespawn = 2000;
var carSpeed = 5;
var obstacleX = 0;
var movementX = 0
var obstacleY = 0; 
var bkgrndOffset = 50;
    

function getRandom(min, max)
{
	
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

function spawnenemies()
{
   // var randomNum = Math.floor(Math.random() * (60 - 0) + 0);
    getRandom(0, canvas.width);
    

   // if (score > 100 && randomNum > 30)
    //{
        
       // enemies.push(new aSprite (movementX,obstacleY,1,1,"Police.png", "Generic"))
        //console.log(1);
   //}
    //else
    //{
    enemies.push(new aSprite (obstacleX,obstacleY,1,1,"Police.png", "Generic"))
    //}
    //debug.push(new aSprite(100,400, 1,1, "Audi.png", "Generic"));
    
}





