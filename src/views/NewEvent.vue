<template>
  <b-container class="new-calendar">
    <Flash/>
    <b-form-group
        description="What is the name for your event?"
        label="Event name"
        label-for="input-name"
        :state="isNameValid">
        <b-input id="input-name" :state="isNameValid" v-model="event.name" placeholder="ex: Free Yoga Class"></b-input>
    </b-form-group>

    <b-form-group
        description=""
        label="Calendar"
        label-for="input-calendar">
        <select v-model="event.calendar"> 
        <option disabled value="">Select a calendar</option>
        <option v-for="calendar in calendars" :key="calendar.id">{{ calendar.display_name }}</option>
      </select>
    </b-form-group>

    <b-form-group
        description="Please describe your event."
        label="Description"
        label-for="input-description"
        :state="isDescriptionValid">
        <b-input id="input-description" v-model="event.description" placeholder="Describe your event"/>
    </b-form-group>

    <b-form-group
        description="Is there a limit to the number of people who can attend the event? If no, leave empty. "
        label="Maximum occupancy"
        label-for="input-occupancy">
        <b-input id="input-occupancy" v-model="event.occupancyLimit" placeholder=""/>
    </b-form-group>

    <b-row >
      <b-button v-on:click="submit(submission)">Create</b-button>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Flash from '@/components/Flash.vue'

import { mapActions } from 'vuex'

export default {
  name: 'NewEvent',
  components: {
    Flash,
  },
  data: function() {
    return {
      hasTriedToSubmit: false,
      event: {
          name: "",
          organizer: {},
          calendar: "",
          price: {
              type: "free"
          },
          time: "",
          accessibility: {
              cc: false,
              asl: false
          },
          description: "",
          keywords: [],
          occupancyLimit: ""
      }
    }
  },
  computed: {
      isNameValid: function() {
          return this.hasTriedToSubmit ? this.event.name.length >= 3 : null;
      },
      isDescriptionValid: function() {
          return this.hasTriedToSubmit ? this.event.description.length >= 50 : null;
      },
      calendars: function() {
        return this.$store.getters.calendars;
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
    ...mapActions([
      'createCalendar'
    ]),
    clearFields() {
      this.selected = "";
      this.name = "";
    },
    submit(submission) {
      this.createCalendar(submission);
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