<template>
  <div class="responsive-container">
    <div class="mood-status-card">
      <span>Mood: </span>
      <select v-model="localMood" @change="onMoodChange" class="input-primary">
        <option>😊</option><option>😍</option><option>🥰</option>
      </select>
      <span>Status: </span>
      <select v-model="localStatus" @change="onStatusChange" class="input-primary">
        <option>💪</option><option>😴</option><option>🧑‍🦳</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: { mood: String, status: String },
  data() {
    return {
      localMood: this.mood,
      localStatus: this.status
    }
  },
  watch: {
    mood(val) { this.localMood = val },
    status(val) { this.localStatus = val }
  },
  methods: {
    onMoodChange() {
      this.$emit('update:mood', this.localMood)
    },
    onStatusChange() {
      this.$emit('update:status', this.localStatus)
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
.mood-status-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
  padding: 1.2rem 1rem;
  background: rgba(255,255,255,0.7);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  font-size: 1.1rem;
  margin: 0 auto;
  justify-content: center;
}
.input-primary {
  min-width: 90px;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  border: 2px solid $color-primary-light;
  background: $color-white;
  color: $color-primary-dark;
  font-size: 1rem;
  font-weight: 600;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
}
.input-primary:focus {
  border: 2px solid $color-accent;
  outline: none;
  box-shadow: 0 2px 8px rgba(233,30,99,0.13);
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .mood-status-card {
    font-size: 1rem;
    padding: 0.7rem 0.3rem;
  }
  .input-primary {
    font-size: 0.95rem;
    padding: 0.3rem 0.5rem;
  }
}
</style> 