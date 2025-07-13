<template>
  <div class="responsive-container">
    <h1 class="page-title">Keuangan</h1>
    <Keuangan :savings="savings" :debts="debts" @add-saving="addSaving" @add-debt="addDebt" />
    <BottomBar />
  </div>
</template>
<script>
import Keuangan from '~/components/More/Keuangan.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { Keuangan, BottomBar },
  computed: {
    savings() { return this.$store.state.keuangan.savings },
    debts() { return this.$store.state.keuangan.debts }
  },
  async mounted() {
    await this.$store.dispatch('keuangan/fetchKeuangan')
  },
  methods: {
    async addSaving(saving) {
      await this.$store.dispatch('keuangan/addSaving', saving)
    },
    async addDebt(debt) {
      await this.$store.dispatch('keuangan/addDebt', debt)
    }
  }
}
</script>
<style lang="scss">
@use '@/assets/styles/theme-pink.scss' as *;
.page-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: $color-primary;
  font-size: 2rem;
  font-weight: 700;
}
@media (max-width: 600px) {
  .page-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
}
</style> 