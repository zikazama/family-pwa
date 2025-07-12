<template>
  <div>
    <div v-for="reminder in reminders" :key="reminder.id" class="reminder-item">
      <b>{{ reminder.title }}</b><br/>
      <span>{{ formatTime(reminder.datetime) }}</span><br/>
      <small>{{ reminder.desc }}</small>
      <button @click="$emit('edit', reminder)">Edit</button>
      <button @click="$emit('delete', reminder.id)">Hapus</button>
    </div>
  </div>
</template>
<script>
import { toIndoTimezone } from '~/plugins/timezone.js'
export default {
  props: { reminders: Array },
  computed: {
    userTimezone() {
      return this.$store.getters.userProfile?.timezone || 'WIB'
    }
  },
  methods: {
    formatTime(dateStr) {
      return toIndoTimezone(dateStr, this.userTimezone)
    }
  }
}
</script>
<style scoped>
.reminder-item { margin-bottom: 1rem; padding: 1rem; background: #fff0f6; border-radius: 8px; }
</style> 