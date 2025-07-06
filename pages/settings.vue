<template>
  <div class="settings-page">
    <h1>⚙️ Settings</h1>

    <form @submit.prevent="saveSettings" class="settings-form">
      <div class="form-group">
        <label for="myName">Your Name</label>
        <input id="myName" v-model="myName" type="text" placeholder="Your name" required />
      </div>

      <div class="form-group">
        <label for="partnerName">Partner's Name</label>
        <input id="partnerName" v-model="partnerName" type="text" placeholder="Partner name" />
      </div>

      <div class="form-group">
        <label for="anniversary">Anniversary Date</label>
        <input id="anniversary" v-model="anniversaryDate" type="date" />
      </div>

      <div class="form-group toggle-group">
        <label for="darkMode">Dark Mode</label>
        <input id="darkMode" v-model="darkMode" type="checkbox" />
      </div>

      <div class="form-group">
        <label for="bgPhoto">Background Photo</label>
        <input id="bgPhoto" type="file" accept="image/*" @change="onFileChange" />
      </div>

      <div class="form-group">
        <label for="lastPeriod">Last Period Started</label>
        <input id="lastPeriod" type="date" v-model="lastPeriodDate" />
      </div>

      <div class="form-group">
        <label for="cycle">Cycle Length (days)</label>
        <input id="cycle" type="number" min="15" max="60" v-model.number="cycleLength" />
      </div>

      <button type="submit" class="btn-save" :disabled="uploading">{{ uploading ? 'Uploading...' : 'Save Settings' }}</button>
      <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SettingsPage',
  head() {
    return { title: 'Settings - Zira' }
  },
  data() {
    return {
      myName: '',
      partnerName: '',
      anniversaryDate: '',
      darkMode: false,
      backgroundFile: null,
      uploading: false,
      successMsg: '',
      lastPeriodDate: '',
      cycleLength: 28
    }
  },
  computed: {
    ...mapGetters({ couple: 'couple/couple' })
  },
  watch: {
    couple: {
      immediate: true,
      handler(val) {
        if (val) {
          this.myName = val.myName || ''
          this.partnerName = val.partnerName || ''
          this.anniversaryDate = val.anniversaryDate ? this.formatDateInput(val.anniversaryDate) : ''
          this.darkMode = !!val.darkMode
          this.lastPeriodDate = val.lastPeriodDate ? this.formatDateInput(val.lastPeriodDate) : ''
          this.cycleLength = val.cycleLength || 28
        }
      }
    },
    darkMode: {
      immediate: true,
      handler(val) {
        if (process.client) {
          document.documentElement.classList.toggle('dark-mode', val)
        }
      }
    }
  },
  methods: {
    formatDateInput(ts) {
      const d = new Date(ts)
      return d.toISOString().substr(0, 10)
    },
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) this.backgroundFile = file
    },
    async saveSettings() {
      const updates = {
        myName: this.myName,
        partnerName: this.partnerName,
        anniversaryDate: this.anniversaryDate ? new Date(this.anniversaryDate).toISOString() : null,
        darkMode: this.darkMode,
        lastPeriodDate: this.lastPeriodDate ? new Date(this.lastPeriodDate).toISOString() : null,
        cycleLength: this.cycleLength
      }

      try {
        // handle background upload if any
        if (this.backgroundFile) {
          this.uploading = true
          const uid = this.$store.state.user?.uid || this.$fire.auth.currentUser.uid
          const storageRef = this.$fire.storage.ref().child(`couples/${uid}/background_${Date.now()}`)
          await storageRef.put(this.backgroundFile)
          const url = await storageRef.getDownloadURL()
          updates.backgroundPhotoUrl = url
        }

        await this.$store.dispatch('couple/updateCouple', updates)
        this.successMsg = 'Settings saved!'
        setTimeout(() => (this.successMsg = ''), 3000)
      } catch (err) {
        console.error('Saving settings failed', err)
      } finally {
        this.uploading = false
        this.backgroundFile = null
      }
    }
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.toggle-group {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.btn-save {
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 25px;
  background: #e91e63;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-save:hover {
  background: #c2185b;
}

.success-msg {
  color: #4caf50;
  margin-top: 0.5rem;
  text-align: center;
}
</style>