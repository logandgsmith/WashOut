import React, { Component } from "react";
var laundrBG = new Image();
laundrBG.src = "https://i.imgur.com/o1SC3Vi.png"
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

powerUp1.src = "https://i.imgur.com/S4848AL.png";


class Instr extends Component{
    state = {
        canvasX: 600,
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
       
        

        ctx.font = "20px Roboto"
        ctx.fillStyle = "#808080"
        ctx.fillText("INSTRUCTIONS:",250, 50);
        ctx.fillText("Move left and right to catch the collectibles",100,100)
        ctx.fillText("or avoid the obstacles! ",100,125)

        ctx.font = "16px Roboto"
        ctx.fillText("Collectibles:                                  Obstacles:",150,175)

         for(var i = 0; i < 5 ;i++){
            
            ctx.drawImage(
                collectibles[i],
                0,
                0,
                800,
                800,
                250,
                150 + i*65,
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
                150 + i*65,
                100,
                100,
                )
        }
        ctx.fillText("Power-Up:",150,520)
        ctx.drawImage(
            powerUp1,
            0,
            0,
            800,
            800,
            250,
            505,
            100,
            100,
            )
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