<template>
  <div>
    <h1>Reminder</h1>
    <ReminderForm v-if="editing" :reminder="editing" @save="saveReminder" @cancel="editing=null" />
    <ReminderForm v-else @save="addReminder" />
    <ReminderList :reminders="reminders" @edit="editReminder" @delete="deleteReminder" />
    <BottomBar />
  </div>
</template>
<script>
import ReminderForm from '~/components/More/ReminderForm.vue'
import ReminderList from '~/components/More/ReminderList.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { ReminderForm, ReminderList, BottomBar },
  data() { return { editing: null } },
  computed: {
    reminders() { return this.$store.state.reminder.reminders }
  },
  async mounted() {
    await this.$store.dispatch('reminder/fetchReminders')
    this.scheduleNotifications()
  },
  methods: {
    async addReminder(reminder) {
      await this.$store.dispatch('reminder/addReminder', reminder)
      this.scheduleNotifications()
    },
    async saveReminder(reminder) {
      await this.$store.dispatch('reminder/updateReminder', reminder)
      this.editing = null
      this.scheduleNotifications()
    },
    editReminder(reminder) { this.editing = reminder },
    async deleteReminder(id) {
      await this.$store.dispatch('reminder/deleteReminder', id)
      this.scheduleNotifications()
    },
    scheduleNotifications() {
      // Dummy: Cek reminder yang akan datang, jika < 30 menit, tampilkan notifikasi
      if (!('Notification' in window)) return
      this.reminders.forEach(rem => {
        const start = new Date(rem.datetime).getTime()
        const now = Date.now()
        const diff = start - now
        if (diff > 0 && diff < 30*60*1000) {
          this.$notify('Reminder akan segera dimulai', { body: rem.title })
        }
      })
    }
  }
}
</script> 