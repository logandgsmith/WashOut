import React, { Component } from "react";
import background from "../../assets/menuBackground.png";
import hampImg from "../../assets/hampImage.png";

import pen from "../../assets/pen.png";
import dollar from "../../assets/dollar.png";
import football from "../../assets/football.png";
import gum from "../../assets/gum.png";
import key from "../../assets/key.png";

import orangeTee from "../../assets/orangeTee.png";
import blueSock from "../../assets/blueSock.png";
import underwear from "../../assets/underwear.png";
import dress from "../../assets/dress.png";
import blackTee from "../../assets/blackTee.png";

import blueLaundr from "../../assets/blueLaundr.png";
import orangeLaundr from "../../assets/orangeLaundr.png";

var bckgr = new Image();
bckgr.src = background;

//-------------SPRITES FOR CHARACTER MOVEMENT---------------------// 
var hampImage    = new Image();
hampImage.src    = hampImg;

//---------------SPRITES FOR FALLING OBJECTS-----------------------// 

var obstacle1 = new Image();
var obstacle2 = new Image();
var obstacle3 = new Image();
var obstacle4 = new Image();
var obstacle5 = new Image();

obstacle1.src = pen;
obstacle2.src = dollar;
obstacle3.src = football;
obstacle4.src = gum;
obstacle5.src = key;

var obstacles = [obstacle1, obstacle2, obstacle3, obstacle4, obstacle5]

//----------------Collectibles------------------------------------//

var collectible1 = new Image();
var collectible2 = new Image();
var collectible3 = new Image();
var collectible4 = new Image();
var collectible5 = new Image();

collectible1.src = orangeTee;
collectible2.src = blueSock;
collectible3.src = underwear;
collectible4.src = dress;
collectible5.src = blackTee;

var collectibles = [collectible1, collectible2, collectible3, collectible4, collectible5];

//----------------Powerup/Life-------------------------------------//
var powerUp1 = new Image();
var powerUp2 = new Image();

powerUp1.src = blueLaundr;
powerUp2.src = orangeLaundr;

class Instr extends Component{
    state = {
        canvasX: 650,
        canvasY: 800,
        drawInterval: null,
        passes: 1
    }


    draw = () => {
        const ctx = this.refs.canvas.getContext("2d");
        ctx.drawImage(bckgr,50,0,this.refs.canvas.width-75,this.refs.canvas.height)
    //    ctx.fillStyle="white";
    //    ctx.fillRect(0,0,this.refs.canvas.width,this.refs.canvas.height)

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
        
        this.state.passes <= 0 ? clearInterval(this.state.drawInterval) : this.state.passes--;
    }
    
    drawText = () => {
        const ctx = this.refs.canvas.getContext("2d");
        ctx.drawImage(bckgr,50,0,this.refs.canvas.width-75,this.refs.canvas.height)

        ctx.font = "20px Roboto"
        ctx.fillStyle = "#808080"
        ctx.fillText("INSTRUCTIONS:",250, 50);
        ctx.fillText("Move left and right to catch the collectibles",100,100)
        ctx.fillText("or avoid the obstacles! ",100,125)
        ctx.fillText("Try to get as many collectibles as you can! ",100,175)
        

        ctx.font = "16px Roboto"
        ctx.fillText("Collectibles:                                  Obstacles:",150,250)

        ctx.fillText("Life-gainer                                   Bomb ",175,675)
        ctx.fillText("(Clears the laundromat) ",330,695)
        ctx.font = "30px Roboto"
        ctx.textAlign = 'center'
        ctx.fillStyle = 'red'
        ctx.fillText("PRESS PLAY TO BEGIN!",340,725)
    }

    componentDidMount() {  
        this.state.drawInterval = setInterval(() => {
            this.draw();
        }, 1000);
        this.drawText();
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