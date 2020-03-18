<template>
  <div class="category">
    <h3>This will be the page for {{ $route.params.id }}</h3>
    <h1> {{ category ? category.display_name : null }}</h1>
    <ul>
      <li v-for="calendar in calendars" :key="calendar.id">
        <p>{{ calendar.display_name }}</p>
        </li>
    </ul>
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Categories',
  computed: {
      category: function() {
        return this.$store.getters.category(this.$route.params.id);
      },
      calendars: function() {
        var cals = this.$store.getters.calendarsForCategory(this.$route.params.id);
        console.log("Found cals:", cals)
        return cals;
      }
  }
}
</script>
