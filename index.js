// Targetted DOM Elements
const grid = document.querySelector(".grid");
const startBtn = document.querySelector(".btn-start");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

// Game Variables
let timeRemaining = 5; // Game length in seconds
let score = 0; // Initial score

// Event Listeners

// DOM content loaded event listener is triggered when the initial HTML document has been completely loaded and parsed
window.addEventListener("DOMContentLoaded", renderGame);
startBtn.addEventListener("click", gameLogic);
grid.addEventListener("click", whackMole);

// Functions

function renderGame() {
  const totalHoles = 9; // Number of holes (adjust as needed)
  // textContent property sets or returns the text content of the specified node, and all its descendants
  timerDisplay.textContent = timeRemaining;
  scoreDisplay.textContent = score;

  // for loop instantiates an index variable i and sets it to 0. The loop will continue to run as long as i is less than totalHoles. After each iteration, i will be incremented by 1
  for (let i = 0; i < totalHoles; i++) {
    // createElement() method creates the HTML element specified by tag name
    const hole = document.createElement("div");
    // classList property returns the class name(s) of an element, as a DOMTokenList object
    hole.classList.add("hole");
    // appendChild method appends a node as the last child of a node
    grid.appendChild(hole);
  }
}

function gameLogic() {
  // setInterval method calls a function or evaluates an expression at specified intervals (in milliseconds)
  const timerInterval = setInterval(() => {
    // decrement the time remaining
    timeRemaining--;
    // update the timer display
    timerDisplay.textContent = timeRemaining;
    // if the time remaining is zero, clear the timer interval
    if (timeRemaining === 0) {
      // clearInterval method clears a timer set with the setInterval() method
      clearInterval(timerInterval);
    }
  }, 1000);

  // use setInterval to randomly show a mole at a specific interval
  const moleInterval = setInterval(() => {
    // querySelectorAll method returns all elements in the document that matches a specified CSS selector(s), as a static NodeList object
    const holes = document.querySelectorAll(".hole");
    // Math.floor() function returns the largest integer less than or equal to a given number
    const randomIndex = Math.floor(Math.random() * holes.length);
    // check for an existing mole
    const existingMole = grid.querySelector(".mole");
    // if there is an existing mole remove it
    if (existingMole) {
      existingMole.classList.remove("mole");
    }
    // add the mole class to hole at the randomIndex
    holes[randomIndex].classList.add("mole");
  }, 1000);

  setTimeout(() => {
    clearInterval(moleInterval);
    // alert() method displays an alert box with a specified message and an OK button
    alert(`Game Over!! You whacked ${score} moles!!`);
  }, timeRemaining * 1000);
}

function whackMole(event) {
  // if the clicked element has the mole class, increment the score
  if (event.target.classList.contains("mole")) {
    score++;
    scoreDisplay.textContent = score;
  }
}
