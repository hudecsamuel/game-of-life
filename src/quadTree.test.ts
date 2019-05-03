import QuadTree, { Square } from './quadTree'
import { Pos } from '.'

describe('QuadTree', () => {
    it("constructor", () => {
        const area = new Square({ x: 0, y: 0 }, 50)
        const quadTree = new QuadTree(area)

        expect(quadTree.getAllCells()).toEqual([])

        const newPos: Pos = { x: 15, y: 10}
        quadTree.insert(newPos)

        expect(quadTree.getAllCells()).toEqual([newPos])
    })

    it("constructor", () => {
        const area = new Square({ x: 0, y: 0 }, 50)
        const quadTree = new QuadTree(area)

        expect(quadTree.getAllCells()).toEqual([])

        const positions = [
            { x: 15, y: 10},
            { x: 1, y: 1},
            { x: 5, y: 10},
            { x: 35, y: 30}
        ]

        positions.forEach(position => quadTree.insert(position))

        //whoile square
        const searchSpace = new Square({ x: 0, y: 0 }, 50)

        expect(quadTree.querySquare(searchSpace)).toEqual(positions)

        const newPos: Pos = { x: 100, y: 100}
        quadTree.insert(newPos)

        expect(quadTree.querySquare(searchSpace)).toEqual(positions)

        expect(quadTree.getAllCells()).toEqual(false)

        expect(quadTree.querySquare(new Square({ x: 90, y: 90 }, 20))).toEqual([newPos])
    })
})