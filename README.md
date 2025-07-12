# 💕 Zira - Couple App

A beautiful Progressive Web Application built with Nuxt.js and Firebase integration, designed specifically for couples to stay connected.

## Features

- 🔐 Register & Sign in with email, password, username, gender, birth date, and anniversary date
- 🌏 **Timezone support:** Each user can select their timezone (WIB, WITA, WIT) for all events, reminders, and cycles
- 👩‍❤️‍👨 Couple dashboard: display "Nama Pria ❤️ Nama Wanita", days together, mood & status emoji, customizable romantic background, love button (vibrate & push notification)
- 📅 Calendar: create/edit/delete events, see who created/updated, push notification 30 minutes before event, **all times shown in your selected timezone**
- 📝 Notes: rich text editor, info creator & last updater
- 💬 Messaging: real-time chat with emoji picker
- ⏰ Reminder: CRUD, push notification at scheduled time, **all times shown in your selected timezone**
- 🌸 Siklus Haid: input history, automatic next period prediction, **dates shown in your selected timezone**
- 💰 Keuangan: savings & debt, target prediction, period-based calculation
- ⚙️ Settings: change password, upload/change profile photo, **choose your timezone (WIB, WITA, WIT)**
- 🔔 Important date notifications: 1 month, 1 week, 1 day before anniversary & birthdays
- 📱 Progressive Web App (PWA): installable, offline support, push notifications
- 🎨 Beautiful, friendly, responsive, and romantic pink theme

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase project with enabled services

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Firebase Configuration:**
   The project is already configured with your Firebase project settings from `google-services.json`. The configuration includes:
   - Project ID: `family-b3dd3`
   - API Key: Configured for authentication
   - Storage bucket for shared photos and memories
   - Real-time database for couple features

3. **Enable Firebase Services:**
   Make sure the following services are enabled in your Firebase console:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Analytics
   - Cloud Messaging
   - Cloud Functions (for push notification automation)

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run start
```

## Generate Static Site

```bash
npm run generate
```

## Project Structure

```
zira/
├── components/          # Vue components (UserProfile, etc.)
├── layouts/            # Nuxt layouts
├── pages/              # Application pages/routes
├── plugins/            # Nuxt plugins
├── static/             # Static assets (manifest, service worker, icons)
├── store/              # Vuex store for couple state
├── middleware/         # Nuxt middleware
├── nuxt.config.js      # Nuxt configuration
├── google-services.json # Firebase configuration
└── package.json        # Dependencies and scripts
```

## Firebase Integration

The app integrates with Firebase through:

- **Authentication**: Email/Password for couple authentication
- **Firestore**: Real-time database for shared memories, messages, couple data, events, notes, reminders, cycles, finance
- **Storage**: Photo and file sharing between partners (background, profile photo)
- **Analytics**: Couple interaction tracking
- **Cloud Messaging**: Push notifications for events, reminders, love button, important dates
- **Cloud Functions**: Automated push notifications

## PWA Features

- Offline functionality
- App-like experience on mobile devices
- Install prompt for home screen
- Service worker for caching and push notification

## Notifikasi Otomatis (Cloud Functions)

Deploy Cloud Functions (lihat instruksi di dokumentasi/AI) untuk:
- Notifikasi event/reminder 30 menit sebelum mulai
- Notifikasi hari penting (jadian, ulang tahun) 1 bulan, 1 minggu, 1 hari sebelum
- Notifikasi love button ke pasangan

## Timezone Support (WIB, WITA, WIT)

- Set your timezone in the Settings menu (WIB = GMT+7, WITA = GMT+8, WIT = GMT+9)
- All event, reminder, and cycle times will be displayed in your selected timezone
- Both partners can use different timezones and see all dates/times in their own local time

## License

This project is private and designed for couples to enhance their relationship through technology.
