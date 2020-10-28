import React, { Component } from 'react';
import fallingObject from "./Objects.js";


//MUST PRESS RIGHT OR LEFT ARROW TO RENDER HAMPERMAN IN FRAME

//get png from url source
var hampImage = new Image();
hampImage.src = "https://i.imgur.com/EKlTCEr.png";


var importedCanvasX = 650;
var importedCanvasY = 800;
var numObj = 5;


var objArr = [];
 


for (var i = 0; i < numObj; i++){
    objArr[i] =  new fallingObject(Math.random() * importedCanvasX,50,20,0,650,800)
    
};



class Game extends Component {

 


    //array of falling object

    state = {
        
        canvasX: importedCanvasX,
        canvasY: 800,
        defaultX: 325,
        defaultY: 50,
        gravity: 0.5,
        charScale: 100,
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
        }
    }

randX = () => {
 return Math.random() * this.state.canvasX
}

draw = () => {

        //not sure what is meant by refs being deprecated
        //but the code breaks without refs
        const ctx = this.refs.canvas.getContext("2d");
        //background color to clear canvas every frame
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);  
        //ball color
        //loop for falling objects
        for(var i = 0; i < objArr.length; i++)
        {
            ctx.fillStyle = "green";
            ctx.beginPath();
            //creates outline arc for falling obj
            ctx.arc(objArr[i].x + (i), objArr[i].y,     objArr[i].radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        };
        
 

        //drawing hamperman image
        ctx.drawImage(hampImage,0,0,640,640,
            //set x and y coordinates (starts from upper lefthand corner of sprite, hence subtracting the char scale)
            this.state.character.x,
            this.state.character.y,
            //sets the size of the image to be drawn
            this.state.charScale, this.state.charScale)
    }


    //update is called every frame
update = () => {

//for loop to iterate through falling object array and set new velocities

for(var i = 0; i < objArr.length; i++)
{


        
    var newVal = ((objArr[i].velocity + this.state.gravity) * 0.9)
    objArr[i].setVelocity(newVal)

    //find the y value making sure it is not out of frame
    var y = Math.max(
        Math.min(
            objArr[i].y + objArr[i].velocity,
            this.refs.canvas.height - objArr[i].radius),
            0
    )
    objArr[i].setY(y)

         //check if object has fallen to level of character
         if(objArr[i].y >= this.state.canvasY - this.state.character.radius)
         {
             objArr[i].setRandomX()
             //to be updated for random Y values
             objArr[i].setY(objArr[i].defaultY)
             continue;
         };


}



}



listen = () => {
    //keycode for left arrow
        document.addEventListener("keydown", e =>
        e.keyCode === 37 ? this.setState({ 
            character: {
                //y is constant
            y: this.state.canvasY - this.state.charScale,
            //x is variable and is moved by integer value
            //dont let it go all the way to the max
            x: Math.max(this.state.character.x - 8, 0),
            radius: 20
            }
          }) : null
        );
    //keycode for right arrow
        document.addEventListener("keydown", e =>
        e.keyCode === 39 ? this.setState({ 
            character: {
                //y is constant
            y: this.state.canvasY - this.state.charScale,
            //don't let it go all the way out of the canvas
            x: Math.min(this.state.character.x + 8, this.state.canvasX - this.state.charScale),
            radius: 20
            }
          }) : null
        );
};



//Not exactly sure why componentDidMount was used 
//This is what requires component to be defined
//render() also must be defined with this    
componentDidMount() {
    setInterval(() =>{
        this.update();
        this.draw();
        //personally added to test event listener functionallity

    }, 1000 / 60); //1000 milliseconds divided by 60 seconds = 60fps

    this.listen();
    }
render() {
        return (
            <div>
                <canvas ref="canvas" width={this.state.canvasX} height={this.state.canvasY} />
            </div>
        );
    }
}
export default Game;