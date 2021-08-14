var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var airballon,database;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database);

  createCanvas(1500,700);

  airballon=createSprite(250,450,150,150);
  airballon.addAnimation("hotAirBalloon",balloonImage1);
  airballon.scale=0.5;

  var airbaloonPosition =database.ref('airballon/height');
  airbaloonPosition.on("value",readHeight,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    airballon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    airballon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    airballon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    airballon.scale-=0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    airballon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,+10);
    airballon.scale+=0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function  updateHeight(x,y){
  database.ref('airballon/height').set({
      'x': height.x + x,
      'y': height.y + y
  })
}



function showError(){

  console.log("error");
}


function readHeight(data){
  height=data.val();
  airballon.x=height.x;
  airballon.y=height.y;

}