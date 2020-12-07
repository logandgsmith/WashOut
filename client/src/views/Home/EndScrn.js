import React, { Component } from "react";

var bckgr = new Image();
bckgr.src = "https://i.imgur.com/gypEplv.png?1";

//-------------SPRITES FOR CHARACTER MOVEMENT---------------------//
var hampImageLose = new Image();

hampImageLose.src = "https://i.imgur.com/DzEYjZN.png";
//------------------------Puns------------------------------//
var lose1 = "You lost! That SOCKS :-(";
var lose2 = "Great DRY, butter luck next time.";
var lose3 = "Best to abandon all SOAP";
var lose4 = "You just gotta know when to FOLD 'em";
var lose5 = "You lost, but you don't have to BLEACH about it!";
var lose6 = "Well that was a total WASH";

var loseMsg = [lose1, lose2, lose3, lose4, lose5, lose6];

function getRandomInt(min, max) {
  var minimum = Math.ceil(min);
  var maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

class EndScrn extends Component {
  state = {
    canvasX: 650,
    canvasY: 800,
    character: {
      //just setting attribuites for ctx.arc to draw a circle
      //could probably be used later for hitboxes
      x: 50,
      y: 10000,
      radius: 20,
    },
  };

  draw = () => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.drawImage(
      bckgr,
      50,
      0,
      this.refs.canvas.width - 75,
      this.refs.canvas.height - 350
    );


    var message = getRandomInt(0, 5);
    ctx.drawImage(hampImageLose, 50, 0, 800, 800, 250, 35, 300, 300);

    ctx.font = "30px Roboto";
    ctx.fillStyle = "#01C9E1";
    ctx.textAlign = "center";
    ctx.fillText(loseMsg[message], 340, 275);
    ctx.font = "20px Roboto";
    ctx.fillStyle = "#01C9E1";
    ctx.textAlign = "center";
    ctx.fillText("Press Play to try again!", 340, 325);
  };
  
  componentDidMount() {
    this.draw();
  }

  render() {
    return (
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
export default EndScrn;
