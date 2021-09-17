var bg,bgImg;
var player, flashImg, flash_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;


var zombieGroup;

var lightning = 70;
var lightingImg

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  lightningImg = loadImage("assets/lightning.png")

  flashImg = loadImage("assets/flash_2.png")
  flash_shooting = loadImage("assets/flash_3.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 2.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(flashImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    lightningGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  lightning = createSprite(displayWidth-1150,player.y-30,20,10)
  lightning.velocityX = 20
  lightning.addImage('lightning',lightningImg)
  lightning.scale = 0.2
  
  lightningGroup.add(lightning)
  player.depth = lightning.depth
  player.depth = player.depth+2
  player.addImage(flash_shooting)
  lightning = lightning-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(flashImg)
}

//go to gameState "bullet" when player runs out of bullets
if(lightning==0){
  gameState = "lightning"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(lightningGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(lightningGroup)){
        zombieGroup[i].destroy()
        lightningGroup.destroyEach()
       
        } 
  
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}

drawSprites();

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "lightning"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  lightningGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
