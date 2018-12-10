class obstacles extends thePlayer
{
constructor(x, y, ScaleX, ScaleY, imageSRC,moveX)
{
    super(x, y, ScaleX, ScaleY, imageSRC);
    this.bool = moveX;

}
    Movement()
    {
        // if the boolean is true move the car on the x axis
        if (this.bool == true)
        {
        this.x += 2;
        }
       
    }

}


//Enemy Variables
var enemies = [];
var enemyRespawn = 2000;
var carSpeed = 5;
var obstacleX = 0;
var movementX;
var obstacleY = 0; 
var bkgrndOffset = 50;
    

function moveenemyX()
{
    movementX = Math.floor(Math.random() * (60 - 0));
   
}
function getRandom(min, max)
{
	//gets the enemies random X-position 
    obstacleX = Math.floor(Math.random() * (max - min)) + min;
   // setInterval(moveEnemyX, 5000);
}

function spawnenemies()
{
// gets random x-position between each side of the cavas
    getRandom(0, canvas.width);
    moveenemyX();

// adds a new enemy to the array
    if (score > 100 && movementX > 30)
    {
     enemies.push(new obstacles (obstacleX,obstacleY,1,1,"Police.png", true));
    }
    else {
    enemies.push(new obstacles (obstacleX,obstacleY,1,1,"Police.png", false));
    }
    
    
}





