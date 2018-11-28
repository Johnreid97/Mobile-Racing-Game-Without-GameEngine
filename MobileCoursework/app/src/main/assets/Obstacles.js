class obsatcles extends aSprite
{
    randomMovement()
    {
        
    }

}


    
  

var enemy = new aSprite(100,400, 4, 4, "Police.PNG", "Generic");
var enemies = [];

var enemyRespawn = 2000;
var carSpeed = 4;
var obstacleX = 100;
var obstacleY = 0; 
var bkgrndOffset = 50;
    
enemies[0] = new aSprite (0,0,4,4,"Police.PNG", "Generic" )
{
    this.x = obstacleX;
    this.y = obstacleY;
    

};

function getRandomPos(min, max)
{
	
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

function spawnenemies()
{
    getRandomPos(0, canvas.width/4.5);
    
    enemies.push(new aSprite (obstacleX,obstacleY,4,4,"Police.PNG", "Generic"))

}



