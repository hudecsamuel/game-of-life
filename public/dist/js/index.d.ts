interface Pos {
    x: number;
    y: number;
}
declare type CellsRow = Array<Cell>;
declare class Grid {
    cellsX: number;
    cellsY: number;
    cells: Array<CellsRow>;
    constructor(x: number, y: number);
    /**
     * evalNextState
     */
    evalNextState(position: Pos): boolean;
    iteratePositions(callback: (pos: Pos) => void): void;
    iterateCells(callback: (cell: Cell) => void): void;
    getSuroundingPositions(position: Pos): Array<Pos>;
    checkStatus(position: Pos): boolean;
    setAlive(position: Pos): void;
    setDead(position: Pos): void;
    static getStarting(x: number, y: number, liveCells?: Array<Pos>): Grid;
}
declare class Cell {
    alive: boolean;
    position: Pos;
    constructor(isAlive: boolean, position: Pos);
    setAlive(): void;
    setDead(): void;
}
interface GameConfig {
    defaultGrid: Grid;
    cellWidth?: number;
}
declare class Game {
    private grid;
    private canvas;
    private interval;
    private cellWidth;
    constructor(config: GameConfig);
    start(stepTime?: number): void;
    stop(): void;
    private step();
    render(): void;
}
declare let alive: Array<Pos>;
declare var config: GameConfig;
declare var game: Game;
