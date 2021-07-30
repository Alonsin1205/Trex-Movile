var trex, trex_running,trex_pum,edges;
var piso, Fondo;
var pisoin;
var cloud;
var Nube;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var gameOver,GO;
var Restart,RT;
var x_x;
var jumP;
var $$o_o$$;
var groupC;
var groupN;
var PLAY=1;
var END=0;
var gamestate = PLAY;
var score = 0;
function preload()
{
  trex_running =     loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_pum = 
  loadAnimation("trex_collided.png");
  Fondo = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  gameOver = loadImage("gameOver.png");
  Restart = loadImage("restart.png");
  x_x = loadSound("die.mp3");
  jumP = loadSound("jump.mp3");
  $$o_o$$ = loadSound("checkPoint.mp3");
} 

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  //crea el Trex
  trex = createSprite(50,height-100,160,160);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("pum",trex_pum);
  edges = createEdgeSprites();
  
  //añade escala y posición al Trex
  trex.scale = 0.7;
  trex.x = 50

  //Crear piso
  piso = createSprite(width/2,height-100,width,20);
  piso.addImage(Fondo);
  
  
  //Prueba de piso para que un sprite no se vea
  pisoin=createSprite(width/2,height-80,width,20);
  pisoin.visible=false;
  
  //Crear grupos
  groupC=new Group();
  groupN=new Group();
  trex.setCollider("circle",0,0,35)
  //trex.debug=true;
  GO=createSprite(width/2,height/2-50)
  GO.addImage(gameOver)
  GO.scale=0.5;
  GO.visible = false;
  RT=createSprite(width/2,height/2)
  RT.addImage(Restart)
  RT.scale=0.5;
  RT.visible = false;
  }
  function draw()
{
               

  //establece un color de fondo 
  background("white");
  textFont("comic sans ms");
  textSize(15);
  text("HI"+score,472,28);
  
  
  if (gamestate==PLAY)
  {
     if(touches.lengh>0||keyDown("space")&&trex.y>=height-120                      ||keyDown("up")&&trex.y>=height-120)                                              
     { 
     jumP.play();
     trex.velocityY = -10;
       touches=[];
     }
     score=score+Math.round(getFrameRate()/60); 
     if(score>0&&score%100==0)
     {
     $$o_o$$.play();
     }
     trex.velocityY = trex.velocityY + 0.5;
     piso.velocityX = -(6+score/100);
     if(piso.x<0)
     {
     piso.x = piso.width/2;
     }
     Nubes();
     Cactuss();
     if (groupC.isTouching(trex))
     {
     gamestate=END;
     x_x.play();
     }
     }
  else if(gamestate==END)
    {
    piso.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("pum",trex_pum)
    groupC.setVelocityXEach(0);
    groupN.setVelocityXEach(0);
    groupC.setLifetimeEach(-1);
    groupN.setLifetimeEach(-1);
    GO.visible = true;
    RT.visible = true;
    if (mousePressedOver(RT))
    {
    Reset();
    }
    }
  
  
  
  //ingresa la posición y del Trex
  //console.log(trex.y);  
  
  //evita que el Trex caiga
  trex.collide(pisoin)
  drawSprites();
}

////////////////Funciones x mi
function Nubes ()
{
  if (frameCount%60==0)
{
 Nube = createSprite(width,height,40,20);
  Nube.addImage(cloud);
  Nube.y=Math.round(random(80,250));
  Nube.velocityX =-4;
  Nube.depth=trex.depth;
  trex.depth=trex.depth+1;
  Nube.lifetime=250;
  groupN.add(Nube);
}
}

 function Reset()
 {
 gamestate=PLAY;
 GO.visible=false;
 RT.visible=false;
 groupN.destroyEach();
 groupC.destroyEach();
 trex.changeAnimation("running",trex_running);
 score=0;
 }



function Cactuss ()
{
 if (frameCount%60==0)
{
   Cactus = createSprite(width,height-110,40,20);
Cactus.velocityX =-(6+score/100);
Cactus.lifetime=250;
groupC.add(Cactus);
Cactus.scale = 0.6;
  Cactus.depth=trex.depth;
  trex.depth=trex.depth+1;
  var rand = Math.round(random(1,6));
  switch(rand)
    
  {
    case 1:Cactus.addImage(cactus1)
    break;
    case 2:Cactus.addImage(cactus2)
    break;
    case 3:Cactus.addImage(cactus3)
    break;
    case 4:Cactus.addImage(cactus4)
    break;
    case 5:Cactus.addImage(cactus5)
    break;
    case 6:Cactus.addImage(cactus6)
    break;
    default:break;
  }

}
}