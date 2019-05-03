import { Pos } from ".";

export type Binary = 0 | 1
export type GliderCells = [
    [Binary, Binary, Binary],
    [Binary, Binary, Binary],
    [Binary, Binary, Binary]
]

export enum directions {
    DL = 'downLeft',
    DR = 'downRight',
    UL = 'upLeft',
    UR = 'upRight',
}

export default class Glider {
    static deadGlider: GliderCells = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]

    static directions = directions

    static downRight: GliderCells = [
        [0,1,0],
        [0,0,1],
        [1,1,1],
    ]

    static celldr: GliderCells = [
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0]
    ]
    static downLeft: GliderCells = Glider.rotate(Glider.downRight)
    static upLeft: GliderCells = Glider.rotate(Glider.downLeft)
    static upRight: GliderCells = Glider.rotate(Glider.upLeft)

    static rotate(cells: GliderCells): GliderCells {
        let newCells: GliderCells = this.deadGlider
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

    cells: GliderCells
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
