import { ref } from "vue";

export default class Life {
  #width = 0;
  #height = 0;
  #grid = ref();
  #play = false
  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#grid.value = this.#cleanGrid();
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
  get clean() {
    return this.#grid.value = this.#cleanGrid();
  }

  #cleanGrid() {
    let grid = this.#createGrid()
    for (let i = 0; i < this.#width; i++) {
      for (let j = 0; j < this.#height; j++) {
        grid[i][j] = false
      }
    }
    return grid;
  }

  play() {
    this.#grid.value = this.#nextGeneration()
  }

  #nextGeneration() {
    let grid = this.#createGrid();
    for (let i = 0; i < this.#width; i++) {
      for (let j = 0; j < this.#height; j++) {
        let neighbor = this.#getAliveNeighbor(i, j);
        if (neighbor === 0) continue;
        if (this.#grid.value[i][j] === true && (neighbor === 2 || neighbor === 3)) {
          grid[i][j] = true
        }
        else if (this.#grid.value[i][j] === false && neighbor === 3) {
          grid[i][j] = true
        }
        else {
          grid[i][j] = false
        }
      }
    }
    return grid;
  }
  #createGrid() {
    let grid = new Array(this.#width)
    for (let index = 0; index < grid.length; index++) {
      grid[index] = new Array(this.#height);
    }
    return grid
  }
  #getAliveNeighbor(x, y) {
    let neighborCount = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue
        if (typeof (this.#grid.value[x + i]) === "undefined") continue
        if (typeof (this.#grid.value[y + j]) === "undefined") continue
        if (this.#grid.value[x + i][y + j]) neighborCount += 1
      }
    }
    return neighborCount
  }

  setGrid(grid) {
    this.#grid.value = grid
  }

  toggleCellState(x, y) {
    this.#grid.value[x][y] = !this.#grid.value[x][y]
  }
  getCellValue(x, y) {
    return this.#grid.value[x][y]
  }

}