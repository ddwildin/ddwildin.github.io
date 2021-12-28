const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._location = {r: 0, c: 0};
    }
    print() {
        this._field[this._location.r][this._location.c] = pathCharacter;
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(''));
        }
    }
    copyPosition(pos1, pos2) {
        pos1.r = pos2.r;
        pos1.c = pos2.c;
    }
    ask(direction) {
        grid.print();
        direction = prompt('Which direction?');
        let newPosition = {};
        let originalPosition = {};
        this.copyPosition(newPosition, this._location);
        this.copyPosition(originalPosition, this._location);
        while (newPosition.r === originalPosition.r && newPosition.c == originalPosition.c) {
            switch (direction) {
                case 'u':
                    newPosition.r = this._location.r-1;
                    newPosition.c = this._location.c;
                    break;
                case 'd':
                    newPosition.r = this._location.r+1;
                    newPosition.c = this._location.c;
                    break;
                case 'l':
                    newPosition.r = this._location.r;
                    newPosition.c = this._location.c-1;
                    break;
                case 'r':
                    newPosition.r = this._location.r;
                    newPosition.c = this._location.c+1;
                    break;
            }
            if (newPosition.r < 0 || newPosition.r > this._field.length -1 || newPosition.c < 0 || newPosition.c > this._field[0].length-1) {
                this.copyPosition(newPosition, this._location);
                grid.print();
                direction = prompt("Can't go that way.  Which direction?");
            }
            else {
                 this.copyPosition(this._location, newPosition);
            }
        }
    }
    checkWinOrLose() {
        if (this._field[this._location.r][this._location.c] === hat) {
            return 'win';
        }
        else if (this._field[this._location.r][this._location.c] === hole) {
            return 'lose';
        }
        else {
            return 'continue';
        }
    }
    static generateField(height, width, percentageHoles) {
        let result = [];
        const numHoles = Math.floor(height*width*percentageHoles/100);
        const fieldRow = [];
        for (let i = 0; i < width; i++) { // create field character rows
            fieldRow[i] = fieldCharacter;
        }
        for (let i = 0; i < height; i++) { // fill the result with field character rows
            result[i] = fieldRow.slice();
        }
        // next we add random holes
        for (let i = 0; i < numHoles; i++) { // iterate number of holes
            let foundHole = false; 
            while (!foundHole) {
                const row = Math.floor(Math.random() * height); // randomize row
                const column = Math.floor(Math.random() * width); // randomize column
                if (result[row][column] != hole) { // if there's not a hole there
                    result[row][column] = hole; // place a hole
                    foundHole = true; // exit the loop
                }
            }
            
        }
        // finally we add the hat
        let foundEmptySpace = false; 
        while (!foundEmptySpace) {
            const row = Math.floor(Math.random() * height); // randomize row
            const column = Math.floor(Math.random() * width); // randomize column
            if (result[row][column] == fieldCharacter) { // if there's an empty space there
                result[row][column] = hat; // place the hat
                foundEmptySpace = true; // exit the loop
            }
        }
        result[0][0] = pathCharacter;
        return result;
    }
}

grid = new Field(Field.generateField(10, 10, 25));
let gameStatus = 'continue';
while (gameStatus === 'continue') {
    grid.ask();
    gameStatus = grid.checkWinOrLose();
}
if (gameStatus == 'win') {
    console.log('You found the hat!!!  You win!!! :D');
}
else {
    console.log('Oh no!!! You fell down a hole!!! :(');
}