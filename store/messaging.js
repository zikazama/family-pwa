export const state = () => ({
  messages: []
})

export const mutations = {
  setMessages(state, messages) { state.messages = messages },
  addMessage(state, message) { state.messages.push(message) }
}

export const actions = {
  listenMessages({ commit }) {
    // Real-time listener
    this.$fire.firestore().collection('messages').orderBy('createdAt')
      .onSnapshot(snap => {
        const messages = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        commit('setMessages', messages)
      })
  },
  async sendMessage({ rootState }, text) {
    const user = rootState.user && rootState.user.email ? rootState.user.email : 'anon'
    const now = new Date().toISOString()
    await this.$fire.firestore().collection('messages').add({
      text, user, createdAt: now
    })
  }
} 