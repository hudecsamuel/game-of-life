import { Pos } from ".";

export class Cell implements Pos {
    x: number
    y: number

    constructor(position: Pos) {
        this.x = position.x
        this.y = position.y
    }

    getNeightbourSquare(): Square {
        return new Square({
            x: this.x - 1,
            y: this.y - 1
        }, 3)
    }
}

export class Square implements Pos {
    x: number
    y: number
    r: number

    constructor(start: Pos, r: number) {
        this.x = start.x
        this.y = start.y
        this.r = r
    }

    containsPoint(point: Pos) {
        // hopefully this is right
        return (this.x <= point.x && this.x + this.r >= point.x
            && this.y <= point.y && this.y + this.r >= point.y)
    }

    intersects(area: Square) {
        // not sure if this is right
        return !(
            // the x edges
            this.x > area.x + area.r // out of range for x to the right
            || area.x > this.x + this.r // out of range for x to the left
            // the y edges
            || this.y > area.y + area.r // out of range for y to the top
            || area.y > this.y + this.r // out of range for y to the bottom
            )
    }
}

const CAPACITY = 4;
/**
 * Quadtree implementation for 
 */
export default class Quadtree {
    square: Square
    cells: Array<Cell> = []
    isDivided: boolean = false

    topLeft?: Quadtree
    topRight?: Quadtree
    bottomRight?: Quadtree
    bottomLeft?: Quadtree


    constructor(square: Square) {
        this.square = square
    }

    insert(point: Pos): boolean {
        if(!this.square.containsPoint(point)) {
            return false;
        }

        if(this.cells.length < CAPACITY && !this.isDivided) {
            this.cells.push(new Cell(point))
            return true
        }

        if(!this.isDivided) {
            this.subdivide()
        }

        return this.topLeft.insert(point) 
                || this.topRight.insert(point)
                || this.bottomRight.insert(point)
                || this.bottomLeft.insert(point)
    }

    subdivide() {
        const { x, y, r } = this.square
        const halfR = r / 2;
        const topLeftArea = new Square({
            x,
            y,
        }, halfR)
        this.topLeft = new Quadtree(topLeftArea)

        const topRightArea = new Square({
            x: x + halfR,
            y,
        }, halfR)
        this.topRight = new Quadtree(topRightArea)

        const bottomRightArea = new Square({
            x: x + halfR,
            y: y + halfR,
        }, halfR)
        this.bottomRight = new Quadtree(bottomRightArea)

        const bottomLeftArea = new Square({
            x,
            y: y + halfR,
        }, halfR)
        this.bottomLeft = new Quadtree(bottomLeftArea)

        this.isDivided = true
    }

    getAllCells(): Array<Cell> {
        const cells: Array<Cell> = []

        cells.push(...this.cells)

        if(this.isDivided) {
            cells.push(...this.topLeft.getAllCells())
            cells.push(...this.topRight.getAllCells())
            cells.push(...this.bottomRight.getAllCells())
            cells.push(...this.bottomLeft.getAllCells())
        }

        return cells
    }

    querySquare(square: Square): Array<Cell> {
        const cells: Array<Cell> = []

        if(!this.square.intersects(square)) {
            console.warn('NOT INTERSECTING')
            return cells
        }

        this.cells.forEach((cell) => {
            if(square.containsPoint(cell)) {
                cells.push(cell)
            }
        })

        if(this.isDivided) {
            cells.push(...this.topLeft.querySquare(square))
            cells.push(...this.topRight.querySquare(square))
            cells.push(...this.bottomRight.querySquare(square))
            cells.push(...this.bottomLeft.querySquare(square))
        }

        return cells
    }
}
