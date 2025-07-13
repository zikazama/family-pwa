<template>
  <div class="responsive-container">
    <h1 class="page-title">Settings</h1>
    <form @submit.prevent="changePassword">
      <label>Ganti Password</label>
      <input v-model="newPassword" type="password" placeholder="Password baru" required class="input-primary" />
      <button type="submit" class="btn-primary">Update Password</button>
    </form>
    <form @submit.prevent="uploadPhoto">
      <label>Ganti Foto Profil</label>
      <input type="file" @change="onFileChange" accept="image/*" class="input-primary" />
      <button type="submit" class="btn-primary">Upload Foto</button>
    </form>
    <form @submit.prevent="updateTimezone">
      <label>Pilih Zona Waktu</label>
      <select v-model="timezone" class="input-primary">
        <option value="WIB">WIB (GMT+7)</option>
        <option value="WITA">WITA (GMT+8)</option>
        <option value="WIT">WIT (GMT+9)</option>
      </select>
      <button type="submit" class="btn-primary">Update Zona Waktu</button>
    </form>
    <BottomBar />
  </div>
</template>
<script>
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { BottomBar },
  data() {
    return { newPassword: '', photoFile: null, timezone: 'WIB' }
  },
  async mounted() {
    // Ambil timezone user dari Firestore
    const uid = this.$store.state.user.uid
    const snap = await this.$fire.firestore.collection('users').doc(uid).get()
    if (snap.exists && snap.data().timezone) {
      this.timezone = snap.data().timezone
    }
  },
  methods: {
    async changePassword() {
      const user = this.$fire.auth().currentUser
      await user.updatePassword(this.newPassword)
      alert('Password berhasil diubah!')
      this.newPassword = ''
    },
    onFileChange(e) {
      this.photoFile = e.target.files[0]
    },
    async uploadPhoto() {
      // Implement photo upload logic here
    },
    async updateTimezone() {
      // Implement timezone update logic here
    }
  }
}
</script>
<style lang="scss">
@use '@/assets/styles/theme-pink.scss' as *;
.page-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: $color-primary;
  font-size: 2rem;
  font-weight: 700;
}
form {
  background: $color-white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(233,30,99,0.07);
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  color: $color-primary-dark;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
@media (max-width: 600px) {
  .page-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  form {
    padding: 1rem;
    border-radius: 8px;
    max-width: 100%;
  }
}
</style>
