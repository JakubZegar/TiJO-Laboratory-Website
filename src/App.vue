<template>
  <div id="app">
    <div class="page" v-if="showSpinner">
        <b-spinner v-for="index in 3" class="spinner" 
          style="width: 3rem; height: 3rem;"  
          variant="primary" 
          type="grow" 
          label="Large Spinner" 
          v-bind:key="index"></b-spinner>
    </div>

    <div id="nav">
      <Navbar></Navbar>
    </div>
    <router-view />
    <Footer v-if="!showSpinner"></Footer>
  </div>
</template>

<script>
  import Navbar from './components/NavBar'
  import Footer from './components/Footer'
  import { mapGetters } from 'vuex'

  export default {
      name:'app',

      components:{
        Navbar,
        Footer,
      },
    computed:{
      ...mapGetters(["showSpinner"])
    }
  }
  
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-repeat: no-repeat;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 720px;
}
.page{
  position: absolute;
  z-index: 25;
  width:100%;
  height: 100%;
}
.spinner{
  position: relative;
  top:50%;
}
</style>
