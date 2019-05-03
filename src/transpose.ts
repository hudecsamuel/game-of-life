const transpose = (matrix: Array<Array<number>>) =>
    matrix[0].map((col, i) => matrix.map(row => row[i]));