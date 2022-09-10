<template>
  <div class="cell" :class="{aliveCell: isAlive, deadCell: !isAlive}"></div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    isAlive: {
      type: Number
    }
  }
}
</script>

<style>
.cell {
  width: 15px;
  height: 15px;
  border: 1px solid rgb(158, 158, 158);
}
.aliveCell {
  background-color: #000;
}
.deadCell {
  background-color: #fff;
}
</style>