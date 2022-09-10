<template>
  <div class="controlPanel">
    <h4>Game of Life</h4>
    <button @click="startGame">Start</button>
    <button @click="stopGame">Stop</button>
    <button @click="resetGame">Reset</button>
    <button @click="cleanBoardGame">Clean board</button>
    <button @click="loopStep">next Step</button>
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
        <!-- {{ column }} , {{ row }} -->
        <CellVue @click="getCellID(column - 1, row - 1)"
          :isAlive="(newLife.getCellValue(column - 1, row - 1))"
        />
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
        play.value = true
        qq = newLife.showGrid
        loop()
      }

      function stopGame() {
        play.value = false
      }

      function loopStep() {
        newLife.play()
      }
      function resetGame() {
        if (qq.length > 1) {
          newLife.setGrid(qq)
        }
      }
      function cleanBoardGame() {
        newLife.reset
      }
      function loop() {
        if (!play.value) return;
        loopStep();
        setTimeout(loop, 200);
      }
      function getCellID(x, y) {
        console.log(`x: ${x}, y: ${y}`);
        newLife.getCellValue(x, y) ? newLife.setDeadCell(x,y) : newLife.setAliveCell(x,y)
      }
      return {
        newLife,
        startGame,
        stopGame,
        resetGame,
        getCellID,
        loopStep,
        cleanBoardGame
      };
    },
  };
</script>

<style>
  .boardContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* .boardCell {
    padding: 5px;
    border: 1px solid;
  } */
</style>
