export const namespaced = true;

export const state = () => ({
  events: [],
  loading: false,
  error: null
})

export const mutations = {
  SET_EVENTS(state, payload) {
    state.events = payload
  },
  ADD_EVENT(state, evt) {
    state.events.push(evt)
  },
  REMOVE_EVENT(state, id) {
    state.events = state.events.filter(e => e.id !== id)
  },
  SET_LOADING(state, s) {
    state.loading = s
  },
  SET_ERROR(state, e) {
    state.error = e
  }
}

export const actions = {
  async fetchEvents({ commit, rootState }) {
    commit('SET_LOADING', true)
    try {
      if (!process.client) return
      const coupleId = rootState.couple?.couple?.id
      if (!coupleId) return
      const snap = await this.$fire.firestore
        .collection('couples').doc(coupleId)
        .collection('events').orderBy('date', 'asc').get()
      const evts = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      commit('SET_EVENTS', evts)
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async addEvent({ commit, rootState }, { title, date }) {
    try {
      const coupleId = rootState.couple?.couple?.id
      if (!coupleId) throw new Error('no couple id')
      const data = { title, date, createdAt: new Date().toISOString() }
      const ref = await this.$fire.firestore.collection('couples').doc(coupleId).collection('events').add(data)
      commit('ADD_EVENT', { id: ref.id, ...data })
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e)
    }
  },
  async deleteEvent({ commit, rootState }, id) {
    try {
      const coupleId = rootState.couple?.couple?.id
      await this.$fire.firestore.collection('couples').doc(coupleId).collection('events').doc(id).delete()
      commit('REMOVE_EVENT', id)
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e)
    }
  }
}

export const getters = {
  events: s => s.events
}