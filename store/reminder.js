export const state = () => ({
  reminders: []
})

export const mutations = {
  setReminders(state, reminders) { state.reminders = reminders },
  addReminder(state, reminder) { state.reminders.push(reminder) },
  updateReminder(state, reminder) {
    const idx = state.reminders.findIndex(r => r.id === reminder.id)
    if (idx !== -1) state.reminders.splice(idx, 1, reminder)
  },
  deleteReminder(state, id) {
    state.reminders = state.reminders.filter(r => r.id !== id)
  }
}

export const actions = {
  async fetchReminders({ commit }) {
    const snap = await this.$fire.firestore().collection('reminders').orderBy('datetime').get()
    const reminders = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    commit('setReminders', reminders)
  },
  async addReminder({ commit }, reminder) {
    const ref = await this.$fire.firestore().collection('reminders').add(reminder)
    commit('addReminder', { ...reminder, id: ref.id })
  },
  async updateReminder({ commit }, reminder) {
    await this.$fire.firestore().collection('reminders').doc(reminder.id).set(reminder)
    commit('updateReminder', reminder)
  },
  async deleteReminder({ commit }, id) {
    await this.$fire.firestore().collection('reminders').doc(id).delete()
    commit('deleteReminder', id)
  }
} 