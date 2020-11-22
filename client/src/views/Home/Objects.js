import React, { Component } from 'react';


function getRandomInt(min, max){
    var minimum = Math.ceil(min);
    var maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
  }

export class fallingObject{
    newVelocity = 0;
    defaultY;

    constructor(xs, ys, radiuss, velocitys, canvasXi, canvasYi, obstacles, powerups, currentDirections)
    {
        this.x = xs;
        this.y = ys;
        this.radius = radiuss;
        this.velocity= velocitys;
        this.defaultY = getRandomInt(-200, 0);
        this.canvasX = canvasXi;
        this.canvasY = canvasYi;
        this.obstacle = obstacles;
        this.powerup = powerups;
        this.currentDirection = currentDirections;
        this.bomb = false;
    }
    x()
    {
        return this.x
    }
    y()
    {
        return this.y
    }
    radius()
    {
        return this.radius
    }
    velocity()
    {
        return this.velocity
    }
    setVelocity(i)
    {
        this.velocity = i
    }
    setY(i)
    {
        this.y = i
    }
    setX(i)
    {
        this.x = i
    }
    setRadius(i)
    {
        this.radius = i
    }
    setRandomX()
    {
        
        this.x = (Math.floor(Math.random() * this.canvasX) + 1)
    }

    // We can subclass from this class for obstacles and collectibles and override this function 
    onCollide()
    {
        console.log("Collision")
    }
    
    currentDirection()
    {
        return this.currentDirection
    }
    setCurrentDirection(sprite)
    {
        this.currentDirection = sprite
    }
    isObstacle()
    {
        return this.obstacle;
    }
    setObstacle(i)
    {
        this.obstacle = i;
    }
    isPowerUp()
    {
        return this.powerup;
    }
    setPowerUp(i)
    {
        this.powerup = i;
    }
    isBomb()
    {
        return this.bomb;
    }
    setBomb(i)
    {
        this.bomb = i;
    }
}

export default fallingObject