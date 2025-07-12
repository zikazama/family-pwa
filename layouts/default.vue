<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  async mounted() {
    // Tunggu user login
    this.$watch(
      () => this.$store.state.user,
      async (user) => {
        if (user && this.$messaging) {
          try {
            await this.$messaging.requestPermission()
            const token = await this.$messaging.getToken()
            if (token) {
              await this.$fire.firestore.collection('users').doc(user.uid).update({ fcmToken: token })
            }
          } catch (e) {
            // User menolak notifikasi atau error
          }
        }
      },
      { immediate: true }
    )
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
}

/* Dark mode helper class */
.dark-mode body {
  background: #121212;
  color: #f5f5f5;
}
</style> 