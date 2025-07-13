<template>
  <button @click="$emit('sendLove')" class="love-btn">💖</button>
</template>
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.love-btn {
  font-size: 2.2rem;
  background: $color-primary;
  border: 3px solid $color-primary-light;
  border-radius: 50%;
  padding: 1.1rem;
  color: $color-white;
  box-shadow: 0 4px 16px rgba(233,30,99,0.18), 0 2px 8px rgba(233,30,99,0.13);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s, border 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.love-btn:hover, .love-btn:focus {
  background: $color-primary-dark;
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(233,30,99,0.22);
  border: 3px solid $color-accent;
}
@media (max-width: 600px) {
  .love-btn {
    font-size: 1.6rem;
    padding: 0.7rem;
  }
}
</style> 