
var x = 0;
var y = 0;

function setup(){
    createCanvas(400,400);
}

function draw(){
    background('#78cceb') // automatic semicolon insertion
    rect(x,y,10,10);
    x = x + 2;
    x = x % 500; // modulo operator
    y = y + 2;
    y = y % 500;
} 