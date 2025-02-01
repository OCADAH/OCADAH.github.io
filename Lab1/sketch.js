

function setup(){
    createCanvas(windowWidth,windowHeight);
}

function draw(){
    background(0, 50, 50, 10);
    fill('sagegreen');
    stroke('white');
    for(var i = 0; i < 10000; i++){
        rect((i*10)%width,(i*10)%height,10,10);
    }
    fill('grey');
    stroke('pink');
    if(mouseX < 500){
        rect(mouseX,mouseY,100,100);
    }else{
        rect(mouseX,mouseY,25,25,25);
    }
    
    fill('babypink');
    stroke('black');
    if(mouseX < 200){
        rect(mouseX,mouseY,100,100);
    }else{
        rect(mouseX,mouseY,50,50,25);
    }
    }