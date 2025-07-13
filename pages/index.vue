<template>
  <div class="responsive-container auth-container fade-in-screen">
    <h1 class="zira-title">ZIRA</h1>
    <form @submit.prevent="login" class="fade-in-form">
      <input v-model="email" type="email" placeholder="Email" required class="input-primary" />
      <input v-model="password" type="password" placeholder="Password" required class="input-primary" />
      <button type="submit" class="btn-primary">Sign In</button>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data() {
    return {
      email: '', password: ''
    }
  },
  methods: {
    async login() {
      await this.$fire.auth().signInWithEmailAndPassword(this.email, this.password)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="scss">
@use '@/assets/styles/theme-pink.scss' as *;
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  animation: fadeInScreen 0.8s cubic-bezier(.4,0,.2,1);
}
.zira-title {
  font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
  font-size: 2.4rem;
  font-weight: 800;
  color: $color-primary;
  letter-spacing: 0.1em;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 12px rgba(233,30,99,0.09);
  animation: fadeInTitle 1.1s cubic-bezier(.4,0,.2,1);
}
form {
  background: $color-white;
  padding: 1.2rem 1.2rem 1.4rem 1.2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.07);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  animation: fadeInForm 1.2s cubic-bezier(.4,0,.2,1);
}
.fade-in-screen {
  opacity: 0;
  animation: fadeInScreen 0.8s cubic-bezier(.4,0,.2,1) forwards;
}
.fade-in-form {
  opacity: 0;
  animation: fadeInForm 1.2s cubic-bezier(.4,0,.2,1) 0.2s forwards;
}
@keyframes fadeInScreen {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInForm {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInTitle {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.register-form {
  margin-top: 1rem;
}
label {
  color: $color-primary-dark;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
@media (max-width: 600px) {
  .auth-container {
    padding: 0.5rem;
  }
  form {
    padding: 0.7rem 0.7rem 1rem 0.7rem;
    border-radius: 8px;
    max-width: 100%;
  }
  .zira-title {
    font-size: 1.6rem;
    margin-bottom: 0.7rem;
  }
}
</style> 