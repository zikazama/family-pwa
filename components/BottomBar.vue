<template>
  <nav class="bottom-bar">
    <nuxt-link to="/dashboard" class="bar-link"><span>🏠</span><span class="label">Dashboard</span></nuxt-link>
    <nuxt-link to="/calendar" class="bar-link"><span>📅</span><span class="label">Calendar</span></nuxt-link>
    <nuxt-link to="/notes" class="bar-link"><span>📝</span><span class="label">Notes</span></nuxt-link>
    <nuxt-link to="/messaging" class="bar-link"><span>💬</span><span class="label">Messaging</span></nuxt-link>
    <nuxt-link to="/more" class="bar-link"><span>☰</span><span class="label">More</span></nuxt-link>
  </nav>
</template>
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around;
  background: $color-primary;
  color: $color-white;
  padding: 0.9rem 0 0.5rem 0;
  z-index: 100;
  box-shadow: 0 2px 16px 0 rgba(233,30,99,0.13), 0 -2px 12px rgba(233,30,99,0.07);
  border-radius: 18px 18px 0 0;
  margin: 0 auto;
  max-width: 600px;
  left: 50%;
  transform: translateX(-50%);
}
.bar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: $color-white;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 0.5rem 1.1rem;
  border-radius: 12px;
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
  min-width: 48px;
  min-height: 48px;
  justify-content: center;
}
.bar-link:active, .bar-link.nuxt-link-exact-active {
  background: $color-primary-dark;
  color: $color-accent;
  box-shadow: 0 2px 8px rgba(233,30,99,0.18);
}
.bar-link:hover {
  background: $color-primary-light;
  color: $color-accent;
}
.label {
  font-size: 0.85rem;
  margin-top: 0.1rem;
}
@media (max-width: 600px) {
  .bottom-bar {
    font-size: 0.95rem;
    padding: 0.5rem 0 0.1rem 0;
    max-width: 100vw;
    border-radius: 12px 12px 0 0;
  }
  .bar-link {
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    min-width: 40px;
    min-height: 40px;
  }
  .label {
    font-size: 0.7rem;
  }
}
a { color: inherit; }
</style> 