<template>
  <div class="new-calendar">
    <!-- <button v-on:click="loadCategories">Load</button> -->
    <input v-model="name" placeholder="Name">
    <select v-model="selected">
      <option disabled value="">Select a category</option>
      <option v-for="category in categories" :key="category.id">{{ category.display_name }}</option>
    </select>
    <br>
    <p>Message is: {{ name }}</p>
    <span>Selected: {{ selected }}</span>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data: function() {
    return {
      selected: "",
      name: ""
    }
  },
  computed: {
      categories: function() {
        return this.$store.getters.categories;
      }
  }
}
</script>
