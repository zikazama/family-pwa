<template>
  <div class="responsive-container">
    <div class="chat-box">
      <div class="messages">
        <div v-for="msg in messages" :key="msg.id" :class="{'my-msg': msg.user === user, 'msg': true}">
          <span class="user">{{ msg.user }}:</span>
          <span class="text">{{ msg.text }}</span>
        </div>
      </div>
      <form @submit.prevent="send" class="chat-form">
        <input v-model="input" placeholder="Ketik pesan..." class="input-primary" />
        <button type="button" @click="toggleEmoji" class="btn-primary btn-emoji" style="min-width:40px;">😊</button>
        <button type="submit" class="btn-primary">Kirim</button>
      </form>
      <div v-if="showEmoji" class="emoji-picker">
        <span v-for="e in emojis" :key="e" @click="addEmoji(e)">{{ e }}</span>
      </div>
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
<style lang="scss">
@use '~/assets/styles/theme-pink.scss' as *;
.responsive-container {
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
.chat-box {
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 2px 12px rgba(233,30,99,0.08);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.msg {
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: $color-white;
  box-shadow: 0 1px 2px rgba(233,30,99,0.04);
  font-size: 1rem;
  align-self: flex-start;
  max-width: 80%;
  word-break: break-word;
}
.my-msg {
  font-weight: bold;
  color: $color-primary;
  background: #ffe4ec;
  align-self: flex-end;
  box-shadow: 0 2px 8px rgba(233,30,99,0.09);
}
.user {
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 0.3rem;
  color: $color-primary-dark;
}
.text {
  font-size: 1rem;
}
.chat-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.input-primary {
  flex: 1 1 120px;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 2px solid $color-primary-light;
  background: $color-white;
  color: $color-primary-dark;
  font-size: 1rem;
  font-weight: 600;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
}
.input-primary:focus {
  border: 2px solid $color-accent;
  outline: none;
  box-shadow: 0 2px 8px rgba(233,30,99,0.13);
}
.btn-primary {
  background: $color-primary;
  color: $color-white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(233,30,99,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-primary:hover, .btn-primary:focus {
  background: $color-primary-dark;
  outline: none;
}
.btn-emoji {
  padding: 0.7rem 0.7rem;
  font-size: 1.3rem;
}
.emoji-picker {
  background: $color-white;
  border: 2px solid $color-primary-light;
  padding: 0.7rem 0.5rem;
  border-radius: 12px;
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  box-shadow: 0 2px 8px rgba(233,30,99,0.09);
  justify-content: flex-start;
}
.emoji-picker span {
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 0.2rem;
  transition: transform 0.15s;
  border-radius: 6px;
  padding: 0.1rem 0.3rem;
}
.emoji-picker span:hover {
  background: $color-primary-light;
  color: $color-white;
  transform: scale(1.2);
}
@media (max-width: 600px) {
  .responsive-container {
    padding: 0 0.2rem;
  }
  .chat-box {
    padding: 0.7rem 0.3rem;
  }
  .chat-form {
    flex-direction: column;
    gap: 0.3rem;
  }
  .msg, .my-msg {
    font-size: 0.95rem;
    padding: 0.5rem 0.6rem;
  }
}
</style> 