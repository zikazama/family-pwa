<template>
  <div>
    <h1>Keuangan</h1>
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