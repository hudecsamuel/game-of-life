import { I2DIntMatrix } from "../types";

export const horizontalReflection = <T extends number>(matrix: I2DIntMatrix<T>) => {
    return matrix.reduceRight<I2DIntMatrix<T>>((acc, row) => {
        acc.push(row);
        return acc;
    }, [])
}

