# OMDb Movies (React Native)

Expo React Native movie browsing app powered by the OMDb API.

Built with **Expo SDK 54**, **React Navigation**, **TanStack Query**, and **AsyncStorage** for favorites.

## Prerequisites

- Node.js 20+ (Node 24 recommended for running tests)
- npm
- [Expo Go](https://expo.dev/go) on a physical device, **or** Xcode (iOS Simulator) / Android Studio (emulator)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file in the **project root** (same folder as `package.json`):

```bash
cp .env.example .env
```

The file must be named exactly `.env` (not `.env.local` or similar). Expo only loads `EXPO_PUBLIC_*` variables from this root `.env` file into the app.

3. Open `.env` and set your OMDb API key using this exact variable name:

```bash
EXPO_PUBLIC_OMDB_API_KEY=your_api_key_here
```

Get a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).

Do not commit `.env` — it is gitignored. `.env.example` is safe to commit and shows the required key name without a real secret.

If you change `.env` while Metro is already running, restart the bundler so the new value is picked up:

```bash
npm start -- --clear
```

## Development

Start the Metro bundler from the project root:

```bash
npm start
```

Then press:

- `i` — open iOS Simulator
- `a` — open Android Emulator
- `w` — open web

Other useful commands while the dev server is running:

- `r` — reload the app
- `m` — open the developer menu

### Hot reload (Fast Refresh)

Fast Refresh is enabled by default in development. Save a file and the app should update without a full restart.

If changes are not appearing:

1. Open the developer menu (`Cmd + D` in iOS Simulator, `Cmd + M` in Android Emulator)
2. Ensure **Enable Fast Refresh** is turned on
3. Restart Metro with a clean cache:

```bash
npm start -- --clear
```

### Running on a physical device with Expo Go

This project uses **Expo SDK 54**, which matches the current Expo Go app on the App Store and Play Store.

1. Install [Expo Go](https://expo.dev/go) on your phone
2. Connect your phone and computer to the **same Wi-Fi network**  
   Expo Go loads the app over your local network by default. If the devices are on different networks (or on a restricted public Wi-Fi), the QR code connection usually fails.
3. From the project root, run `npm start` and scan the QR code from the terminal or Expo Dev Tools
4. If LAN connection still fails, start with tunnel mode instead:

```bash
npx expo start --tunnel
```

Tunnel is slower, but works when devices cannot reach each other on the local network.

Alternatively, run a native build on a connected device:

```bash
npm run ios -- --device
# or
npm run android
```

## Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm start`             | Start Expo dev server          |
| `npm run ios`           | Run on iOS                     |
| `npm run android`       | Run on Android                 |
| `npm run web`           | Run in the browser             |
| `npm run lint`          | Run ESLint                     |
| `npm test`              | Run Jest test suite            |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## Quality checks

```bash
npm run lint
npm test
npm run test:watch
npm run test:coverage
npx tsc --noEmit
npx tsc --noEmit -p tests/tsconfig.json
```

### Linting

`npm run lint` runs ESLint using the Expo flat config in `eslint.config.js`.

### Testing

Tests live under the top-level `tests/` directory, organized by responsibility:

- `tests/unit/` — pure domain logic (mappers, selectors, view models, storage)
- `tests/components/` — component behavior and accessibility
- `tests/integration/` — screen-level flows with focused mocks
- `tests/fixtures/` — deterministic test data
- `tests/mocks/` — reusable module mocks
- `tests/utilities/` — shared render helpers

Pure domain logic is tested directly. Component tests focus on public behavior and accessibility rather than implementation details.

The integration-style `MovieDetailsScreen` test mocks the movie API at the module boundary and verifies loading, rendering, and favorites toggling without real network requests.

## Project structure

```text
.env.example        Example env vars (copy to .env in this same root folder)
App.tsx             App entry point
src/
  app/              Navigation and app-level providers
  features/
    movies/         Home, movie details, OMDb API integration
    search/         Search screen and UI
    favorites/      Favorites context, storage, and screens
  shared/           Theme, hooks, AppHeader, and shared components
tests/              Jest test suites
```
