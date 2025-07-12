<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label>Mulai Haid:</label>
      <input v-model="form.start" type="date" required />
      <label>Selesai Haid:</label>
      <input v-model="form.end" type="date" required />
      <button type="submit">Tambah History</button>
    </form>
    <div v-if="histories.length">
      <h3>History Siklus</h3>
      <ul>
        <li v-for="h in histories" :key="h.id">
          {{ formatDate(h.start) }} - {{ formatDate(h.end) }}
        </li>
      </ul>
      <div v-if="prediksi">
        <h3>Prediksi Haid Berikutnya</h3>
        <p>Perkiraan mulai: <b>{{ prediksi }}</b></p>
      </div>
    </div>
  </div>
</template>
<script>
import { toIndoTimezone } from '~/plugins/timezone.js'
export default {
  props: { histories: Array },
  data() {
    return { form: { start: '', end: '' } }
  },
  computed: {
    userTimezone() {
      return this.$store.getters.userProfile?.timezone || 'WIB'
    },
    prediksi() {
      if (!this.histories.length) return null
      // Prediksi: rata-rata siklus dari 2 history terakhir
      const last = this.histories[0]
      const prev = this.histories[1]
      if (!last || !prev) return null
      const lastStart = new Date(last.start)
      const prevStart = new Date(prev.start)
      const avg = Math.round((lastStart - prevStart) / (1000*60*60*24))
      const next = new Date(last.start)
      next.setDate(next.getDate() + avg)
      return toIndoTimezone(next.toISOString().slice(0,10), this.userTimezone)
    }
  },
  methods: {
    onSubmit() {
      this.$emit('add', { ...this.form })
      this.form = { start: '', end: '' }
    },
    formatDate(dateStr) {
      return toIndoTimezone(dateStr, this.userTimezone)
    }
  }
}
</script> 