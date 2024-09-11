# Welcome to Replicar 👋
Replicar is a simplified ride-hailing app built with React Native, inspired by Uber's core functionalities. The app connects passengers with drivers, allowing users to book a ride, track their location, and get to their destination efficiently.

## ⚙️ Tech Stack
- React Native
- Expo
- Stripe
- PostgreSQL
- Google Maps
- zustand
- Clerk
- Tailwind CSS

## 🔋 Features
- **Onboarding Flow**: User registration and setup process.
- **Email Password Authentication with Verification**: Secure login with email verification.
- **oAuth Using Google**: Easy login using Google credentials.
- **Home Screen with Live Location & Google Map**: Real-time location tracking with markers on a map.
- **Recent Rides**: View a list of recent rides.
- **Google Places Autocomplete**: Search any place on Earth with autocomplete suggestions.
- **Find Rides**: Search for rides by entering 'From' and 'To' locations.
- **Select Rides from Map**: Choose available cars near your location from the map.
- **Confirm Ride with Detailed Information**: View complete ride details, including time and fare price.
- **Pay for Ride Using Stripe**: Make payments using multiple methods like cards and others.
- **Create Rides After Successful Payment**: Book a ride after confirming payment.
- **Profile**: View your account details.
- **History**: Review all rides booked so far.
- **Responsive on Android and iOS**: Optimized for both Android and iOS devices.

## Run the app in development

**Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=

EXPO_PUBLIC_PLACES_API_KEY=
EXPO_PUBLIC_DIRECTIONS_API_KEY=

DATABASE_URL=

EXPO_PUBLIC_SERVER_URL=https://replicar.dev/

EXPO_PUBLIC_GEOAPIFY_API_KEY=

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Download the [Expo Go](https://expo.dev/go) app and Scan the QR code on your respective device to view the project.
