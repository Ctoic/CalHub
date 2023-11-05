// Initialize an empty string to store the user input
let inputString = '';

// Select the input field
const inputField = document.querySelector('input');
const resultDisplay = document.querySelector('#results');
const operators = ['+','-','*','/'];


// Select all the calculator buttons on the page
const calculatorButtons = document.querySelectorAll('button');

// Select the body element
const bodyElement = document.body;

const parentBox = document.querySelector('.parent');

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

function getRandomColor() {
  // Generate a random hexadecimal color code
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  color += '80'; // so that the background is not a solid color
  return color;
}

// Function to change the background color
function changeBackgroundColor() {
  bodyElement.style.background = generateRandomGradient();
  parentBox.classList.add('box-highlight');

  // Add a button press effect to the parent container
  setTimeout(() => {
    parentBox.classList.remove('box-highlight');
  }, 200);
}

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



// Function to calculate and display the result
function calculateResult() {
  const inputValue = inputField.value;
  try {
    // Replace percentage symbol (%) with '/100' before evaluation
    inputString = inputValue.replace(/%/g, '/100');
    // Replace √(first digit group) with 'Math.sqrt()' function for that digit group before evaluation
    inputString = inputValue.replace(/√([+-]*\d+)/g, 'Math.sqrt($1)');
    
    
    // Evaluate the user input as a mathematical expression using eval
    const result = eval(inputString);
    
    // Display the result in the second input field
    animateValueChange(resultDisplay, result, 500);
    
    // Revert back the Math.sqrt() function
    inputString = inputValue.replace(/Math.sqrt\((\d+)\)/g, '√$1');

    // Change the background color here
    changeBackgroundColor();
  } catch (error) {
    // Handle invalid expressions
    navigator.vibrate(200);
    inputField.value = '';
    inputString = '';
    resultDisplay.value = error.message; // Clear the dashboard on error
  }
}

// Function to continuously update the result as the user types or presses buttons
function updateResult() {
  inputString = inputField.value;

  try {
    // Check if the inputString is not empty and contains a valid expression
    if (inputString) {
      const result = eval(inputString);
      animateValueChange(resultDisplay, result, 500);
    } else {
      resultDisplay.value = ''; // Clear the dashboard if the input is empty
    }
  } catch (error) {
    resultDisplay.value = ''; // Clear the dashboard on error
  }
}

// Add an event listener to each button
calculatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    switch (buttonValue) {
      case '=':
        // Check if the inputString is not empty and contains a valid expression
        if (inputString) {
          calculateResult();
        }
        break;
      case 'C':
        // Clear the inputString and reset the input field
        inputString = '';
        inputField.value = inputString;
        // claer the Display field
        resultDisplay.value = '';
        break;
      case 'M+':
        // Add the current input value to the memory value
        memoryValue += parseFloat(inputField.value) || 0;
        inputString = '';
        break;
      case 'M-':
        // Subtract the current input value from the memory value
        memoryValue -= parseFloat(inputField.value) || 0;
        inputString = '';
        break;
      case 'sin':
        inputField.value = Math.sin(parseFloat(inputField.value));
        inputString = inputField.value.toString();
        break;
      case 'cos':
        inputField.value = Math.cos(parseFloat(inputField.value));
        inputString = inputField.value.toString();
        break;
      case 'tan':
        inputField.value = Math.tan(parseFloat(inputField.value));
        inputString = inputField.value.toString();
        break;
      case '^':
        const num = parseFloat(inputField.value);
        const result = num * num;
        //inputString = result.toString();
        break;
      case '√':
        // inputField.value = Math.sqrt(parseFloat(inputField.value));

        // Check if input field value is empty and if it is, not then √ should precede *
        const inputFieldValueLength = inputField.value.length;
        if(inputFieldValueLength != 0 && !operators.includes(inputField.value[inputFieldValueLength - 1]))
          inputField.value += '*';
        inputField.value += '√';
        inputString = inputField.value.toString();

        break;
      case 'log':
        inputField.value = Math.log(parseFloat(inputField.value));
        inputString = inputField.value.toString();
        break;
      case 'π':
        inputField.value += Math.PI.toFixed(3);
        inputString = inputField.value.toString();
        updateResult();
        break;
      case 'e':
        inputField.value = Math.E;
        inputString = inputField.value.toString();
        break;
      case 'X!':
        const numX = parseFloat(inputField.value);
        let factorial = 1;
        for (let i = 1; i <= numX; i++) {
          factorial *= i;
        }
        inputString = factorial.toString();
        break;
      case 'CE':
        inputField.value = inputField.value.slice(0, -1);
        inputString = inputField.value;
        break;
      default:
        // Append the clicked button's value to the input field
        inputString += buttonValue;
        inputField.value = inputString;
        updateResult(); // Update the result as you add operators
        break;
    }
  });
});
inputField.addEventListener('input', updateResult);

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
