// Initialize an empty string to store the user input
let inputString = ''

// Initialize the variable to store the current memory value to zero
let memoryValue = 0

// Select all the calculator buttons on the page
const calculatorButtons = document.querySelectorAll('.button')

// Add an event listener to each button
calculatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if the clicked button is the equals sign
    if (button.textContent === '=') {
      // Evaluate the user input as a mathematical expression
      inputString = eval(inputString)

      // Display the result in the input field
      document.querySelector('input').value = inputString

    // Check if the clicked button is the clear button
    } else if (button.textContent === 'C') {
      // Reset the user input string and the displayed input field
      inputString = ''
      document.querySelector('input').value = inputString

    // Check if the clicked button is the memory plus button
    } else if (button.textContent === 'M+') {
      // Add the current input value to the memory value
      memoryValue += parseFloat(inputString)

      // Reset the input string
      inputString = ''

    // Check if the clicked button is the memory minus button
    } else if (button.textContent === 'M-') {
      // Subtract the current input value from the memory value
      memoryValue -= parseFloat(inputString)

      // Reset the input string
      inputString = ''

    // Check if the clicked button is the memory clear button
    } else if (button.textContent === 'MC') {
      // Reset the memory value to zero
      memoryValue = 0

    // If none of the above buttons were clicked, append the button's value to the input string
    } else {
      // Append the clicked button's value to the input string
      inputString += button.textContent

      // Display the updated input string in the input field
      document.querySelector('input').value = inputString
    }
  })
})
