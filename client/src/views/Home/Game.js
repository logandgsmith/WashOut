import React, { Component } from "react";
import fallingObject from "./Objects.js";
import "./Game.css";

//MUST PRESS RIGHT OR LEFT ARROW TO RENDER HAMPERMAN IN FRAME
//background
var laundrBG = new Image();
laundrBG.src = "https://i.imgur.com/o1SC3Vi.png"

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
var bomb1 = new Image();

powerUp1.src = "https://i.imgur.com/BAbtzry.png";
bomb1.src = "https://i.imgur.com/gQkMLtB.png";


//----------------------------------------------------------------//

var importedCanvasX = 650;
var importedCanvasY = 800;
var numObj = 5;
var objArr = [];
var maxHealth = 3;
var health=3;
var hlthArr=[];

// Generates a random integer (min, max inclusive)
function getRandomInt(min, max){
  var minimum = Math.ceil(min);
  var maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}


//---------------PREGAME FUNCTIONS-----------------------// 
// Sets the Health Icons Initial image
function setMaxHealth() {
  health = maxHealth;
  for (var i =0; i< health; i++){
    hlthArr[i] = new fallingObject(
      i*50+150,
      50,
      5,
      0,
      650,
      850,
      false,
      false,
      hampImage
    );
  }
}

// Sets the falling objects initial image
function setInitialItems() {
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
}

//----------------------------------------------------------------//

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Game Flow Variables
      gameInterval: null,
      scoreInterval: null,
      isGameOver: false,
      hasWonGame: false,
      // Canvas and positioning
      canvasX: importedCanvasX,
      canvasY: importedCanvasY,
      defaultX: 325,
      defaultY: 50,
      // Force of gravity (acceleration) on falling objects
      gravity: 0.5,
      fallingObjNum: 10,
      // Character global variables
      charScale: 200,
      held: true,
      direction: "",
      // Character information
      character: {
        x: 50,                       // X position on sceen
        y: importedCanvasY - 200,    // Y position on screen
        radius: 20,                  // Sprite radius
        velocity: 0,                 // Character speed
        currentDirection: hampImage, // Current sprite
        stillMoving: false,          // If the character is still moving (for touch controls)
      },
    };

    // React Handlers
    this.handleGameOver = this.handleGameOver.bind();
    this.handleScoreUpdate = this.handleScoreUpdate.bind();

    //At some point the x values will have to be set to some proportionality of the window size
    //that might have to be different for different devices
  }

  //--------------------------SCORING AND HANDLE GAME OVER--------------------------------------//

  handleGameOver = () => {
    clearInterval(this.state.gameInterval);
    clearInterval(this.state.scoreInterval);

    if (this.props.score > this.props.hiScore) {
      this.props.handleNewHiScore(this.props.score);
    }

    this.props.handleGameOver(this.state.hasWonGame);
  }

  handleScoreUpdate = (points) => {
    this.props.handleScoreUpdate(points); 

    if(this.props.score >= 999) {
      this.state.isGameOver = true;
      this.state.hasWonGame = true; // Game Over WIN
    }
  }
 
  decreaseHealth(){
    health -= 1;
    if(health > 0){
      hlthArr.pop();
    } 
    else{
      this.state.isGameOver = true;
      this.state.hasWonGame = false; // Game Over LOSE
    }
  }

  
  increaseHealth(){
    if(health === 2){
      hlthArr.push(new fallingObject (    
        2*50+150,
        50,
        5,
        0,
        650,
        850,
        false,
        false,
        hampImage))
      health+=1;
    }
    else if(health === 1){
      hlthArr.push(new fallingObject (    
        1*50+150,
        50,
        5,
        0,
        650,
        850,
        false,
        false,
        hampImage))
      health+=1;
    }
    else if(health === 0){
  
      hlthArr.push(new fallingObject (    
        0*50+150,
        50,
        5,
        0,
        650,
        850,
        false,
        false,
        hampImage))
      health+=1;
    }
    
  }

  //---------------------------DRAWING FUNCTIONS--------------------------------------//

  randX = () => {
    return Math.random() * this.state.canvasX;
  };
  drawl = () =>{
        var ctx = this.refs.canvas.getContext("2d")
        ctx.font = "16px Arial"
        ctx.fillStyle = "#FF0000"
        ctx.fillText("Lives: " , 50, 50);
  }
  draw = (sprite) => {
    //not sure what is meant by refs being deprecated
    //but the code breaks without refs
    const ctx = this.refs.canvas.getContext("2d");
    //background color to clear canvas every frame
    ctx.fillStyle = "#EAEAEA";
    ctx.drawImage(laundrBG, 0, 0, this.refs.canvas.width, this.refs.canvas.height);

    //ball color
    //loop for falling objects
    for (var i = 0; i < objArr.length; i++) {
      ctx.drawImage(
        objArr[i].currentDirection,
        0,
        0,
        640,
        640,
        (objArr[i].x - 60),
        (objArr[i].y - 50),
        120,
        120
      );
    }

    for (var i = 0; i < hlthArr.length; i++) {
      ctx.drawImage(
        hlthArr[i].currentDirection,
        0,
        0,
        640,
        640,
        (hlthArr[i].x - 60),
        (hlthArr[i].y - 50),
        100,
        100,
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
      this.state.character.y+25,
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
        falling.setObstacle(false);
        falling.setPowerUp(true);
        falling.setBomb(false);
        falling.currentDirection = powerUp1;
      }else if (generator === 1) {
        falling.setObstacle(false);
        falling.setPowerUp(false);
        falling.setBomb(true);
        falling.currentDirection = bomb1;
      }else if (generator >= 2 && generator <= 11){
        falling.setObstacle(true);
        falling.setPowerUp(false);
        falling.setBomb(false);
        var rand = getRandomInt(1,5);
        falling.currentDirection = obstacles[rand - 1];
      }else{
        falling.setObstacle(false);
        falling.setPowerUp(false);
        falling.setBomb(false);
        var rand = getRandomInt(1,5);
        falling.currentDirection = collectibles[rand - 1];
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
        -200
      );
      objArr[i].setY(y);

      // Check for collisions
      if(objArr[i].y >= this.state.character.y + 15) {
        // Check for collisions with the player
        if((this.state.character.radius * 2) >= Math.abs(-15 + objArr[i].x - (this.state.character.x + this.state.character.radius * 2 * (this.state.charScale / 100)))) {

            // Check if this item is Obstacle
            if(objArr[i].isObstacle()){
              this.decreaseHealth();
              this.handleScoreUpdate(-10);
              //reset object if it's harmful 
              objArr[i].setRandomX();
              objArr[i].setY(objArr[i].defaultY);
              updateFallingobject(objArr[i]);
            }

            // Check if object is a bomb powerup
            else if(objArr[i].isBomb()){
              //if is bomb we increase score and reset all objects to default y
              for (var i = 0; i < objArr.length; i++) {
                objArr[i].setRandomX();
                objArr[i].setY(objArr[i].defaultY);
                updateFallingobject(objArr[i]);
              }
              this.handleScoreUpdate(10);
              continue;
            }

            // Check if object is a powerup
            else if (objArr[i].isPowerUp()){
              this.handleScoreUpdate(10);
              // Reset the object
              objArr[i].setRandomX();
              objArr[i].setY(objArr[i].defaultY);
              // add life if applicable
              this.increaseHealth();
            }

            // Else it is a collectible
            else{ 
              this.handleScoreUpdate(10);
            // Reset the object
            objArr[i].setRandomX();
            objArr[i].setY(objArr[i].defaultY);

            // Updates status and sprite of falling object
            updateFallingobject(objArr[i]);

            
            }
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

    if(this.state.held) {
      switch(this.state.direction) {
        case "left":
          this.moveLeft();
          break;
        case "right":
          this.moveRight();
          break;
        default:
          return;
      }
    }
    
  };
  
//------------------------------LISTENERS----------------------------------//
  // Setup listeners at the beginning of the lifecycle
  listen = () => {
    // Pressing the left arrow
    document.addEventListener("keydown", (e) =>
      e.keyCode === 37
      ? this.leftPress()
        : null
        );
    // Pressing the right arrow
    document.addEventListener("keydown", (e) =>
      e.keyCode === 39
        ? this.rightPress()
        : null
    );

    // Releasing the Left arrow 
    document.addEventListener("keyup", (e) =>
    e.keyCode === 37
      ? this.releasePress()
      : null
    );

    //Releasing the right arrow
    document.addEventListener("keyup", (e) =>
    e.keyCode === 39
      ? this.releasePress()
      : null
    );
  }

//--------------------------------TOUCH CONTROLS--------------------------------//
  // Left Button Presssed
  leftPress = () => {
    this.setState({
      held: true,
      direction: "left"
    })
  };

  // Right button pressed
  rightPress = () => {
    this.setState({
      held: true,
      direction: "right"
    })
  };

  // Button Released
  releasePress = () => {
    this.setState({
      held: false,
      direction: "",
      character: {
        //y is constant
        y: this.state.canvasY - (this.state.charScale),
        //don't let it go all the way out of the canvas
        x: Math.min(
          this.state.character.x + 8,
          this.state.canvasX - (this.state.charScale/2)
        ),
        radius: 20,
        currentDirection: hampImage,
        stillMoving: false,
      },
    })
  };


//---------------------------------MOVEMENT LOGIC-------------------------------//
  moveLeft = () => {
    // Check directions
    var nextImage = hampLeft1;
    if(this.state.character.currentDirection == hampLeft1)
      nextImage = hampLeft2;

    this.setState({
      character: {
        //y is constante
        y: this.state.canvasY - (this.state.charScale),
        //x is variable and is moved by integer value
        //dont let it go all the way to the max
        x: Math.max(
          this.state.character.x - 8,
          - (this.state.charScale/2)
        ),
        radius: 20,
        currentDirection: nextImage,
        stillMoving: true,
      },
    })
  }

  moveRight = () => {
    // Change directions
    var nextImage = hampRight1;
    if(this.state.character.currentDirection == hampRight1)
      nextImage = hampRight2;

    this.setState({
      character: {
        //y is constante
        y: this.state.canvasY - (this.state.charScale),
        //x is variable and is moved by integer value
        //dont let it go all the way to the max
        x: Math.min(
          this.state.character.x + 8,
           importedCanvasX - (this.state.charScale/2)
        ),
        radius: 20,
        currentDirection: nextImage,
        stillMoving: true,
      },
    })
  }


  //------------------------------LIFECYCLE FUNCTIONS----------------------------------//

  //This is what requires component to be defined
  //render() also must be defined with this
  componentDidMount() {
    if(this.props.isPlaying) {
      // Reset values
      setMaxHealth();
      setInitialItems();

      // Start Score timer
      this.state.scoreInterval = setInterval(() => {
        this.handleScoreUpdate(1);
      },1000)

      // Start the gameplay loop
      this.state.gameInterval = setInterval(() => {
        this.update();
        this.draw(this.state.character.currentDirection);
        this.drawl();
        if(this.state.isGameOver)
          this.handleGameOver();
      }, 1000 / 60); //1000 milliseconds divided by 60 seconds = 60fps

      // Begin Listening
      this.listen();
    }
  }

  render() {
    return (
      <div data-testid="gameclass" class=".container">
        <canvas
          ref="canvas"
          width={this.state.canvasX}
          height={this.state.canvasY}
        />
        <button
          id="leftbutton"
          onMouseDown={this.leftPress}
          onMouseUp={this.releasePress}
          onTouchStart={this.leftPress}
          onTouchEnd={this.releasePress}
        ></button>
        <button
          id="rightbutton"
          onMouseDown={this.rightPress}
          onMouseUp={this.releasePress}
          onTouchStart={this.rightPress}
          onTouchEnd={this.releasePress}
        ></button>
      </div>
    );
}

}

export default Game;

/*

*/