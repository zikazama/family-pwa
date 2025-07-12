<template>
  <div>
    <h1>Siklus Haid</h1>
    <SiklusHaid :histories="histories" @add="addHistory" />
    <BottomBar />
  </div>
</template>
<script>
import SiklusHaid from '~/components/More/SiklusHaid.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { SiklusHaid, BottomBar },
  computed: {
    histories() { return this.$store.state.siklus.histories }
  },
  async mounted() {
    await this.$store.dispatch('siklus/fetchHistories')
  },
  methods: {
    async addHistory(history) {
      await this.$store.dispatch('siklus/addHistory', history)
    }
  }
}
</script> 