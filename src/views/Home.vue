<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App, Dexter"/> -->
    <!-- <button v-on:click="loadCategories">Load</button> -->
    <Categories/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Categories from '@/components/Categories.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Categories
  }
}
</script>
