importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCE1B9AYVXv30Es36sJKGgOGMIvfuwYXBc",
  authDomain: "family-b3dd3.firebaseapp.com",
  projectId: "family-b3dd3",
  storageBucket: "family-b3dd3.firebasestorage.app",
  messagingSenderId: "844557267333",
  appId: "1:844557267333:android:4d617ae6742097a2b554ec"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
}); 