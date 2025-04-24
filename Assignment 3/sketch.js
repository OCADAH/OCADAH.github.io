let wordList = ['banana', 'spring', 'family', 'bear', 'coding', 'animals', 'school', 'car', 'javascript', 'mountain', 'penguin', 'adventure', 'plant'];
let currentWord = '';
let scrambledWord = '';
let guessInput, checkButton, hintButton, speedSlider;
let showMessage = false;
let messageX = -300;
let messageSpeed = 3;
let score = 0;
let timeLeft = 30;
let gameOver = false;
let timerInterval;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);

  // Pick word
  currentWord = random(wordList);
  scrambledWord = shuffleWord(currentWord);

  // Input
  guessInput = createInput('');
  guessInput.position(20, 20);
  guessInput.size(200);

  // Check Button
  checkButton = createButton('Check');
  checkButton.position(230, 20);
  checkButton.mousePressed(checkGuess);

// Rescramble Button
let rescrambleButton = createButton('Rescramble');
rescrambleButton.position(300, 20);
rescrambleButton.mousePressed(() => {
  scrambledWord = shuffleWord(currentWord);
});

  // Speed Slider
  speedSlider = createSlider(1, 10, 3);
  speedSlider.position(20, 60);
  speedSlider.style('width', '200px');

  timerInterval = setInterval(() => {
    if (!gameOver) {
      timeLeft--;
      if (timeLeft <= 0) {
        gameOver = true;
        clearInterval(timerInterval);
      }
    }
  }, 1000);  
}

function draw() {
  background(30);
  textSize(24);
fill(255);
textAlign(LEFT);
text(`Score: ${score}`, 20, height - 60);
text(`Time Left: ${timeLeft}`, 20, height - 30);
  fill(255);

  text('Unscramble this word:', width / 2, height / 2 - 80);
  textSize(48);
  text(scrambledWord, width / 2, height / 2);

  if (showMessage) {
    fill(0, 255, 0);
    textSize(32);
    text('✅ Correct!', messageX, height / 2 + 80);
    messageX += messageSpeed;

    if (messageX > width + 200) {
      showMessage = false;
      messageX = -300;
      currentWord = random(wordList);
      scrambledWord = shuffleWord(currentWord);
      guessInput.value('');
    }
    if (gameOver) {
      background(0, 0, 0, 150);
      textSize(48);
      fill(255, 50, 50);
      textAlign(CENTER, CENTER);
      text('⏱️ Game Over!', width / 2, height / 2 + 150);
      noLoop(); // Stop drawing
    }    
  }

  messageSpeed = speedSlider.value();
}

function resetTimer() {
  timeLeft = 30;
}
function checkGuess() {
  if (guessInput.value().toLowerCase() === currentWord.toLowerCase()) {
    showMessage = true;
    score++;
    resetTimer(); // ⏱️ Reset the timer here!
  }
}

function shuffleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}