<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/calendars/new">New Calendar</router-link> |
      <router-link to="/events/new">New Event</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  created() {
      console.log("Loading categories on start up")
      this.$store.dispatch('fetchCategories');
      this.$store.dispatch('fetchCalendars');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
