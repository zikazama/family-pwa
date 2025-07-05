export default {
  // Global page headers
  head: {
    title: 'Zira - Couple App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Zira - A beautiful app for couples to stay connected' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/pwa'
  ],

  // Modules
  modules: [
    '@nuxtjs/firebase'
  ],

  // Firebase configuration
  firebase: {
    config: {
      apiKey: "AIzaSyCE1B9AYVXv30Es36sJKGgOGMIvfuwYXBc",
      authDomain: "family-b3dd3.firebaseapp.com",
      projectId: "family-b3dd3",
      storageBucket: "family-b3dd3.firebasestorage.app",
      messagingSenderId: "844557267333",
      appId: "1:844557267333:android:4d617ae6742097a2b554ec"
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: false
      },
      firestore: true,
      storage: true,
      analytics: true
    }
  },

  // PWA module configuration
  pwa: {
    meta: {
      title: 'Zira - Couple App',
      author: 'Zira Team'
    },
    manifest: {
      name: 'Zira - Couple App',
      short_name: 'Zira',
      description: 'A beautiful app for couples to stay connected',
      display: 'standalone',
      theme_color: '#e91e63',
      background_color: '#ffffff'
    }
  },

  // Build Configuration
  build: {}
} 