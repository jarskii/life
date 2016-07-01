
import {
  ALIVE,
  DEAD
} from './contatns';

const makeMatrix = (m, n, initial) => {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];
    for (j = 0; j < n; j += 1) {
      a[j] = 0;
    }
    mat[i] = a;
  }
  return mat;
};

const INITIAL_STATE_MOCK = [

];




export default class Game {
  constructor({width, height, size}) {
    this.WIDTH = width/size;
    this.HEIGHT = height/size;
    this.SIZE = size;

    this.STOPPED = 0;
    this.RUNNING = 1;

    this.minimum = 2;
    this.maximum = 3;
    this.spawn = 3;

    this.state = this.STOPPED;
    this.interval = null;

    this.counter = 0;


    this._init();
  }


  _init() {
    this.matrix = makeMatrix(this.HEIGHT, this.WIDTH, 0);
  }

  updateState() {
    var neighbours;

    var nextGenerationGrid = Array.matrix(this.HEIGHT, this.WIDTH, 0);

    for (var h = 0; h < this.HEIGHT; h++) {
      for (var w = 0; w < this.WIDTH; w++) {
        neighbours = this.calculateNeighbours(h, w);
        if (this.grid[h][w] !== DEAD) {
          if ((neighbours >= this.minimum) &&
              (neighbours <= this.maximum)) {
            nextGenerationGrid[h][w] = ALIVE;
          }
        } else {
          if (neighbours === this.spawn) {
            nextGenerationGrid[h][w] = ALIVE;
          }
        }
      }
    }
    this.copyGrid(nextGenerationGrid, this.grid);
    this.counter++;
  };

  calculateNeighbours(y, x) {
    var total = (this.grid[y][x] !== DEAD) ? -1 : 0;
    for (var h = -1; h <= 1; h++) {
      for (var w = -1; w <= 1; w++) {
        if (this.grid
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
      /*
       for (var w = 0; w < this.WIDTH; w++) {
       destination[h][w] = source[h][w];
       }
       */
      destination[h] = source[h].slice(0);
    }
  };

}