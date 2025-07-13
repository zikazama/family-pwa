<template>
  <div class="responsive-container">
    <div v-for="reminder in reminders" :key="reminder.id" class="reminder-item">
      <b>{{ reminder.title }}</b><br/>
      <span>{{ formatTime(reminder.datetime) }}</span><br/>
      <small>{{ reminder.desc }}</small>
      <div class="reminder-actions">
        <button @click="$emit('edit', reminder)" class="btn-primary">Edit</button>
        <button @click="$emit('delete', reminder.id)" class="btn-primary btn-cancel">Hapus</button>
      </div>
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.reminder-item {
  margin-bottom: 1.2rem;
  padding: 1.3rem 1.1rem;
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: 1.5px solid $color-primary-light;
}
.reminder-actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}
.btn-primary {
  background: $color-primary;
  color: $color-white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
}
.btn-primary:hover, .btn-primary:focus {
  background: $color-primary-dark;
  outline: none;
}
.btn-cancel {
  background: #eee !important;
  color: #333 !important;
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .reminder-item {
    padding: 0.7rem 0.3rem;
  }
  .reminder-actions {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style> 