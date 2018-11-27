
var enemy = new aSprite(100,400, "Police.PNG", "Generic");
var enemies = [];
var enemyRespawn = 400;
var carSpeed = 2;
var obstacleX;
var obstacleY = 0; 

enemies[0] = {
    x : 50,
    y : 0
    //enemy.setPos(100,400);

};

function getRandomPos(min, max)
{
	//min = Math.celi(min)
	//max = Math.floor(max)
	
	obstacleX = Math.floor(Math.random() * (max - min)) + min;
}

