// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);

// dafault state onload
window.onload = function () {
    buildGrid();
    setBrushColor();
    alert('Welcome to ETCH-A-SKETCH!\n Please Note that changing the canvas size will clear the current drawing\nEnjoy!');
};

// default values for grid size, canvas and brush color
const defaultBrushColor = "#000000"
const defaultCanvasColor = "#ffffff"
const defaultGridSize = 32;

// prevent dragging of grid items that will interfere with the user experience
document.querySelector('body').ondragstart = function () { return false; };

// event listeners for grid size input, canvas color input and brush color input
let brushColor = document.querySelector("#brush-color-picker");
brushColor.addEventListener('change', (e) => {
    brushColor = e.target.value;
    setBrushColor(brushColor);
});

let canvasColor = document.querySelector("#canvas-color-picker");
canvasColor.addEventListener('change', (e) => {
    canvasColor = e.target.value;
    resetGridColor(canvasColor);
});

let gridSize = document.querySelector('#brush-size');
gridSize.addEventListener('change', (e) => {
    gridSize = e.target.value;
    clearGrid(gridSize);
});

// Clear grid but keep canvas color
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    resetGridColor(canvasColor);
});

// call erase function on click and toggle eraser active class
let eraserOn = false;
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
    eraser.classList.toggle('active');
    eraserOn = erase(eraserOn);
});

// function to build the grid
function buildGrid(gridSize = defaultGridSize) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr);`;
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.setAttribute('draggable', 'false');

    let gridArea = gridSize * gridSize;

    for (let i = 0; i < gridArea; i++) {
        gridContainer.appendChild(gridItem.cloneNode(true));
    }

    setBrushColor(brushColor);
}
// // function to change grid size
function clearGrid(newGridSize) {
    const gridContainer = document.querySelector('.grid-container');
    const gridItemsAll = document.querySelectorAll('.grid-item');

    gridItemsAll.forEach(gridItem => {
        gridContainer.removeChild(gridItem);
    });

    buildGrid(newGridSize);
    resetGridColor(canvasColor);
    setBrushColor(brushColor.value);
}

// resets colors on grid without removing/resizing grid
function resetGridColor(canvasColor = defaultCanvasColor) {
    const gridItemsAll = document.querySelectorAll('.grid-item');
    gridItemsAll.forEach(gridItem => {
        gridItem.style.cssText = `background-color: ${canvasColor}`;
    });
}

// function to set brush color when drawing
function setBrushColor(brushColor = defaultBrushColor) {
    const gridItemsAll = document.querySelectorAll('.grid-item');

    gridItemsAll.forEach(gridItem => {
        gridItem.addEventListener('mousemove', function (e) {
            if (e.buttons > 0) {
                gridItem.style.cssText = `background-color: ${brushColor}`;
            }
        });
    });
}

// function to erase grid squares
function erase(eraseColor) {

    if (!eraseColor) {
        eraseColor = true;
        setBrushColor(canvasColor);
    } else {
        eraseColor = false;
        setBrushColor(brushColor.value);
    }
    return eraseColor;
}
