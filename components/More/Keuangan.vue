<template>
  <div class="responsive-container">
    <div class="keuangan-container">
      <h2>Tabungan</h2>
      <form @submit.prevent="addSaving" class="form-block">
        <input v-model="saving.nama" placeholder="Nama Tabungan" required class="input-primary" />
        <input v-model="saving.desc" placeholder="Deskripsi" class="input-primary" />
        <input v-model.number="saving.amount" type="number" placeholder="Jumlah Saat Ini" required class="input-primary" />
        <input v-model.number="saving.target" type="number" placeholder="Target Uang" required class="input-primary" />
        <select v-model="saving.periode" class="input-primary">
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
        </select>
        <input v-model="saving.targetDate" type="date" placeholder="Target Tercapai" class="input-primary" />
        <button type="submit" class="btn-primary">Tambah Tabungan</button>
      </form>
      <ul class="list-block">
        <li v-for="s in savings" :key="s.id" class="list-item">
          <div>
            <b>{{ s.nama }}</b>: {{ s.amount }}/{{ s.target }} ({{ s.periode }})
            <span v-if="prediksiTarget(s)">| Prediksi tercapai: {{ prediksiTarget(s) }}</span>
          </div>
        </li>
      </ul>
      <h2>Hutang</h2>
      <form @submit.prevent="addDebt" class="form-block">
        <input v-model="debt.nama" placeholder="Nama Hutang" required class="input-primary" />
        <input v-model="debt.desc" placeholder="Deskripsi" class="input-primary" />
        <input v-model.number="debt.amount" type="number" placeholder="Jumlah Hutang" required class="input-primary" />
        <button type="submit" class="btn-primary">Tambah Hutang</button>
      </form>
      <ul class="list-block">
        <li v-for="d in debts" :key="d.id" class="list-item">
          <div>
            <b>{{ d.nama }}</b>: {{ d.amount }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: { savings: Array, debts: Array },
  data() {
    return {
      saving: { nama: '', desc: '', amount: 0, target: 0, periode: 'bulanan', targetDate: '' },
      debt: { nama: '', desc: '', amount: 0 }
    }
  },
  methods: {
    addSaving() {
      this.$emit('add-saving', { ...this.saving, createdAt: new Date().toISOString() })
      this.saving = { nama: '', desc: '', amount: 0, target: 0, periode: 'bulanan', targetDate: '' }
    },
    addDebt() {
      this.$emit('add-debt', { ...this.debt, createdAt: new Date().toISOString() })
      this.debt = { nama: '', desc: '', amount: 0 }
    },
    prediksiTarget(s) {
      if (!s.amount || !s.target || !s.periode) return null
      const sisa = s.target - s.amount
      if (sisa <= 0) return 'Tercapai!'
      let days = 0
      if (s.periode === 'harian') days = sisa
      if (s.periode === 'mingguan') days = sisa * 7
      if (s.periode === 'bulanan') days = sisa * 30
      const now = new Date()
      now.setDate(now.getDate() + days)
      return now.toISOString().slice(0,10)
    }
  }
}
</script>
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 700px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.keuangan-container {
  width: 100%;
  padding: 1.5rem 0.5rem;
}
.form-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
  align-items: flex-end;
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  padding: 1.5rem 1.2rem;
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
.list-block {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}
.list-item {
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  margin-bottom: 0.7rem;
  padding: 0.7rem 1rem;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  border: 1.5px solid $color-primary-light;
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .form-block {
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