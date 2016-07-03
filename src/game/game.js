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

export default class Game {
  constructor({width, height, size}) {
    this.WIDTH = width/size;
    this.HEIGHT = height/size;
    this.SIZE = size;

    this.minimum = 2;
    this.maximum = 4;
    this.spawn = 3;

    this.counter = 0;


    this._init();
  }


  _init() {
    this.matrix = makeMatrix(this.HEIGHT, this.WIDTH, INITIAL_STATE_MOCK);
  }

  updateState() {
    var neighbours;

    var nextGenerationGrid = makeMatrix(this.HEIGHT, this.WIDTH, 0);

    for (var h = 0; h < this.HEIGHT; h++) {
      for (var w = 0; w < this.WIDTH; w++) {
        neighbours = this.getNeighbours(h, w);

        let cell = this.matrix[h][w];

        if (cell !== DEAD) {
          if (neighbours >= this.minimum && neighbours < this.maximum) {
            nextGenerationGrid[h][w] = ALIVE;
          }

          if (neighbours > this.maximum && neighbours < this.maximum + 2) {
            nextGenerationGrid[h][w] = PROSPER;
          }

          if ((neighbours > this.maximum + 2) ) {
            nextGenerationGrid[h][w] = CORPSE;
          }

        } else {
          if (neighbours === this.spawn) {
            nextGenerationGrid[h][w] = BORN;
          }
        }
      }
    }
    this.copyGrid(nextGenerationGrid, this.matrix);
    this.counter++;
    return this.matrix;
  };

  getNeighbours(y, x) {
    var total = (this.matrix[y][x] !== DEAD) ? -1 : 0;
    for (var h = -1; h <= 1; h++) {
      for (var w = -1; w <= 1; w++) {
        if (this.matrix
                [(this.HEIGHT + (y + h)) % this.HEIGHT]
                [(this.WIDTH + (x + w)) % this.WIDTH] !== DEAD) {
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