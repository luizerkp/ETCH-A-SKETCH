// adds footer content to the page
const footer = document.querySelector('.footer');
const footerPara = document.createElement('p');
let date = new Date().getFullYear();
footerPara.textContent = `Copyright © ${date} Luis Tamarez All Rights Reserved`;
footer.appendChild(footerPara);



window.onload = function () {
    buildGrid();  
};

const defaultColor = "#000000" 
let color = document.querySelector("#color-picker");
color.addEventListener('change', (e) => {
    color = e.target.value;
    setColor(color);
    });

const defaultGridSize = 32;
let gridSize = document.querySelector('#brush-size');
// console.log(gridSize);
gridSize.addEventListener('change', (e) => {
    gridSize = e.target.value;
    buildGrid(gridSize);
    });

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// function to build the grid
function buildGrid(gridSize=defaultGridSize) {

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr);`;
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    for (let i = 0; i < Math.pow(gridSize, 2); i++) {
        gridContainer.appendChild(gridItem.cloneNode(true));
    }

    setColor(color); 
}

// resets colors on grid without removing/resizing grid
function resetGridColor() {    
    const gridItemsAll = document.querySelectorAll('.grid-item');
    gridItemsAll.forEach(gridItem => {
        gridItem.style.cssText = `background-color: ${defaultColor}`;
    });
}

// grid but keep size
const clear = document.querySelector('#clear');
clear.addEventListener('click', resetGridColor);


// // function to change grid size
// function clearGrid() {

//     const gridContainer = document.querySelector('.grid-container');
//     const gridItemsAll = document.querySelectorAll('.grid-item');

//     gridItemsAll.forEach(gridItem => {
//         gridContainer.removeChild(gridItem);
//     });
  
//     let newGridSize = 0;
//     let atempts = 0;

//     do {
//         if (atempts > 0) {
//             newGridSize = prompt('Please enter a valid whole number between 1 and 100');
//         }
//         newGridSize = prompt('Enter a new grid size? (Max:100)');
//         atempts++;
//     }
//     while (!validateNumber(newGridSize));

//     return buildGrid(newGridSize);
// }

// valdates user input for grid size
// function validateNumber(number) {
//     // check if number is a whole number by converting to str 
//     if (number.toString().trim().match(/^(100|[1-9][0-9])?$/) !== null) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// set random color on grid square on mouse enter event with shift key pressed down

// set random color on grid square on mouse enter event with shift key pressed down
function setColor(color=defaultColor) {

    const gridItemsAll = document.querySelectorAll('.grid-item');

    gridItemsAll.forEach(gridItem => {
        gridItem.addEventListener('mouseover', function () {
            if(mouseDown===true) {
                if(!gridItem.getAttribute('id')) {
                    gridItem.setAttribute('id', 'grid-item-hover');
                    gridItem.style.cssText = `background-color: ${color.value}`;
                }
            } 
        });
    });
}
// function setColor(color=defaultColor) {

//     const gridItemsAll = document.querySelectorAll('.grid-item');
//     console.log(gridItemsAll);

//     gridItemsAll.forEach(gridItem => {
//         gridItem.addEventListener('mouseover', function () {
//             if(mouseDown) {
//                 gridItem.style.cssText = `background-color: ${color}`;
//             } 
//         });
//     });
// }

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
