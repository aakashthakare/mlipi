<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <MlipiMain msg="Welcome to Your Vue.js App" style="text-align: left;" />
</template>

<script>
import MlipiMain from './components/MlipiMain.vue';

export default {
  name: 'App',
  components: {
    MlipiMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
