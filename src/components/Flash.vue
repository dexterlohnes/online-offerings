<template>
  <b-alert :variant="flash ? flash.type : 'info'" fade dismissible :show="flash != null">
      {{ flash ? flash.message : ""}}
    </b-alert>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  computed: {
      flash: function() {
        console.log("Checking flash");
        var fl = this.$store.getters.flash;
        return fl;
      }
  },
  methods: {
  }
}
</script>