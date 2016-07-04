import  makeMatrix from './utilities/makeMatrix';
import {
  STATUSES
} from './constants';

const {
  DEAD,
  BORN,
  ALIVE,
  PROSPER,
  CORPSE
} = STATUSES;

const INITIAL_STATE_MOCK = [
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5, 9, 16, 32, 11, 13],
  [1,3,4,5, 11, 15, 13, 29, 31],
  [1,3,4,5],
  [1,3,4,5, 11, 45, 22, 43],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5, 23, 25, 17, 23],
  [1,3,4,5, 12, 43, 22, 21],
  [1,3,4,5,23,44]
];
const INITIAL_STATE_MOCK2 = [
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,4,5],
  [1,46,46,5],
  [1,47,47,5],
  [1,46,46,5],
  [1,40,41,42, 9, 16, 32, 11, 13],
  [1,40,4,5, 11, 15, 13, 29, 31],
  [1,3,4,5],
  [1,3,4,5, 11, 45, 22, 43],
  [1,3,4,5],
  [1,3,4,5],
  [1,3,14,5],
  [1,3,4,15],
  [1,3,4,16,18,19,17],
  [1,3,4,5,11,12,13],
  [1,3,4,5,13,14,15],
  [1,3,4,22,14,16,17],
  [1,3,4,11,23,24,13,15,17,33],
  [1,3,4,5, 23, 25, 17, 23],
  [1,3,4,5, 12, 43, 22, 21],
  [1,3,4,5,23,44]
];

export default class Game {
  constructor({width, height, size, scenario = 1}) {
    this.WIDTH = width/size;
    this.HEIGHT = height/size;
    this.SIZE = size;
    this.SCENARIO = scenario;

    this.minimum = 2;
    this.maximum = 4;
    this.spawn = 3;

    this.counter = 0;


    this._init();
  }


  _init() {
    this.matrix = makeMatrix(this.HEIGHT, this.WIDTH, INITIAL_STATE_MOCK2);
  }

  reset() {
    this._init();
  }

  _conditions = (() => {
    return {
      measureStrength(condition, ceil) {
        if (condition) {
          ceil.strength--;
          return true;
        }

        if (!condition && ceil.strength > 0) {
          ceil.strength--;
          return true;
        }

        if (!condition && ceil.strength <= 0) {
          return false;
        }
      },
      enoughtNeighbours: (neighbours) => {
        return neighbours >= this.minimum && neighbours < this.maximum
      }
    }
  })()

  updateState() {
    let neighbours;
    let spawn = this.spawn;

    const nextGenerationGrid = makeMatrix(this.HEIGHT, this.WIDTH, 0);
    const {
      measureStrength,
      enoughtNeighbours
    } = this._conditions;

    enoughtNeighbours();

    for (var h = 0; h < this.HEIGHT; h++) {
      for (var w = 0; w < this.WIDTH; w++) {
        neighbours = this.getNeighbours(h, w);

        let cell = this.matrix[h][w];
        let nextCell = nextGenerationGrid[h][w];

        if (cell.status !== DEAD) {
          switch (this.SCENARIO) {
            case 1:
            {
              if (measureStrength(enoughtNeighbours(neighbours), cell)) {
                nextCell.status = ALIVE;
                nextCell.strength = cell.strength;
              }

              if (measureStrength(neighbours > this.maximum, cell)) {
                nextCell.status = PROSPER;
                nextCell.strength = cell.strength;
              }

              if (measureStrength((neighbours > this.maximum + 4), cell) ) {
                nextCell.status = CORPSE;
                nextCell.strength = 0;
              }
              break;
            }
            case 2:
            {
              spawn = 2;
              if (measureStrength(enoughtNeighbours(neighbours), cell)) {
                nextCell.status = ALIVE;
                nextCell.strength = cell.strength;
              }

              if (measureStrength(neighbours > this.maximum + 3, cell)) {
                nextCell.status = PROSPER;
                nextCell.strength = cell.strength + 3;
              }

              if (measureStrength((neighbours > this.maximum + 3), cell) ) {
                  if (cell.strength < 2) {
                    nextCell.status = DEAD;
                  } else {
                    nextCell.status = CORPSE;
                    nextCell.strength = 2;
                  }

              }
              break;
            }
            case 3:
            {
              if (measureStrength(enoughtNeighbours(neighbours), cell)) {
                nextCell.status = ALIVE;
                nextCell.strength = cell.strength;
              }

              if (measureStrength(neighbours > this.maximum + 1, cell)) {
                nextCell.status = PROSPER;
                nextCell.strength = cell.strength + 2;
              }

              if (measureStrength((neighbours > this.maximum + 3), cell) ) {
                nextCell.status = CORPSE;
                nextCell.strength = -1;
              }
              break;
            }
            default:
              break;
          }
        } else {
          if (neighbours === spawn) {
            nextCell.status = BORN;
            nextCell.strength = 5;
          }
        }
      }
    }
    this.copyGrid(nextGenerationGrid, this.matrix);
    this.counter++;
    return this.matrix;
  };

  getNeighbours(y, x) {
    let total = (this.matrix[y][x].status !== DEAD) ? -1 : 0;
    for (var h = -1; h <= 1; h++) {
      for (var w = -1; w <= 1; w++) {
        if (this.matrix
                [(this.HEIGHT + (y + h)) % this.HEIGHT]
                [(this.WIDTH + (x + w)) % this.WIDTH].status !== DEAD) {
          total++;
        }
      }
    }
    return total;
  };

  copyGrid(source, destination) {
    for (var h = 0; h < this.HEIGHT; h++) {
      destination[h] = source[h].slice(0);
    }
  };

}