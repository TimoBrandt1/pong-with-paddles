class Ball {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  Draw(context){
    context.beginPath();
    context.arc(this.x,this.y,20,0,Math.PI*2);
    context.fillStyle = ballColor();
    context.closePath();
    context.stroke();
    context.fill();
  }
}

class Paddle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  Draw(context){
    context.beginPath();
    context.rect(this.x, this.y, 30, 200);
    context.fillStyle	= "red";
    context.closePath();
    context.stroke();
    context.fill();
  }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//Makes the canvas the same width and height as the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Creates a random number
function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

//Makes random spawn location for ball 1
let myX = getRandomNumber(canvas.width);
let myY = getRandomNumber(canvas.height);

//Makes random spawn location for ball 2
let myX2 = getRandomNumber(canvas.width);
let myY2 = getRandomNumber(canvas.height);

//Makes Ball 1
let myBall = new Ball(myX,myY);
myBall.Draw(context);

//Makes Ball 2
let myBall2 = new Ball(myX2,myY2);
myBall2.Draw(context);

//Speed Ball 1
let speedX = 10;
let speedY = 17;

//Speed Ball 2
let speedX2 = 10;
let speedY2 = -3;

//left Rectangle
let lPaddle = new Paddle(40,20);
lPaddle.Draw(context);

//Right Rectangle
let rPaddle = new Paddle(canvas.width - 70, 20);
rPaddle.Draw(context);

function animate() {
  //animates the ball so it looks smooth
  window.requestAnimationFrame(animate);

  //Clears the last ball after making a new one
  context.clearRect(0,0,canvas.width,canvas.height);

  //Draws ball 1
  myBall.Draw(context);
  myBall.x += speedX;
  myBall.y += speedY;

  //Draws ball 2
  myBall2.Draw(context);
  myBall2.x += speedX2;
  myBall2.y += speedY2;

  //Ball 1 wall detection
  if(myBall.y > canvas.height - 20){speedY = -speedY;}
  if(myBall.y < 20){speedY = -speedY;}
  if(myBall.x > canvas.width - 80){speedX = -speedX;}
  if(myBall.x < 20){speedX = -speedX;}

  //Ball 2 wall detection
  if(myBall2.y > canvas.height - 20){speedY2 = -speedY2;}
  if(myBall2.y < 20){speedY2 = -speedY2;}
  if(myBall2.x > canvas.width - 20){speedX2 = -speedX2;}
  if(myBall2.x < 20){speedX2 = -speedX2;}

  //Left paddle wall detection
  if(lPaddle.y < 20){lPaddle.y = 0;}
  if(lPaddle.y > canvas.height - 200){lPaddle.y = canvas.height - 200;}

  //Right paddle wall detection
  if(rPaddle.y < 20){rPaddle.y = 0;}
  if(rPaddle.y > canvas.height - 200){rPaddle.y = canvas.height - 200;}

  //Left paddle collision NOT FINISHED!
  // if(myBall.y){
  //   if(){
  //     speedX = -speedX;
  //   }
  // }

  //Keeps redrawing the paddles
  lPaddle.Draw(context);
  rPaddle.Draw(context);

  //sets the right paddle on the same y as ball 1
  rPaddle.y = myBall.y - 70;
}

//Calls the function animate
animate();

//Makes Random hex color code
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Function so i can change the color of the ball
function ballColor(){
  for (i = 0; i < 5; i++) {
    //changes the color of the ball with the hex color code
    context.fillStyle = getRandomColor();
  }
}


canvas.addEventListener("mousemove", setMousePosition, false);
  function setMousePosition(e){
    mouseY = e.clientY;
    lPaddle.y = mouseY - 100;
}
