<template>
  <button @click="$emit('sendLove')" class="love-btn">💖</button>
</template>
<style scoped>
.love-btn { font-size: 2rem; background: #ff69b4; border: none; border-radius: 50%; padding: 1rem; }
</style> 