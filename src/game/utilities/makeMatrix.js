export default (m, n, initial) => {
  var a, i, j, mat = [];
  for (i = 0; i < m; i += 1) {
    a = [];

    let initialRow = initial[i];

    for (j = 0; j < n; j += 1) {
      a[j] = (initialRow && initialRow.includes(j)) ? 1 : 0;
    }
    mat[i] = a;
  }
  return mat;
};