<template>
  <div class="container" id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .container {
      /* max-width: 540px; */
      box-sizing: border-box;
      height: fit-content;
      border: 1px solid;
      text-align: center;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .error {
        color: red;
      }
</style>
