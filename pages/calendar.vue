<template>
  <div class="calendar-page">
    <h1>📅 Shared Calendar</h1>

    <form @submit.prevent="addEvent" class="event-form">
      <div class="form-group">
        <label for="title">Event Title</label>
        <input id="title" v-model="title" type="text" required />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input id="date" v-model="date" type="date" required />
      </div>
      <button type="submit" class="btn-add" :disabled="!canSubmit">Add Event</button>
    </form>

    <div v-if="events.length" class="events-list">
      <h2>Upcoming Events</h2>
      <div class="event-item" v-for="e in events" :key="e.id">
        <p class="event-title">{{ e.title }}</p>
        <p class="event-date">{{ formatDate(e.date) }}</p>
        <button class="btn-delete" @click="deleteEvent(e.id)">❌</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CalendarPage',
  head() {
    return { title: 'Shared Calendar - Zira' }
  },
  data() {
    return {
      title: '',
      date: ''
    }
  },
  computed: {
    ...mapGetters({ events: 'events/events' }),
    canSubmit() { return this.title && this.date }
  },
  mounted() {
    this.$store.dispatch('events/fetchEvents')
  },
  methods: {
    formatDate(d) { return new Date(d).toLocaleDateString() },
    async addEvent() {
      await this.$store.dispatch('events/addEvent', { title: this.title, date: this.date })
      this.title = ''
      this.date = ''
    },
    async deleteEvent(id) {
      if (confirm('Delete this event?')) {
        await this.$store.dispatch('events/deleteEvent', id)
      }
    }
  }
}
</script>

<style scoped>

.calendar-page { max-width: 700px; margin: 0 auto; padding: 2rem; }
h1 { text-align: center; margin-bottom: 1.5rem; }
.event-form { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.form-group { display: flex; flex-direction: column; flex: 1; min-width: 200px; }
.btn-add { padding: 0.7rem 1.5rem; border: none; background:#e91e63; color:#fff; border-radius:20px; cursor:pointer; }
.events-list h2 { margin-bottom: 1rem; }
.event-item { display:flex; align-items:center; justify-content:space-between; background:#fff; padding:0.8rem 1rem; border-radius:8px; margin-bottom:0.6rem; box-shadow:0 1px 6px rgba(0,0,0,0.05); }
.event-title { margin:0;font-weight:600; }
.event-date { margin:0; color:#666; }
.btn-delete { background:none; border:none; cursor:pointer; font-size:1.2rem; }
</style>