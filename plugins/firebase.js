import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCE1B9AYVXv30Es36sJKGgOGMIvfuwYXBc",
  authDomain: "family-b3dd3.firebaseapp.com",
  projectId: "family-b3dd3",
  storageBucket: "family-b3dd3.firebasestorage.app",
  messagingSenderId: "844557267333",
  appId: "1:844557267333:android:4d617ae6742097a2b554ec"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default (context, inject) => {
  inject('fire', firebase)
  // Inject messaging jika di browser
  if (process.client && firebase.messaging.isSupported && firebase.messaging.isSupported()) {
    const messaging = firebase.messaging()
    inject('messaging', messaging)
  }
} 