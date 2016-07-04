import getRandom from './getRandom';

export default (m, n, initial) => {
  var matrix = [];

  for (let rowIndex = 0; rowIndex < m; rowIndex++) {
    let matrixRow = [];

    let initialRow = initial[rowIndex];

    for (let cellIndex = 0; cellIndex < n; cellIndex += 1) {
      let cell = {
        status: 0,
        strength: 0
      };

      if (initialRow && initialRow.includes(cellIndex)) {
        cell = {
          status: 1,
          strength: getRandom(1, 5)
        }
      }

      matrixRow[cellIndex] = cell;
    }
    matrix[rowIndex] = matrixRow;
  }
  return matrix;
};