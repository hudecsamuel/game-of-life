import { I2DIntMatrix } from "../types";

export const verticalReflection = <T extends number>(matrix: I2DIntMatrix<T>) => matrix.map((row) => {
    return row.reduceRight<Array<T>>((acc, item) => {
        acc.push(item);
        return acc;
    }, [])
})
