class Game{
    constructor(){}
    readGameState(){
        var gameStateRef=database.ref('gameState')
        gameStateRef.on("value",function(data){
            gameState=data.val()
        })
    }
    updateGameState(state){
        database.ref('/').update({gameState:state})
    } 
  async startGame(){
        if(gameState===0){
            player = new Player()
            var playerCountRef=await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val()
                player.getCount()
            }
            
            form = new Form()
            form.display() 
        }
        horse1=createSprite(100,200)
        horse1.addAnimation("horse1",h1)
        horse2=createSprite(300,200)
        horse2.addAnimation("horse2",h2)
        horse1.scale=0.25
        horse2.scale=0.25
        horses=[horse1,horse2]
        hurdle1=createSprite(horse1.x + 300, horse1.y)
         hurdle1.addImage(hurdel) 
         hurdle1.scale = 0.2 
        
         hurdle2=createSprite(horse2.x + 300, horse2.y)
         hurdle2.addImage(hurdel) 
         hurdle2.scale = 0.2 
      
    }
    
    play(){
        form.hide()
       Player.getPlayerInfo()
    
       player.getPlayersAtEnd()
       
       if(allPlayers!==undefined){
    
           background("white")
           image (track,displayWidth-displayWidth/2.5,0,displayWidth*5,displayHeight)
           text(mouseX + ' , '+ mouseY, mouseX, mouseY)
           var index=0
           var x,y=167
           for (var plr in allPlayers) {
            index=index+1
              /* x=x+200 
               y=displayHeight-allPlayers[plr].distance*/
               y=y+200
               x=displayWidth-allPlayers[plr].distance
              horses[index-1].x=x
               horses[index-1].y=y
               hurdle1.x = 2866 ;
                hurdle1.y = 367;
                hurdle2.x = 2866 ;
                hurdle2.y = 534;
                if( horses[index-1].collide(hurdle1)||horses[index-1].collide(hurdle2)){ 
                    horses[index-1].x = displayWidth
                     player.distance=0
                     
                      player.update()
                      if( horses[index-1].collide(hurdle1)){
                        hurdle1.destroy()  
                      }
                      else if( horses[index-1].collide(hurdle2)){
                          console.log("hello")
                        hurdle2.destroy()
                    }
                     }

               if(index===player.index){
                                    
                   
                   fill("red")
                   ellipse(x,y,50,50)
                //camera .position.x=displayWidth/2
                //camera.position.y=horses[index -1 ].y
                camera.position.x=horses[index-1].x
                camera.position.y= displayHeight/2
               }
               
                   
              
           }
       }
       if(keyDown(RIGHT_ARROW)&&player.index!==null){
        player.distance-=10
        player.update()
    }
   
    
    if (player.distance <-7000)
    {gameState=2
        background("yellow")
    player.rank=player.rank+1
    Player.updateplayersAtEnd(player.rank)
   // textSize(50)
    //text ("your rank is "+player.rank,camera.position.x+300,displayHeight/2)
    swal({ title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
     text: "You reached the finish line successfully", icon: "success", confirmButtonText: "Ok", });
    }
    drawSprites()
    }
    end(){
        console.log("rank:"+player.rank)
       
    }
    
    }