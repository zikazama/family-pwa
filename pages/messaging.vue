<template>
  <div>
    <h1>Messaging</h1>
    <ChatBox :messages="messages" :user="user" @send="sendMessage" />
    <BottomBar />
  </div>
</template>
<script>
import ChatBox from '~/components/Messaging/ChatBox.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { ChatBox, BottomBar },
  computed: {
    messages() { return this.$store.state.messaging.messages },
    user() {
      // Dummy: ambil dari rootState.user.email, fallback 'anon'
      return this.$store.state.user && this.$store.state.user.email ? this.$store.state.user.email : 'anon'
    }
  },
  mounted() {
    this.$store.dispatch('messaging/listenMessages')
  },
  methods: {
    sendMessage(text) {
      this.$store.dispatch('messaging/sendMessage', text)
    }
  }
}
</script> 