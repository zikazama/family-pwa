export const state = () => ({
  events: []
})

export const mutations = {
  setEvents(state, events) { state.events = events },
  addEvent(state, event) { state.events.push(event) },
  updateEvent(state, event) {
    const idx = state.events.findIndex(e => e.id === event.id)
    if (idx !== -1) state.events.splice(idx, 1, event)
  },
  deleteEvent(state, id) {
    state.events = state.events.filter(e => e.id !== id)
  }
}

export const actions = {
  async fetchEvents({ commit }) {
    const snap = await this.$fire.firestore().collection('events').orderBy('start').get()
    const events = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    commit('setEvents', events)
  },
  async addEvent({ commit }, event) {
    const ref = await this.$fire.firestore().collection('events').add(event)
    commit('addEvent', { ...event, id: ref.id })
  },
  async updateEvent({ commit }, event) {
    await this.$fire.firestore().collection('events').doc(event.id).set(event)
    commit('updateEvent', event)
  },
  async deleteEvent({ commit }, id) {
    await this.$fire.firestore().collection('events').doc(id).delete()
    commit('deleteEvent', id)
  }
} 