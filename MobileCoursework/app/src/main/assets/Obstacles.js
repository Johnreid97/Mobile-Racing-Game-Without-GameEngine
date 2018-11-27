//class obsatcles extends aSprite
//{
    


//}


    
  

var enemy = new aSprite(100,400, 4, 4, "Police.PNG", "Generic", 2);
var enemies = [];

var enemyRespawn = 2000;
var carSpeed = 2;
var obstacleX = 100;
var obstacleY = 0; 
    
enemies[0] = {
    x : obstacleX,
    y : obstacleY
    

};

function getRandomPos(min, max)
{
	//min = Math.celi(min)
	//max = Math.floor(max)
	
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

function spawnenemies()
{
    getRandomPos(0, canvas.width/4);
 enemies.push({
   x: obstacleX,
   y: obstacleY
 

 });
}



