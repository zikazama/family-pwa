<template>
  <div class="chat-box">
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" :class="{'my-msg': msg.user === user}">
        <span class="user">{{ msg.user }}:</span>
        <span class="text">{{ msg.text }}</span>
      </div>
    </div>
    <form @submit.prevent="send">
      <input v-model="input" placeholder="Ketik pesan..." />
      <button type="button" @click="toggleEmoji">😊</button>
      <button type="submit">Kirim</button>
    </form>
    <div v-if="showEmoji" class="emoji-picker">
      <span v-for="e in emojis" :key="e" @click="addEmoji(e)">{{ e }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: { messages: Array, user: String },
  data() {
    return {
      input: '',
      showEmoji: false,
      emojis: ['😊','😍','🥰','😂','😭','😎','😡','👍','💖','💋','💑']
    }
  },
  methods: {
    send() {
      if (this.input.trim()) {
        this.$emit('send', this.input)
        this.input = ''
      }
    },
    toggleEmoji() { this.showEmoji = !this.showEmoji },
    addEmoji(e) { this.input += e; this.showEmoji = false }
  }
}
</script>
<style scoped>
.chat-box { background: #fff0f6; border-radius: 8px; padding: 1rem; }
.messages { max-height: 300px; overflow-y: auto; margin-bottom: 1rem; }
.my-msg { font-weight: bold; color: #e91e63; }
.emoji-picker { background: #fff; border: 1px solid #eee; padding: 0.5rem; border-radius: 8px; }
.emoji-picker span { font-size: 1.5rem; cursor: pointer; margin: 0 0.2rem; }
</style> 