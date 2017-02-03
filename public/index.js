/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Grid = (function () {
	    function Grid(x, y) {
	        this.cellsX = x;
	        this.cellsY = y;
	        this.cells = [];
	        for (var i = 0; i < y; i++) {
	            this.cells[i] = [];
	            for (var c = 0; c < x; c++) {
	                this.cells[i][c] = new Cell(false, { x: c, y: i });
	            }
	        }
	    }
	    /**
	     * evalNextState
	     */
	    Grid.prototype.evalNextState = function (position) {
	        var _this = this;
	        var cell = this.cells[position.y][position.x];
	        var aliveCount = 0;
	        var positions = this.getSuroundingPositions(position);
	        positions.forEach(function (pos) {
	            if (_this.checkStatus(pos)) {
	                aliveCount++;
	            }
	        });
	        if (cell.alive) {
	            if (aliveCount === 3 || aliveCount === 2) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        }
	        else {
	            if (aliveCount === 3) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        }
	    };
	    Grid.prototype.iteratePositions = function (callback) {
	        for (var i = 0; i < this.cellsY; i++) {
	            for (var c = 0; c < this.cellsX; c++) {
	                callback({
	                    x: c,
	                    y: i
	                });
	            }
	        }
	    };
	    Grid.prototype.iterateCells = function (callback) {
	        for (var i = 0; i < this.cellsY; i++) {
	            for (var c = 0; c < this.cellsX; c++) {
	                callback(this.cells[i][c]);
	            }
	        }
	    };
	    Grid.prototype.getSuroundingPositions = function (position) {
	        var positions = [];
	        for (var y = -1; y <= 1; y++) {
	            for (var x = -1; x <= 1; x++) {
	                if (!(x === 0 && y === 0)) {
	                    var pos = {
	                        x: position.x + x,
	                        y: position.y + y,
	                    };
	                    positions.push(pos);
	                }
	            }
	        }
	        return positions;
	    };
	    Grid.prototype.checkStatus = function (position) {
	        return typeof this.cells[position.y] !== 'undefined'
	            && typeof this.cells[position.y][position.x] !== "undefined" && this.cells[position.y][position.x].alive;
	    };
	    Grid.prototype.setAlive = function (position) {
	        if (position.x < this.cellsX && position.y < this.cellsY) {
	            this.cells[position.y][position.x].setAlive();
	        }
	    };
	    Grid.prototype.setDead = function (position) {
	        if (position.x < this.cellsX && position.y < this.cellsY) {
	            this.cells[position.y][position.x].setDead();
	        }
	    };
	    Grid.getStarting = function (x, y, liveCells) {
	        if (liveCells === void 0) { liveCells = []; }
	        var grid = new Grid(x, y);
	        liveCells.forEach(function (position) {
	            grid.setAlive(position);
	        });
	        return grid;
	    };
	    return Grid;
	}());
	var Cell = (function () {
	    function Cell(isAlive, position) {
	        if (isAlive === void 0) { isAlive = false; }
	        this.alive = isAlive;
	        this.position = position;
	    }
	    Cell.prototype.setAlive = function () {
	        this.alive = true;
	    };
	    Cell.prototype.setDead = function () {
	        this.alive = false;
	    };
	    return Cell;
	}());
	var Game = (function () {
	    function Game(config) {
	        this.canvas = document.querySelector("#canvas");
	        this.grid = config.defaultGrid;
	        this.cellWidth = config.cellWidth || 3;
	        this.canvas.width = this.cellWidth * this.grid.cellsX;
	        this.canvas.height = this.cellWidth * this.grid.cellsY;
	    }
	    Game.prototype.start = function (stepTime) {
	        if (stepTime === void 0) { stepTime = 500; }
	        this.render();
	        this.interval = setInterval(this.step.bind(this), stepTime);
	    };
	    Game.prototype.stop = function () {
	        clearInterval(this.interval);
	    };
	    Game.prototype.step = function () {
	        var _this = this;
	        //this is where the magic happens
	        var nextGrid = Grid.getStarting(this.grid.cellsX, this.grid.cellsY);
	        this.grid.iteratePositions(function (pos) {
	            var shouldBeAlive = _this.grid.evalNextState(pos);
	            if (shouldBeAlive) {
	                nextGrid.setAlive(pos);
	            }
	            else {
	                nextGrid.setDead(pos);
	            }
	        });
	        this.grid = nextGrid;
	        this.render();
	    };
	    Game.prototype.render = function () {
	        var _this = this;
	        var context = this.canvas.getContext('2d');
	        this.grid.iterateCells(function (cell) {
	            var pos = cell.position;
	            context.beginPath();
	            context.rect(pos.x * _this.cellWidth, pos.y * _this.cellWidth, _this.cellWidth, _this.cellWidth);
	            context.fillStyle = cell.alive ? 'black' : '#EEE';
	            context.fill();
	        });
	    };
	    return Game;
	}());
	var alive = [
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
	];
	var config = {
	    defaultGrid: Grid.getStarting(300, 200, alive),
	    cellWidth: 4
	};
	var game = new Game(config);
	game.start(50);
	

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map