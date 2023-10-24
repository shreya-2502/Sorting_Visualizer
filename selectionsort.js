const n = 10;
const array = [];
let animationSpeed = 200; // Adjust this value to control the animation speed

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  showBars();
}

function play() {
  selectionSort();
}

async function selectionSort() {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      await swapBars(i, minIndex);
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  updateSortedBars(array.length - 1); // Update the color of the last sorted bar
}

function showBars() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

function updateSortedBars(index) {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i <= index; i++) {
    bars[i].classList.add("sorted");
  }
}

async function swapBars(index1, index2) {
  const bars = document.getElementsByClassName("bar");
  const bar1 = bars[index1];
  const bar2 = bars[index2];

  bar1.classList.add("swapping");
  bar2.classList.add("swapping");

  await sleep(animationSpeed);

  const tempHeight = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tempHeight;

  await sleep(animationSpeed);

  bar1.classList.remove("swapping");
  bar2.classList.remove("swapping");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

