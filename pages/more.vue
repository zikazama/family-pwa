<template>
  <div class="responsive-container">
    <h1 class="page-title">More</h1>
    <ul class="more-list">
      <li><nuxt-link to="/reminder" class="btn-primary more-link">Reminder</nuxt-link></li>
      <li><nuxt-link to="/siklus-haid" class="btn-primary more-link">Siklus Haid</nuxt-link></li>
      <li><nuxt-link to="/keuangan" class="btn-primary more-link">Keuangan</nuxt-link></li>
      <li><nuxt-link to="/settings" class="btn-primary more-link">Settings</nuxt-link></li>
    </ul>
    <BottomBar />
  </div>
</template>
<script>
import BottomBar from '~/components/BottomBar.vue'
export default { components: { BottomBar } }
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
.more-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.more-link {
  width: 100%;
  max-width: 300px;
  text-align: center;
  font-size: 1.1rem;
}
@media (max-width: 600px) {
  .page-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  .more-link {
    font-size: 1rem;
    max-width: 100%;
  }
}
</style> 