const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }
    static generateField(height, width) {
        const symbols = [hat, hole, fieldCharacter, pathCharacter];
        let hasHat = false;
        
    }
}