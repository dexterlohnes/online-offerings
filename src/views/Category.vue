<template>
  <div class="category">
    <h3>This will be the page for {{ $route.params.id }}</h3>
    <h1> {{ category ? category.display_name : null }}</h1>
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
      }
  }
}
</script>
