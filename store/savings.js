
export const namespaced = true;

export const state = () => ({
  list: [],
  loading: false,
  error: null
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
  ADD_ITEM(state, item) {
    state.list.push(item)
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  SET_ERROR(state, err) {
    state.error = err
  }
}

function calculateEstimation(monthlyAmount, target) {
  if (!monthlyAmount || !target || monthlyAmount <= 0 || target <= 0) return null
  const months = target / monthlyAmount
  const days = months * 30
  return {
    months,
    days,
    // crude years calc
    years: months / 12
  }
}

export const actions = {
  async fetchSavings({ commit, rootState }) {
    commit('SET_LOADING', true)
    try {
      if (!process.client) return
      const coupleId = rootState.couple?.couple?.id
      if (!coupleId) return
      const snapshot = await this.$fire.firestore
        .collection('couples')
        .doc(coupleId)
        .collection('savings')
        .orderBy('createdAt', 'desc')
        .get()
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      commit('SET_LIST', data)
    } catch (err) {
      console.error('fetch savings error', err)
      commit('SET_ERROR', err)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async addSaving({ commit, rootState }, { routine, monthlyAmount, targetAmount }) {
    try {
      const coupleId = rootState.couple?.couple?.id
      if (!coupleId) throw new Error('No couple id')
      const estimation = calculateEstimation(monthlyAmount, targetAmount)
      const payload = {
        routine,
        monthlyAmount,
        targetAmount,
        estimation,
        createdAt: new Date().toISOString()
      }
      const docRef = await this.$fire.firestore
        .collection('couples')
        .doc(coupleId)
        .collection('savings')
        .add(payload)
      commit('ADD_ITEM', { id: docRef.id, ...payload })
    } catch (err) {
      console.error('add saving error', err)
      commit('SET_ERROR', err)
    }
  }
}

export const getters = {
  savingsList: (s) => s.list,
  loading: (s) => s.loading
}