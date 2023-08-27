// Challenge Day 3 //
// TASK 1 //
const prompt = require('prompt-sync')();

var arrayInput = [];
for(var i = 0; i < 5; i++)
arrayInput.push(prompt("Enter your numbers: "));

function selectionSort(array) {
    const n = array.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
  
      // Find the index of the minimum element in the unsorted part
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      // Swap the minimum element with the first element of the unsorted part
      if (minIndex !== i) {
        const temp = array[i];
        array[i] = array[minIndex];
        array
        [minIndex] = temp;
      }
    }
  
    return array;
  }
  
  const sortedArray = selectionSort(arrayInput);
  console.log(sortedArray); // Output: [11, 12, 22, 25, 64]  
  
// TASK 2 //

var arrayBInput = [];
for(var i = 0; i < 5; i++)
arrayBInput.push(prompt("Enter your numbers: "));
  
function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap the elements if they are in the wrong order
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

const sortedBArray = bubbleSort(arrayBInput);
console.log(sortedBArray);

// TASK 3 //
var arrayCInput = [];
for(var i = 0; i < 5; i++)
arrayCInput.push(prompt("Enter your numbers: "));

function insertionSort(arr) {
    const length = arr.length;
    
    for (let i = 1; i < length; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}
const sortedcArray = insertionSort(arrayCInput);
console.log(sortedcArray);

// TASK 4 //
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Return the index of the found element
      }
    }
    return -1; // Return -1 if the element is not found
  }
  const userInput = prompt("Enter the element to search for:");
  const elementToSearch = userInput.toString();
  
  const foundIndex = linearSearch(arrayCInput, elementToSearch);
  
  if (foundIndex !== -1) {
    console.log(`Element ${elementToSearch} found at index ${foundIndex}.`);
  } else {
    console.log(`Element ${elementToSearch} not found in the array.`);
  }

// TASK 5 //
function countZeros(matrix) {
    let count = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                count++;
            }
        }
    }

    return count;
}

function createMatrix(rows, columns) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push([]);
        for (let j = 0; j < columns; j++) {
            const value = parseInt(prompt(`Enter value for matrix[${i}][${j}]:`));
            matrix[i].push(value);
        }
    }
    return matrix;
}

// Prompt the user for matrix dimensions
const numRows = parseInt(prompt("Enter number of rows:"));
const numColumns = parseInt(prompt("Enter number of columns:"));

// Create the matrix
const matrix = createMatrix(numRows, numColumns);

// Count occurrences of "0" in the matrix
const zeroCount = countZeros(matrix);
console.log(`Number of occurrences of "0" in the matrix: ${zeroCount}`);