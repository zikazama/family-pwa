<template>
  <div class="couple-dashboard">
    <div class="header">
      <h1>💕 Our Space</h1>
      <p>Welcome to your private couple dashboard</p>
    </div>

    <div v-if="!user" class="auth-required">
      <h3>Please sign in to access your couple dashboard</h3>
      <nuxt-link to="/" class="btn-home">Back to Home</nuxt-link>
    </div>

    <div v-else class="dashboard-content">
      <div class="couple-features">
        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>Private Messages</h3>
          <p>Send sweet messages to each other</p>
          <button class="feature-btn">Open Chat</button>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📷</div>
          <h3>Shared Photos</h3>
          <p>Create memories together</p>
          <button class="feature-btn">View Gallery</button>
        </div>

        <div class="feature-card">
          <div class="feature-icon">❤️</div>
          <h3>Love Notes</h3>
          <p>Leave surprise notes for your partner</p>
          <button class="feature-btn">Write Note</button>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📅</div>
          <h3>Special Dates</h3>
          <p>Remember important moments</p>
          <button class="feature-btn">Add Date</button>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Couple Goals</h3>
          <p>Set and achieve goals together</p>
          <button class="feature-btn">Set Goals</button>
        </div>

        <div class="feature-card">
          <div class="feature-icon">💝</div>
          <h3>Gift Ideas</h3>
          <p>Save gift ideas for each other</p>
          <button class="feature-btn">Add Ideas</button>
        </div>
      </div>

      <div class="couple-status">
        <h3>💖 Connection Status</h3>
        <div class="status-info">
          <p><strong>You:</strong> {{ user.displayName }}</p>
          <p><strong>Partner:</strong> <span class="partner-status">Waiting to connect...</span></p>
          <button class="connect-btn">🔗 Invite Partner</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoupleDashboard',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    // Only access Firebase auth on client side
    if (process.client) {
      this.$fire.auth.onAuthStateChanged((user) => {
        this.user = user
      })
    }
  },
  head() {
    return {
      title: 'Our Space - Zira Couple App'
    }
  }
}
</script>

<style scoped>
.couple-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.auth-required {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-home {
  display: inline-block;
  background-color: #e91e63;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  margin-top: 1rem;
  transition: all 0.3s;
}

.btn-home:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.couple-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #35495e;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #526488;
  margin-bottom: 1.5rem;
}

.feature-btn {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.feature-btn:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
}

.couple-status {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.couple-status h3 {
  color: #35495e;
  margin-bottom: 1.5rem;
}

.status-info p {
  color: #526488;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.partner-status {
  color: #e91e63;
  font-style: italic;
}

.connect-btn {
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  transition: all 0.3s;
}

.connect-btn:hover {
  background-color: #c2185b;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .couple-features {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}
</style> 