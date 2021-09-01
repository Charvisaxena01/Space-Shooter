var earth,knife,monster,moon,rock,shooter,sun;
var obstacles;

PLAY=1
END=0
var gameState =PLAY;

function preload(){
earth = loadImage("Earth.png")
knife = loadImage("knife.png")
monster = loadImage("monster.png")
moon = loadImage("moon.png")
monster2 = loadImage("monster2.png")
shooter = loadImage("shooter.png")
sun = loadImage("sun.png")
obstaclesGroup=new Group()
disadvGroup = new Group()
bg = loadImage("BG.jpg")
bullet = loadImage("bullet.png")
audio = new Audio('audio1.mp3')
gameover = loadImage("Go.jpg")
restart = loadImage("RE.png")
}

function setup(){
createCanvas(1300,780)
bgS = createSprite(550,780)
bgS.addImage(bg)
Shooter = createSprite(650,680)
Shooter.addImage(shooter)
Shooter.scale = 0.3
bulletGroup = new Group()
score = 0
gameOver = createSprite(700,350,500,800)
gameOver.addImage(gameover)
gameOver.visible = false;
gameOver.scale = 3.0

reset = createSprite(700,720,40,40)
reset.addImage(restart)
reset.visible = false
reset.scale = 0.5



}

function draw(){
  background("black")
  drawSprites()
  //score = 0 
  bgS.velocityY = 6
  if (bgS.y > 600){
  bgS.y = 200;
    
 }

 

if(gameState===PLAY)
{
  
  gameOver.visible =false
 reset.visible = false
 Shooter.visible = true
  audio.play()
    spawnAdvantages()
    spawnMonster()
    if(keyIsDown("32")){
      bulletS = createSprite(Shooter.x,Shooter.y-50)
      bulletS.addImage(bullet)
      bulletS.velocityY = -6
      bulletS.scale = 0.5
      bulletGroup.add(bulletS)
    }
    if (keyIsDown(RIGHT_ARROW)) {
     Shooter.x +=10
    }
    if (keyIsDown(LEFT_ARROW)) {
      Shooter.x -=10
     }
    if(obstaclesGroup.isTouching(bulletGroup)){
    score = score -1
    obstaclesGroup.destroyEach()
    bulletS.destroy()
    }
    if(disadvGroup.isTouching(bulletGroup)){
     score = score+1
     disadvGroup.destroyEach()
     bulletS.destroy()
      }
      textSize(25)
      fill("white")
      text("Score "+ score,800,60)
      fill("blue")
      text("In space there are some harmful objects",800,100)
      text("for our earth you need to destroy them with",800,130)
      text("help of space shooter.Press Space key to ",800,160)
      text("shoot bullet but be careful if you shoot the ",800,190)
      text("worng object your score will decrease.",800,220)
      fill("pink")
      text("Press r to reset the game after you loose.",800,270)



    }

    if(Shooter.isTouching(obstaclesGroup)){
      bgS.velocityY = 0 
      end()
          }
    if(Shooter.isTouching(disadvGroup)){
        bgS.velocityY = 0 
        end()
                }
    if(keyDown("r")){
      gameState = PLAY
      //score = 0
    }



}

function spawnAdvantages(){

     if (frameCount % 50 === 0) {
      obstacles = createSprite(random(100, 1000),-10, 100, 100);
      obstacles.velocityY = 6;
      var rand = Math.round(random(1,3));
      switch(rand){
          
          case 1: obstacles.addImage("ob1", moon);
          break;
          case 2: obstacles.addImage("ob2", sun);
          break;
          case 3: obstacles.addImage("ob3", earth);
       
          break;
         
      }
      obstacles.lifetime=800
      obstacles.scale=0.3
     obstaclesGroup.add(obstacles);
    
  }
}

  function spawnMonster()
  {
      if(frameCount%50===0)
      {
   dadv = createSprite(random(100, 1000),-10, 100, 100);
   dadv.velocityY = 6;
    var rand = Math.round(random(1,3));
   switch(rand){
   case 1:dadv.addImage("disadv1", monster);
   break;
   case 2: dadv.addImage("disadv2", monster2);
   break;
   case 3: dadv.addImage("disadv3",knife);
   break;
    }
        
   dadv.lifetime=800
   dadv.scale=0.3
  disadvGroup.add(dadv)


      }
}

function end(){
  textSize(25)
  fill("white")
  text("Press 'r' to reset the game",300,400)
  score = 0
  bgS.velocityY = 0
  obstaclesGroup.destroyEach()
  disadvGroup.destroyEach()
  gameOver.visible = true
  reset.visible = true
  gameState = END
  Shooter.visible = false
  bulletGroup.destroyEach()
 
}
