# Geofencing Crowd Tracking App

A real-time crowd tracking application built with Expo and React Native that allows users to create and monitor geofences while tracking the number of people within defined areas.

## Features

- 📍 Real-time location tracking
- 🎯 Create custom geofences with adjustable radius
- 👥 Dynamic crowd counting within geofences
- 🗺️ Interactive map visualization
- 🔔 Push notification support
- ⚡ Battery optimization settings
- 🎨 Beautiful, intuitive UI

## Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native Maps](https://github.com/react-native-maps/react-native-maps) - Map integration
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - Location services
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animations
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/geofencing-crowd-tracker.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── +not-found.tsx          # 404 page
└── (tabs)/                 # Tab-based navigation
    ├── _layout.tsx         # Tab configuration
    ├── index.tsx           # Map screen
    ├── geofences.tsx       # Geofence management
    └── settings.tsx        # App settings

components/
├── AddGeofenceModal.tsx    # Geofence creation modal
├── LocationInfoCard.tsx    # Location information display
└── PeopleCountBadge.tsx   # Crowd count indicator

stores/
├── geofenceStore.ts        # Geofence state management
└── settingsStore.ts        # App settings state

utils/
└── locationUtils.ts        # Location calculation utilities
```

## Features in Detail

### Geofence Management
- Create custom geofences with name and radius
- View active geofences on the map
- Monitor crowd size within each geofence
- Edit or delete existing geofences

### Real-time Location Tracking
- High-accuracy location monitoring
- Background location updates
- Battery-optimized tracking options

### Settings & Configuration
- Toggle location tracking
- Manage push notifications
- Configure battery optimization
- Customize app preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing framework
- [OpenStreetMap](https://www.openstreetmap.org/) for map data
- [Lucide](https://lucide.dev/) for the beautiful icons