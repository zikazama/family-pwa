export const state = () => ({
  user: null,
  userProfile: null,
  partnerProfile: null
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null
    } else {
      const { uid, email, displayName, photoURL, emailVerified } = authUser
      state.user = {
        uid,
        email,
        displayName,
        photoURL,
        emailVerified
      }
    }
  },
  SET_USER_PROFILE(state, profile) {
    state.userProfile = profile
  },
  SET_PARTNER_PROFILE(state, profile) {
    state.partnerProfile = profile
  }
}

export const actions = {
  onAuthStateChanged({ commit }, { authUser, claims }) {
    commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
  },
  async fetchUserProfile({ commit, state }) {
    if (!state.user) return
    const snap = await this.$fire.firestore.collection('users').doc(state.user.uid).get()
    commit('SET_USER_PROFILE', snap.exists ? snap.data() : null)
  },
  async fetchPartnerProfile({ commit, state }) {
    if (!state.userProfile || !state.userProfile.pasanganUID) return
    const snap = await this.$fire.firestore.collection('users').doc(state.userProfile.pasanganUID).get()
    commit('SET_PARTNER_PROFILE', snap.exists ? snap.data() : null)
  }
}

export const getters = {
  getUser: (state) => state.user,
  isAuthenticated: (state) => !!state.user,
  userProfile: (state) => state.userProfile,
  partnerProfile: (state) => state.partnerProfile
} 