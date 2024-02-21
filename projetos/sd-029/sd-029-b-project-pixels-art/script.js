function generateColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b})`;
}

const pixelsBoard = document.getElementById('pixel-board');
const paletteContainer = document.getElementById('color-palette');
const buttonClear = document.getElementById('clear-board');
const buttonVQV = document.getElementById('generate-board');
const input = document.getElementById('board-size');
const pixels = pixelsBoard.children;

function saveBoard() {
  const board = [];
  for (let i = 0; i < pixels.length; i += 1) {
    board.push(pixels[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(board));
}

function paintPixel(event) {
  const pixel = event.target;
  pixel.style.backgroundColor = document.getElementsByClassName('selected')[0]
    .style.backgroundColor;
  saveBoard();
}

function generatePixels(n) {
  pixelsBoard.style.width = `${n * 40}px`;
  pixelsBoard.innerHTML = '';
  for (let i = 0; i < n * n; i += 1) {
    const generatePixel = document.createElement('div');
    generatePixel.className = 'pixel';
    generatePixel.style.backgroundColor = 'white';
    generatePixel.addEventListener('click', paintPixel);
    pixelsBoard.appendChild(generatePixel);
  }
}

function changeColors() {
  const colors = paletteContainer.children;
  colors[0].style.backgroundColor = 'black';
  const newColors = ['black'];
  for (let i = 1; i < colors.length; i += 1) {
    const newColor = generateColor();
    colors[i].style.backgroundColor = newColor;
    newColors.push(newColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(newColors));
}

function selectedColor(event) {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  event.target.classList.add('selected');
}

function handleClickPalette() {
  const colors = paletteContainer.children;
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].addEventListener('click', selectedColor);
  }
}

function loadPallete() {
  let colorPalette = localStorage.getItem('colorPalette');
  if (colorPalette === null) {
    changeColors();
  } else {
    colorPalette = JSON.parse(colorPalette);
    const colors = paletteContainer.children;
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = colorPalette[i];
    }
  }
  handleClickPalette();
}

function clearBoard() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
  saveBoard();
}
buttonClear.addEventListener('click', clearBoard);

function loadBoard() {
  let savedBoard = localStorage.getItem('pixelBoard');
  if (savedBoard) {
    savedBoard = JSON.parse(savedBoard);
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = savedBoard[i];
    }
  }
}

buttonVQV.addEventListener('click', () => {
  if (!input.value) {
    return alert('Board inválido!');
  }
  if (input.value < 5) {
    input.value = 5;
  } else if (input.value > 50) {
    input.value = 50;
  }
  localStorage.setItem('boardSize', input.value);
  clearBoard();
  localStorage.removeItem('pixelBoard');
  generatePixels(input.value);
});

function getBoardSize() {
  const size = localStorage.getItem('boardSize');
  if (size) {
    return size;
  }
  return 5;
}

window.onload = (() => {
  loadPallete();
  generatePixels(getBoardSize());
  loadBoard();
  document.getElementById('button-random-color').addEventListener('click', changeColors);
});
