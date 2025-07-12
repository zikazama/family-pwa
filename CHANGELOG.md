# Changelog

## [1.1.0] - 2025-01-06

### Added
- 🔐 Register & login with email, password, username, gender, birth date, anniversary date
- 👩‍❤️‍👨 Couple dashboard: Nama Pria ❤️ Nama Wanita, hari jadian, mood & status emoji, background romantis (bisa diganti foto), love button (vibrate & push notification)
- 📅 Calendar: CRUD event, info pembuat/updater, notifikasi 30 menit sebelum event (Cloud Function)
- 📝 Notes: CRUD, rich text editor, info pembuat & updater
- 💬 Messaging: real-time chat, emoji picker
- ⏰ Reminder: CRUD, notifikasi otomatis (Cloud Function)
- 🌸 Siklus Haid: input history, prediksi otomatis siklus berikutnya
- 💰 Keuangan: tabungan & hutang, prediksi target tabungan
- ⚙️ Settings: ganti password, upload foto profil
- 🔔 Notifikasi hari penting (jadian, ulang tahun) 1 bulan, 1 minggu, 1 hari sebelum (Cloud Function)
- 📱 PWA: installable, offline, push notification (FCM)
- 🎨 Pink, romantis, responsive, modern UI/UX

### Improved
- Store & komponen modular untuk semua fitur utama
- Integrasi FCM client & service worker
- Instruksi Cloud Function untuk notifikasi otomatis

### Fixed
- Semua bug utama pada proses login, dashboard, dan notifikasi

## [1.0.0] - 2025-01-05

### Added
- 💕 Initial release of Zira couple app
- 🔥 Firebase authentication with Google Sign-in
- 💖 Couple-focused UI with pink/rose theme (#e91e63)
- 📱 Progressive Web App (PWA) configuration
- 🏠 Main dashboard with authentication
- 💑 Couple dashboard with 6 core features
- 📱 Responsive design for all devices
- 🔐 Secure user authentication and state management
- 🎨 Modern UI/UX with smooth animations 