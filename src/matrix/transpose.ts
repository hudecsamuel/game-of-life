import { I2DIntMatrix } from "../types";

export const transpose = <T extends number>(matrix: I2DIntMatrix<T>) =>
    matrix[0].map((col, i) => matrix.map(row => row[i]));
