// initiate grid
class Game {
    constructor() {
        this._grid = [];
        for (let i = 0; i < 10; i++) {
            let column = [];
            for (let j = 0; j < 10; j++) {
                column.push({
                    cell: ''
                });
            }
            this._grid.push(column);
        }
    }
    get grid() {
        return this._grid;
    }
    placeShip(coordStart, length, direction) {
        if (direction === 'horizontal') { // left to right
            for (let i = coordStart.x; i < coordStart.x + length; i++) {
                this._grid[coordStart.y][i] = 'S';
            }
        } else if (direction === 'vertical') { // top to bottom
            for (let i = coordStart.y; i < coordStart.y + length; i++) {
                this._grid[i][coordStart.x] = 'S';
            }
        } else {
            alert('Wrong direction input!');
        }

    }
}

user = new Game();
user.placeShip({ x: 0, y: 0 }, 3, 'horizontal');
console.log(user.grid);
