let cont = document.querySelector(".container");
let arr = [];
let start = document.querySelector("#create-bars");
let bubble = document.querySelector("#bubble");
let merg = document.querySelector("#merge");
let quick = document.querySelector("#quick");


start.addEventListener("click", createBars);
bubble.addEventListener("click", () => {
    bubbleSort(arr);
});
merg.addEventListener("click", () => {
    mergeSort(arr);
});

quick.addEventListener("click",() =>{
    quickSort(arr);
});

function createBars() {
    cont.innerHTML = "";
    arr = [];
    for (let i = 0; i < 30; i++) {
        arr[i] = Math.random();
    }
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }
    return arr;
}

async function bubbleSort(arr) {
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                let temp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
                swapped = true;
                await updateBars();
            }
        }
    } while (swapped);
}

async function updateBars() {
    cont.innerHTML = "";  // Clear container for new bar rendering
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }
    await new Promise(resolve => setTimeout(resolve, 40));  // Adjust delay as needed for visibility
}

async function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));

    return await merge(left, right);
}

async function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
        
    }

    result = result.concat(left.slice(i)).concat(right.slice(j));
    
    // Copy the sorted elements back to the main array and update bars visually
    for (let k = 0; k < result.length; k++) {
        arr[k] = result[k];
        await updateBars();
    }
    
    return result;
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        // Partition the array around a pivot and get the pivot index
        let pivotIndex = await partition(arr, left, right);

        // Recursively apply quicksort to the left and right subarrays
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

async function partition(arr, left, right) {
    let pivot = arr[right]; // Choose the rightmost element as the pivot
    let i = left - 1; // Index for the smaller element

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            await updateBars(); // Visualize the swapping step
        }
    }

    // Move the pivot to its correct sorted position
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    await updateBars(); // Visualize the pivot placement

    return i + 1; // Return the pivot index
}

// updateBars is a helper function to visualize the sorting process
async function updateBars() {
    cont.innerHTML = ""; // Clear the container to redraw bars
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }
    await new Promise(resolve => setTimeout(resolve, 40)); // Add a small delay for visualization
}


