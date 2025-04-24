// Aquarium with audio

let particles = [];
let otherFishes = [];
let bubbleSound, bgMusic;
let lastMouseX, lastMouseY;

function preload() {
    soundFormats('mp3');
    bubbleSound = loadSound('bubbles.mp3');
    bgMusic = loadSound('background.mp3');
  }
  
function setup() {
  createCanvas(900, 600);

  // Play background music loop
  bgMusic.setVolume(0.3);
  bgMusic.loop();

  // Create 5 randomly moving fish
  for (let i = 0; i < 5; i++) {
    otherFishes.push(new OtherFish());
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function draw() {
  background(0, 120, 200); // water blue
  drawEnvironment();

  for (let fish of otherFishes) {
    fish.update();
    fish.display();
  }

  // Main player fish
  drawMainFish(mouseX, mouseY);

  // Play bubble sound on movement
  if (dist(mouseX, mouseY, lastMouseX, lastMouseY) > 2 && !bubbleSound.isPlaying()) {
    bubbleSound.setVolume(0.7);
    bubbleSound.play();
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // Show a new bubble
  particles.push(new Particle(mouseX - 30, mouseY - 10));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-2, -0.5);
    this.alpha = 255;
    this.size = random(5, 10);
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function drawMainFish(x, y) {
  fill(255, 150, 0);
  ellipse(x, y, 60, 30); // body
  triangle(x - 30, y, x - 50, y - 10, x - 50, y + 10); // tail
  fill(0);
  ellipse(x + 20, y - 5, 5); // eye
}

class OtherFish {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, 50, 25);
    triangle(this.x - 25, this.y, this.x - 40, this.y - 10, this.x - 40, this.y + 10);
    fill(0);
    ellipse(this.x + 15, this.y - 3, 4);
  }
}

// Environment: seaweed, rocks, house
function drawEnvironment() {
  drawSeaweed();
  drawRocks();
  drawFishHouse();
}

function drawSeaweed() {
  for (let i = 0; i < width; i += 40) {
    stroke(0, 100, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let y = height; y > height - 60; y -= 10) {
      curveVertex(i + sin(y * 0.1 + frameCount * 0.1) * 5, y);
    }
    endShape();
  }
}

function drawRocks() {
  noStroke();
  fill(80);
  ellipse(100, height - 10, 60, 30);
  ellipse(130, height - 15, 40, 20);
  ellipse(160, height - 8, 30, 15);
}

function drawFishHouse() {
  fill(180, 80, 40);
  rect(width - 100, height - 80, 60, 60);
  fill(0);
  ellipse(width - 70, height - 50, 20);
  fill(160, 70, 30);
  triangle(width - 110, height - 80, width - 70, height - 120, width - 30, height - 80);
}
