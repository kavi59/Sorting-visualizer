function swap(el1, el2) {
    console.log('In swap()');

    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;

}

function disableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

function enableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

function disableSizeSlider() {
    document.querySelector("#arrSize").disabled = true;
}

function enableSizeSlider() {
    document.querySelector("#arrSize").disabled = false;
}

function disableNewArrayBtn() {
    document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn() {
    document.querySelector(".newArray").disabled = false;
}

function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

let arraySize = document.querySelector('#arrSize');

arraySize.addEventListener('input', function () {
    console.log(arraySize.value, typeof (arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

let delay = 260;

let delayElement = document.querySelector('#speedInput');

delayElement.addEventListener('input', function () {
    console.log(delayElement.value, typeof (delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});

let array = [];

createNewArray();

function createNewArray(noOfBars = 60) {
    deleteChild();
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }
    console.log(array);

    const bars = document.querySelector("#bars");

    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i] * 2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function () {
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});


// Bubble Sort
async function bubble() {
    console.log('In bubble()');
    const ele = document.querySelectorAll(".bar");
    for (let i = 0; i < ele.length - 1; i++) {
        console.log('In ith loop');
        for (let j = 0; j < ele.length - i - 1; j++) {
            console.log('In jth loop');
            ele[j].style.background = '#ff9999';
            ele[j + 1].style.background = '#ff9999';
            if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
                console.log('In if condition');
                await waitforme(delay);
                swap(ele[j], ele[j + 1]);
            }
            ele[j].style.background = '#0080ff';
            ele[j + 1].style.background = '#0080ff';
        }
        ele[ele.length - 1 - i].style.background = '#ff0000';
    }
    ele[0].style.background = '#ff0000';
}

const bubSortbtn = document.querySelector(".bubbleSort");
bubSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bubble();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


// Insertion sort
async function insertion() {
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    // color
    ele[0].style.background = '#ff0000';
    for (let i = 1; i < ele.length; i++) {
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = '#ff9999';

        await waitforme(delay);

        while (j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))) {
            console.log('In while loop');
            // color
            ele[j].style.background = '#ff9999';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);

            // color
            for (let k = i; k >= 0; k--) {
                ele[k].style.background = '#ff0000';
            }
        }
        ele[j + 1].style.height = key;
        // color
        ele[i].style.background = '#ff0000';
    }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


// Merge sort
async function merge(ele, low, mid, high) {
    console.log('In merge()');
    console.log(`low=${low}, mid=${mid}, high=${high}`);
    const n1 = mid - low + 1;
    const n2 = high - mid;
    console.log(`n1=${n1}, n2=${n2}`);
    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        await waitforme(delay);
        console.log('In merge left loop');
        console.log(ele[low + i].style.height + ' at ' + (low + i));
        // color
        ele[low + i].style.background = '#00ff00';
        left[i] = ele[low + i].style.height;
    }
    for (let i = 0; i < n2; i++) {
        await waitforme(delay);
        console.log('In merge right loop');
        console.log(ele[mid + 1 + i].style.height + ' at ' + (mid + 1 + i));
        // color
        ele[mid + 1 + i].style.background = '#b366ff';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await waitforme(delay);
    let i = 0, j = 0, k = low;
    while (i < n1 && j < n2) {
        await waitforme(delay);
        console.log('In merge while loop');
        console.log(parseInt(left[i]), parseInt(right[j]));

        // To add color for which two r being compared for merging

        if (parseInt(left[i]) <= parseInt(right[j])) {
            console.log('In merge while loop if');
            // color
            if ((n1 + n2) === ele.length) {
                ele[k].style.background = '#ff0000';
            }
            else {
                ele[k].style.background = '#000066';
            }

            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else {
            console.log('In merge while loop else');
            // color
            if ((n1 + n2) === ele.length) {
                ele[k].style.background = '#ff0000';
            }
            else {
                ele[k].style.background = '#000066';
            }
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while (i < n1) {
        await waitforme(delay);
        console.log("In while if n1 is left");
        // color
        if ((n1 + n2) === ele.length) {
            ele[k].style.background = '#ff0000';
        }
        else {
            ele[k].style.background = '#000066';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while (j < n2) {
        await waitforme(delay);
        console.log("In while if n2 is left");
        // color
        if ((n1 + n2) === ele.length) {
            ele[k].style.background = '#ff0000';
        }
        else {
            ele[k].style.background = '#000066';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r) {
    console.log('In mergeSort()');
    if (l >= r) {
        console.log(`return cause just 1 elemment l=${l}, r=${r}`);
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    console.log(`left=${l} mid=${m} right=${r}`, typeof (m));
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function () {
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await mergeSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


// Quick sort
async function partitionLomuto(ele, l, r) {
    console.log('In partitionLomuto()');
    let i = l - 1;
    // color pivot element
    ele[r].style.background = '#ffff00';
    for (let j = l; j <= r - 1; j++) {
        console.log('In partitionLomuto for j');
        // color current element
        ele[j].style.background = '#b366ff';

        await waitforme(delay);

        if (parseInt(ele[j].style.height) < parseInt(ele[r].style.height)) {
            console.log('In partitionLomuto for j if');
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = '#00ff00';
            if (i != j) ele[j].style.background = '#00ff00';

            await waitforme(delay);
        }
        else {
            // color if not less than pivot
            ele[j].style.background = '#cc0066';
        }
    }
    i++;

    await waitforme(delay);
    swap(ele[i], ele[r]); // pivot height one
    console.log(`i = ${i}`, typeof (i));
    // color
    ele[r].style.background = '#cc0066';
    ele[i].style.background = '#ff0000';

    await waitforme(delay);

    // color
    for (let k = 0; k < ele.length; k++) {
        if (ele[k].style.background != '#ff0000')
            ele[k].style.background = '#0080ff';
    }

    return i;
}

async function quickSort(ele, l, r) {
    console.log('In quickSort()', `l=${l} r=${r}`, typeof (l), typeof (r));
    if (l < r) {
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else {
        if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
            ele[r].style.background = '#ff0000';
            ele[l].style.background = '#ff0000';
        }
    }
}


const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function () {
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


// Selection sort
async function selection() {
    console.log('In selection()');
    const ele = document.querySelectorAll(".bar");
    for (let i = 0; i < ele.length; i++) {
        console.log('In ith loop');
        let min_index = i;
        // Change color of the position to swap with the next min
        ele[i].style.background = '#ff9999';
        for (let j = i + 1; j < ele.length; j++) {
            console.log('In jth loop');
            // Change color for the current comparision (in consideration for min_index)
            ele[j].style.background = '#ffff00';

            await waitforme(delay);
            if (parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)) {
                console.log('In if condition height comparision');
                if (min_index !== i) {
                    // new min_index is found so change prev min_index color back to normal
                    ele[min_index].style.background = '#0080ff';
                }
                min_index = j;
            }
            else {
                // if the currnent comparision is more than min_index change is back to normal
                ele[j].style.background = '#0080ff';
            }
        }
        await waitforme(delay);
        swap(ele[min_index], ele[i]);
        // change the min element index back to normal as it is swapped 
        ele[min_index].style.background = '#0080ff';
        // change the sorted elements color to #ff0000
        ele[i].style.background = '#ff0000';
    }
}

const selectionSortbtn = document.querySelector(".selectionSort");
selectionSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await selection();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});