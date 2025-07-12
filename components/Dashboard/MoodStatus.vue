<template>
  <div>
    <span>Mood: </span>
    <select v-model="localMood" @change="onMoodChange">
      <option>😊</option><option>😍</option><option>🥰</option>
    </select>
    <span>Status: </span>
    <select v-model="localStatus" @change="onStatusChange">
      <option>💪</option><option>😴</option><option>🤗</option>
    </select>
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