<template>
  <div class="auth-container">
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <form @submit.prevent="register" class="register-form">
      <input v-model="regEmail" type="email" placeholder="Email" required />
      <input v-model="regPassword" type="password" placeholder="Password" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <select v-model="gender" required>
        <option disabled value="">Pilih Gender</option>
        <option value="pria">Pria</option>
        <option value="wanita">Wanita</option>
      </select>
      <label>Tanggal Lahir</label>
      <input v-model="birthDate" type="date" required />
      <label>Tanggal Jadian</label>
      <input v-model="startDate" type="date" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data() {
    return {
      email: '', password: '',
      regEmail: '', regPassword: '', username: '', gender: '', birthDate: '', startDate: ''
    }
  },
  methods: {
    async login() {
      await this.$fire.auth().signInWithEmailAndPassword(this.email, this.password)
      this.$router.push('/dashboard')
    },
    async register() {
      // Register user
      const cred = await this.$fire.auth().createUserWithEmailAndPassword(this.regEmail, this.regPassword)
      // Simpan data user ke Firestore
      await this.$fire.firestore().collection('users').doc(cred.user.uid).set({
        username: this.username,
        gender: this.gender,
        birthDate: this.birthDate,
        startDate: this.startDate,
        email: this.regEmail,
        photoURL: null,
        pasanganUID: null
      })
      this.$router.push('/dashboard')
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

.error-msg {
  color: #b00020;
  margin-top: 0.8rem;
}
</style> 