// Tutorial 1: p5.js Drawing Continuous Lines
// Source: https://editor.p5js.org/p5/sketches/Drawing:_Continuous_Lines

let r = 0; // red color component (for dynamic stroke)
let redoButton; // My addition: button for restarting the drawing

function setup() {
  let cnv = createCanvas(600, 400);
  cnv.parent('canvas-container'); // Attaches canvas to the HTML div

  background(255);
  strokeWeight(2);

  // My addition: Create a Redo button using p5.js
  // Source: https://p5js.org/reference/p5/createButton/ 
  redoButton = createButton('Redo Drawing');
  redoButton.parent('canvas-container'); // Keep it with the canvas and title
  redoButton.mousePressed(clearCanvas); // When clicked, calls clearCanvas
}

function draw() {
  if (mouseIsPressed) {
    // From the continuous drawing tutorial
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  // My addition: Draw an interactive circle

  fill(200);
  ellipse(300, 200, 100, 100); // Centered

  let d = dist(mouseX, mouseY, 300, 200);
  if (d < 50) {
    stroke(r, 100, 200);
    r = (r + 1) % 255;
  } else {
    stroke(0);
  }
}

// My addition: Clears the canvas when button is clicked
function clearCanvas() {
  background(255); // Resets canvas to white
}
