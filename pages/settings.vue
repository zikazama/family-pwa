<template>
  <div class="page-wrapper">
    <h1>⚙️ Settings</h1>
    <p>This feature is under active development. Here you will be able to set anniversary date, names, and theme preferences. 💖</p>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  head() {
    return { title: 'Settings - Zira' }
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: #fdfdfd;
}
</style>