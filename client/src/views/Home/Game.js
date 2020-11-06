import React, { Component } from "react";
import fallingObject from "./Objects.js";

//MUST PRESS RIGHT OR LEFT ARROW TO RENDER HAMPERMAN IN FRAME


//-------------SPRITES FOR CHARACTER MOVEMENT---------------------// 
var hampImage   = new Image();
var hampLeft1   = new Image();
var hampLeft2   = new Image();
var hampRight1  = new Image();
var hampRight2  = new Image();

hampImage.src   = "https://i.imgur.com/EKlTCEr.png";
hampLeft1.src   = "https://i.imgur.com/hiur78h.png";
hampLeft2.src   = "https://i.imgur.com/RIR3EBU.png";
hampRight1.src  = "https://i.imgur.com/74yDjMt.png";
hampRight2.src  = "https://i.imgur.com/ekzDUeJ.png";

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

var powerUp1 = new Image();

powerUp1.src = "https://i.imgur.com/S4848AL.png";

//----------------------------------------------------------------//

var importedCanvasX = 650;
var importedCanvasY = 800;
var numObj = 5;

var objArr = [];

// Generates a random integer (min, max inclusive)
function getRandomInt(min, max){
  var minimum = Math.ceil(min);
  var maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}


for (var i = 0; i < numObj; i++) {
    objArr[i] = new fallingObject(
      Math.random() * importedCanvasX,
      50,
      20,
      0,
      650,
      800,
      false,
      false,
      collectibles[i]
    );
}

class Game extends Component {
  //array of falling object

  state = {
    canvasX: importedCanvasX,
    canvasY: importedCanvasY,
    defaultX: 325,
    defaultY: 50,
    gravity: 0.5,
    charScale: 200,
    fallingObjNum: 10,
    //At some point the x values will have to be set to some proportionality of the window size
    //that might have to be different for different devices

    //IDEA: create 10 falling objects and have positions automatically to a random X Value and a set Y Value
    //That we always can have 10 objects falling at once(with an offset)
    //this would be implemented with some array of fallingObjs
    //Or name fallingObj0,FallingObj1 etc. and have for loops that go through and update the positions of each obj

    character: {
      //just setting attribuites for ctx.arc to draw a circle
      //could probably be used later for hitboxes
      x: 50,
      //get the player way down in the screen until a movement key is pressed
      //I couldn't figure out how to get (this.state.canvasY - this.state.character.radius) to work for the y value
      y: 10000,
      radius: 20,
      velocity: 0,
      currentDirection: hampImage,
      stillMoving: false,
    },
  };

  randX = () => {
    return Math.random() * this.state.canvasX;
  };

  draw = (sprite) => {
    //not sure what is meant by refs being deprecated
    //but the code breaks without refs
    const ctx = this.refs.canvas.getContext("2d");
    //background color to clear canvas every frame
    ctx.fillStyle = "#F9F9F9";

    ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    //ball color
    //loop for falling objects
    for (var i = 0; i < objArr.length; i++) {
      ctx.drawImage(
        objArr[i].currentDirection,
        objArr[i].x,
        objArr[i].y,
        120,
        120
      );
    }

    //drawing hamperman image
    ctx.drawImage(
      sprite,
      0,
      0,
      640,
      640,
      //set x and y coordinates (starts from upper lefthand corner of sprite, hence subtracting the char scale)
      this.state.character.x,
      this.state.character.y,
      //sets the size of the image to be drawn
      this.state.charScale,
      this.state.charScale
    );
 
  };

  //update is called every frame
  update = () => {

    // Generates and updates Collectible/Obstacle/PowerUp status and sprite

    function updateFallingobject(falling){
      var generator = getRandomInt(0, 20);
      if(generator === 0 ){
        falling.setPowerUp(true);
        falling.currentDirection = powerUp1;
      }else if (generator >= 1 && generator <= 10){
        falling.setObstacle(true);
        var rand = getRandomInt(1,5);
        switch(rand){
          case 1:
            falling.currentDirection = obstacle1;
            break;
          case 2:
            falling.currentDirection = obstacle2;
            break;
          case 3:
            falling.currentDirection = obstacle3;
            break;
          case 4:
            falling.currentDirection = obstacle4;
            break;
          case 5:
            falling.currentDirection = obstacle5;
            break;
          default:
              break;
        }
      }else{
        falling.setObstacle(false);
        falling.setPowerUp(false);
        var rand = getRandomInt(1,5);
        switch(rand){
          case 1:
            falling.currentDirection = collectible1;
            break;
          case 2:
            falling.currentDirection = collectible2;
            break;
          case 3:
            falling.currentDirection = collectible3;
            break;
          case 4:
            falling.currentDirection = collectible4;
            break;
          case 5:
            falling.currentDirection = collectible5;
            break;
          default:
              break;
        }
      }
    }

    //for loop to iterate through falling object array and set new velocities
    for (var i = 0; i < objArr.length; i++) {
      var newVal = (objArr[i].velocity + this.state.gravity) * 0.9;
      objArr[i].setVelocity(newVal);

      //find the y value making sure it is not out of frame
      var y = Math.max(
        Math.min(
          objArr[i].y + objArr[i].velocity,
          this.refs.canvas.height - objArr[i].radius
        ),
        0
      );
      objArr[i].setY(y);

      // Check for collisions
      if(objArr[i].y >= this.state.character.y + 15) {
        // Check for collisions with the player
        if(this.state.character.radius * 2 >= Math.abs(objArr[i].x - (this.state.character.x + this.state.character.radius * 2 * (this.state.charScale / 100)))) {
            objArr[i].onCollide(); // Trigger the onCollide function

            // Reset the object
            objArr[i].setRandomX();
            objArr[i].setY(objArr[i].defaultY);

            // Updates status and sprite of falling object
            updateFallingobject(objArr[i]);

            continue;
        }
      }

      //check if object has fallen to level of character
      if (objArr[i].y >= this.state.canvasY - this.state.character.radius) {
        objArr[i].setRandomX();
        //to be updated for random Y values
        objArr[i].setY(objArr[i].defaultY);

        // Updates status and sprite of falling object
        updateFallingobject(objArr[i]);

        continue;
      }
    }
  };
  
  // Setup listeners at the beginning of the lifecycle
  listen = () => {
    //keycode for left arrow
    document.addEventListener("keydown", (e) =>
      e.keyCode === 37
      ? this.setState({
            character: {
              //y is constant
              y: this.state.canvasY - this.state.charScale,
              //x is variable and is moved by integer value
              //dont let it go all the way to the max
              x: Math.max(this.state.character.x - 8, 0),
              radius: 20,
              currentDirection: hampLeft1,
            },
          })
        : null
        );
    //keycode for right arrow
    document.addEventListener("keydown", (e) =>
      e.keyCode === 39
        ? this.setState({
            character: {
              //y is constant
              y: this.state.canvasY - this.state.charScale,
              //don't let it go all the way out of the canvas
              x: Math.min(
                this.state.character.x + 8,
                this.state.canvasX - this.state.charScale
              ),
              radius: 20,
              currentDirection: hampRight1,
              stillMoving: true,
            },
          })
        : null
    );

    document.addEventListener("keyup", (e) =>
    e.keyCode === 39
      ? this.setState({
          character: {
            //y is constant
            y: this.state.canvasY - this.state.charScale,
            //don't let it go all the way out of the canvas
            x: Math.min(
              this.state.character.x + 8,
              this.state.canvasX - this.state.charScale
            ),
            radius: 20,
            currentDirection: hampImage,
            stillMoving: true,
          },
        })
      : null
    );

    
    document.addEventListener("keyup", (e) =>
    e.keyCode === 37
      ? this.setState({
          character: {
            //y is constant
            y: this.state.canvasY - this.state.charScale,
            //don't let it go all the way out of the canvas
            x: Math.min(
              this.state.character.x - 8,
              this.state.canvasX - this.state.charScale
            ),
            radius: 20,
            currentDirection: hampImage,
            stillMoving: true,
          },
        })
      : null
    );


   
  };

  //Not exactly sure why componentDidMount was used
  //This is what requires component to be defined
  //render() also must be defined with this
  componentDidMount() {
    setInterval(() => {
      this.update();
      this.draw(this.state.character.currentDirection);
      //personally added to test event listener functionality
    }, 1000 / 60); //1000 milliseconds divided by 60 seconds = 60fps

    this.listen();
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
export default Game;
