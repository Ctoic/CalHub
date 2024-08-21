/**
 * This script handles the functionality of a calculator application.
 * It includes event listeners for button clicks, functions to handle
 * mathematical operations, and a countdown timer.
 */

// Initialize an empty string to store the user input
let inputString = '';
let mathExpression = '';

// Select the input field
const inputField = document.querySelector('input');
const resultDisplay = document.querySelector('#results');
const operators = ['+','-','*','/'];

// Select all the calculator buttons on the page
const calculatorButtons = document.querySelectorAll('button');

// Select the body element
const bodyElement = document.body;

const parentBox = document.querySelector('.parent');

/**
 * Generates a random linear gradient background.
 * @returns {string} The generated linear gradient.
 */
function generateRandomGradient() {
  // Generate random colors
  const color1 = getRandomColor();
  const color2 = getRandomColor();

  // Generate a random angle between 0 and 360 degrees
  const angle = Math.floor(Math.random() * 360);

  // Create the linear gradient string
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  // return the generated linear gradient
  return gradient;
}

/**
 * Generates a random hexadecimal color code.
 * @returns {string} The generated color code.
 */
function getRandomColor() {
  // Generate a random hexadecimal color code
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add an event listener to each button
calculatorButtons.forEach((button) => {
  // This event listener handles button clicks and updates the input field and math expression accordingly.
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    switch (buttonValue) {
      case 'AC':
      case 'CE':
        // Clear the input field and math expression
        inputField.value = '';
        mathExpression = '';
        break;
      case 'C':
        // Remove the last character from the input field and math expression
        if (inputField.value.slice(-1) === ')') {
          const lastOpenParenthesisIndex = inputField.value.lastIndexOf('(');
          inputField.value = inputField.value.slice(0, lastOpenParenthesisIndex);
          mathExpression = mathExpression.slice(0, lastOpenParenthesisIndex);
        } else {
          inputField.value = inputField.value.slice(0, -1);
          mathExpression = mathExpression.slice(0, -1);
        }
        break;
      case '=':
        // Calculate and display the result
        calculateResult();
        break;
      case 'sin':
        // Append 'sin(' to the input field and 'Math.sin(' to the math expression
        inputField.value += 'sin(';
        mathExpression += 'Math.sin(';
        break;
      case 'cos':
        // Append 'cos(' to the input field and 'Math.cos(' to the math expression
        inputField.value += 'cos(';
        mathExpression += 'Math.cos(';
        break;
      case 'tan':
        // Append 'tan(' to the input field and 'Math.tan(' to the math expression
        inputField.value += 'tan(';
        mathExpression += 'Math.tan(';
        break;
      case 'log':
        // Append 'log(' to the input field and 'Math.log(' to the math expression
        inputField.value += 'log(';
        mathExpression += 'Math.log(';
        break;
      case 'sqrt':
        // Append 'sqrt(' to the input field and 'Math.sqrt(' to the math expression
        inputField.value += 'sqrt(';
        mathExpression += 'Math.sqrt(';
        break;
      case '^':
        // Append '^' to the input field and '**' to the math expression
        inputField.value += '^';
        mathExpression += '**';
        break;
      case 'π':
        // Append 'π' to the input field and 'Math.PI' to the math expression
        inputField.value += 'π';
        mathExpression += 'Math.PI';
        break;
      case 'e':
        // Append 'e' to the input field and 'Math.E' to the math expression
        inputField.value += 'e';
        mathExpression += 'Math.E';
        break;
      default:
        // Append the clicked button's value to the input field and the math expression
        inputField.value += buttonValue;
        mathExpression += buttonValue;
        break;
    }
  });
});

/**
 * Calculates and displays the result of the math expression.
 */
function calculateResult() {
  try {
    // Evaluate the math expression using eval
    const result = eval(mathExpression);

    // Display the result in the second input field
    animateValueChange(resultDisplay, result, 500);

    // Reset the math expression
    mathExpression = '';

    // Clear the input field
    inputField.value = '';

    // Change the background color
    bodyElement.style.background = generateRandomGradient();
  } catch (error) {
    // Handle invalid expressions
    navigator.vibrate(200);
    inputField.value = '';
    mathExpression = '';
    resultDisplay.value = error.message; // Clear the dashboard on error
  }
}

/**
 * Animates the value change in the result display.
 * @param {HTMLElement} element - The element to animate.
 * @param {number} end - The end value.
 * @param {number} duration - The duration of the animation in milliseconds.
 */
function animateValueChange(element, end, duration) {
  let startValue = parseFloat(element.value) || 0; // Start from the current value
  let startOpacity = 0; // Start from opacity 0
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    const interpolatedOpacity = progress;

    // Update the value and opacity (don't change anything other than alpha though, get the elements r, g, and b)
    element.value = end;
    // Get R G and B of the text
    const rgb = window.getComputedStyle(element).color.match(/\d+/g);
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    element.style.color = `rgba(${r}, ${g}, ${b}, ${interpolatedOpacity})`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Set the date we're counting down to
var countDownDate = new Date("Oct 31, 2023 23:59:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer-text").innerHTML = "Ends in " + days + "d " + hours + "h "
  + minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer-text").innerHTML = "ENDED";
  }
}, 1000);
