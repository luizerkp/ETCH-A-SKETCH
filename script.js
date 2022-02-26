const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);



// grid of 16 X 16 squares default
const gridDefaultSize = 16 * 16;
let rgbRed = 255;
let rgbGreen =255;
let rgbBlue = 255;

window.onload = function () {
    buildGrid();
};

function buildGrid(gridSize = gridDefaultSize) {

    const gridContainer = document.querySelector('.grid-container');
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    for (let i = 0; i < gridSize; i++) {
        gridContainer.appendChild(gridItem.cloneNode(true));
    }
    resetGridColor();
}
function resetGridColor() {    
    rgbRed = 255;
    rgbGreen =255;
    rgbBlue = 255;
    const gridItemsAll = document.querySelectorAll('.grid-item');
    gridItemsAll.forEach(gridItem => {
        gridItem.style.backgoundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
    });
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearGrid);


function clearGrid() {

    const gridContainer = document.querySelector('.grid-container');
    const gridItemsAll = document.querySelectorAll('.grid-item');
    console.log(gridItemsAll);

    gridItemsAll.forEach(gridItem => {
        gridContainer.removeChild(gridItem);
    });
  
    let newGridSize = 0;
    let atempts = 0;

    do {
        if (atempts > 0) {
            newGridSize = prompt('Please enter a valid number between 1 and 100');
        }
        newGridSize = prompt('Enter a new grid size? (Max:100)');
        atempts++;
    }
    while (newGridSize < 1 || newGridSize > 100);

    gridContainer.style.cssText = `grid-template-columns: repeat(${newGridSize}, 1fr); grid-template-rows: repeat(${newGridSize}, 1fr);`;

    return buildGrid(newGridSize * newGridSize);
}

// function setRandomColor(gridItem) {
//     gridItem.setAttribute('id', 'grid-item-hover');
//     rgbRed = Math.floor(Math.random() * 256);
//     rgbGreen = Math.floor(Math.random() * 256);
//     rgbBlue = Math.floor(Math.random() * 256);
//     gridItem.style.backgoundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
// }

// function makeDarkerTenPercent(gridItem) {
//    rgbRed = Math.floor(rgbRed * 0.9);
//    rgbGreen = Math.floor(rgbGreen * 0.9);
//    rgbBlue = Math.floor(rgbBlue * 0.9);
//    gridItem.style.backgoundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
// }
// const gridItemsAll = document.getElementsByClassName('.grid-item');

// console.log(gridItemsAll);


// gridItemsAll.forEach(gridItem => {
//     gridItem.addEventListener('mouseover', function () {
//         console.log(this)
//         if (this.getAtrribute('id') === null) {
//             setRandomColor(e.target);
//         }
//         else {
//             makeDarkerTenPercent(e.target);
//         }
//     });
// });
