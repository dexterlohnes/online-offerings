<template>
  <div class="categories container">
    <h1> Browse by Category </h1>
    <ul id="categories-list">
        <li v-for="c in categories" :key="c.name">
            <router-link :to="{ name: 'Category', params: { id: c.id }}">{{ c.display_name }}</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Categories',
  computed: {
      categories: function() {
        return this.$store.getters.categories;
      }
  }
}
</script>
