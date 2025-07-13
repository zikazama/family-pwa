<template>
  <div class="responsive-container dashboard-bg" :style="{ backgroundImage: `url(${background})` }">
    <div class="couple-names">{{ manName }} ❤️ {{ womanName }}</div>
    <div class="days-together">Sudah {{ daysTogether }} hari bersama</div>
    <LoveButton @sendLove="sendLove" />
    <MoodStatus v-model:mood="mood" v-model:status="status" />
    <input type="file" @change="uploadBackground" class="input-primary" />
    <BottomBar />
  </div>
</template>
<script>
import LoveButton from '~/components/Dashboard/LoveButton.vue'
import MoodStatus from '~/components/Dashboard/MoodStatus.vue'
import BottomBar from '~/components/BottomBar.vue'
export default {
  components: { LoveButton, MoodStatus, BottomBar },
  data() {
    return {
      background: '/default-romantic-bg.jpg',
      mood: '😊', status: '💪'
    }
  },
  computed: {
    userProfile() { return this.$store.getters.userProfile },
    partnerProfile() { return this.$store.getters.partnerProfile },
    manName() {
      if (!this.userProfile || !this.partnerProfile) return ''
      return this.userProfile.gender === 'pria' ? this.userProfile.username : this.partnerProfile.username
    },
    womanName() {
      if (!this.userProfile || !this.partnerProfile) return ''
      return this.userProfile.gender === 'wanita' ? this.userProfile.username : this.partnerProfile.username
    },
    startDate() {
      if (!this.userProfile) return '2022-01-01'
      return this.userProfile.startDate || '2022-01-01'
    },
    daysTogether() {
      const start = new Date(this.startDate)
      const now = new Date()
      return Math.floor((now - start) / (1000 * 60 * 60 * 24))
    }
  },
  watch: {
    userProfile: {
      handler(val) {
        if (val && val.background) this.background = val.background
        if (val && val.mood) this.mood = val.mood
        if (val && val.status) this.status = val.status
      },
      immediate: true
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUserProfile')
    await this.$store.dispatch('fetchPartnerProfile')
    if (this.userProfile && this.userProfile.background) this.background = this.userProfile.background
    if (this.userProfile && this.userProfile.mood) this.mood = this.userProfile.mood
    if (this.userProfile && this.userProfile.status) this.status = this.userProfile.status
  },
  methods: {
    async sendLove() {
      // Simpan event love ke Firestore
      await this.$fire.firestore.collection('love').add({
        from: this.$store.state.user.uid,
        to: this.partnerProfile ? this.partnerProfile.uid : null,
        timestamp: new Date().toISOString()
      })
      // TODO: Kirim FCM ke pasangan (butuh Cloud Function di backend)
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200])
      this.$notify('Pasanganmu mengirimkan love! 💖')
    },
    async uploadBackground(e) {
      const file = e.target.files[0]
      if (!file) return
      const uid = this.$store.state.user.uid
      const ref = this.$fire.storage().ref(`backgrounds/${uid}`)
      await ref.put(file)
      const url = await ref.getDownloadURL()
      this.background = url
      // Update Firestore userProfile
      await this.$fire.firestore.collection('users').doc(uid).update({ background: url })
    },
    async updateMood(val) {
      this.mood = val
      await this.$fire.firestore.collection('users').doc(this.$store.state.user.uid).update({ mood: val })
    },
    async updateStatus(val) {
      this.status = val
      await this.$fire.firestore.collection('users').doc(this.$store.state.user.uid).update({ status: val })
    }
  }
}
</script>
<style lang="scss">
@use '@/assets/styles/theme-pink.scss' as *;
.dashboard-bg {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0.5rem 5rem 0.5rem;
}
.couple-names {
  font-size: 2rem;
  color: $color-primary;
  margin-top: 2rem;
  text-shadow: 0 2px 8px $color-white;
}
.days-together {
  font-size: 1.2rem;
  color: $color-secondary;
  margin-bottom: 1rem;
}
input[type="file"].input-primary {
  margin: 1rem 0;
  background: $color-white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;
  max-width: 350px;
}
@media (max-width: 600px) {
  .dashboard-bg {
    padding: 1rem 0.2rem 5rem 0.2rem;
  }
  .couple-names {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
}
</style> 