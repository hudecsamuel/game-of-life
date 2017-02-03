interface Pos {
    x: number
    y: number
}

type CellsRow = Array<Cell>

class Grid {
    public cellsX: number
    public cellsY: number

    public cells: Array<CellsRow>

    constructor(x: number, y: number) {
        this.cellsX = x
        this.cellsY = y

        this.cells = []

        for(let i: number = 0; i < y; i++) {
            this.cells[i] = []
            for(let c: number = 0; c < x; c++) {
                this.cells[i][c] = new Cell(false, {x: c, y: i})
            }
        }
    }

    /**
     * evalNextState
     */
    public evalNextState(position: Pos): boolean {
        let cell: Cell = this.cells[position.y][position.x]

        let aliveCount: number = 0
        let positions: Array<Pos> = this.getSuroundingPositions(position)

        positions.forEach(pos => {
            if(this.checkStatus(pos)) {
                aliveCount++
            }
        })

        if(cell.alive) {
            if(aliveCount === 3 || aliveCount === 2) {
                return true
            } else {
                return false
            }
        } else {
            if(aliveCount === 3) {
                return true
            } else {
                return false
            }
        }
    }

    public iteratePositions(callback: (pos: Pos) => void) {
        for(let i: number = 0; i < this.cellsY; i++) {
            for(let c: number = 0; c < this.cellsX; c++) {
                callback({
                    x: c,
                    y: i
                })
            }
        }
    }

    public iterateCells(callback: (cell: Cell) => void) {
        for(let i: number = 0; i < this.cellsY; i++) {
            for(let c: number = 0; c < this.cellsX; c++) {
                callback(this.cells[i][c])
            }
        }
    }

    getSuroundingPositions(position: Pos): Array<Pos> {
        let positions: Array<Pos> = []

        for(let y:number = -1; y <= 1; y++) {
            for(let x: number = -1; x <= 1; x++) {
                if(!(x === 0 && y === 0)) {
                    let pos: Pos = {
                        x: position.x + x,
                        y: position.y + y,
                    }

                    positions.push(pos)
                }
            }
        }

        return positions
    }

    checkStatus(position: Pos): boolean {
        return typeof this.cells[position.y] !== 'undefined' 
            && typeof this.cells[position.y][position.x] !== "undefined" && this.cells[position.y][position.x].alive
    }

    public setAlive(position: Pos) {
        if(position.x < this.cellsX && position.y < this.cellsY) {
            this.cells[position.y][position.x].setAlive()
        }
    }

    public setDead(position: Pos) {
        if(position.x < this.cellsX && position.y < this.cellsY) {
            this.cells[position.y][position.x].setDead()
        }
    }

    public static getStarting(x: number, y: number, liveCells: Array<Pos> = []): Grid {
        let grid: Grid = new Grid(x, y)

        liveCells.forEach((position: Pos) => {
            grid.setAlive(position)
        })

        return grid
    }
}

class Cell {
    alive: boolean
    position: Pos

    constructor(isAlive: boolean = false, position: Pos) {
        this.alive = isAlive
        this.position = position
    }

    public setAlive() {
        this.alive = true
    }

    public setDead() {
        this.alive = false
    }
}

interface GameConfig {
    defaultGrid: Grid
    cellWidth?: number
}

class Game {
    private grid: Grid
    private canvas: HTMLCanvasElement
    private interval: any
    private cellWidth: number

    constructor(config: GameConfig) {
        this.canvas = <HTMLCanvasElement>document.querySelector("#canvas")
        this.grid = config.defaultGrid
        this.cellWidth = config.cellWidth || 3


        this.canvas.width = this.cellWidth * this.grid.cellsX
        this.canvas.height = this.cellWidth * this.grid.cellsY
    }

    public start(stepTime: number = 500) {
        this.render()
        this.interval = setInterval(this.step.bind(this), stepTime)
    }

    public stop() {
        clearInterval(this.interval)
    }

    private step() {
        //this is where the magic happens
        let nextGrid: Grid = Grid.getStarting(this.grid.cellsX, this.grid.cellsY)

        this.grid.iteratePositions((pos: Pos) => {
            let shouldBeAlive:boolean = this.grid.evalNextState(pos)
            if(shouldBeAlive){
                nextGrid.setAlive(pos)
            } else {
                nextGrid.setDead(pos)
            }
        })

        this.grid = nextGrid

        this.render()
    }

    render() {
        var context = this.canvas.getContext('2d')
        this.grid.iterateCells((cell: Cell) => {
            let pos: Pos = cell.position
            context.beginPath();
            context.rect(pos.x*this.cellWidth, pos.y*this.cellWidth, this.cellWidth, this.cellWidth);
            context.fillStyle = cell.alive ? 'black' : '#EEE';
            context.fill();
        })
    }


}

let alive: Array<Pos> = [
    {
        x: 11,
        y: 10
    },
    {
        x: 12,
        y: 11
    },
    {
        x: 10,
        y: 12
    },
    {
        x: 11,
        y: 12
    }, 
    {
        x: 12,
        y: 12
    }
]

var config: GameConfig = {
    defaultGrid: Grid.getStarting(300, 300, alive),
    cellWidth: 5
}


var game = new Game(config)
game.start(50)










