
var trex ,trex_running,trex_collided ;
var ground_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg;
var gameOver, reStart;


function preload(){
  
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadAnimation("trex_collided.png");


    ground_img=loadImage("ground2.png");
    cloud_img=loadImage("cloud.png");
  

    obstacle_1 = loadImage("obstacle1.png");
    obstacle_2 = loadImage("obstacle2.png");
    obstacle_3 = loadImage("obstacle3.png");
    obstacle_4 = loadImage("obstacle4.png");
    obstacle_5 = loadImage("obstacle5.png");
    obstacle_6 = loadImage("obstacle6.png");
    

    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
    
}

function setup(){
  createCanvas(600,200);
  
// create edges

 edges = createEdgeSprites();

  //create a trex sprite

  trex=createSprite(50,150,20,50);
  trex.addAnimation("running",trex_running);
  
  trex.addAnimation("collided", trex_collided);
  
  trex.scale = 0.5;
  trex.x = 50;

  //create ground sprite
   ground=createSprite(200,170,400,20);
   ground.addImage("ground", ground_img);
  

//create  invisible ground sprite
   invisible_ground=createSprite(200,190,400,20);
   invisible_ground.visible = false;

  score=0;
//create obstacle and cloud group
  obstacleGroup = new Group();
  cloudsGroup = new Group();

  
  // creating gameOverImg sprite
   gameOver = createSprite(300,100);
   gameOver.addImage(gameOverImg);
   gameOver.scale=0.5

  // creating restartImg  sprite 
     
    reStart = createSprite(300,140);
    reStart.addImage(restartImg);
    reStart.scale=0.5 

      //set trex collider
    
    trex.setCollider("circle",0,0,60);
    //trex.debug = true;



}

function draw(){
  background(180);
  text("SCORE : "+ score,500,50);


 //console.log(frameCount);
  //console.count("Draw count is : ");
 // console.log(trex.y);
    //console.log("This is " + gameState + " Gamestate");
    
  if(gameState === PLAY){

      gameOver.visible = false;
      reStart.visible = false;

      ground.velocityX =-4;
      score = score + Math.round(frameCount/60);

      if (ground.x < 0){
        ground.x = ground.width/2;
      }

      if(keyDown("space") && trex.y >= 100){
   
        trex.velocityY = -10;
      }
    
      trex.velocityY = trex.velocityY +0.5;
     

      spawn_clouds();
      spawn_obstacles();

      if(obstacleGroup.isTouching(trex)){
       
        gameState = END;

      }

    }
    else if (gameState === END){

      ground.velocityX = 0;
      trex.velocityY = 0;

      trex.changeAnimation("collided", trex_collided);
       
      gameOver.visible = true;
      reStart.visible = true;


      obstacleGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);

       
    }

    trex.collide(invisible_ground);

  
 drawSprites();

}

// 20 % 3 = 2 
//20 / 3 = 6 R 2 = 6.666666666
// frameCount % 80 = remainder 
// to repeat after 80 frames remainder should be 0 
//= assignment operator
// == comparing value "2" == 2 correct true 
// === comparing value along with data type "2" === 2  false

function spawn_clouds(){
  if (frameCount % 80 === 0){

    clouds=createSprite(600,100,40,10);
    clouds.addImage(cloud_img);
    clouds.scale = 0.4;
    clouds.y = Math.round(random(10,80));
    clouds.velocityX = -3;

    clouds.lifetime=200;

    clouds.depth=trex.depth;
    trex.depth = trex.depth + 1;
    
    // add each cloud to the cloud group
    cloudsGroup.add(clouds);
  
  }
  
}



function  spawn_obstacles(){


  if (frameCount % 50 === 0){

    obstacles=createSprite(600,160,40,10);

    var random_num  = Math.round(random(1,6));
    console.log(random_num);
      switch(random_num){
          case 1: obstacles.addImage(obstacle_1);
                  break;
          case 2: obstacles.addImage(obstacle_2);
                  break;     
          case 3: obstacles.addImage(obstacle_3);
                  break;
          case 4: obstacles.addImage(obstacle_4);
                  break;   
          case 5: obstacles.addImage(obstacle_5);
                  break;
          case 6: obstacles.addImage(obstacle_6);
                  break;   
          default: break;
      }
    
     obstacles.scale = 0.4;
    
     obstacles.velocityX = -6;

      obstacles.lifetime=200;

      //add each obstacle to the group
      
      obstacleGroup.add(obstacles);
    
    }
  }