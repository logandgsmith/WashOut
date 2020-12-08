import React, { Component } from "react";

var bckgr = new Image();
bckgr.src = "https://i.imgur.com/gypEplv.png?1";

//-------------SPRITES FOR CHARACTER MOVEMENT---------------------//
var hampImageWin = new Image();

hampImageWin.src = "https://i.imgur.com/WyyGb3a.png";
//------------------------Puns------------------------------//

var win1 = "That was a CLOTHES one! Great job!";
var win2 = "Way to HANG in there!";
var win3 = "Get a LOAD of that! You won!";
var win4 = "WASH like a boss!";
var win5 = "Excellent DRY!";
var win6 = "Great score! That was LOADS of fun!";
var winMsg = [win1, win2, win3, win4, win5, win6];

function getRandomInt(min, max) {
  var minimum = Math.ceil(min);
  var maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

class EndScrnW extends Component {
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
    ctx.drawImage(hampImageWin, 50, 0, 800, 800, 250, 35, 300, 300);

    ctx.font = "30px Roboto";
    ctx.fillStyle = "#01C9E1";
    ctx.textAlign = "center";
    ctx.fillText(winMsg[message], 340, 275);
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
export default EndScrnW;