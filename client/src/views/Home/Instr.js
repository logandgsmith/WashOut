import React, { Component } from "react";

var bckgr = new Image();
bckgr.src = "https://i.imgur.com/gypEplv.png?1";

//-------------SPRITES FOR CHARACTER MOVEMENT---------------------// 
var hampImage   = new Image();

hampImage.src   = "https://i.imgur.com/EKlTCEr.png";

//---------------SPRITES FOR FALLING OBJECTS-----------------------// 

var obstacle1 = new Image();
var obstacle2 = new Image();
var obstacle3 = new Image();
var obstacle4 = new Image();
var obstacle5 = new Image();

obstacle1.src = "https://i.imgur.com/H5upRrj.png";
obstacle2.src = "https://i.imgur.com/DR8Lrt9.png";
obstacle3.src = "https://i.imgur.com/1nrBB8v.png";
obstacle4.src = "https://i.imgur.com/htEvYeG.png";
obstacle5.src = "https://i.imgur.com/ShmivUw.png";

var obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5]

//----------------Collectibles------------------------------------//

var collectible1 = new Image();
var collectible2 = new Image();
var collectible3 = new Image();
var collectible4 = new Image();
var collectible5 = new Image();

collectible1.src = "https://i.imgur.com/TIhKbTM.png";
collectible2.src = "https://i.imgur.com/hRORvbR.png";
collectible3.src = "https://i.imgur.com/xJLNr2B.png";
collectible4.src = "https://i.imgur.com/d3BBLdz.png";
collectible5.src = "https://i.imgur.com/pum5vSq.png";

var collectibles = [collectible1, collectible2, collectible3, collectible4, collectible5];

//----------------Powerup/Life-------------------------------------//
var powerUp1 = new Image();
var powerUp2 = new Image();

powerUp1.src = "https://i.imgur.com/BAbtzry.png";
powerUp2.src = "https://i.imgur.com/gQkMLtB.png"

class Instr extends Component{
    state = {
        canvasX: 650,
        canvasY: 800,
        character: {
            //just setting attribuites for ctx.arc to draw a circle
            //could probably be used later for hitboxes
            x: 50,
            //get the player way down in the screen until a movement key is pressed
            //I couldn't figure out how to get (this.state.canvasY - this.state.character.radius) to work for the y value
            y: 10000,
            radius: 20,
            currentDirection: hampImage,
          },
    }
    draw = () => {
        const ctx = this.refs.canvas.getContext("2d");
        ctx.drawImage(bckgr,50,0,this.refs.canvas.width-75,this.refs.canvas.height)
    //    ctx.fillStyle="white";
    //    ctx.fillRect(0,0,this.refs.canvas.width,this.refs.canvas.height)
        

        ctx.font = "20px Roboto"
        ctx.fillStyle = "#808080"
        ctx.fillText("INSTRUCTIONS:",250, 50);
        ctx.fillText("Move left and right to catch the collectibles",100,100)
        ctx.fillText("or avoid the obstacles! ",100,125)
        ctx.fillText("Try to get as many collectibles as you can before ",100,175)
        ctx.fillText("the time runs out!",100,200)

        ctx.font = "16px Roboto"
        ctx.fillText("Collectibles:                                  Obstacles:",150,250)

         for(var i = 0; i < 5 ;i++){
            
            ctx.drawImage(
                collectibles[i],
                0,
                0,
                800,
                800,
                250,
                225 + i*65,
                100,
                100,
                )
            ctx.drawImage(
                obstacles[i],
                0,
                0,
                800,
                800,
                450,
                225 + i*65,
                100,
                100,
                )
        }
        ctx.fillText("Power-Ups:",150,620)
        ctx.drawImage(
            powerUp1,
            50,
            0,
            800,
            800,
            250,
            635,
            100,
            100,
            )
        ctx.drawImage(
            powerUp2,
            50,
            0,
            800,
            800,
            500,
            635,
            100,
            100,
            )
        ctx.fillText("Life-gainer                                   Bomb ",175,675)
        ctx.fillText("(Clears the laundromat) ",330,695)

    }
    componentDidMount() {
       this.draw();
        
    }
    render(){
        return(
            <div>
                <canvas
                    ref="canvas"
                    width={this.state.canvasX}
                    height={this.state.canvasY}
                />                
            </div>
        );
    }
}
export default Instr;