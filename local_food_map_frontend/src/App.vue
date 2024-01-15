<template>
  <div id="app">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/common/Header.vue'
import AppFooter from './components/common/Footer.vue'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}
  
@font-face {
font-family:'BMHANNAPro';
  src: url('assets/fonts/BMHANNAPro.ttf') format('truetype');
  font-weight: 400;
  }


@font-face {
  font-family: 'BMJUA';
  src: url('./assets/fonts/BMJUA_ttf.ttf') format('truetype');
}

</style>
