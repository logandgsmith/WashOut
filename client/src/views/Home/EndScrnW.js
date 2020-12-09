import React, { Component } from "react";
import background from "../../assets/menuBackground.png";
import hampWin from "../../assets/hmpWon.png";


var bckgr = new Image();
bckgr.src = background;

//-------------SPRITES FOR CHARACTER MOVEMENT---------------------//
var hampImageWin = new Image();

hampImageWin.src = hampWin;
//------------------------Puns------------------------------//

var winMsg = [
  "That was a CLOTHES one! Great job!",
  "Way to HANG in there!",
  "Get a LOAD of that! You won!",
  "WASH like a boss!",
  "Excellent DRY!",
  "Great score! That was LOADS of fun!",
]

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
      this.refs.canvas.height - 35
    );

    var message = getRandomInt(0, 5);
    ctx.drawImage(hampImageWin, 50, 0, 800, 800, 250, 35, 300, 300);

    ctx.font = "30px Roboto";
    ctx.fillStyle = "#01C9E1";
    ctx.textAlign = "center";
    ctx.fillText(winMsg[message], 340, 275);
    ctx.font = "25px Roboto";
    ctx.fillStyle = "#01C9E1";
    ctx.fillText("Press Play to try again!", 340, 325);

    ctx.font = "20px Roboto";
    ctx.textAlign = "center";
    ctx.fillText("This game was designed by:", 340, 370);
    ctx.textAlign = "left"
    ctx.fillText("Tess Christensen....Queen of Mount Laundry", 110, 415);
    ctx.fillText("Juan Ruiz.................Commander-in-Chips", 110, 440);
    ctx.fillText("Logan Smith............President of Potato Peeling", 110, 465);
    ctx.fillText("Jarret Torres............Chief Eating Officer (CEO)", 110, 490);
    ctx.fillText("Connor Wilson.........Captain Collectible", 110, 515);

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
