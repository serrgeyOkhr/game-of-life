<template>
  <div class="container">
    <div class="heading">
      <span class="headingTitle">Game of Life</span>
    </div>
    <div class="game">
      <div class="controlPanel">
        <button
          class="btn"
          @click="resetGame"
        >
          Reset
        </button>
        <button
          class="btn"
          @click="stopGame"
        >
          Stop
        </button>
        <button
          class="btn startBtn"
          @click="startGame"
        >
          Start
        </button>
        <button
          class="btn"
          @click="loopStep"
        >
          next Step
        </button>
        <button
          class="btn"
          @click="cleanBoardGame"
        >
          Clean board
        </button>
      </div>
      <div class="boardContainer">
        <div
          class="column"
          v-for="(column, index) in newLife.width"
          :key="index"
        >
          <div
            v-for="(row, index) in newLife.height"
            :key="index"
            class="boardCell"
          >
            <CellVue
              @click="getCellID(column - 1, row - 1)"
              :isAlive="newLife.getCellValue(column - 1, row - 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from '@vue/reactivity';
  import Life from '../life';
  import CellVue from './Cell.vue';
  export default {
    name: 'board-grid',
    components: {
      CellVue,
    },
    setup() {
      const field = ref([[]]);
      const play = ref(false);
      const newLife = new Life(60, 40);
      let qq = [[]];

      function startGame() {
        play.value = true;
        qq = newLife.showGrid;
        loop();
      }

      function stopGame() {
        play.value = false;
      }

      function loopStep() {
        newLife.play();
      }
      function resetGame() {
        if (qq.length > 1) {
          newLife.setGrid(qq);
        }
      }
      function cleanBoardGame() {
        newLife.reset;
      }
      function loop() {
        if (!play.value) return;
        loopStep();
        setTimeout(loop, 200);
      }
      function getCellID(x, y) {
        // console.log(`x: ${x}, y: ${y}`);
        newLife.getCellValue(x, y)
          ? newLife.setDeadCell(x, y)
          : newLife.setAliveCell(x, y);
      }
      return {
        newLife,
        startGame,
        stopGame,
        resetGame,
        getCellID,
        loopStep,
        cleanBoardGame,
      };
    },
  };
</script>

<style>
  .container {
    padding: 5px;
    border-radius: 24px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* margin: 15px; */
  }
  .boardContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding: 5px;
  }
  .controlPanel {
    display: flex;
    padding: 5px 0;
    justify-content: center;
  }
  .headingTitle {
    font-size: 24px;
    font-weight: bold;
    display: block;
    padding: 15px 0;
    /* margin-bottom: 20px; */
  }
  .game {
    display: flex;
    flex-direction: column;
    background-color: rgb(179, 201, 219);
    margin: 5px;
    padding: 15px;
    border-bottom-left-radius: 19px;
    border-bottom-right-radius: 19px;
  }
  .btn {
    font-size: 16px;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #fff;
    border: 1px solid rgb(60, 60, 60);
    border-radius: 5px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: rgb(240, 240, 240);
    border: 1px solid rgb(48, 48, 48);
  }

</style>
