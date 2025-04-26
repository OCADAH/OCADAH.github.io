let inventory = [];
let selectedItems = [];
let draggingItem = null;
let offsetX, offsetY;
let targetBox = { x: 600, y: 250, r: 80 };
let completed = false;
let targetRecipe = [];
let currentRecipeName = "";
let foodEmoji = "";
let recipeButtons = [];

let popSound;
let bgMusic;
let volumeSlider;
let volumeLabel;

let sparkles = [];
let showSparkles = false;
let sparkleTimer = 0;

const recipes = {
  "Cookie 🍪": { ingredients: ["🥚", "🥛", "🍫", "🌾", "🧂"], result: "🍪" },
  "Cake 🎂": { ingredients: ["🥚", "🥛", "🧈", "🌾", "🍬"], result: "🎂" },
  "Cupcake 🧁": { ingredients: ["🥚", "🌾", "🍬", "🧈", "🍓"], result: "🧁" },
  "Donut 🍩": { ingredients: ["🌾", "🥛", "🍬", "🧈", "🧂"], result: "🍩" },
  "Ice Cream 🍦": { ingredients: ["🥛", "🍬", "🧈"], result: "🍦" }
};

function preload() {
  popSound = loadSound('pop.mp3');
  bgMusic = loadSound('background.mp3');
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent(document.body);
  canvas.style("display", "block");
  canvas.style("margin", "60px auto 20px auto");
  canvas.style("border", "16px double #ffe0f0");
  canvas.style("border-radius", "30px");

  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Comic Sans MS');
  fill(255);

  let xStart = 100;
  let yStart = 120;
  let spacing = 70;
  let rowLength = 2;

  let ingredients = [
    { emoji: "🥛", name: "Milk" },
    { emoji: "🥚", name: "Egg" },
    { emoji: "🧈", name: "Butter" },
    { emoji: "🌾", name: "Flour" },
    { emoji: "🍬", name: "Sugar" },
    { emoji: "🍓", name: "Strawberry" },
    { emoji: "🧂", name: "Salt" },
    { emoji: "🍫", name: "Chocolate" }
  ];

  for (let i = 0; i < ingredients.length; i++) {
    let row = Math.floor(i / rowLength);
    let col = i % rowLength;
    inventory.push({
      emoji: ingredients[i].emoji,
      name: ingredients[i].name,
      x: xStart + col * spacing,
      y: yStart + row * spacing
    });
  }

  createTitle();
  createRecipeButtons();
  createVolumeSlider();

  if (bgMusic && !bgMusic.isPlaying()) {
    bgMusic.setLoop(true);
    bgMusic.play();
  }
}

function createTitle() {
  let title = createElement('h1', '🎀 Sanrio Chef in Café 🎀');
  title.style('text-align', 'center');
  title.style('font-family', 'Comic Sans MS');
  title.style('color', '#ffb3da');
  title.style('font-size', '36px');
  title.style('margin', '20px auto 5px auto');
}

function createVolumeSlider() {
  volumeLabel = createDiv('🔊');
  volumeLabel.style('text-align', 'center');
  volumeLabel.style('font-size', '20px');
  volumeLabel.style('margin-top', '0px');
  volumeLabel.style('margin-bottom', '5px');
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.style('display', 'block');
  volumeSlider.style('margin', '0 auto');
  volumeSlider.style('width', '120px');
}

function createRecipeButtons() {
  let x = 300;
  let y = 650; 
  let index = 0;
  for (let recipe in recipes) {
    let btn = createButton(recipe);
    btn.position(x + index * 100, y);
    btn.style('font-family', 'Comic Sans MS');
    btn.style('background-color', '#ffd9ec');
    btn.style('border', 'none');
    btn.style('border-radius', '10px');
    btn.style('padding', '8px');
    btn.mousePressed(() => {
      selectedItems = [];
      completed = false;
      showSparkles = false;
      sparkleTimer = 0;
      targetRecipe = recipes[recipe].ingredients;
      foodEmoji = recipes[recipe].result;
      currentRecipeName = recipe;
    });
    recipeButtons.push(btn);
    index++;
  }
  let resetBtn = createButton("🔄 Reset");
  resetBtn.position(x + index * 100, y);
  resetBtn.style('font-family', 'Comic Sans MS');
  resetBtn.style('background-color', '#ffd9ec');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '10px');
  resetBtn.style('padding', '8px');
  resetBtn.mousePressed(() => {
    selectedItems = [];
    completed = false;
    showSparkles = false;
    sparkleTimer = 0;
    currentRecipeName = "";
  });
  recipeButtons.push(resetBtn);
}

function draw() {
  background(200, 225, 255);
  bgMusic.setVolume(volumeSlider.value());

  fill(255);
  textSize(24);
  text(currentRecipeName ? "Make: " + currentRecipeName : "Pick a Recipe Below!", width / 2, 40);
  textSize(16);
  text("Drag ingredients to the mixing bowl!", width / 2, 70);

  for (let item of inventory) {
    textSize(32);
    text(item.emoji, item.x, item.y);
    textSize(14);
    text(item.name, item.x, item.y + 25);
  }

  fill(255, 230, 250);
  stroke(200);
  ellipse(targetBox.x, targetBox.y, targetBox.r * 2);
  fill(255);
  textSize(16);
  text("Mixing Bowl", targetBox.x, targetBox.y - targetBox.r - 20);

  textSize(28);
  let cx = targetBox.x - 40;
  let cy = targetBox.y - 10;
  for (let item of selectedItems) {
    text(item.emoji, cx, cy);
    cx += 30;
  }

  if (completed) {
    textSize(40);
    text("You made: " + foodEmoji, width / 2, 500);
  }

  if (showSparkles) {
    for (let s of sparkles) {
      s.update();
      s.show();
    }
    sparkleTimer++;
    if (sparkleTimer > 100) {
      showSparkles = false;
      sparkles = [];
    }
  }
}

function mousePressed() {
  for (let item of inventory) {
    let d = dist(mouseX, mouseY, item.x, item.y);
    if (d < 30) {
      draggingItem = { ...item };
      offsetX = mouseX - item.x;
      offsetY = mouseY - item.y;
      break;
    }
  }
}

function mouseDragged() {
  if (draggingItem) {
    draggingItem.x = mouseX - offsetX;
    draggingItem.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  if (draggingItem) {
    let d = dist(draggingItem.x, draggingItem.y, targetBox.x, targetBox.y);
    if (d < targetBox.r) {
      selectedItems.push(draggingItem);
      if (popSound && popSound.isLoaded()) {
        popSound.play();
      }
      checkRecipe();
    }
    draggingItem = null;
  }
}

function checkRecipe() {
  let current = selectedItems.map(i => i.emoji).sort().join();
  let target = targetRecipe.sort().join();
  if (current === target) {
    completed = true;
    showSparkles = true;
    sparkleTimer = 0;
    for (let i = 0; i < 30; i++) {
      sparkles.push(new Sparkle(random(width), random(-100, -10)));
    }
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(12, 20);
    this.speed = random(1, 3);
    this.opacity = 255;
    this.emoji = random(["✨", "🌟"]);
  }

  update() {
    this.y += this.speed;
    this.opacity -= 2;
  }

  show() {
    push();
    textSize(this.size);
    fill(255, this.opacity);
    text(this.emoji, this.x, this.y);
    pop();
  }
}
