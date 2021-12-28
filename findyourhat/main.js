const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._location = { r: 0, c: 0 };
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
    checkDirection(direction) {
        if (direction != 'u' && direction != 'd' && direction != 'l' && direction != 'r') {
            return false;
        }
        else {
            switch (direction) {
                case 'u':
                    if (this._location.r - 1 < 0) {
                        return false;
                    }
                    break;
                case 'd':
                    if (this._location.r + 1 > this._field.length - 1) {
                        return false;
                    }
                    break;
                case 'l':
                    if (this._location.c - 1 < 0) {
                        return false;
                    }
                    break;
                case 'r':
                    if (this._location.c + 1 > this._field[0].length - 1) {
                        return false;
                    }
                    break;

            }
        }
        return true;
    }
    moveInDirection(direction) {
        switch (direction) {
            case 'u':
                this.copyPosition(this._location, { r: this._location.r - 11, c: this._location.c });
                break;
            case 'd':
                this.copyPosition(this._location, { r: this._location.r + 1, c: this._location.c });
                break;
            case 'l':
                this.copyPosition(this._location, { r: this._location.r, c: this._location.c - 1 });
                break;
            case 'r':
                this.copyPosition(this._location, { r: this._location.r, c: this._location.c + 1 });
                break;
        }
    }
    askDirection() {
        grid.print();
        let direction = prompt('Which direction?');
        while (!this.checkDirection(direction)) {
            grid.print();
            direction = prompt("Can't go that way.  Which direction?");
        }
        this.moveInDirection(direction);
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
        const numHoles = Math.floor(height * width * percentageHoles / 100);
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

grid = new Field(Field.generateField(5, 5, 25));
let gameStatus = 'continue';
while (gameStatus === 'continue') {
    grid.askDirection();
    gameStatus = grid.checkWinOrLose();
}
if (gameStatus == 'win') {
    console.log('You found the hat!!!  You win!!! :D');
}
else {
    console.log('Oh no!!! You fell down a hole!!! :(');
}