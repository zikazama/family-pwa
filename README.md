# 💕 Zira - Couple App

A beautiful Progressive Web Application built with Nuxt.js and Firebase integration, designed specifically for couples to stay connected.

## Features

- 💝 Firebase Authentication (Google Sign-in)
- 💾 Firestore Database for shared memories
- 📱 Progressive Web App (PWA)
- 💖 Beautiful couple-focused UI/UX
- 📱 Mobile-first responsive design
- 🔗 Partner connection system

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
   - Authentication (with Google Sign-in provider)
   - Firestore Database
   - Storage
   - Analytics

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
├── static/             # Static assets
├── store/              # Vuex store for couple state
├── middleware/         # Nuxt middleware
├── nuxt.config.js      # Nuxt configuration
├── google-services.json # Firebase configuration
└── package.json        # Dependencies and scripts
```

## Firebase Integration

The app integrates with Firebase through:

- **Authentication**: Google Sign-in for couple authentication
- **Firestore**: Real-time database for shared memories, messages, and couple data
- **Storage**: Photo and file sharing between partners
- **Analytics**: Couple interaction tracking

## PWA Features

The app includes PWA capabilities:

- Offline functionality
- App-like experience on mobile devices
- Install prompt for home screen
- Service worker for caching

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and designed for couples to enhance their relationship through technology.
