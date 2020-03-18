<template>
  <div class="new-calendar container">
    <Flash/>
    <div class="row">
      <input v-model="name" placeholder="Name">
    </div>
    <div class="row">
      <select v-model="selected"> 
        <option disabled value="">Select a category</option>
        <option v-for="category in categories" :key="category.id">{{ category.display_name }}</option>
      </select>
    </div>
    <div class="row">
      <b-button v-on:click="doSubmit(submission)">Submit</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Flash from '@/components/Flash.vue'

import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Flash,
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
      },
      category: function() {
        return this.$store.getters.categoryByName(this.selected);
      },
      submission: function() {
        return {
          id: this.name.replace(" ", "_").toLowerCase(),
          name: this.name,
          category: this.category
        }
      }
  },
  methods: {
    ...mapActions({
      submit: 'createCalendar'
    }),
    clearFields() {
      this.selected = "";
      this.name = "";
    },
    doSubmit(submission) {
      this.submit(submission);
      this.clearFields();
    }
  }
}
</script>


<style scoped>
  .row {
    margin-top: 20px;
  }
</style>