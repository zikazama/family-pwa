export const state = () => ({
  histories: []
})

export const mutations = {
  setHistories(state, histories) { state.histories = histories },
  addHistory(state, history) { state.histories.push(history) }
}

export const actions = {
  async fetchHistories({ commit }) {
    const snap = await this.$fire.firestore().collection('siklus').orderBy('start', 'desc').get()
    const histories = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    commit('setHistories', histories)
  },
  async addHistory({ commit }, history) {
    const ref = await this.$fire.firestore().collection('siklus').add(history)
    commit('addHistory', { ...history, id: ref.id })
  }
} 