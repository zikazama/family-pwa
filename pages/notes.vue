<template>
  <div class="page-wrapper">
    <h1>📝 Shared Notes</h1>
    <p>This feature is under active development. Stay tuned! 💖</p>
  </div>
</template>

<script>
export default {
  name: 'NotesPage',
  head() {
    return { title: 'Shared Notes - Zira' }
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