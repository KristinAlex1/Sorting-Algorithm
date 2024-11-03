
let cont = document.querySelector(".container");
let arr = [];

for (let i = 0;i<15;i++){
    arr[i] = Math.random();

}

for (let i = 0;i < arr.length;i++){
    let bar = document.createElement("div");
    bar.style.backgroundColor = "red";
    bar.style.height = arr[i]*100 + "px";
    bar.classList.add("bar");
    cont.appendChild(bar);
}