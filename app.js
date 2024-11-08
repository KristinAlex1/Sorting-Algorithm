let cont = document.querySelector(".container");
let arr = [];
let start = document.querySelector("#create-bars");
let bubble = document.querySelector("#bubble");

start.addEventListener("click",createBars);
bubble.addEventListener("click", () => {
    let val = createBars();
    bubbleSort(val);


})
    




function createBars() {

    cont.innerHTML = "";
    arr = [];
    for(let i = 0;i<30;i++){
        arr[i] = Math.random(); 
    }
    for(let i = 0;i<arr.length;i++){
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }
    return arr;
}

async function bubbleSort(arr){
    let i = 0;
    let swapped; 
    do{
        swapped = false;
        for(i = 0;i < arr.length;i++){
            if(arr[i]<arr[i-1]){
                let temp = arr[i];
                arr[i] = arr[i-1];
                arr[i-1] = temp;
                swapped = true;
                await updateBars();

        }
    }
    }while(swapped)

    ;

}

async function updateBars() {
    cont.innerHTML = "";  // Clear container for new bar rendering
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "px";
        bar.classList.add("bar");
        cont.appendChild(bar);
    }

    // Introduce a short delay to make the changes visible
    await new Promise(resolve => setTimeout(resolve, 40));  // Adjust delay as needed for visibility
}

