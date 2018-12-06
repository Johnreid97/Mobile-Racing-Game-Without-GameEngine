class obsatcles extends aSprite
{
    speedUp()
    {
        carspeed++;
    }

}



var enemies = [];

var enemyRespawn = 2000;
var carSpeed = 4;
var obstacleX = 0;
var obstacleY = 0; 
var bkgrndOffset = 50;
    

function getRandomPos(min, max)
{
	
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

function spawnenemies()
{
    getRandomPos(0, canvas.width);
    
    enemies.push(new obsatcles (obstacleX,obstacleY,1,1,"Audi.PNG", "Generic"))

}



