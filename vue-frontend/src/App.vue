<template>
  <div id="container">
    <Intro/>
  </div>
</template>

<script>
import Intro from './components/Intro.vue'

export default {
  components: {
    Intro
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: center;
  align-items:center;
  display:flex;
  height: 100%;
}
#container{
  height: 100%;
  max-width:1200px;
}
p {
  font-size: 20px
}
</style>
