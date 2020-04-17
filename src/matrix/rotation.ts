import { I2DIntMatrix } from "../types";
import { transpose } from "./transpose";
import { horizontalReflection } from "./horizontalReflection";
import { verticalReflection } from "./verticalReflection";

export enum MATRIX_ROTATION_VALUES {
    ROTATE_90 = 90,
    ROTATE_180 = 180,
    ROTATE_270 = 270,
}

export const rotation = <T extends number>(matrix: I2DIntMatrix<T>, rotateBy: MATRIX_ROTATION_VALUES) => {
    switch(rotateBy) {
        case MATRIX_ROTATION_VALUES.ROTATE_90:
            return verticalReflection(transpose(matrix));
        case MATRIX_ROTATION_VALUES.ROTATE_180:
            return verticalReflection(horizontalReflection(matrix));
        case MATRIX_ROTATION_VALUES.ROTATE_270:
            return horizontalReflection(transpose(matrix));
        default:
            return matrix;
    }
}
