import React, { Component } from 'react';

export class fallingObject{
    newVelocity = 0;
    defaultY;

    constructor(xs, ys, radiuss, velocitys, canvasXi, canvasYi )
    {
        this.x = xs;
        this.y = ys;
        this.radius = radiuss;
        this.velocity= velocitys;
        this.defaultY = 50;
        this.canvasX = canvasXi;
        this.canvasY = canvasYi
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

}

export default fallingObject