
export const namespaced = true;

export const state = () => ({
  couple: null,
  loading: false,
  error: null,
  unsubListener: null
})

export const mutations = {
  SET_COUPLE(state, payload) {
    state.couple = payload
  },
  SET_UNSUB(state, fn) { state.unsubListener = fn },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export const actions = {
  async fetchCouple({ commit, rootState }) {
    commit('SET_LOADING', true)
    try {
      // Ensure Firebase is available only on client side
      if (process.client) {
        const uid = rootState.user?.uid || (this.$fire?.auth?.currentUser?.uid ?? null)
        if (!uid) {
          commit('SET_COUPLE', null)
          commit('SET_LOADING', false)
          return
        }

        // Couple document key strategy: use the UID as key for prototype stage
        const docRef = this.$fire.firestore.collection('couples').doc(uid)
        const snapshot = await docRef.get()

        if (snapshot.exists) {
          commit('SET_COUPLE', { id: snapshot.id, ...snapshot.data() })
        } else {
          // Create a blank couple doc for first-time users
          const defaultData = {
            myName: this.$fire?.auth?.currentUser?.displayName ?? 'Me',
            partnerName: '',
            anniversaryDate: null,
            backgroundPhotoUrl: '',
            mood: '',
            lastPeriodDate: null,
            cycleLength: 28,
            darkMode: false
          }
          await docRef.set(defaultData)
          commit('SET_COUPLE', { id: docRef.id, ...defaultData })
        }
      }
    } catch (err) {
      console.error('Error fetching couple data', err)
      commit('SET_ERROR', err)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  subscribeCouple({ dispatch, commit, state, rootState }) {
    // avoid multiple listeners
    if (state.unsubListener) state.unsubListener()
    const uid = rootState.user?.uid || (this.$fire?.auth?.currentUser?.uid ?? null)
    if (!uid) return
    const docRef = this.$fire.firestore.collection('couples').doc(uid)
    const unsub = docRef.onSnapshot((snap) => {
      if (snap.exists) {
        commit('SET_COUPLE', { id: snap.id, ...snap.data() })
      }
    })
    commit('SET_UNSUB', unsub)
  },

  unsubscribeCouple({ state, commit }) {
    if (state.unsubListener) {
      state.unsubListener()
      commit('SET_UNSUB', null)
    }
  },

  async updateCouple({ commit, state }, updates) {
    try {
      if (!state.couple?.id) return
      const docRef = this.$fire.firestore.collection('couples').doc(state.couple.id)
      await docRef.update(updates)
      commit('SET_COUPLE', { ...state.couple, ...updates })
    } catch (err) {
      console.error('Error updating couple data', err)
      commit('SET_ERROR', err)
    }
  }
}

export const getters = {
  couple: (s) => s.couple,
  anniversaryDate: (s) => s.couple?.anniversaryDate ? new Date(s.couple.anniversaryDate) : null,
  daysTogether: (s, g) => {
    if (!g.anniversaryDate) return null
    const today = new Date()
    const diff = today.getTime() - g.anniversaryDate.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  },
  nextPeriodDate: (s) => {
    if (!s.couple?.lastPeriodDate) return null
    const start = new Date(s.couple.lastPeriodDate)
    const length = s.couple.cycleLength || 28
    return new Date(start.getTime() + length * 24 * 60 * 60 * 1000)
  }
}