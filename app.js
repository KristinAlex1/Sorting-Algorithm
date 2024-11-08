let cont = document.querySelector(".container");
let arr = [];
let start = document.querySelector("#create-bars");
let bubble = document.querySelector("#bubble");
let merg = document.querySelector("#merge");

start.addEventListener("click", createBars);
bubble.addEventListener("click", () => {
    bubbleSort(arr);
});
merg.addEventListener("click", () => {
    mergeSort(arr);
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

async function quickSort(arr) {
    // Base case: arrays with 1 or 0 elements are already sorted
    if (arr.length <= 1) {
        return arr;
    }
    
    // Choose a pivot element (using the middle element here)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    // Arrays to hold elements smaller and larger than the pivot
    let smaller = [];
    let larger = [];
    
    // Partition the array into smaller and larger arrays
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // Skip the pivot element
        if (arr[i] < pivot) {
            smaller.push(arr[i]);
        } else {
            larger.push(arr[i]);
        }
    }
    
    // Recursively apply quicksort and combine results
    const sortedSmaller = await quickSort(smaller);
    const sortedLarger = await quickSort(larger);

    // Combine sorted smaller elements, pivot, and sorted larger elements
    const sortedArray = [...sortedSmaller, pivot, ...sortedLarger];

    // Optional: Visualize the array if you are displaying it in real-time
    await updateBars(sortedArray);

    return sortedArray;
}

