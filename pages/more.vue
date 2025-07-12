<template>
  <div>
    <h1>More</h1>
    <ul>
      <li><nuxt-link to="/reminder">Reminder</nuxt-link></li>
      <li><nuxt-link to="/siklus-haid">Siklus Haid</nuxt-link></li>
      <li><nuxt-link to="/keuangan">Keuangan</nuxt-link></li>
      <li><nuxt-link to="/settings">Settings</nuxt-link></li>
    </ul>
    <BottomBar />
  </div>
</template>
<script>
import BottomBar from '~/components/BottomBar.vue'
export default { components: { BottomBar } }
</script> 