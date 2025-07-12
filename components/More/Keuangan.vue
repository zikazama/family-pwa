<template>
  <div>
    <h2>Tabungan</h2>
    <form @submit.prevent="addSaving">
      <input v-model="saving.nama" placeholder="Nama Tabungan" required />
      <input v-model="saving.desc" placeholder="Deskripsi" />
      <input v-model.number="saving.amount" type="number" placeholder="Jumlah Saat Ini" required />
      <input v-model.number="saving.target" type="number" placeholder="Target Uang" required />
      <select v-model="saving.periode">
        <option value="harian">Harian</option>
        <option value="mingguan">Mingguan</option>
        <option value="bulanan">Bulanan</option>
      </select>
      <input v-model="saving.targetDate" type="date" placeholder="Target Tercapai" />
      <button type="submit">Tambah Tabungan</button>
    </form>
    <ul>
      <li v-for="s in savings" :key="s.id">
        {{ s.nama }}: {{ s.amount }}/{{ s.target }} ({{ s.periode }})
        <span v-if="prediksiTarget(s)">| Prediksi tercapai: {{ prediksiTarget(s) }}</span>
      </li>
    </ul>
    <h2>Hutang</h2>
    <form @submit.prevent="addDebt">
      <input v-model="debt.nama" placeholder="Nama Hutang" required />
      <input v-model="debt.desc" placeholder="Deskripsi" />
      <input v-model.number="debt.amount" type="number" placeholder="Jumlah Hutang" required />
      <button type="submit">Tambah Hutang</button>
    </form>
    <ul>
      <li v-for="d in debts" :key="d.id">
        {{ d.nama }}: {{ d.amount }}
      </li>
    </ul>
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