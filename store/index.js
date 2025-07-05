export const state = () => ({
  user: null
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
  }
}

export const actions = {
  onAuthStateChanged({ commit }, { authUser, claims }) {
    commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
  }
}

export const getters = {
  getUser: (state) => state.user,
  isAuthenticated: (state) => !!state.user
} 