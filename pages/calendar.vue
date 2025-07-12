<template>
  <div>
    <h1>Calendar</h1>
    <EventForm v-if="editing" :event="editing" @save="saveEvent" @cancel="editing=null" />
    <EventForm v-else @save="addEvent" />
    <EventList :events="events" @edit="editEvent" @delete="deleteEvent" />
    <BottomBar />
  </div>
</template>
<script>
import EventForm from '~/components/Calendar/EventForm.vue'
import EventList from '~/components/Calendar/EventList.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { EventForm, EventList, BottomBar },
  data() { return { editing: null } },
  computed: {
    events() { return this.$store.state.calendar.events }
  },
  async mounted() {
    await this.$store.dispatch('calendar/fetchEvents')
    this.scheduleNotifications()
  },
  methods: {
    async addEvent(event) {
      await this.$store.dispatch('calendar/addEvent', event)
      this.scheduleNotifications()
    },
    async saveEvent(event) {
      await this.$store.dispatch('calendar/updateEvent', event)
      this.editing = null
      this.scheduleNotifications()
    },
    editEvent(event) { this.editing = event },
    async deleteEvent(id) {
      await this.$store.dispatch('calendar/deleteEvent', id)
      this.scheduleNotifications()
    },
    scheduleNotifications() {
      // Dummy: Cek event yang akan datang, jika < 30 menit, tampilkan notifikasi
      if (!('Notification' in window)) return
      this.events.forEach(ev => {
        const start = new Date(ev.start).getTime()
        const now = Date.now()
        const diff = start - now
        if (diff > 0 && diff < 30*60*1000) {
          this.$notify('Event akan segera dimulai', { body: ev.title })
        }
      })
    }
  }
}
</script>
