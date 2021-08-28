var San,girl,virus;
var SanImg,girlImg,virusImg;
var Score= 0;
var SanG,virusG;
var path,pathImg;
var gameoverImg,end;

//Game States
var PLAY=1;
var END=0;
var reset;
var gameState=1;

function preload(){
 SanImg =loadImage("San.png") 
 virusImg =loadImage("Covid.png")
 girlImg=loadImage("Girl.png")
 pathImg=loadImage("Road.png")
 gameoverImg=loadImage("gameOver.png")
 
}

function setup(){
  
  createCanvas(400,600);
// Moving background

path=createSprite(200,200);
path.addImage(pathImg);
path.scale=0.5
path.velocityY=4


end=createSprite(200,200)
end.addImage(gameoverImg)
end.scale=0.5
end.visible=false;

girl=createSprite(200,450);
girl.addImage(girlImg);
girl.scale=0.2;

 
virusG=new Group();
SanG=new Group();


}

function draw() {
  
  if(gameState===PLAY){
  background(0);
  girl.x = World.mouseX;
  
  edges= createEdgeSprites();
  girl.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createSan();
    createVirus();
    
    for(var j=0;j<SanG.length;j++){
    if (SanG.get(j).isTouching(girl)) {
       SanG.get(j).destroy();
      Score=Score+50;
       
    }
    }
  

  
  if(virusG.isTouching(girl)){
    virusG.destroyEach();
    for(var i=0;i<SanG.length;i++){
      SanG.get(i).visible=false
    }
   // virusG.visible=false;
   // SanG.visible=false;
    gameState=END;
  }
        
}  
    drawSprites();

  if(gameState==END){
    
      end.visible=true;
       
       girl.visible=false;
        path.velocityY=0
        Score=0;
        stroke("white")
    strokeWeight(4)
    fill("red")
    textSize(20)
    
    text("Press space to restart",100,250)
     
        
        if(keyDown("space")){
          gameState=reset
          reset()
          
        }


  }
  
  
  textSize(20);
  fill("red");
  textFont("Impact")
  text("Score: "+ Score,150,30);

  
  
  
  }



function createSan() {
  if (World.frameCount % 100 == 0) {
  San = createSprite(Math.round(random(50, 350),40, 10, 10));
  San.addImage(SanImg);
  San.scale=0.05;
  San.velocityY = 3;
  San.lifetime = 150;
  SanG.add(San);
  }
}



function createVirus(){
  if (World.frameCount % 150 == 0) {
  virus = createSprite(Math.round(random(50, 350),40, 10, 10));
  virus.addImage(virusImg);
  virus.scale=0.05
  virus.velocityY = 3;
  virus.lifetime = 250;
  virusG.add(virus);
  
  }
}
function reset(){
  gameState=PLAY
  end.visible=false;
  path.velocityY=4
  girl.x=200
  girl.y=450
  girl.x=mouseX
  girl.visible=true;
  SanG.visible=true;
  virusG.visible=true;
}