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
  quickSort(0, array.length - 1);
}

async function quickSort(low, high) {
  if (low < high) {
    const pivotIndex = await partition(low, high);
    await quickSort(low, pivotIndex - 1);
    await quickSort(pivotIndex + 1, high);
  }
  updateSortedBars(high); // Update the color of last sorted bar
}

async function partition(low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      await swapBars(i, j);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  await swapBars(i + 1, high);
  let temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  return i + 1;
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
