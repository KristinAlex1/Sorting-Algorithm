
let cont = document.querySelector(".container");
let arr = [];
let bubble = document.querySelector("#bubble");



function createBars(){

    for (let i = 0;i<30;i++){
        arr[i] = Math.random();
    
    }

    for (let i = 0;i < arr.length;i++){
        let bar = document.createElement("div");
        bar.style.backgroundColor = "red";
        bar.style.height = arr[i]*100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }
}


function bubbleSort(arr) {
    let len = arr.length;
    let swapped;

    // Loop through the entire array
    for (let i = 0; i < len; i++) {
        swapped = false; // Track if any elements are swapped in this pass

        // Compare adjacent elements and swap if needed
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                swapped = true; // Mark that a swap has occurred
            }
        }

        // If no elements were swapped, the array is already sorted
        if (!swapped) {
            break;
        }
    }
    return array; // Return the sorted array
}