<template>
  <div>
    <h1>Settings</h1>
    <form @submit.prevent="changePassword">
      <label>Ganti Password</label>
      <input v-model="newPassword" type="password" placeholder="Password baru" required />
      <button type="submit">Update Password</button>
    </form>
    <form @submit.prevent="uploadPhoto">
      <label>Ganti Foto Profil</label>
      <input type="file" @change="onFileChange" accept="image/*" />
      <button type="submit">Upload Foto</button>
    </form>
    <form @submit.prevent="updateTimezone">
      <label>Pilih Zona Waktu</label>
      <select v-model="timezone">
        <option value="WIB">WIB (GMT+7)</option>
        <option value="WITA">WITA (GMT+8)</option>
        <option value="WIT">WIT (GMT+9)</option>
      </select>
      <button type="submit">Update Zona Waktu</button>
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
