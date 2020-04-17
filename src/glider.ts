import { Pos } from ".";
import { rotation } from "./matrix/rotation";
import { I2DBinaryMatrix } from "./types";

export enum directions {
    DL = 'downLeft',
    DR = 'downRight',
    UL = 'upLeft',
    UR = 'upRight',
}

export default class Glider {
    static deadGlider: I2DBinaryMatrix = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]

    static directions = directions

    static downRight: I2DBinaryMatrix = [
        [0,1,0],
        [0,0,1],
        [1,1,1],
    ]

    static downLeft: I2DBinaryMatrix = rotation(Glider.downRight, 90)
    static upLeft: I2DBinaryMatrix = rotation(Glider.downLeft, 90)
    static upRight: I2DBinaryMatrix = rotation(Glider.upLeft, 90)

    static rotate(cells: I2DBinaryMatrix): I2DBinaryMatrix {
        let newCells: I2DBinaryMatrix = this.deadGlider
        cells.forEach((row, index) => {
            row.forEach((cell, cellIndex) => {
                newCells[cellIndex][2 - index] = cell
            })
        })
        console.log(newCells)

        return newCells
    }
    public static getGlider(offset: Pos, direction: directions): Array<Pos> {
        const glider = new Glider(offset, direction)
        return glider.getPositions()
    }

    cells: I2DBinaryMatrix
    offset: Pos

    constructor(offset: Pos, direction: directions) {
        this.cells = Glider[direction]
        this.offset = offset
    }

    getPositions(): Array<Pos> {
       return this.cells.reduce<Array<Pos>>((acc, cellRow, rowIndex) => {
            cellRow.forEach((cell, cellIndex) => {
                if(cell) {
                    acc.push({
                        x: cellIndex + this.offset.x,
                        y: rowIndex + this.offset.y
                    })
                }
            })
            return acc
        }, [])
    }
}
