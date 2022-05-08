const tileDisplay = document.querySelector('#tile-container');
const keyboard = document.querySelector('#key-container');

// Used to generate key buttons within keyboard
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL'
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;

// generate game tiles - 6 rows with 5 tiles per row as designated in guessRows
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    rowElement.setAttribute('class', 'row-container')
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.setAttribute('class', 'tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement);
});

// Used with click event listener for each key in keyboard
const handleClick = (key) => {
    console.log("clicked", key);
    if (key === "DEL") {
        deleteLetter();
        return;
    }
    if (key === "ENTER") {
        console.log("check row");
        return;
    }
    addLetter(key);
}

keys.forEach(key => {
    // create a button element containing appropriate letter for each key of the keyboard and append each element to the keyboard
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key)); // add an event listener for key functionality
    keyboard.append(buttonElement);
});

// Used to add input letter to appropriate tile in game
const addLetter = (key) => {
    // if current tile is within game bounds
    if (currentTile < 5 && currentRow < 6) {
        // find tile element for current input
        // For example: first guess of 3rd row would be guessRow-2-tile-0
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = key; // change text content of tile to match key that is passed from handleClick() function
        guessRows[currentRow][currentTile] = key; // change value of appropriate array in guessRows to match key input
        tile.setAttribute('data', key); // set data attribute to key value - this will be used to color divs appropriately later
        currentTile++; // increment currentTile so that next input is entered in subsequent tile
    }
}

const deleteLetter = () => {
    if (currentTile > 0) { // only if input has been made (e.g. currentTile is at index 1 or above)
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');

    }
}