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
  mergeSort(0, array.length - 1);
}

async function mergeSort(start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  const tempArray = [];
  let i = start;
  let j = mid + 1;
  let k = 0;

  while (i <= mid && j <= end) {
    if (array[i] <= array[j]) {
      tempArray[k++] = array[i++];
    } else {
      tempArray[k++] = array[j++];
    }
  }

  while (i <= mid) {
    tempArray[k++] = array[i++];
  }

  while (j <= end) {
    tempArray[k++] = array[j++];
  }

  for (i = start, k = 0; i <= end; i++, k++) {
    array[i] = tempArray[k];
    await sleep(animationSpeed);
    showBars();
    updateSortedBars(i); // Update the color of sorted bars during merging
  }
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
