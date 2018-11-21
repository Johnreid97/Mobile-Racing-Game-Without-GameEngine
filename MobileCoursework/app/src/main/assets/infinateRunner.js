
class aSprite {
 constructor(x, y, imageSRC, velx, vely, spType){
 this.zindex = 0;
 this.x = x;
 this.y = y;
 this.vx = velx;
 this.vy = vely;
 this.sType = spType;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 }
 // Getter
 get xPos(){
 return this.x;
 }

 get yPos(){
 return this.y;
 }

 // Setter
 set xPos(newX){
 this.x = newX;
 }

 set yPos(newY){
 this.y = newY;
 }

 // Method
 render()
 {
 canvasContext.drawImage(this.sImage,this.x, this.y);
 }
 // Method
 scrollBK(delta)
 {
 //var xPos = delta * this.vx;

 canvasContext.save();
 canvasContext.translate( 0, -delta);
 canvasContext.drawImage(this.sImage,0, 0);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height *2)
 canvasContext.restore();
 }
 // Method
 sPos(newX,newY){
 this.x = newX;
 this.y = newY;
 }

 // Static Method
 static distance(a, b) {
 const dx = a.x - b.x;
 const dy = a.y - b.y;

 return Math.hypot(dx, dy);
 }

 // Method
 spriteType(){
 console.log('I am an instance of aSprite!!!');
 }

 }

 class Enemy extends aSprite {
 // Method
 spriteType(){
 super.spriteType();
 console.log('I am a ' + this.sType + ' instance of aSprite!!!');
 }
 }

 var canvas;
 var canvasContext;
 var travel=0;
 var theCar;

 function resizeCanvas() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function load()
 {
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');
 init();
 }

 function init() {

 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch

 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchDown, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 bkgdImage = new aSprite(0,0,"Road.jpg", 100, 0, "Generic");
 theCar = new aSprite(100,0,"Car.png", 0, 0, "Generic");
 theCar.sPos(100,400);
 console.log(theCar.y);
 startTimeMS = Date.now();
 gameLoop();
 }
 }

 function gameLoop(){
 console.log("gameLoop");
 var elapsed = (Date.now() - startTimeMS)/1000;
 travel += elapsed * bkgdImage.vx;
 if (travel > bkgdImage.sImage.height)
 {
 travel = 0;
 }

 update(elapsed);
 render(elapsed);
 startTimeMS = Date.now();
 requestAnimationFrame(gameLoop);
 }

 function render(delta) {
 canvasContext.clearRect(0,0,canvas.width, canvas.height);
 bkgdImage.scrollBK(travel);
 theCar.render();
 }

 function update(delta) {
 }

 function collisionDetection() {

 }

 function styleText(txtColour, txtFont, txtAlign, txtBaseline)
 {
 canvasContext.fillStyle = txtColour;
 canvasContext.font = txtFont;
 canvasContext.textAlign = txtAlign;
 canvasContext.textBaseline = txtBaseline;
 }

 function touchUp(evt) {
 evt.preventDefault();
 // Terminate touch path
 lastPt=null;
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
 }