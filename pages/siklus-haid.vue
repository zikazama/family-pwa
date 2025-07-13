<template>
  <div class="responsive-container">
    <h1 class="page-title">Siklus Haid</h1>
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