<template>
  <div class="responsive-container">
    <div class="siklus-container">
      <form @submit.prevent="onSubmit" class="siklus-form">
        <label>Mulai Haid:</label>
        <input v-model="form.start" type="date" required class="input-primary" />
        <label>Selesai Haid:</label>
        <input v-model="form.end" type="date" required class="input-primary" />
        <button type="submit" class="btn-primary">Tambah History</button>
      </form>
      <div v-if="histories.length">
        <h3>History Siklus</h3>
        <ul class="history-list">
          <li v-for="h in histories" :key="h.id" class="history-item">
            {{ formatDate(h.start) }} - {{ formatDate(h.end) }}
          </li>
        </ul>
        <div v-if="prediksi" class="prediksi-block">
          <h3>Prediksi Haid Berikutnya</h3>
          <p>Perkiraan mulai: <b>{{ prediksi }}</b></p>
        </div>
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.siklus-container {
  width: 100%;
  padding: 1.5rem 0.5rem;
}
.siklus-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: flex-end;
  margin-bottom: 1.2rem;
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  padding: 1.5rem 1.2rem;
}
.siklus-form label {
  font-weight: 600;
  color: $color-primary-dark;
}
.input-primary {
  flex: 1 1 180px;
  padding: 0.7rem 1rem;
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
.btn-primary {
  min-width: 120px;
  background: $color-primary;
  color: $color-white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
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
.history-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}
.history-item {
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  margin-bottom: 0.7rem;
  padding: 0.7rem 1rem;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  border: 1.5px solid $color-primary-light;
}
.prediksi-block {
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  margin-bottom: 1rem;
  border: 1.5px solid $color-primary-light;
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .siklus-form {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
    padding: 1.1rem 0.3rem;
  }
  .btn-primary {
    width: 100%;
    min-width: 0;
  }
}
</style> 