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
quick.addEventListener("click", () => {
    quickSort(arr);
});

let audioCtx = null;

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function createBars() {
    cont.innerHTML = "";
    arr = [];
    for (let i = 0; i < 50; i++) {
        arr[i] = Math.random();
    }
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 130 + "px";
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
                // Swap elements
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;

                // Visualize the swap with sound
                await updateBars(); // Wait for visual update
                playNote(600 + arr[i] * 500); // Play sound for arr[i]
                playNote(600 + arr[i - 1] * 500); // Play sound for arr[i - 1]
            }
        }
    } while (swapped);
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
    
    // Copy sorted elements back to the main array and update bars
    for (let k = 0; k < result.length; k++) {
        arr[k] = result[k];
        await updateBars(); // Visualize the merge step
        playNote(400 + arr[k] * 500); // Play sound based on element height
    }
    
    return result;
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);

        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            await updateBars(); // Visualize swap
            playNote(400 + arr[i] * 500); // Play sound for arr[i]
            playNote(400 + arr[j] * 500); // Play sound for arr[j]
        }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    await updateBars(); // Visualize pivot placement
    playNote(400 + arr[i + 1] * 500); // Play sound for pivot

    return i + 1;
}

// updateBars is a helper function to visualize the sorting process and play sound
async function updateBars() {
    cont.innerHTML = ""; // Clear the container to redraw bars
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);

        // Play sound based on the current bar height
        playNote(400 + arr[i] * 500); // Adjust frequency based on bar height
    }
    await new Promise(resolve => setTimeout(resolve, 40)); // Add a small delay for visualization
}
