<template>
  <div class="container">
    <div class="hero">
      <h1 class="title">💕 Zira</h1>
      <h2 class="subtitle">Stay connected with your loved one</h2>
      
      <div v-if="!$fire.auth.currentUser" class="auth-section">
        <h3>Sign in to connect with your partner</h3>
        <button @click="signInWithGoogle" class="btn-google">
          💝 Sign in with Google
        </button>
      </div>
      
      <div v-else class="user-section">
        <h3>Welcome back, {{ $fire.auth.currentUser.displayName }}! 💖</h3>
        <img :src="$fire.auth.currentUser.photoURL" alt="Profile" class="profile-pic">
        <p>{{ $fire.auth.currentUser.email }}</p>
        <p class="connection-status">🔗 Ready to connect with your partner</p>
        
        <div class="action-buttons">
          <nuxt-link to="/couple" class="btn-dashboard">
            💕 Open Our Space
          </nuxt-link>
          <button @click="signOut" class="btn-signout">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async signInWithGoogle() {
      try {
        const provider = new this.$fireModule.auth.GoogleAuthProvider()
        await this.$fire.auth.signInWithPopup(provider)
      } catch (error) {
        console.error('Error signing in:', error)
      }
    },
    async signOut() {
      try {
        await this.$fire.auth.signOut()
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
}

.hero {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.subtitle {
  font-weight: 300;
  font-size: 1.5rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 2rem;
}

.auth-section, .user-section {
  margin-top: 2rem;
}

.btn-google {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
}

.btn-google:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-dashboard {
  background-color: #e91e63;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s;
  display: inline-block;
}

.btn-dashboard:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
}

.btn-signout {
  background-color: #757575;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-signout:hover {
  background-color: #616161;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 1rem 0;
  border: 3px solid #e91e63;
}

.connection-status {
  color: #e91e63;
  font-weight: 500;
  margin: 1rem 0;
}

h3 {
  color: #35495e;
  margin-bottom: 1rem;
}

p {
  color: #526488;
  margin: 0.5rem 0;
}
</style> 