<template>
  <nav class="bottom-bar">
    <nuxt-link to="/dashboard">Dashboard</nuxt-link>
    <nuxt-link to="/calendar">Calendar</nuxt-link>
    <nuxt-link to="/notes">Notes</nuxt-link>
    <nuxt-link to="/messaging">Messaging</nuxt-link>
    <nuxt-link to="/more">More</nuxt-link>
  </nav>
</template>
<style scoped>
.bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around;
  background: #ffb6c1; color: #fff; padding: 0.5rem 0;
  z-index: 100;
}
a { color: #fff; font-weight: bold; }
</style> 