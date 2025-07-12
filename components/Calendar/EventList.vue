<template>
  <div>
    <div v-for="event in events" :key="event.id" class="event-item">
      <b>{{ event.title }}</b><br/>
      <span>{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</span><br/>
      <small>Dibuat: {{ event.createdBy }} | Diperbarui: {{ event.updatedBy }}</small>
      <button @click="$emit('edit', event)">Edit</button>
      <button @click="$emit('delete', event.id)">Hapus</button>
    </div>
  </div>
</template>
<script>
import { toIndoTimezone } from '~/plugins/timezone.js'
export default {
  props: { events: Array },
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
.event-item { margin-bottom: 1rem; padding: 1rem; background: #fff0f6; border-radius: 8px; }
</style> 