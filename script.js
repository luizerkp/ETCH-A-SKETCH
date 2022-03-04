// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);



// grid of 64 x 64 squares default
const gridDefaultSize = 64;


window.onload = function () {
    buildGrid();
    
};

// function to build the grid
function buildGrid(gridSize = gridDefaultSize) {

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr);`;
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    for (let i = 0; i < Math.pow(gridSize, 2); i++) {
        gridContainer.appendChild(gridItem.cloneNode(true));
    }
    
    setRandomColor();
}

// resets colors on grid without removing/resizing grid
function resetGridColor() {    
    const rgbRed = 255;
    const rgbGreen =255;
    const rgbBlue = 255;
    const gridItemsAll = document.querySelectorAll('.grid-item');
    gridItemsAll.forEach(gridItem => {
        gridItem.style.cssText = `background-color: rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
    });
}

// change grid size
const clear = document.querySelector('#reset');
clear.addEventListener('click', clearGrid);

// grid but keep size
const reset = document.querySelector('#clear');
reset.addEventListener('click', resetGridColor);


// function to change grid size
function clearGrid() {

    const gridContainer = document.querySelector('.grid-container');
    const gridItemsAll = document.querySelectorAll('.grid-item');

    gridItemsAll.forEach(gridItem => {
        gridContainer.removeChild(gridItem);
    });
  
    let newGridSize = 0;
    let atempts = 0;

    do {
        if (atempts > 0) {
            newGridSize = prompt('Please enter a valid whole number between 1 and 100');
        }
        newGridSize = prompt('Enter a new grid size? (Max:100)');
        atempts++;
    }
    while (!validateNumber(newGridSize));

    return buildGrid(newGridSize);
}

// valdates user input for grid size
function validateNumber(number) {
    // check if number is a whole number by converting to str 
    if (number.toString().trim().match(/^(100|[1-9][0-9])?$/) !== null) {
        return true;
    }
    else {
        return false;
    }
}

// set random color on grid square on mouse enter event with shift key pressed down
function setRandomColor() {

    const gridItemsAll = document.querySelectorAll('.grid-item');
    let rgbRed = 255;
    let rgbGreen =255;
    let rgbBlue = 255;

    gridItemsAll.forEach(gridItem => {
        gridItem.addEventListener('mouseenter', function (e) {
            if(e.shiftKey) {
                if(!gridItem.getAttribute('id')) {
                    gridItem.setAttribute('id', 'grid-item-hover');
                    rgbRed = Math.floor(Math.random() * 256);
                    rgbGreen = Math.floor(Math.random() * 256);
                    rgbBlue = Math.floor(Math.random() * 256);
                    gridItem.style.cssText = `background-color: rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
                } else {
                    makeDarker(gridItem);
                }
            } 
        });
    });
}

// makes grid square darker by 10%
function makeDarker(gridItem) {

    // get current RGB values
    const rgbRed = gridItem.style.backgroundColor.substring(4, gridItem.style.backgroundColor.indexOf(','));
    const rgbGreen = gridItem.style.backgroundColor.substring(gridItem.style.backgroundColor.indexOf(',') + 1, gridItem.style.backgroundColor.lastIndexOf(','));
    const rgbBlue = gridItem.style.backgroundColor.substring(gridItem.style.backgroundColor.lastIndexOf(',') + 1, gridItem.style.backgroundColor.length - 1);

    let newRgbRed = Math.floor(rgbRed * 0.9);
    let newRgbGreen = Math.floor(rgbGreen * 0.9);
    let newRgbBlue = Math.floor(rgbBlue * 0.9);

    gridItem.style.cssText = `background-color: rgb(${newRgbRed}, ${newRgbGreen}, ${newRgbBlue})`;
}
