import { ref } from "vue";

export default class Life {
  #width = 0;
  #height = 0;
  #grid = ref();
  #play = false
  constructor(width, height) {
    this.#width = width,
      this.#height = height
    this.#grid.value = this.#resetGrid()
  }

  get showGrid() {
    return this.#grid.value;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  get isPlay() {
    return this.#play;
  }
  get reset() {
    return this.#grid.value = this.#resetGrid();
  }

  setAliveCell(x, y) {
    this.#grid.value[x][y] = 1
  }
  setDeadCell(x, y) {
    this.#grid.value[x][y] = 0
  }

  #createGrid() {
    let grid = new Array(this.#width)
    for (let index = 0; index < grid.length; index++) {
      grid[index] = new Array(this.#height);
    }
    return grid
  }
  #resetGrid() {
    let grid = this.#createGrid()
    for (let i = 0; i < this.#width; i++) {
      for (let j = 0; j < this.#height; j++) {
        grid[i][j] = 0
      }
    }
    return grid;
  }

  getCellValue(x, y) {
    return this.#grid.value[x][y]
  }

  play() {
    this.#grid.value = this.#nextGeneration()
  }

  setGrid(grid) {
    this.#grid.value = grid
  }

  #nextGeneration() {
    let grid = this.#createGrid();
    for (let i = 0; i < this.#width; i++) {
      for (let j = 0; j < this.#height; j++) {
        if (this.#grid.value[i][j] === 1 && (this.#getAllNeighbor(i, j) === 2 || this.#getAllNeighbor(i, j) === 3)) {
          grid[i][j] = 1
        }
        else if (this.#grid.value[i][j] === 0 && this.#getAllNeighbor(i, j) === 3) {
          grid[i][j] = 1
        }
        else {
          grid[i][j] = 0
        }
      }
    }
    return grid;
  }

  #getAllNeighbor(x, y) {
    let neighborCount = 0;
    ((x - 1 > 0) && (y - 1 > 0) && this.#grid.value[x - 1][y - 1]) ? neighborCount += 1 : null;
    ((x - 1 > 0) && this.#grid.value[x - 1][y]) ? neighborCount += 1 : null;
    ((x - 1 > 0) && (y + 1 < this.#width) && this.#grid.value[x - 1][y + 1]) ? neighborCount += 1 : null;
    ((y - 1 > 0) && this.#grid.value[x][y - 1]) ? neighborCount += 1 : null;
    ((y + 1 < this.#width) && this.#grid.value[x][y + 1]) ? neighborCount += 1 : null;
    ((x + 1 < this.#height) && (y - 1 > 0) && this.#grid.value[x + 1][y - 1]) ? neighborCount += 1 : null;
    ((x + 1 < this.#height) && this.#grid.value[x + 1][y]) ? neighborCount += 1 : null;
    ((x + 1 < this.#height) && (y + 1 < this.#width) && this.#grid.value[x + 1][y + 1]) ? neighborCount += 1 : null;
    return neighborCount
  }
}