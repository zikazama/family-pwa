
export const namespaced = true;

export const state = () => ({
  notes: [],
  loading: false,
  error: null
})

export const mutations = {
  SET_NOTES(state, n) { state.notes = n },
  ADD_NOTE(state, n) { state.notes.unshift(n) },
  UPDATE_NOTE(state, updated) {
    const idx = state.notes.findIndex(n => n.id === updated.id)
    if (idx !== -1) state.notes.splice(idx, 1, updated)
  },
  DELETE_NOTE(state, id) {
    state.notes = state.notes.filter(n => n.id !== id)
  },
  SET_LOADING(state, l) { state.loading = l },
  SET_ERROR(state, e) { state.error = e }
}

export const actions = {
  async fetchNotes({ commit, rootState }) {
    commit('SET_LOADING', true)
    try {
      if (!process.client) return
      const coupleId = rootState.couple?.couple?.id
      if (!coupleId) return
      const snap = await this.$fire.firestore.collection('couples').doc(coupleId).collection('notes').orderBy('createdAt', 'desc').get()
      const notes = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      commit('SET_NOTES', notes)
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e)
    } finally { commit('SET_LOADING', false) }
  },
  async addNote({ commit, rootState }, content) {
    const coupleId = rootState.couple?.couple?.id
    const payload = { content, createdAt: new Date().toISOString() }
    const ref = await this.$fire.firestore.collection('couples').doc(coupleId).collection('notes').add(payload)
    commit('ADD_NOTE', { id: ref.id, ...payload })
  },
  async updateNote({ commit, rootState }, { id, content }) {
    const coupleId = rootState.couple?.couple?.id
    await this.$fire.firestore.collection('couples').doc(coupleId).collection('notes').doc(id).update({ content })
    commit('UPDATE_NOTE', { id, content })
  },
  async deleteNote({ commit, rootState }, id) {
    const coupleId = rootState.couple?.couple?.id
    await this.$fire.firestore.collection('couples').doc(coupleId).collection('notes').doc(id).delete()
    commit('DELETE_NOTE', id)
  }
}

export const getters = {
  notes: s => s.notes
}