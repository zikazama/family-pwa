export const state = () => ({
  notes: []
})

export const mutations = {
  setNotes(state, notes) { state.notes = notes },
  addNote(state, note) { state.notes.push(note) },
  updateNote(state, note) {
    const idx = state.notes.findIndex(n => n.id === note.id)
    if (idx !== -1) state.notes.splice(idx, 1, note)
  },
  deleteNote(state, id) {
    state.notes = state.notes.filter(n => n.id !== id)
  }
}

export const actions = {
  async fetchNotes({ commit }) {
    const snap = await this.$fire.firestore().collection('notes').orderBy('updatedAt', 'desc').get()
    const notes = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    commit('setNotes', notes)
  },
  async addNote({ commit, rootState }, note) {
    const user = rootState.user && rootState.user.email ? rootState.user.email : 'anon'
    const now = new Date().toISOString()
    const data = { ...note, createdBy: user, updatedBy: user, createdAt: now, updatedAt: now }
    const ref = await this.$fire.firestore().collection('notes').add(data)
    commit('addNote', { ...data, id: ref.id })
  },
  async updateNote({ commit, rootState }, note) {
    const user = rootState.user && rootState.user.email ? rootState.user.email : 'anon'
    const now = new Date().toISOString()
    const data = { ...note, updatedBy: user, updatedAt: now }
    await this.$fire.firestore().collection('notes').doc(note.id).set(data)
    commit('updateNote', data)
  },
  async deleteNote({ commit }, id) {
    await this.$fire.firestore().collection('notes').doc(id).delete()
    commit('deleteNote', id)
  }
} 
