export const state = () => ({
  savings: [],
  debts: []
})

export const mutations = {
  setSavings(state, savings) { state.savings = savings },
  setDebts(state, debts) { state.debts = debts },
  addSaving(state, saving) { state.savings.push(saving) },
  addDebt(state, debt) { state.debts.push(debt) }
}

export const actions = {
  async fetchKeuangan({ commit }) {
    const sSnap = await this.$fire.firestore().collection('savings').orderBy('createdAt', 'desc').get()
    const dSnap = await this.$fire.firestore().collection('debts').orderBy('createdAt', 'desc').get()
    commit('setSavings', sSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    commit('setDebts', dSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  },
  async addSaving({ commit }, saving) {
    const ref = await this.$fire.firestore().collection('savings').add(saving)
    commit('addSaving', { ...saving, id: ref.id })
  },
  async addDebt({ commit }, debt) {
    const ref = await this.$fire.firestore().collection('debts').add(debt)
    commit('addDebt', { ...debt, id: ref.id })
  }
} 