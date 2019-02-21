<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <List></List>
    
    <Form></Form>
    
    
  </div>
</template>

<script>
import List from './components/List.vue';
import Form from './components/Form';

//import Relatives from './components/Relatives';


export default {
  name: 'app',
  components: {
    List,
    Form
   

  }
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
</style>
