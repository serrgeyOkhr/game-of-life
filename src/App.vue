<template>
  <BoardGridVue />
</template>

<script>
  import BoardGridVue from './components/BoardGrid.vue';

  export default {
    name: 'App',
    components: {
      BoardGridVue,
    },
  };
</script>

<style>
  #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #2c3e50;
    box-sizing: border-box;
    /* margin-top: 60px; */
    height: 100vh;
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  body {
    padding: 0;
    margin: 0;
  }
</style>

